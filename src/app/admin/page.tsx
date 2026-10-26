'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Wallet, 
  ArrowLeft,
  Lock,
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  Truck,
  RotateCcw,
  DollarSign,
  FileText,
  Sliders,
  Download,
  Users
} from 'lucide-react';
import { INITIAL_EQUIPMENT, EquipmentItem } from '@/data/initialEquipment';
import { ORDER_STATUSES } from '@/data/guideData';

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  // 8 Modules from Guide Section 5
  const [activeModule, setActiveModule] = useState<
    'approvals' | 'commission' | 'categories' | 'users' | 'orders' | 'returns' | 'payments' | 'payouts'
  >('approvals');

  // Listings State
  const [listings, setListings] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [rejectionModalId, setRejectionModalId] = useState<string | null>(null);
  const [rejectionReasonText, setRejectionReasonText] = useState('');

  // Commission Engine State (Guide Module 2)
  const [globalCommissionPct, setGlobalCommissionPct] = useState<number>(15);
  const [categoryOverrides, setCategoryOverrides] = useState<Record<string, number>>({
    RESPIRATORY: 15,
    HOME_ICU: 12,
    MOBILITY: 15,
    MONITORING: 10,
  });

  // Orders State (Guide Module 5)
  const [orders, setOrders] = useState([
    {
      orderId: 'MOR-2026-8921',
      equipmentTitle: 'Philips EverFlo 5L Medical Oxygen Concentrator',
      buyerName: 'Smt. Kamla Verma',
      buyerPhone: '+91 98110 49281',
      deliveryAddress: 'Flat 302, DLF Phase 2, Gurugram',
      pincode: '122002',
      tenureDays: 5,
      ownerDailyRate: 500,
      commissionDaily: 75,
      buyerDailyRate: 575,
      totalPaid: 5025,
      refundableDeposit: 2000,
      deliveryFee: 150,
      orderStatus: 'Delivered',
      courierPartner: 'Porter Express',
      courierOtp: '8492',
      damageDeduction: 0,
      depositRefundStatus: 'PENDING_RETURN',
      ownerPayoutStatus: 'HELD_FOR_INSPECTION',
      ownerPayoutUtr: '',
      datePlaced: '24 Oct 2026',
    },
    {
      orderId: 'MOR-2026-7104',
      equipmentTitle: 'Paramount 3-Function Motorized ICU Hospital Bed',
      buyerName: 'Sunita Sharma',
      buyerPhone: '+91 98102 44102',
      deliveryAddress: 'House 14, Sushant Lok 1, Gurugram',
      pincode: '122009',
      tenureDays: 15,
      ownerDailyRate: 450,
      commissionDaily: 68,
      buyerDailyRate: 518,
      totalPaid: 15920,
      refundableDeposit: 8000,
      deliveryFee: 150,
      orderStatus: 'Inspection',
      courierPartner: 'Dunzo Cargo',
      courierOtp: '4190',
      damageDeduction: 0,
      depositRefundStatus: 'READY_FOR_RELEASE',
      ownerPayoutStatus: 'READY_FOR_RELEASE',
      ownerPayoutUtr: '',
      datePlaced: '10 Oct 2026',
    }
  ]);

  // Inspection deduction input
  const [inspectionDamageMap, setInspectionDamageMap] = useState<Record<string, number>>({});

  // Users State (Guide Module 4)
  const [usersList, setUsersList] = useState([
    { id: 'usr-101', name: 'Col. Rajesh V. (Retd.)', role: 'Owner', phone: '+91 98112 34567', idStatus: 'Verified', bankStatus: 'Verified', isBlocked: false },
    { id: 'usr-102', name: 'Dr. Ananya Mathur', role: 'Owner', phone: '+91 98711 02938', idStatus: 'Verified', bankStatus: 'Verified', isBlocked: false },
    { id: 'usr-103', name: 'Smt. Kamla Verma', role: 'Buyer', phone: '+91 98110 49281', idStatus: 'Verified', bankStatus: 'Active', isBlocked: false },
    { id: 'usr-104', name: 'Dr. Alok Nath', role: 'Owner', phone: '+91 99100 81920', idStatus: 'Pending Review', bankStatus: 'Verified', isBlocked: false },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '87004' || passcode === '8175' || passcode === '1234' || passcode === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Module 1: Approve Listing
  const handleApproveListing = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Live',
          purchaseInvoiceVerified: true,
          isAvailable: true,
          rejectionReason: undefined,
        };
      }
      return item;
    }));
  };

  // Module 1: Reject Listing with Reason (Guide Page 3 & 7)
  const handleRejectListing = (id: string) => {
    if (!rejectionReasonText.trim()) {
      alert('Please enter a rejection reason so the owner can fix it (Guide Step 5).');
      return;
    }
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Rejected',
          rejectionReason: rejectionReasonText,
          isAvailable: false,
        };
      }
      return item;
    }));
    setRejectionModalId(null);
    setRejectionReasonText('');
  };

  // Module 5: Update Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  // Module 6: Clear Inspection & Release Deposit Refund
  const handleCompleteInspection = (orderId: string) => {
    const damage = inspectionDamageMap[orderId] || 0;
    setOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          damageDeduction: damage,
          depositRefundStatus: `REFUNDED_₹${o.refundableDeposit - damage}`,
          ownerPayoutStatus: 'READY_FOR_RELEASE',
          orderStatus: 'Completed',
        };
      }
      return o;
    }));
    alert(`Inspection completed! Net deposit of ₹${(orders.find(o=>o.orderId===orderId)?.refundableDeposit || 2000) - damage} marked for release.`);
  };

  // Module 8: Release Owner Payout with UTR
  const handleDisburseOwnerPayout = (orderId: string) => {
    const utr = `NEFT-HDFC-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          ownerPayoutStatus: 'PAID',
          ownerPayoutUtr: utr,
        };
      }
      return o;
    }));
  };

  // Module 4: Toggle Block User
  const handleToggleBlockUser = (userId: string) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B192C] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-[#007791] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Admin Control Center</h2>
            <p className="text-xs text-slate-500 mt-1">
              8-Module Operator Dashboard (Section 5 of Plain-English Guide)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Enter PIN (e.g. 1234 or 87004)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791] font-mono tracking-widest text-center"
              />
            </div>

            {authError && (
              <div className="text-[11px] text-rose-600 font-semibold flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Incorrect PIN. Try 1234 or 87004</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-xs shadow-md transition-all"
            >
              Access Admin Control Center
            </button>
            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-400 hover:text-slate-600">
                ← Return to Marketplace Homepage
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Pending approval count
  const pendingApprovalsCount = listings.filter(i => i.status === 'Pending approval').length;
  const pendingInspectionsCount = orders.filter(o => o.orderStatus === 'Inspection').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-xs text-slate-800">
      
      {/* Top Admin Header */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Admin Control Center • Section 5 of Guide
                </span>
                <span className="text-[11px] text-slate-400">8 Modules in 2 Groups</span>
              </div>
              <h1 className="text-base font-black text-white mt-0.5">
                MedOnRent Marketplace Operator Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const csvData = "Order ID,Equipment,Buyer,Total Paid,Deposit,Status\n" + orders.map(o => `${o.orderId},"${o.equipmentTitle}","${o.buyerName}",${o.totalPaid},${o.refundableDeposit},${o.orderStatus}`).join("\n");
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `medonrent_orders_${Date.now()}.csv`;
                a.click();
              }}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 font-bold text-xs"
            >
              Lock Admin
            </button>
          </div>
        </div>
      </header>

      {/* 8-Module Navigation Strip (Exact from Guide Section 5) */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 shrink-0">
            Group 1 (Listings + Users):
          </span>

          <button
            onClick={() => setActiveModule('approvals')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'approvals'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>1. Equipment Approval</span>
            {pendingApprovalsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
                {pendingApprovalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveModule('commission')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'commission'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>2. Commission</span>
          </button>

          <button
            onClick={() => setActiveModule('categories')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'categories'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Categories & Content</span>
          </button>

          <button
            onClick={() => setActiveModule('users')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'users'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>4. Users & ID Checks</span>
          </button>

          <div className="h-4 w-px bg-slate-300 mx-2 shrink-0"></div>

          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 shrink-0">
            Group 2 (Orders + Money):
          </span>

          <button
            onClick={() => setActiveModule('orders')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'orders'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>5. Orders</span>
          </button>

          <button
            onClick={() => setActiveModule('returns')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'returns'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>6. Returns & Inspection</span>
            {pendingInspectionsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-black flex items-center justify-center">
                {pendingInspectionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveModule('payments')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'payments'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>7. Payments & Refunds</span>
          </button>

          <button
            onClick={() => setActiveModule('payouts')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeModule === 'payouts'
                ? 'bg-[#007791] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>8. Owner Payouts</span>
          </button>

        </div>
      </div>

      {/* Main Module Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        
        {/* MODULE 1: EQUIPMENT APPROVAL */}
        {activeModule === 'approvals' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <h2 className="text-base font-black text-slate-900">Module 1: Equipment Approval</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Open pending listings, inspect purchase invoice & photos, then approve (go LIVE) or reject with reason (Guide Page 7).
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs shrink-0">
                {pendingApprovalsCount} Items Waiting Review
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {listings.map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all bg-white ${
                    item.status === 'Pending approval'
                      ? 'border-amber-300 ring-2 ring-amber-100'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Live' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'Pending approval' ? 'bg-amber-100 text-amber-800' :
                            item.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {item.status}
                          </span>
                          <span className="text-slate-400 text-[10px]">ID: {item.id}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 text-[10px]">Lister: {item.owner.name} ({item.owner.responseTime})</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                        <p className="text-slate-600 text-xs line-clamp-1">{item.description}</p>
                        
                        {/* Mandatory Purchase Invoice Badge (Guide Section 11 & 16) */}
                        <div className="flex items-center space-x-3 text-[11px] pt-1">
                          <span className="font-semibold text-slate-700">
                            Owner Daily: <strong className="font-mono text-amber-700">₹{item.ownerPricePerDay}</strong>
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">
                            Commission (+15%): <strong className="font-mono text-[#007791]">₹{Math.round(item.ownerPricePerDay * 0.15)}</strong>
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">
                            Live Buyer Price: <strong className="font-mono text-emerald-700">₹{item.dailyRent}/day</strong>
                          </span>
                          <span>•</span>
                          <span className="text-[#007791] font-semibold flex items-center space-x-1">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Invoice: {item.purchaseInvoiceUrl || 'Attached.pdf'}</span>
                          </span>
                        </div>

                        {item.rejectionReason && (
                          <div className="text-rose-700 text-[11px] font-semibold bg-rose-50 p-2 rounded-lg border border-rose-200 mt-1">
                            Rejection Feedback: {item.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-2 shrink-0">
                      {item.status !== 'Live' && (
                        <button
                          onClick={() => handleApproveListing(item.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Go LIVE</span>
                        </button>
                      )}

                      {item.status !== 'Rejected' && (
                        <button
                          onClick={() => setRejectionModalId(item.id)}
                          className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs"
                        >
                          Reject / Request Fix
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rejection Modal */}
            {rejectionModalId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
                <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3 border border-slate-200 shadow-xl">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Reject Listing (Guide Step 3 & 5)
                  </h4>
                  <p className="text-slate-500 text-xs">
                    Explain what needs fixing (e.g. clearer photo of serial number plate or invalid purchase invoice). The owner will see this reason on their dashboard.
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Enter reason for rejection..."
                    value={rejectionReasonText}
                    onChange={(e) => setRejectionReasonText(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => setRejectionModalId(null)}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRejectListing(rejectionModalId)}
                      className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                    >
                      Send Rejection to Owner
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODULE 2: COMMISSION ENGINE */}
        {activeModule === 'commission' && (
          <div className="space-y-5">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 2: Commission Engine</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Set default percentage, category overrides, or special single item rates. Commission is stamped inside each order at checkout (Guide Page 7 & 8).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
                <span className="font-bold text-slate-900 text-sm block">Global Default Commission</span>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={globalCommissionPct}
                    onChange={(e) => setGlobalCommissionPct(Number(e.target.value))}
                    className="flex-1 accent-[#007791]"
                  />
                  <span className="font-mono text-lg font-black text-[#007791] w-12 text-right">
                    {globalCommissionPct}%
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Applied to all new listings without a category override. Example: on a ₹500/day item, platform earns ₹{Math.round(500 * (globalCommissionPct / 100))}/day.
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
                <span className="font-bold text-slate-900 text-sm block">Per-Category Commission Overrides</span>
                <div className="space-y-2">
                  {Object.entries(categoryOverrides).map(([cat, pct]) => (
                    <div key={cat} className="flex justify-between items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-700">{cat}</span>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="5"
                          max="40"
                          value={pct}
                          onChange={(e) => setCategoryOverrides({ ...categoryOverrides, [cat]: Number(e.target.value) })}
                          className="w-16 p-1 border rounded text-center font-mono font-bold"
                        />
                        <span className="text-slate-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: CATEGORIES & CONTENT */}
        {activeModule === 'categories' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 3: Categories & Content</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage medical equipment categories, banner notices, plain-English FAQs, and rental policies (Guide Page 7).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-slate-800 block">Respiratory Care</span>
                <p className="text-slate-500 text-[11px]">Oxygen Concentrators, BiPAP, CPAP, Nebulizers</p>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                  Requires Doctor Prescription (Upload Mandatory)
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-slate-800 block">Home ICU & Recovery</span>
                <p className="text-slate-500 text-[11px]">Motorized Beds, Anti-Bedsore Mattresses, Suction Units</p>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Hospital Bed Sanitization Certificate Required
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-slate-800 block">Mobility & Rehabilitation</span>
                <p className="text-slate-500 text-[11px]">Powered Wheelchairs, Rollator Walkers, Commode Chairs</p>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Self-Service Handover Eligible
                </span>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 4: USERS & ID CHECKS */}
        {activeModule === 'users' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 4: Users & ID Checks</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect Aadhaar & ID uploads, verify payout bank accounts, and suspend fraudulent actors (Guide Page 7 & 16).
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-700 grid grid-cols-12">
                <div className="col-span-4">User Name & Phone</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Govt ID Status</div>
                <div className="col-span-2">Bank Account</div>
                <div className="col-span-2 text-right">Account Actions</div>
              </div>
              <div className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <div key={u.id} className="px-4 py-3 grid grid-cols-12 items-center hover:bg-slate-50">
                    <div className="col-span-4">
                      <span className="font-bold text-slate-900 block">{u.name}</span>
                      <span className="text-[11px] text-slate-500">{u.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'Owner' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className={`text-[11px] font-bold ${u.idStatus === 'Verified' ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {u.idStatus}
                      </span>
                    </div>
                    <div className="col-span-2 text-slate-600 font-mono text-[11px]">
                      {u.bankStatus}
                    </div>
                    <div className="col-span-2 text-right">
                      <button
                        onClick={() => handleToggleBlockUser(u.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          u.isBlocked
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {u.isBlocked ? 'Blocked (Unblock)' : 'Block User'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 5: ORDERS MANAGEMENT */}
        {activeModule === 'orders' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 5: Orders Management</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track all orders across the 11 lifecycle statuses, assign couriers, and generate delivery OTPs (Guide Page 7 & 15).
              </p>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.orderId} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#007791]">Order #{o.orderId}</span>
                      <h3 className="font-bold text-slate-900 text-sm">{o.equipmentTitle}</h3>
                      <span className="text-slate-500 text-[11px]">
                        Buyer: {o.buyerName} ({o.buyerPhone}) • {o.deliveryAddress}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 font-medium">Status:</span>
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.orderId, e.target.value)}
                        className="px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs"
                      >
                        {ORDER_STATUSES.map(st => (
                          <option key={st.status} value={st.status}>{st.status}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Total Paid</span>
                      <span className="font-mono font-bold text-slate-900">₹{o.totalPaid}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Refundable Deposit</span>
                      <span className="font-mono font-bold text-emerald-700">₹{o.refundableDeposit}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Courier Logistics</span>
                      <span className="font-semibold text-slate-800">{o.courierPartner} (OTP: {o.courierOtp})</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Tenure</span>
                      <span className="font-semibold text-slate-800">{o.tenureDays} Days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 6: RETURNS & INSPECTION */}
        {activeModule === 'returns' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 6: Returns & Inspection</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect returned units, enter damage charge if any (deducted from deposit), and refund remaining deposit to buyer (Guide Page 7 & 9).
              </p>
            </div>

            <div className="space-y-3">
              {orders.filter(o => o.orderStatus === 'Inspection' || o.orderStatus === 'Delivered').map((o) => (
                <div key={o.orderId} className="p-5 bg-white border-2 border-purple-200 rounded-2xl space-y-4 shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-purple-100">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{o.equipmentTitle}</span>
                      <span className="text-[11px] text-slate-500 block">Order #{o.orderId} • Buyer: {o.buyerName}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-xs">
                      Status: {o.orderStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Held Escrow Deposit</span>
                      <span className="text-base font-mono font-black text-emerald-700">₹{o.refundableDeposit}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="text-slate-600 text-[10px] uppercase font-bold block mb-1">
                        Physical Damage Deduction (₹):
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={o.refundableDeposit}
                        value={inspectionDamageMap[o.orderId] || 0}
                        onChange={(e) => setInspectionDamageMap({ ...inspectionDamageMap, [o.orderId]: Number(e.target.value) })}
                        placeholder="0 if clean"
                        className="w-full p-1.5 border rounded-lg font-mono font-bold text-xs bg-white"
                      />
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-emerald-800 text-[10px] uppercase font-bold block">Net Buyer Refund</span>
                      <span className="text-base font-mono font-black text-emerald-800">
                        ₹{o.refundableDeposit - (inspectionDamageMap[o.orderId] || 0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleCompleteInspection(o.orderId)}
                      className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs"
                    >
                      Clear Inspection & Issue Deposit Refund
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 7: PAYMENTS & REFUNDS */}
        {activeModule === 'payments' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 7: Payments & Refunds</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit every Razorpay transaction, verify server-side price recalculation, and review buyer refund logs (Guide Page 7 & 9).
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 grid grid-cols-12">
                <div className="col-span-3">Order & Buyer</div>
                <div className="col-span-3">Gross Payment</div>
                <div className="col-span-3">Deposit Hold</div>
                <div className="col-span-3 text-right">Refund Action Status</div>
              </div>
              <div className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <div key={o.orderId} className="px-4 py-3 grid grid-cols-12 items-center">
                    <div className="col-span-3">
                      <span className="font-bold text-slate-900 block">{o.orderId}</span>
                      <span className="text-[11px] text-slate-500">{o.buyerName}</span>
                    </div>
                    <div className="col-span-3 font-mono font-bold text-slate-800">
                      ₹{o.totalPaid} (Razorpay Verified)
                    </div>
                    <div className="col-span-3 font-mono font-bold text-emerald-700">
                      ₹{o.refundableDeposit} in Escrow
                    </div>
                    <div className="col-span-3 text-right text-[11px] font-bold text-[#007791]">
                      {o.depositRefundStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 8: OWNER PAYOUTS */}
        {activeModule === 'payouts' && (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h2 className="text-base font-black text-slate-900">Module 8: Owner Payouts</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Owner earning = owner daily rate x rental days. Disbursed after return inspection with bank UTR record (Guide Page 7 & 8).
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 grid grid-cols-12">
                <div className="col-span-4">Order & Equipment</div>
                <div className="col-span-3">Formula (Rate x Days)</div>
                <div className="col-span-2">Payout Amount</div>
                <div className="col-span-3 text-right">Action / Bank UTR</div>
              </div>
              <div className="divide-y divide-slate-100">
                {orders.map((o) => {
                  const ownerShare = o.ownerDailyRate * o.tenureDays;
                  return (
                    <div key={o.orderId} className="px-4 py-3.5 grid grid-cols-12 items-center">
                      <div className="col-span-4">
                        <span className="font-bold text-slate-900 block truncate">{o.equipmentTitle}</span>
                        <span className="text-[10px] text-slate-400">Order #{o.orderId}</span>
                      </div>
                      <div className="col-span-3 text-slate-600 font-mono text-[11px]">
                        ₹{o.ownerDailyRate}/d x {o.tenureDays}d
                      </div>
                      <div className="col-span-2 font-mono font-black text-amber-700 text-sm">
                        ₹{ownerShare}
                      </div>
                      <div className="col-span-3 text-right">
                        {o.ownerPayoutStatus === 'PAID' ? (
                          <div className="text-[11px]">
                            <span className="font-mono font-bold text-emerald-700 block">{o.ownerPayoutUtr}</span>
                            <span className="text-[10px] text-emerald-600">✓ Disbursed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDisburseOwnerPayout(o.orderId)}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                          >
                            Release Payout (NEFT)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
