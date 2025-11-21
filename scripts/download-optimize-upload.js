
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const glob = require("glob");
const axios = require("axios");
const admin = require("firebase-admin");

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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "studio-1865376664-5e932.appspot.com",
});

const bucket = admin.storage().bucket();
const TEMP_DIR = path.join(__dirname, 'temp');
const OPTIMIZED_DIR = path.join(__dirname, 'optimized');


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
    const outputPath = path.join(OPTIMIZED_DIR, fileName);

    try {
        await sharp(inputPath)
            .resize(1800)
            .jpeg({ quality: 75 })
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
        const uploaded = await bucket.upload(filePath, {
            destination: `images/${path.basename(filePath)}`,
            public: true,
        });

        const url = uploaded[0].publicUrl();
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
  console.log(`\n✅ Replaced URLs in ${totalReplaced} files.`);
}


// -----------------------------
// 5. MAIN EXECUTION
// -----------------------------
(async () => {
    const projectRoot = path.join(__dirname, '..');
    const files = glob.sync(
        "{src,data}/**/*.{ts,tsx,js,jsx,json,md,mdx}",
        { cwd: projectRoot, absolute: true, ignore: '**/node_modules/**' }
    );

    const urlRegex = /(https?:\/\/(?:picsum\.photos|images\.unsplash\.com)[^\s"'`)\\]+)/gi;

    let foundUrls = new Set();

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        const matches = content.match(urlRegex);
        if (matches) {
            matches.forEach((url) => {
                // Clean up trailing characters that might be caught by regex
                const cleanedUrl = url.replace(/[")>]+$/, '');
                foundUrls.add(cleanedUrl);
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

    let replaceMap = {};

    for (const remoteUrl of foundUrls) {
        const fileName = remoteUrl.split("/").pop().split("?")[0] || `image-${Date.now()}`;
        const localPath = path.join(TEMP_DIR, fileName);

        const downloadedPath = await downloadImage(remoteUrl, localPath);
        if (!downloadedPath) continue;

        const optimizedPath = await optimizeImage(downloadedPath);
        if (!optimizedPath) continue;
        
        const firebaseUrl = await uploadToFirebase(optimizedPath);
        if (!firebaseUrl) continue;
        
        replaceMap[remoteUrl] = firebaseUrl;
        console.log('---');
    }

    // Clean up temporary folders
    fs.removeSync(TEMP_DIR);
    fs.removeSync(OPTIMIZED_DIR);
    console.log("\n🧹 Cleaned up temporary folders.");

    if (Object.keys(replaceMap).length > 0) {
        await replaceUrlsInFiles(replaceMap);
    } else {
        console.log("\nNo new URLs to replace.");
    }
    

    console.log("\n🎉 ALL DONE — Website images now optimized + on Firebase CDN!");
})();
