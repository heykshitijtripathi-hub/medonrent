import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aadhaarNumber } = body;

    // Simulate verification
    if (!aadhaarNumber) {
      return NextResponse.json(
        { success: false, error: 'Aadhaar or DigiLocker ID required' },
        { status: 400 }
      );
    }

    const cleanNum = aadhaarNumber.replace(/\D/g, '');
    const masked = `XXXX-XXXX-${cleanNum.slice(-4) || '9241'}`;

    return NextResponse.json({
      success: true,
      verified: true,
      provider: 'UIDAI_SANDBOX_GATEWAY',
      data: {
        maskedAadhaar: masked,
        status: 'VERIFIED_ACTIVE',
        ekycTimestamp: new Date().toISOString(),
        trustScore: 98,
      },
      message: 'Government identity verified successfully. Trust badge granted.',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
