
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const glob = require("glob");
const admin = require("firebase-admin");

// -----------------------------
// 1. Firebase Admin Init
// -----------------------------
// Ensure serviceAccountKey.json is present in the root directory
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ ERROR: serviceAccountKey.json not found in the project root directory.');
  process.exit(1);
}
const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "studio-1865376664-5e932.appspot.com",
});

const bucket = admin.storage().bucket();

// -----------------------------
// 2. Process All Images
// -----------------------------
async function processImage(filePath) {
  const fileName = path.basename(filePath);
  const optimizedDir = path.join(__dirname, '..', 'optimized_images');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
  }
  const optimizedPath = path.join(optimizedDir, fileName);

  await sharp(filePath)
    .resize(1800)
    .jpeg({ quality: 75 })
    .toFile(optimizedPath);

  console.log("✔ Optimized:", path.relative(path.join(__dirname, '..'), optimizedPath));
  return optimizedPath;
}

// -----------------------------
// 3. Upload to Firebase Storage
// -----------------------------
async function uploadToFirebase(filePath) {
  const uploaded = await bucket.upload(filePath, {
    destination: `images/${path.basename(filePath)}`,
    public: true,
  });

  const url = uploaded[0].publicUrl();
  console.log("🔥 Uploaded:", url);
  return url;
}

// -----------------------------
// 4. Auto Replace URLs in All Files
// -----------------------------
async function replaceUrlsInFiles(map) {
  const files = glob.sync(
    "{src/**/*.{ts,tsx,js,json,md,mdx},public/**/*.json}",
    { cwd: path.join(__dirname, '..'), absolute: true }
  );

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    let replaced = false;

    for (const [oldUrl, newUrl] of Object.entries(map)) {
      if (content.includes(oldUrl)) {
        content = content.replaceAll(oldUrl, newUrl);
        replaced = true;
      }
    }

    if (replaced) {
      fs.writeFileSync(file, content);
      console.log("🔁 Updated:", path.relative(path.join(__dirname, '..'), file));
    }
  }
}

// -----------------------------
// 5. MAIN EXECUTION
// -----------------------------
(async () => {
  const projectRoot = path.join(__dirname, '..');
  const images = glob.sync("public/uploads/**/*.{jpg,jpeg,png,webp}", { cwd: projectRoot, absolute: true });

  if(images.length === 0) {
    console.log("No images found in public/uploads/. Nothing to process.");
    return;
  }

  let replaceMap = {};

  for (const image of images) {
    const optimized = await processImage(image);
    const firebaseUrl = await uploadToFirebase(optimized);

    // Creates a relative URL path to be replaced
    const relativeImagePath = path.relative(path.join(projectRoot, 'public'), image);
    replaceMap[`/${relativeImagePath.replace(/\\/g, '/')}`] = firebaseUrl;

    // Clean up the optimized file after upload
    fs.removeSync(optimized);
  }

  await replaceUrlsInFiles(replaceMap);

  console.log("\n🎉 ALL DONE — Website images now optimized + on Firebase CDN!");
})();
