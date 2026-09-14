import { NextResponse } from 'next/server';
import { INITIAL_EQUIPMENT, EquipmentItem } from '@/data/initialEquipment';

// In-memory persistent state during server runtime
const listingsDatabase: EquipmentItem[] = [...INITIAL_EQUIPMENT];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const query = searchParams.get('query')?.toLowerCase();
  const maxPrice = searchParams.get('maxPrice');
  const onlySanitized = searchParams.get('onlySanitized');

  let results = [...listingsDatabase];

  if (category && category !== 'ALL') {
    results = results.filter((item) => item.category === category);
  }

  if (city && city !== 'All Cities') {
    results = results.filter((item) => item.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (query) {
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.locality.toLowerCase().includes(query)
    );
  }

  if (maxPrice) {
    const priceNum = Number(maxPrice);
    if (!isNaN(priceNum) && priceNum > 0) {
      results = results.filter((item) => item.monthlyRent <= priceNum);
    }
  }

  if (onlySanitized === 'true') {
    results = results.filter((item) => item.isSanitized);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    listings: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.monthlyRent || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required equipment fields (title, monthlyRent, category)' },
        { status: 400 }
      );
    }

    const newListing: EquipmentItem = {
      id: `mor-user-${Date.now().toString().slice(-4)}`,
      title: body.title,
      brand: body.brand || 'Verified Medical',
      category: body.category,
      categoryLabel:
        body.category === 'RESPIRATORY'
          ? 'Respiratory Care'
          : body.category === 'HOME_ICU'
          ? 'Home ICU & Recovery'
          : body.category === 'MOBILITY'
          ? 'Mobility & Rehab'
          : 'Patient Monitoring',
      monthlyRent: Number(body.monthlyRent),
      securityDeposit: Number(body.securityDeposit || body.monthlyRent * 1.5),
      originalPrice: Number(body.originalPrice || body.monthlyRent * 7),
      description: body.description || 'Verified idle medical equipment listed by family caregiver.',
      condition: body.condition || 'Like New',
      specs: body.specs || {
        'Sanitization': 'Hospital Grade Isopropyl Certified',
        'Owner Verification': 'Aadhaar DigiLocker Verified',
      },
      image: body.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      videoDurationSec: 5,
      hasWorkingProofVideo: true,
      isSanitized: true,
      sanitizationDate: 'Today, Verified by Owner',
      city: body.city || 'Delhi NCR',
      locality: body.locality || 'DLF Phase 5, Gurugram',
      distanceKm: 2.8,
      owner: {
        id: `own_${Date.now()}`,
        name: body.ownerName || 'Verified Family Lender',
        roleDesc: 'Verified Equipment Owner',
        isAadhaarVerified: true,
        rating: 5.0,
        completedRentals: 1,
        responseTime: '< 10 mins',
      },
      features: [
        'Inspected and tested with proof video',
        'Full refundable security deposit protection',
        'Direct Porter doorstep handover',
      ],
      instantDispatch: true,
    };

    listingsDatabase.unshift(newListing);

    return NextResponse.json(
      {
        success: true,
        message: 'Listing successfully published to MedOnRent marketplace',
        listing: newListing,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
