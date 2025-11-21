
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const glob = require("glob");
const axios = require("axios");
const admin = require("firebase-admin");
const pLimit = require("p-limit");

// -----------------------------
// 1. Firebase Admin Init
// -----------------------------
const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ ERROR: serviceAccountKey.json not found in the project root directory.');
  console.error('Please download it from your Firebase project settings and place it in the root of your project.');
  process.exit(1);
}
const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: `${serviceAccount.project_id}.appspot.com`,
    });
}


const bucket = admin.storage().bucket();
const TEMP_DIR = path.join(__dirname, 'temp');
const OPTIMIZED_DIR = path.join(__dirname, 'optimized');

// Concurrency Limiter
const limit = pLimit(10); // Process up to 10 images in parallel

// -----------------------------
// Helper: Download Image
// -----------------------------
async function downloadImage(url, localPath) {
    try {
        const response = await axios({
            url,
            method: "GET",
            responseType: "arraybuffer",
            timeout: 15000,
        });

        fs.ensureDirSync(path.dirname(localPath));
        fs.writeFileSync(localPath, response.data);
        console.log("⬇ Downloaded:", url);
        return localPath;
    } catch (error) {
        console.error("❌ Failed to download:", url, error.message);
        return null;
    }
}

// -----------------------------
// 2. Optimize Image
// -----------------------------
async function optimizeImage(inputPath) {
    if(!inputPath) return null;
    const fileName = path.basename(inputPath);
    fs.ensureDirSync(OPTIMIZED_DIR);
    const outputPath = path.join(OPTIMIZED_DIR, `${path.parse(fileName).name}.webp`);

    try {
        await sharp(inputPath)
            .resize(1080, 720, { fit: 'cover' })
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log("✔ Optimized:", path.relative(path.join(__dirname, '..'), outputPath));
        return outputPath;
    } catch (error) {
        console.error("❌ Failed to optimize:", inputPath, error.message);
        return null;
    }
}

// -----------------------------
// 3. Upload to Firebase Storage
// -----------------------------
async function uploadToFirebase(filePath) {
    if(!filePath) return null;
    try {
        const destination = `images/${path.basename(filePath)}`;
        const [uploaded] = await bucket.upload(filePath, {
            destination: destination,
            public: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            }
        });

        const url = uploaded.publicUrl();
        console.log("🔥 Uploaded:", url);
        return url;
    } catch (error) {
        console.error("❌ Failed to upload:", filePath, error.message);
        return null;
    }
}

// -----------------------------
// 4. Auto Replace URLs in Source Files
// -----------------------------
async function replaceUrlsInFiles(map) {
  const projectRoot = path.join(__dirname, '..');
  const files = glob.sync(
    "{src,data}/**/*.{ts,tsx,js,jsx,json,md,mdx}",
    { cwd: projectRoot, absolute: true, ignore: '**/node_modules/**' }
  );

  let totalReplaced = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    let changed = false;

    for (const [oldUrl, newUrl] of Object.entries(map)) {
      if (content.includes(oldUrl)) {
        content = content.replaceAll(oldUrl, newUrl);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content);
      console.log("🔁 Updated:", path.relative(projectRoot, file));
      totalReplaced++;
    }
  }
  
  if (totalReplaced > 0) {
      console.log(`\n✅ Replaced URLs in ${totalReplaced} files.`);
  } else {
      console.log('\nNo URLs needed to be replaced in project files.');
  }
}

// -----------------------------
//  Single Image Processing Pipeline
// -----------------------------
async function processSingleImage(remoteUrl) {
    const urlParts = new URL(remoteUrl);
    let fileName = urlParts.pathname.split('/').filter(p => p).join('-') || `image-${Date.now()}`;
    fileName = fileName.replace(/[^a-zA-Z0-9-]/g, '-'); // Further sanitize filename
    const localPath = path.join(TEMP_DIR, fileName);

    const downloadedPath = await downloadImage(remoteUrl, localPath);
    if (!downloadedPath) return null;

    const optimizedPath = await optimizeImage(downloadedPath);
    if (!optimizedPath) return null;
    
    const firebaseUrl = await uploadToFirebase(optimizedPath);
    if (!firebaseUrl) return null;
    
    console.log('---');
    return { oldUrl: remoteUrl, newUrl: firebaseUrl };
}


// -----------------------------
// 5. MAIN EXECUTION
// -----------------------------
(async () => {
    const projectRoot = path.join(__dirname, '..');
    const filesToScan = glob.sync(
        "{src,data}/**/*.json",
        { cwd: projectRoot, absolute: true, ignore: ['**/node_modules/**', '**/package.json', '**/package-lock.json', '**/components.json', '**/tsconfig.json'] }
    );

    const urlRegex = /https?:\/\/[^\s"'`)\\]+/gi;

    let foundUrls = new Set();

    for (const file of filesToScan) {
        const content = fs.readFileSync(file, "utf8");
        const matches = content.match(urlRegex);
        if (matches) {
            matches.forEach((url) => {
                const cleanedUrl = url.replace(/[")'>]+$/, '');
                 // Filter out already processed firebase storage URLs
                if (!cleanedUrl.includes('storage.googleapis.com')) {
                    foundUrls.add(cleanedUrl);
                }
            });
        }
    }

    if (foundUrls.size === 0) {
        console.log("\n🤷 No remote image URLs found to process. Exiting.");
        return;
    }
    
    console.log(`\n🔍 Found ${foundUrls.size} unique remote image URLs.`);
    console.log("------------------------------------------");


    fs.ensureDirSync(TEMP_DIR);
    fs.ensureDirSync(OPTIMIZED_DIR);

    const jobs = Array.from(foundUrls).map(url => limit(() => processSingleImage(url)));
    const results = await Promise.all(jobs);

    const replaceMap = results
        .filter(Boolean) // Filter out any null results from failed processes
        .reduce((acc, { oldUrl, newUrl }) => {
            acc[oldUrl] = newUrl;
            return acc;
        }, {});

    // Clean up temporary folders
    fs.removeSync(TEMP_DIR);
    fs.removeSync(OPTIMIZED_DIR);
    console.log("\n🧹 Cleaned up temporary folders.");

    if (Object.keys(replaceMap).length > 0) {
        await replaceUrlsInFiles(replaceMap);
    } else {
        console.log("\nNo new URLs to replace.");
    }
    
    console.log(`\n🎉 ALL DONE — ${Object.keys(replaceMap).length} images optimized and synced!`);
})();
