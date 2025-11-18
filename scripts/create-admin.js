/**
 * scripts/create-admin.js
 * 
 * This script creates a new user in Firebase Authentication and sets a custom claim to make them an admin.
 * 
 * Prerequisites:
 * 1. A `serviceAccountKey.json` file in the project's root directory. Download it from your Firebase project settings.
 * 2. `firebase-admin` package installed.
 * 
 * Usage:
 * node scripts/create-admin.js <email> <password>
 */

const admin = require('firebase-admin');
const path = require('path');

// --- Firebase Admin Setup ---
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '..', 'serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT_PATH)
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error.message);
  console.log('Please ensure `serviceAccountKey.json` exists in the root directory and is configured correctly.');
  process.exit(1);
}

// --- Main Function ---
async function createAdminUser(email, password) {
  if (!email || !password) {
    console.error('Error: Please provide an email and password.');
    console.log('Usage: node scripts/create-admin.js <email> <password>');
    return;
  }

  try {
    // 1. Create the user
    console.log(`Creating user for email: ${email}...`);
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true, // Optional: Mark email as verified
    });

    console.log(`Successfully created user with UID: ${userRecord.uid}`);

    // 2. Set the custom admin claim
    console.log('Setting admin custom claim...');
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    
    console.log('✅ Success! Admin user created and custom claim set.');
    console.log('You can now log in to the admin dashboard with these credentials.');

  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
        console.warn(`User with email ${email} already exists. Attempting to set admin claim...`);
        try {
            const user = await admin.auth().getUserByEmail(email);
            await admin.auth().setCustomUserClaims(user.uid, { admin: true });
            console.log(`✅ Success! Admin claim set for existing user ${email}.`);
        } catch (claimError) {
             console.error('Error setting custom claim for existing user:', claimError.message);
        }
    } else {
        console.error('Error creating admin user:', error.message);
    }
  }
}

// Get email and password from command-line arguments
const [,, email, password] = process.argv;

createAdminUser(email, password);
