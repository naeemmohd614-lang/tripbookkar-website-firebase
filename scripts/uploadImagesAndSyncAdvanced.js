// =============================================
// TRIPBOOKKAR IMAGE PIPELINE
// WebP + Thumbnail + Hash Dedupe + Firestore Sync
// =============================================

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const crypto = require("crypto");
const sharp = require("sharp");
const pLimit = require("p-limit");

const admin = require("firebase-admin");

// ------------------------------
// Firebase Admin Setup
// ------------------------------
const SERVICE_ACCOUNT = path.join(__dirname, "..", "serviceAccountKey.json");

if (!fs.existsSync(SERVICE_ACCOUNT)) {
  console.error("❌ ERROR: serviceAccountKey.json missing in root directory.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(SERVICE_ACCOUNT)),
  storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// ------------------------------
// Paths
// ------------------------------
const ROOT = path.join(__dirname, "..");
const IMAGES_ROOT = path.join(ROOT, "data", "images");
const INPUT_JSON = path.join(ROOT, "data", "new-hotels.json");

// ------------------------------
// Settings
// ------------------------------
const CONCURRENCY = 5;
const WEBP_QUALITY = 80;
const RETRY_COUNT = 3;

// ------------------------------
// Helper Functions
// ------------------------------
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function downloadImage(url) {
  for (let attempt = 1; attempt <= RETRY_COUNT; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.buffer();
    } catch (err) {
      console.log(`Retry ${attempt} failed: ${url}`);
      if (attempt === RETRY_COUNT) return null;
    }
  }
}

// ------------------------------
// Storage Upload
// ------------------------------
async function uploadToStorage(buffer, destPath) {
  const file = bucket.file(destPath);

  await file.save(buffer, {
    metadata: { contentType: "image/webp" },
    public: true,
  });

  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${destPath}`;
}

// ------------------------------
// Main Image Processor
// ------------------------------
async function processImage(hotel, imgPath, caption = "") {
  let buffer;

  const isURL = imgPath.startsWith("http");
  const hotelFolder = path.join(IMAGES_ROOT, hotel.id);

  if (isURL) {
    buffer = await downloadImage(imgPath);
  } else {
    const localPath = path.join(hotelFolder, imgPath);
    if (!fs.existsSync(localPath)) return null;
    buffer = fs.readFileSync(localPath);
  }

  if (!buffer) return null;

  // Compute SHA256 hash
  const hash = sha256(buffer);

  // Check Firestore if image hash exists
  const hashRef = db.collection("image_hashes").doc(hash);
  const hashDoc = await hashRef.get();
  if (hashDoc.exists) {
    console.log(`⚠ Duplicate skipped: ${imgPath}`);
    return {
      src: hashDoc.data().src,
      thumb: hashDoc.data().thumb,
      caption,
      hash
    };
  }

  // Convert to WebP + Thumbnail
  const webpBuffer = await sharp(buffer).webp({ quality: WEBP_QUALITY }).toBuffer();
  const thumbBuffer = await sharp(buffer).resize(400).webp({ quality: WEBP_QUALITY - 20 }).toBuffer();

  // Upload Paths
  const brandSlug = slugify(hotel.brand);
  const basePath = `hotels/${brandSlug}/${hotel.id}/${Date.now()}-${slugify(caption) || "img"}`;

  const webpPath = `${basePath}.webp`;
  const thumbPath = `${basePath}-thumb.webp`;

  const srcUrl = await uploadToStorage(webpBuffer, webpPath);
  const thumbUrl = await uploadToStorage(thumbBuffer, thumbPath);

  // Save hash
  await hashRef.set({
    hotelId: hotel.id,
    brand: hotel.brand,
    src: srcUrl,
    thumb: thumbUrl,
    createdAt: new Date(),
  });

  return {
    src: srcUrl,
    thumb: thumbUrl,
    caption,
    hash
  };
}

// ------------------------------
// Process Hotel
// ------------------------------
async function processHotel(hotel) {
  console.log(`\n🏨 Processing hotel: ${hotel.name}`);

  const hotelImages = [];

  const images = hotel.images || [];

  const limit = pLimit(CONCURRENCY);

  const jobs = images.map(img =>
    limit(() => processImage(hotel, img.src || img, img.caption || ""))
  );

  const processed = await Promise.all(jobs);

  processed.forEach(p => {
    if (p) hotelImages.push(p);
  });

  // Save to Firestore
  await db.collection("hotels").doc(hotel.id).set(
    {
      images: hotelImages,
      updatedAt: new Date(),
    },
    { merge: true }
  );

  console.log(`✔ Done: ${hotelImages.length} images for → ${hotel.name}`);
}

// ------------------------------
// ENTRY POINT
// ------------------------------

async function main() {
  if (!fs.existsSync(INPUT_JSON)) {
    console.log("❌ new-hotels.json missing");
    return;
  }

  const hotels = JSON.parse(fs.readFileSync(INPUT_JSON, "utf8"));

  for (const hotel of hotels) {
    hotel.id = slugify(hotel.name);
    await processHotel(hotel);
  }

  console.log("\n🎉 IMAGE PIPELINE COMPLETED SUCCESSFULLY!");
}

main();