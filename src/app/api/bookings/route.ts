import { NextResponse } from 'next/server';
import { listingsDatabase } from '@/app/api/_data/listingsDatabase';

interface BookingRecord {
  bookingId: string;
  listingId: string;
  equipmentTitle: string;
  renterName: string;
  renterPhone: string;
  deliveryAddress: string;
  durationDays: number;
  startDate: string; // ISO start date of rental
  endDate: string; // ISO end date of rental (computed)
  financials: {
    baseRent: number;
    securityDeposit: number;
    consumablesAddon: number;
    porterDelivery: number;
    totalAmountCharged: number;
    platformCommission: number;
    lenderPayout: number;
    refundableDeposit: number;
  };
  pickupOtp: string;
  returnOtp: string;
  escrowStatus: 'HELD_IN_ESCROW' | 'RELEASED_TO_LENDER' | 'DEPOSIT_REFUNDED' | 'DISPUTED';
  orderStatus: 'ESCROW_LOCKED' | 'DISPATCHED' | 'ACTIVE_CARE' | 'RETURN_IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

const activeBookings: BookingRecord[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    totalBookings: activeBookings.length,
    bookings: activeBookings,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Expected fields from client
    const {
      listingId,
      startDate,
      durationDays,
      baseRent,
      securityDeposit,
      includeConsumables = false,
      equipmentTitle,
      renterName,
      renterPhone,
      deliveryAddress,
    } = body as {
      listingId: string;
      startDate: string;
      durationDays: number;
      baseRent: number;
      securityDeposit: number;
      includeConsumables?: boolean;
      equipmentTitle?: string;
      renterName: string;
      renterPhone: string;
      deliveryAddress: string;
    };

    // Compute end date of rental period
    const endDate = new Date(new Date(startDate).getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    // Validate listing existence
    const listing = listingsDatabase.find((l) => l.id === listingId);
    if (!listing) {
      return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
    }

    // Double‑booking guard: ensure requested period does not overlap existing bookings
    const overlap = listing.bookedDates?.some((range) => {
      const existingStart = new Date(range.start);
      const existingEnd = new Date(range.end);
      const reqStart = new Date(startDate);
      const reqEnd = new Date(endDate);
      return reqStart <= existingEnd && reqEnd >= existingStart;
    });
    if (overlap) {
      return NextResponse.json({ success: false, error: 'Selected dates overlap with an existing booking' }, { status: 400 });
    }

    const consumablesAddon = includeConsumables ? 199 : 0;
    const porterDelivery = 350;
    const rentTotal = Number(baseRent);
    const depositTotal = Number(securityDeposit);

    // MedOnRent Commission Formula: 15% of rent
    const platformCommission = Math.round(rentTotal * 0.15);
    const lenderPayout = Math.round(rentTotal * 0.85);
    const totalAmountCharged = rentTotal + depositTotal + consumablesAddon + porterDelivery;

    const randomBookingNum = `MOR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const pickupOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const returnOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: BookingRecord = {
      bookingId: randomBookingNum,
      listingId,
      equipmentTitle: equipmentTitle || 'Medical Equipment',
      renterName,
      renterPhone,
      deliveryAddress,
      durationDays,
      startDate,
      endDate,
      financials: {
        baseRent: rentTotal,
        securityDeposit: depositTotal,
        consumablesAddon,
        porterDelivery,
        totalAmountCharged,
        platformCommission,
        lenderPayout,
        refundableDeposit: depositTotal,
      },
      pickupOtp,
      returnOtp,
      escrowStatus: 'HELD_IN_ESCROW',
      orderStatus: 'ESCROW_LOCKED',
      createdAt: new Date().toISOString(),
    };

    // Append booked date range to the listing
    if (listing) {
      listing.bookedDates = listing.bookedDates || [];
      listing.bookedDates.push({
        start: startDate,
        end: endDate,
        orderId: randomBookingNum,
        renterName: renterName,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Escrow payment authorized and held safely. Booking confirmed.',
        booking: newBooking,
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
