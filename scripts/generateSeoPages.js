
const fs = require('fs');
const path = require('path');

// =============================================
// Configuration
// =============================================
const ROOT = path.join(__dirname, '..');
const HOTELS_INPUT_PATH = path.join(ROOT, 'data', 'new-hotels.json');
const PACKAGES_INPUT_PATH = path.join(ROOT, 'data', 'packages.json');
const OUTPUT_DIR = path.join(ROOT, 'public', 'generated-pages');

// =============================================
// Helper Functions
// =============================================

/**
 * Creates a URL-friendly slug from a string.
 * @param {string} text - The string to slugify.
 * @returns {string} The slugified string.
 */
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The path to the directory.
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

/**
 * Generates a simple HTML page for a hotel.
 * @param {object} hotel - The hotel data object.
 * @returns {string} The generated HTML content.
 */
function generateHotelPage(hotel) {
  const title = `Explore ${hotel.name} in ${hotel.brand}`;
  const description = `Learn more about ${hotel.name}, a premier hotel by ${hotel.brand}. View amenities, photos, and booking information.`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${description}">
      <title>${title}</title>
      <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 2rem; }
        h1 { color: #333; }
        p { color: #666; }
      </style>
    </head>
    <body>
      <h1>${hotel.name}</h1>
      <p>Part of the <strong>${hotel.brand}</strong> group.</p>
      <h2>Images</h2>
      <ul>
        ${(hotel.images || []).map(img => `<li>${typeof img === 'string' ? img : img.src}</li>`).join('')}
      </ul>
      <a href="/">Back to Home</a>
    </body>
    </html>
  `;
}

/**
 * Generates a simple HTML page for a package.
 * @param {object} pkg - The package data object.
 * @returns {string} The generated HTML content.
 */
function generatePackagePage(pkg) {
    const title = `${pkg.name} - Travel Package`;
    const description = `Book the "${pkg.name}" package. ${pkg.days} days and ${pkg.nights} nights exploring ${pkg.city.join(', ')}.`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${description}">
        <title>${title}</title>
        <style>
            body { font-family: sans-serif; line-height: 1.6; padding: 2rem; }
            h1 { color: #333; }
            p { color: #666; }
        </style>
    </head>
    <body>
        <h1>${pkg.name}</h1>
        <p><strong>${pkg.days} Days / ${pkg.nights} Nights</strong></p>
        <p>Destinations: ${pkg.state.join(', ')}</p>
        <p>Price: ₹${pkg.price.toLocaleString()}</p>
        <a href="/">Back to Home</a>
    </body>
    </html>
    `;
}


// =============================================
// Main Execution
// =============================================
function main() {
  console.log('🚀 Starting SEO page generation...');

  ensureDirectoryExists(OUTPUT_DIR);
  let pagesGenerated = 0;

  // Process Hotels
  if (fs.existsSync(HOTELS_INPUT_PATH)) {
    try {
      const hotels = JSON.parse(fs.readFileSync(HOTELS_INPUT_PATH, 'utf-8'));
      console.log(`🏨 Found ${hotels.length} hotel(s) to process.`);
      hotels.forEach(hotel => {
        const slug = slugify(hotel.name);
        if (!slug) {
            console.warn(`⚠️  Could not generate slug for hotel: ${hotel.name}. Skipping.`);
            return;
        }
        const htmlContent = generateHotelPage(hotel);
        const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
        fs.writeFileSync(outputPath, htmlContent);
        console.log(`   📄 Generated: /generated-pages/${slug}.html`);
        pagesGenerated++;
      });
    } catch (error) {
      console.error('❌ Error processing new-hotels.json:', error.message);
    }
  } else {
    console.log('ℹ️  new-hotels.json not found, skipping hotel pages.');
  }

  // Process Packages
  if (fs.existsSync(PACKAGES_INPUT_PATH)) {
    try {
        const packages = JSON.parse(fs.readFileSync(PACKAGES_INPUT_PATH, 'utf-8'));
        console.log(`\n🎒 Found ${packages.length} package(s) to process.`);
        packages.forEach(pkg => {
            const slug = slugify(pkg.id);
            if (!slug) {
                console.warn(`⚠️  Could not generate slug for package: ${pkg.name}. Skipping.`);
                return;
            }
            const htmlContent = generatePackagePage(pkg);
            const outputPath = path.join(OUTPUT_DIR, `package-${slug}.html`);
            fs.writeFileSync(outputPath, htmlContent);
            console.log(`   📄 Generated: /generated-pages/package-${slug}.html`);
            pagesGenerated++;
        });
    } catch (error) {
        console.error('❌ Error processing packages.json:', error.message);
    }
  } else {
      console.log('\nℹ️  packages.json not found, skipping package pages.');
  }


  console.log(`\n🎉 Success! Generated ${pagesGenerated} total pages in /public/generated-pages/`);
}

main();
