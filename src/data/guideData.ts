export interface GuideStep {
  step: number;
  lane: 'owner' | 'admin' | 'buyer';
  laneLabel: string;
  title: string;
  shortDesc: string;
  detail: string;
  inputs?: string;
  outputs?: string;
}

export interface AdminModule {
  id: number;
  name: string;
  group: 'Listings + Users' | 'Orders + Money';
  summary: string;
  details: string[];
}

export interface GuideStatus {
  status: string;
  meaning: string;
  whoChangesIt: string;
  badgeColor: string;
}

export const GUIDE_MASTER_FLOW: GuideStep[] = [
  {
    step: 1,
    lane: 'owner',
    laneLabel: 'Owner (Lister)',
    title: 'Register + ID Check',
    shortDesc: 'Owner registers and proves identity with one-time phone code and ID upload.',
    detail: 'The owner creates an account, confirms their mobile number via OTP, and uploads government ID (Aadhaar/PAN) along with bank details for receiving future payouts.',
    inputs: 'Phone OTP, ID Document, Bank Account & IFSC',
    outputs: 'Verified Owner Profile'
  },
  {
    step: 2,
    lane: 'owner',
    laneLabel: 'Owner (Lister)',
    title: 'List Equipment + Price',
    shortDesc: 'Owner submits photos, invoice, condition, price per day, and deposit.',
    detail: 'Owner fills equipment form with brand, model, hospital-grade photos, mandatory purchase invoice (to prevent counterfeit equipment), daily rental price, and security deposit.',
    inputs: 'Equipment specs, photos, invoice, daily price, deposit',
    outputs: 'Listing with status PENDING'
  },
  {
    step: 3,
    lane: 'admin',
    laneLabel: 'Admin (Operator)',
    title: 'Admin Reviews Listing',
    shortDesc: 'Admin opens pending listing, verifies invoice authenticity and sanitization.',
    detail: 'Admin conducts safety review. If anything is missing or unsafe, admin requests edits or rejects with a clear reason. If valid, admin proceeds to pricing.',
    inputs: 'Pending listing queue',
    outputs: 'Review decision (Approve / Reject / Changes Requested)'
  },
  {
    step: 4,
    lane: 'admin',
    laneLabel: 'Admin (Operator)',
    title: 'Approve + Go LIVE',
    shortDesc: 'Admin approves listing and adds commission (e.g. 15%) to form buyer price.',
    detail: 'Admin confirms the commission rate (default 15% or category override). Buyer price = Owner daily price + Commission per day. Listing status turns LIVE.',
    inputs: 'Owner price + Commission %',
    outputs: 'Live listing visible to all buyers'
  },
  {
    step: 5,
    lane: 'buyer',
    laneLabel: 'Buyer (Renter)',
    title: 'Browse + Pick Dates',
    shortDesc: 'Buyer searches equipment and chooses rental duration without date clash.',
    detail: 'Buyer browses verified equipment by category or location. On the detail page, buyer selects rental dates. The system checks the bookings database to prevent double bookings.',
    inputs: 'Category, City, Rental start & end dates',
    outputs: 'Selected rental slot'
  },
  {
    step: 6,
    lane: 'buyer',
    laneLabel: 'Buyer (Renter)',
    title: 'Cart, Address, Pay',
    shortDesc: 'Buyer adds to cart, enters delivery pincode, logs in, and pays via Razorpay.',
    detail: 'Buyer checks cart total (Rent + Refundable Deposit + Courier Fee), verifies delivery pincode, completes quick phone/Google login, and pays securely through Razorpay.',
    inputs: 'Delivery address, pincode, online payment',
    outputs: 'Razorpay payment confirmation'
  },
  {
    step: 7,
    lane: 'admin',
    laneLabel: 'Admin (Operator)',
    title: 'Order Confirmed',
    shortDesc: 'System verifies payment webhook; order confirmed and all parties notified.',
    detail: 'Server validates transaction amount directly with payment provider. Order status moves to CONFIRMED. SMS and email alerts with order number are sent to owner, buyer, and courier.',
    inputs: 'Payment success webhook',
    outputs: 'Confirmed Order ID + SMS/Email alerts'
  },
  {
    step: 8,
    lane: 'owner',
    laneLabel: 'Owner (Lister)',
    title: 'Owner Hands Over',
    shortDesc: 'Owner receives order alert, prepares sanitized item, and hands to courier.',
    detail: 'Owner packs equipment with sanitization checklist. Courier partner picks up equipment using secure pickup OTP. Order status updates to SHIPPED.',
    inputs: 'Pickup OTP & Sanitization check',
    outputs: 'Dispatched package with live tracking'
  },
  {
    step: 9,
    lane: 'buyer',
    laneLabel: 'Buyer (Renter)',
    title: 'Delivery + Rental Period',
    shortDesc: 'Equipment reaches buyer doorstep; rental period starts with return reminder.',
    detail: 'Delivery partner drops off equipment and assists with initial unboxing. Buyer provides delivery OTP. Rental timer starts running with SMS reminder before return date.',
    inputs: 'Delivery OTP confirmation',
    outputs: 'Status: RENTAL_ACTIVE'
  },
  {
    step: 10,
    lane: 'buyer',
    laneLabel: 'Buyer (Renter)',
    title: 'Return Request',
    shortDesc: 'When rental period ends, buyer clicks 1-tap return request for courier pickup.',
    detail: 'Buyer requests pickup via their dashboard. Courier arrives, checks package, and transports equipment back for inspection. Status updates to RETURN_PICKED_UP.',
    inputs: 'Return request trigger',
    outputs: 'Return transit scheduled'
  },
  {
    step: 11,
    lane: 'admin',
    laneLabel: 'Admin (Operator)',
    title: 'Admin Inspection',
    shortDesc: 'Equipment is checked for operational integrity, cleanliness, and damage.',
    detail: 'Admin inspects returned equipment against pre-delivery baseline photos. If intact, full deposit is marked for refund. If damaged, repair cost is deducted from deposit.',
    inputs: 'Returned physical unit + baseline photos',
    outputs: 'Inspection clearance report'
  },
  {
    step: 12,
    lane: 'admin',
    laneLabel: 'Admin (Operator)',
    title: 'Refund + Payout',
    shortDesc: 'Buyer receives deposit back; owner gets earnings (owner price x days).',
    detail: 'Admin releases refundable deposit (minus damage if any) back to buyer UPI/Bank. Owner payout (Owner daily rate * days) is transferred to owner bank account with UTR ref.',
    inputs: 'Cleared inspection status',
    outputs: 'Buyer deposit refund + Owner bank payout + Commission retained'
  },
  {
    step: 13,
    lane: 'owner',
    laneLabel: 'Equipment / Owner',
    title: 'Equipment LIVE Again',
    shortDesc: 'After sanitization, equipment calendar is freed and goes LIVE for next buyer.',
    detail: 'Hygiene sanitization is recorded. Equipment status reverts to LIVE and booking dates are freed for subsequent renters. Cycle repeats from Step 5.',
    inputs: 'Hygiene sanitization record',
    outputs: 'Equipment ready for next rental cycle'
  }
];

export const WORKED_MONEY_EXAMPLE = {
  durationDays: 5,
  ownerPricePerDay: 500,
  commissionPercent: 15,
  commissionPerDay: 75,
  buyerPricePerDay: 575,
  rentTotal: 2875,
  refundableDeposit: 2000,
  deliveryFee: 150,
  totalBuyerPays: 5025,
  split: {
    ownerShare: 2500, // 500 * 5
    commissionEarned: 375, // 75 * 5
    depositHeld: 2000,
    deliveryCost: 150,
  }
};

export const ADMIN_MODULES: AdminModule[] = [
  {
    id: 1,
    name: 'Equipment Approval',
    group: 'Listings + Users',
    summary: 'Open pending listings, check photos, and purchase invoice; approve, reject, or request changes.',
    details: [
      'Examine high-resolution photos and working proof video',
      'Verify original purchase invoice to block counterfeit or stolen machines',
      'Approve with 1 click or reject with mandatory written feedback reason',
      'Request specific edits (e.g., re-upload clearer serial number plate)'
    ]
  },
  {
    id: 2,
    name: 'Commission Engine',
    group: 'Listings + Users',
    summary: 'Set default platform commission %, per-category overrides, or single-item custom rates.',
    details: [
      'Global default commission (standard 15%)',
      'Category overrides (e.g. 12% for Home ICU Beds, 18% for Respiratory)',
      'Item-level commission overrides for premium hospital partnerships',
      'Immutable locking: commission is stamped on order creation, so future changes never alter past orders'
    ]
  },
  {
    id: 3,
    name: 'Categories & Content',
    group: 'Listings + Users',
    summary: 'Manage equipment categories, commission rates, homepage banners, FAQs, and rental policies.',
    details: [
      'Create and update equipment categories with mandatory prescription tags',
      'Manage home banners and promotional notices',
      'Update plain-English rental agreement, damage policies, and FAQs',
      'Configure serviceable cities and pincodes'
    ]
  },
  {
    id: 4,
    name: 'Users & ID Checks',
    group: 'Listings + Users',
    summary: 'View all owners and buyers, inspect Aadhaar/Govt ID verification, and block/unblock accounts.',
    details: [
      'View registered owners and renters with phone and email status',
      'Approve or request re-upload of government ID (Aadhaar / Passport)',
      'Store and verify bank account details (IFSC, Account number) for payouts',
      'One-click suspend / block fraudulent accounts'
    ]
  },
  {
    id: 5,
    name: 'Orders Management',
    group: 'Orders + Money',
    summary: 'Track every order across all 11 lifecycle statuses, assign delivery couriers, and handle cancellations.',
    details: [
      'Real-time filter by status (Confirmed, Processing, Shipped, Delivered, Active)',
      'Assign logistics courier partner (Porter / Dunzo / In-house)',
      'Generate pickup and return delivery OTPs',
      'Handle pre-dispatch cancellations and issue automated refunds'
    ]
  },
  {
    id: 6,
    name: 'Returns & Inspection',
    group: 'Orders + Money',
    summary: 'Inspect returned equipment for damage, deduct repair charges from deposit, and clear units.',
    details: [
      'Compare pre-rental baseline photos with return inspection photos',
      'Itemize damage deductions (e.g., broken wheel, missing cable)',
      'Auto-calculate net refundable deposit for buyer release',
      'Mark unit as sanitized to return equipment back to LIVE catalog'
    ]
  },
  {
    id: 7,
    name: 'Payments & Refunds',
    group: 'Orders + Money',
    summary: 'Audit all incoming Razorpay transactions, escrow balances, failed payments, and buyer refunds.',
    details: [
      'Reconcile Razorpay transaction IDs and webhook confirmations',
      'Monitor total held security deposits in segregated escrow',
      'Execute 1-tap UPI / bank account refunds for completed rentals',
      'Detailed audit trail of failed payments and retries'
    ]
  },
  {
    id: 8,
    name: 'Owner Payouts',
    group: 'Orders + Money',
    summary: 'Release owner earnings after return clearance and record bank transfer UTR references.',
    details: [
      'Formula: Owner daily rate x rental tenure days (e.g. ₹500 x 5 = ₹2,500)',
      'Hold payouts safely until equipment passes physical return inspection',
      'Execute NEFT/IMPS payout and record bank UTR reference',
      'Generate downloadable PDF/CSV payout receipts for owner tax records'
    ]
  }
];

export const EQUIPMENT_STATUSES: GuideStatus[] = [
  { status: 'Draft', meaning: 'Owner saved the form but did not submit yet', whoChangesIt: 'Owner', badgeColor: 'bg-slate-100 text-slate-700 border-slate-300' },
  { status: 'Pending approval', meaning: 'Waiting for admin to review photos & invoice', whoChangesIt: 'Owner submits', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
  { status: 'Changes requested', meaning: 'Admin wants edits (e.g., clearer invoice) before approving', whoChangesIt: 'Admin', badgeColor: 'bg-orange-100 text-orange-800 border-orange-300' },
  { status: 'Rejected', meaning: 'Not accepted, with an explicit written reason', whoChangesIt: 'Admin', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
  { status: 'Live', meaning: 'Visible on marketplace and rentable by buyers', whoChangesIt: 'Admin', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { status: 'Booked', meaning: 'Currently reserved or actively rented by a buyer', whoChangesIt: 'System', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
  { status: 'Under inspection', meaning: 'Returned by buyer, currently being checked for damage', whoChangesIt: 'Admin', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
  { status: 'Maintenance', meaning: 'Being cleaned, calibrated, or repaired', whoChangesIt: 'Admin', badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { status: 'Paused', meaning: 'Hidden temporarily from search results', whoChangesIt: 'Owner or admin', badgeColor: 'bg-zinc-100 text-zinc-700 border-zinc-300' },
  { status: 'Archived', meaning: 'Removed permanently but transaction history retained', whoChangesIt: 'Owner or admin', badgeColor: 'bg-gray-200 text-gray-800 border-gray-400' }
];

export const ORDER_STATUSES: GuideStatus[] = [
  { status: 'Payment pending', meaning: 'Order created, checkout in progress, not yet paid', whoChangesIt: 'System', badgeColor: 'bg-slate-100 text-slate-700 border-slate-300' },
  { status: 'Confirmed', meaning: 'Payment verified by Razorpay webhook', whoChangesIt: 'System', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
  { status: 'Processing', meaning: 'Being packed and sanitized by owner or logistics team', whoChangesIt: 'Admin or owner', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
  { status: 'Shipped', meaning: 'On the way to buyer with assigned courier partner', whoChangesIt: 'Admin', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { status: 'Delivered', meaning: 'Reached buyer home and verified with delivery OTP', whoChangesIt: 'Delivery partner / Admin', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' },
  { status: 'Rental active', meaning: 'Rental duration is running actively with reminders', whoChangesIt: 'System', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { status: 'Return requested', meaning: 'Buyer clicked return; courier pickup scheduled', whoChangesIt: 'Buyer', badgeColor: 'bg-orange-100 text-orange-800 border-orange-300' },
  { status: 'Return picked up', meaning: 'Courier collected unit from buyer residence', whoChangesIt: 'Admin / Courier', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
  { status: 'Inspection', meaning: 'Unit is at warehouse being checked for physical damage', whoChangesIt: 'Admin', badgeColor: 'bg-pink-100 text-pink-800 border-pink-300' },
  { status: 'Completed', meaning: 'Deposit refunded to buyer and owner payout disbursed', whoChangesIt: 'System / Admin', badgeColor: 'bg-emerald-200 text-emerald-900 border-emerald-400' },
  { status: 'Cancelled / Refunded', meaning: 'Order cancelled prior to dispatch; funds refunded', whoChangesIt: 'Admin or system', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' }
];

export const SAFETY_RISKS = [
  {
    risk: 'Double booking',
    whatCouldGoWrong: 'Two buyers rent the same medical equipment on overlapping dates',
    howWePreventIt: 'Every booking strictly locks calendar dates in the Bookings cabinet; server checks availability before confirming.'
  },
  {
    risk: 'Paid but no order created',
    whatCouldGoWrong: 'Buyer pays on Razorpay, then closes the browser tab before redirect',
    howWePreventIt: 'Razorpay webhook communicates directly to the backend server to confirm the order regardless of user browser status.'
  },
  {
    risk: 'Wrong price / Tampered data',
    whatCouldGoWrong: 'Malicious client alters rent or commission figures on the screen',
    howWePreventIt: 'The server always recalculates all figures from canonical database rates; never trusts client-sent totals.'
  },
  {
    risk: 'Damage dispute',
    whatCouldGoWrong: 'Owner and buyer disagree about condition or pre-existing scratches',
    howWePreventIt: 'Mandatory photographic checklist recorded at handover and at return pickup to settle claims impartially.'
  },
  {
    risk: 'Late return',
    whatCouldGoWrong: 'Buyer keeps high-demand life support equipment past the due date',
    howWePreventIt: 'Automated SMS/WhatsApp reminders sent 48h before due date; transparent per-day late fee deducted from deposit.'
  },
  {
    risk: 'Fake or unsafe equipment',
    whatCouldGoWrong: 'A fraudulent listing offers unverified or non-medical equipment',
    howWePreventIt: 'Admin approval is mandatory; original purchase invoice and Aadhaar verification are required before going LIVE.'
  },
  {
    risk: 'Hygiene & Infection risk',
    whatCouldGoWrong: 'Medical equipment is passed between patient households without sanitization',
    howWePreventIt: 'A certified hospital-grade sanitization checklist is recorded and timestamped before every new rental.'
  },
  {
    risk: 'Commission changes affect past orders',
    whatCouldGoWrong: 'Admin changing commission from 15% to 18% alters old pending records',
    howWePreventIt: 'Commission rates and calculations are copied immutably inside each order record upon creation.'
  }
];
