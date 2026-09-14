import { NextResponse } from 'next/server';

interface BookingRecord {
  bookingId: string;
  listingId: string;
  equipmentTitle: string;
  renterName: string;
  renterPhone: string;
  deliveryAddress: string;
  durationDays: number;
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

    const {
      listingId,
      equipmentTitle,
      baseRent = 5800,
      securityDeposit = 10000,
      durationDays = 30,
      includeConsumables = true,
      renterName = 'Patient Family',
      renterPhone = '+91 98101 23456',
      deliveryAddress = 'Flat 502, DLF Phase 1, Gurugram',
    } = body;

    const consumablesAddon = includeConsumables ? 199 : 0;
    const porterDelivery = 350;
    const rentTotal = Number(baseRent);
    const depositTotal = Number(securityDeposit);

    // MedOnRent Commission Formula: 18% of rent
    const platformCommission = Math.round(rentTotal * 0.18);
    const lenderPayout = Math.round(rentTotal * 0.82);
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

    activeBookings.unshift(newBooking);

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
