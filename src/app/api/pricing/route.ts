
import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Path to service account key. Replace with your actual key file.
// In a real production environment, use environment variables or a secret manager.
// For Firebase App Hosting, you might not need the key file if ADC is set up.
// const serviceAccount = require('../../../../serviceAccountKey.json');
//
// const firebaseAdminApp = !getApps().length
//   ? initializeApp({
//       credential: cert(serviceAccount),
//     })
//   : getApps()[0];

// NOTE: The above is commented out because in Firebase Studio, the admin SDK
// is often initialized differently or might not be available in this context.
// This is a placeholder for where the admin initialization would go.
// We will simulate the DB logic for now.

async function getDynamicPrice(basePrice: number, hotelId?: string) {
  // In a real implementation, you would fetch rules from Firestore
  // const db = getFirestore(firebaseAdminApp);
  // const rulesSnapshot = await db.collection('pricingRules').get();
  // const rules = rulesSnapshot.docs.map(doc => doc.data());

  // --- MOCKED LOGIC ---
  // This is a simplified simulation of the dynamic pricing logic.
  let finalPrice = basePrice;
  const seasonalFactor = 1.2; // e.g., 20% markup for peak season
  const serviceCharge = 100; // A flat service charge
  
  // Apply a seasonal factor
  finalPrice *= seasonalFactor;

  // Add a service charge
  finalPrice += serviceCharge;
  
  // Example of a hotel-specific rule
  if (hotelId === 'ritz-carlton-bangalore') {
    finalPrice *= 1.1; // 10% premium for this specific hotel
  }
  // --- END MOCKED LOGIC ---

  return {
    basePrice,
    dynamicPrice: Math.round(finalPrice),
    appliedRules: {
      seasonalFactor,
      serviceCharge,
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const basePriceParam = searchParams.get('basePrice');
  const hotelId = searchParams.get('hotelId') || undefined;

  if (!basePriceParam) {
    return NextResponse.json({ error: 'basePrice parameter is required' }, { status: 400 });
  }

  const basePrice = parseFloat(basePriceParam);

  if (isNaN(basePrice)) {
    return NextResponse.json({ error: 'Invalid basePrice parameter' }, { status: 400 });
  }

  try {
    const pricingData = await getDynamicPrice(basePrice, hotelId);
    return NextResponse.json(pricingData);
  } catch (error: any) {
    console.error('Dynamic pricing engine error:', error);
    return NextResponse.json({ error: 'Failed to calculate dynamic price', details: error.message }, { status: 500 });
  }
}
