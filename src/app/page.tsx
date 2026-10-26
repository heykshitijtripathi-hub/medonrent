'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LocationModal from '@/components/LocationModal';
import ExploreCategories from '@/components/ExploreCategories';
import CategoryFilter from '@/components/CategoryFilter';
import EquipmentGrid from '@/components/EquipmentGrid';
import ProductDetailModal from '@/components/ProductDetailModal';
import CheckoutModal, { CompletedBooking } from '@/components/CheckoutModal';
import MyRentalsModal from '@/components/MyRentalsModal';
import ListingWizardModal from '@/components/ListingWizardModal';
import LenderHubModal from '@/components/LenderHubModal';
import EscrowSimulatorModal from '@/components/EscrowSimulatorModal';
import DoctorEndorsements from '@/components/DoctorEndorsements';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import Footer from '@/components/Footer';
import QueryModal from '@/components/QueryModal';
import GoogleAuthModal from '@/components/GoogleAuthModal';
import QuickViewModal from '@/components/QuickViewModal';
import CartDrawer from '@/components/CartDrawer';
import PrescriptionUploadModal from '@/components/PrescriptionUploadModal';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider, useCart } from '@/context/CartContext';
import { INITIAL_EQUIPMENT, EquipmentItem } from '@/data/initialEquipment';
import { CheckCircle2, ShoppingCart } from 'lucide-react';

interface ToastState {
  title: string;
  message: string;
}

// Haversine formula for distance calculation in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function HomePage() {
  // State
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sanitizedOnly, setSanitizedOnly] = useState<boolean>(false);
  const [instantOnly, setInstantOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(15000);

  // Near Me & Location State
  const [isNearMeActive, setIsNearMeActive] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedLocalityName, setDetectedLocalityName] = useState<string>('Gurugram');
  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(25);
  const [sortBy, setSortBy] = useState<'distance' | 'price_asc' | 'price_desc' | 'rating'>('distance');

  // Equipment List
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);

  // User Bookings State (Seed 1 realistic initial booking aligned with Guide)
  const [userBookings, setUserBookings] = useState<CompletedBooking[]>([
    {
      bookingId: 'MOR-2026-8921',
      equipment: INITIAL_EQUIPMENT[0],
      patientName: 'Smt. Kamla Verma (Post-Op Care)',
      patientPhone: '+91 98110 49281',
      deliveryAddress: 'Flat 302, DLF Phase 2, Gurugram, Delhi NCR - 122002',
      pincode: '122002',
      tenureDays: 5,
      startDate: '24 Oct 2026',
      endDate: '29 Oct 2026',
      paymentMethod: 'UPI (GPay - kamla.v@okhdfcbank)',
      transactionId: 'TXN_RAZORPAY_9182301',
      financials: {
        ownerDailyRate: 500,
        commissionDaily: 75,
        commissionPercent: 15,
        buyerDailyRate: 575,
        baseRent: 2875,
        securityDeposit: 2000,
        consumables: 0,
        porterDelivery: 150,
        totalPaid: 5025,
        refundableDeposit: 2000,
        ownerShare: 2500,
        adminCommission: 375,
        damageDeduction: 0,
        depositRefunded: 0,
        ownerPayoutStatus: 'PENDING_RETURN',
      },
      porterTracking: {
        status: 'DELIVERED',
        driverName: 'Mukesh Kumar',
        driverPhone: '+91 98711 50291',
        vehicleNumber: 'HR 26 DQ 8192 (Courier Mini)',
        pickupOtp: '8492',
        returnOtp: '3910',
      },
      orderStatus: 'Delivered',
      prescriptionUploaded: true,
    },
  ]);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<EquipmentItem | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<EquipmentItem | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<EquipmentItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMyRentalsOpen, setIsMyRentalsOpen] = useState<boolean>(false);
  const [isListingWizardOpen, setIsListingWizardOpen] = useState<boolean>(false);
  const [isOwnerHubOpen, setIsOwnerHubOpen] = useState<boolean>(false);
  
  const [isEscrowSimulatorOpen, setIsEscrowSimulatorOpen] = useState<boolean>(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState<boolean>(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  // Initial location chooser
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mor_selected_city');
      if (saved) {
        setSelectedCity(saved);
      } else {
        const timer = setTimeout(() => {
          setIsLocationModalOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  // Toast
  const [recentBookingToast, setRecentBookingToast] = useState<ToastState | null>(null);

  // GPS Toggle Handler
  const handleToggleNearMe = () => {
    if (!isNearMeActive) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setIsNearMeActive(true);
            setDetectedLocalityName('Current GPS');
            setRecentBookingToast({
              title: '📍 Location Detected',
              message: 'Showing equipment sorted by nearest distance to your location.',
            });
            setTimeout(() => setRecentBookingToast(null), 4000);
          },
          (err) => {
            console.warn(err);
            setUserCoords({ lat: 28.4595, lng: 77.0266 });
            setIsNearMeActive(true);
            setDetectedLocalityName('Gurugram Center');
            setRecentBookingToast({
              title: '📍 Default Near Me Enabled',
              message: 'Showing equipment in 25km radius around Gurugram.',
            });
            setTimeout(() => setRecentBookingToast(null), 4000);
          }
        );
      }
    } else {
      setIsNearMeActive(false);
      setUserCoords(null);
    }
  };

  // Filtered and Sorted Equipment
  const filteredEquipment = useMemo(() => {
    return equipmentList
      .filter((item) => {
        // Only show LIVE items in public catalog (Guide Step 4 & 5)
        if (item.status !== 'Live') return false;

        // City Filter
        if (selectedCity && selectedCity !== 'All Cities' && item.city !== selectedCity) {
          return false;
        }

        // Category Filter
        if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchLoc = item.locality.toLowerCase().includes(q);
          if (!matchTitle && !matchBrand && !matchDesc && !matchLoc) {
            return false;
          }
        }

        // Sanitized only
        if (sanitizedOnly && !item.isSanitized) {
          return false;
        }

        // Instant only
        if (instantOnly && !item.instantDispatch) {
          return false;
        }

        // Price Filter
        if (item.monthlyRent > maxPrice) {
          return false;
        }

        // Near Me Radius Filter
        if (isNearMeActive && userCoords && item.lat && item.lng) {
          const distance = calculateDistanceKm(
            userCoords.lat,
            userCoords.lng,
            item.lat,
            item.lng
          );
          if (distance > selectedRadiusKm) {
            return false;
          }
        }

        return true;
      })
      .map((item) => {
        if (isNearMeActive && userCoords && item.lat && item.lng) {
          const distance = calculateDistanceKm(
            userCoords.lat,
            userCoords.lng,
            item.lat,
            item.lng
          );
          return { ...item, distanceKm: distance };
        }
        return item;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') {
          return (a.distanceKm || 99) - (b.distanceKm || 99);
        }
        if (sortBy === 'price_asc') {
          return a.dailyRent - b.dailyRent;
        }
        if (sortBy === 'price_desc') {
          return b.dailyRent - a.dailyRent;
        }
        if (sortBy === 'rating') {
          return b.owner.rating - a.owner.rating;
        }
        return 0;
      });
  }, [
    equipmentList,
    selectedCity,
    selectedCategory,
    searchQuery,
    sanitizedOnly,
    instantOnly,
    maxPrice,
    isNearMeActive,
    userCoords,
    selectedRadiusKm,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    setSanitizedOnly(false);
    setInstantOnly(false);
    setMaxPrice(15000);
    setIsNearMeActive(false);
    setSortBy('distance');
  };

  const handleListingCreated = (newListing: EquipmentItem) => {
    setEquipmentList((prev) => [newListing, ...prev]);
    setRecentBookingToast({
      title: 'Listing Submitted (Status: PENDING)',
      message: `${newListing.title} submitted. Admin will review purchase invoice & approve.`,
    });
    setTimeout(() => setRecentBookingToast(null), 6000);
  };

  const handleToggleListingStatus = (id: string) => {
    setEquipmentList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Live' ? 'Paused' : 'Live' }
          : item
      )
    );
  };

  const handleBookingComplete = (booking: CompletedBooking) => {
    setUserBookings((prev) => [booking, ...prev]);
    // Lock dates for that equipment
    setEquipmentList((prev) =>
      prev.map((item) => {
        if (item.id === booking.equipment.id) {
          return {
            ...item,
            status: 'Booked',
            bookedDates: [
              ...(item.bookedDates || []),
              { start: booking.startDate, end: booking.endDate, orderId: booking.bookingId }
            ]
          };
        }
        return item;
      })
    );
    setRecentBookingToast({
      title: `Booking Confirmed: ${booking.bookingId}`,
      message: `Deposit of ₹${booking.financials.refundableDeposit} held in Escrow. Courier dispatched.`,
    });
    setTimeout(() => setRecentBookingToast(null), 8000);
  };

  const handleExtendBooking = (bookingId: string, additionalDays: number) => {
    setUserBookings((prev) =>
      prev.map((b) => {
        if (b.bookingId === bookingId) {
          return {
            ...b,
            tenureDays: b.tenureDays + additionalDays,
          };
        }
        return b;
      })
    );
    setRecentBookingToast({
      title: 'Rental Extended Successfully',
      message: `Added +${additionalDays} days of recovery duration to booking ${bookingId}.`,
    });
    setTimeout(() => setRecentBookingToast(null), 5000);
  };

  const handleReturnBooking = (bookingId: string) => {
    setUserBookings((prev) =>
      prev.map((b) => {
        if (b.bookingId === bookingId) {
          return {
            ...b,
            orderStatus: 'Completed',
          };
        }
        return b;
      })
    );
    setRecentBookingToast({
      title: 'Step 10 & 11: Return Scheduled!',
      message: `Courier partner assigned for pickup. Deposit will be refunded after inspection.`,
    });
    setTimeout(() => setRecentBookingToast(null), 7000);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden w-full">
      
      {/* Toast Notification */}
      {recentBookingToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-cyan-500/40 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start space-x-3">
            <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-sm text-white">{recentBookingToast.title}</h4>
              <p className="text-slate-300 mt-0.5 leading-relaxed">{recentBookingToast.message}</p>
            </div>
            <button
              onClick={() => setRecentBookingToast(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        selectedCity={selectedCity}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenListingWizard={() => setIsListingWizardOpen(true)}
        onOpenOwnerHub={() => setIsOwnerHubOpen(true)}
        onOpenEscrowSimulator={() => setIsEscrowSimulatorOpen(true)}
        onOpenMyRentals={() => setIsMyRentalsOpen(true)}
        onOpenQuery={() => setIsQueryModalOpen(true)}

        activeBookingsCount={userBookings.filter((b) => b.orderStatus !== 'Completed').length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenListingWizard={() => setIsListingWizardOpen(true)}
        onOpenEscrowSimulator={() => setIsEscrowSimulatorOpen(true)}
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}

        selectedCity={selectedCity}
      />

      {/* Main Discovery Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* RentoMojo-style Visual Top Categories Showcase */}
        <ExploreCategories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Category & Quick Filter Bar with Location Tracker */}
        <div id="catalog-section">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sanitizedOnly={sanitizedOnly}
            onToggleSanitized={() => setSanitizedOnly(!sanitizedOnly)}
            instantOnly={instantOnly}
            onToggleInstant={() => setInstantOnly(!instantOnly)}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            isNearMeActive={isNearMeActive}
            onToggleNearMe={handleToggleNearMe}
            selectedRadiusKm={selectedRadiusKm}
            onSelectRadiusKm={setSelectedRadiusKm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            detectedLocalityName={detectedLocalityName}
          />
        </div>

        {/* Equipment Catalog Grid */}
        <EquipmentGrid
          items={filteredEquipment}
          onSelectItem={(item) => setSelectedProduct(item)}
          onQuickView={(item) => setQuickViewProduct(item)}
          onResetFilters={handleResetFilters}
          selectedCity={selectedCity}
        />

        {/* Doctor & Patient Stories */}
        <DoctorEndorsements />

        {/* How It Works & Trust Pillars (Guide Master Flow) */}


        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Contact & Query Form */}
      <ContactSection />



      {/* Owner Hub (Lister Dashboard) */}
      <LenderHubModal
        isOpen={isOwnerHubOpen}
        onClose={() => setIsOwnerHubOpen(false)}
        myListings={equipmentList}
        onToggleListingStatus={handleToggleListingStatus}
        onOpenNewListing={() => {
          setIsOwnerHubOpen(false);
          setIsListingWizardOpen(true);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        item={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFull={(item) => {
          setQuickViewProduct(null);
          setSelectedProduct(item);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          if (filteredEquipment.length > 0) {
            setCheckoutProduct(filteredEquipment[0]);
            setIsCheckoutOpen(true);
          }
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProceedToCheckout={(item) => {
          setSelectedProduct(null);
          setCheckoutProduct(item);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Full End-to-End Checkout Modal */}
      <CheckoutModal
        item={checkoutProduct}
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutProduct(null);
        }}
        onBookingComplete={handleBookingComplete}
      />

      {/* Buyer Dashboard (My Rentals & Order Tracker Modal) */}
      <MyRentalsModal
        isOpen={isMyRentalsOpen}
        onClose={() => setIsMyRentalsOpen(false)}
        bookings={userBookings}
        onExtendBooking={handleExtendBooking}
        onReturnBooking={handleReturnBooking}
      />

      {/* Owner Listing Wizard Modal */}
      <ListingWizardModal
        isOpen={isListingWizardOpen}
        onClose={() => setIsListingWizardOpen(false)}
        onListingCreated={handleListingCreated}
      />

      {/* Escrow Simulator Modal */}
      <EscrowSimulatorModal
        isOpen={isEscrowSimulatorOpen}
        onClose={() => setIsEscrowSimulatorOpen(false)}
      />

      {/* Prescription Upload Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        onMatchFound={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Query / Doubt Modal */}
      <QueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
      />

      {/* Google Authentication Modal */}
      <GoogleAuthModal />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onFetchGPS={handleToggleNearMe}
      />

      {/* Floating WhatsApp Support */}
      <WhatsAppFloatingButton
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Floating Cart Button */}
      <CartFloatingButton onOpenCart={() => setIsCartOpen(true)} />

      {/* Footer */}
      <Footer />
    </div>
    </CartProvider>
  </AuthProvider>
);
}

// Floating Cart Button — uses useCart inside CartProvider
function CartFloatingButton({ onOpenCart }: { onOpenCart: () => void }) {
  const { cartCount } = useCart();
  if (cartCount === 0) return null;
  return (
    <button
      onClick={onOpenCart}
      className="fixed bottom-20 right-4 z-40 bg-[#E53E3E] text-white rounded-full shadow-2xl flex items-center gap-2 px-4 py-3 font-bold text-sm hover:bg-[#C53030] transition-all active:scale-95 animate-in slide-in-from-bottom-4 duration-300"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>{cartCount} item{cartCount > 1 ? 's' : ''} in cart</span>
      <span className="bg-white text-[#E53E3E] text-xs font-black px-1.5 py-0.5 rounded-full">→</span>
    </button>
  );
}
