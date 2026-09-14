'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import EquipmentGrid from '@/components/EquipmentGrid';
import ProductDetailModal from '@/components/ProductDetailModal';
import CheckoutModal, { CompletedBooking } from '@/components/CheckoutModal';
import MyRentalsModal from '@/components/MyRentalsModal';
import ListingWizardModal from '@/components/ListingWizardModal';
import EscrowSimulatorModal from '@/components/EscrowSimulatorModal';
import PrescriptionUploadModal from '@/components/PrescriptionUploadModal';
import SavingsCalculator from '@/components/SavingsCalculator';
import ComparisonMatrix from '@/components/ComparisonMatrix';
import DoctorEndorsements from '@/components/DoctorEndorsements';
import HowItWorksSection from '@/components/HowItWorksSection';
import FaqSection from '@/components/FaqSection';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import Footer from '@/components/Footer';
import QueryModal from '@/components/QueryModal';
import GoogleAuthModal from '@/components/GoogleAuthModal';
import { AuthProvider } from '@/context/AuthContext';
import { INITIAL_EQUIPMENT, EquipmentItem } from '@/data/initialEquipment';
import { CheckCircle2 } from 'lucide-react';

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

  // User Bookings State (Seed 1 realistic initial booking)
  const [userBookings, setUserBookings] = useState<CompletedBooking[]>([
    {
      bookingId: 'MOR-2026-8921',
      equipment: INITIAL_EQUIPMENT[0],
      patientName: 'Smt. Kamla Verma (Post-Op Care)',
      patientPhone: '+91 98110 49281',
      deliveryAddress: 'Flat 302, DLF Phase 2, Gurugram, Delhi NCR - 122002',
      pincode: '122002',
      tenureDays: 30,
      startDate: '01 Sept 2026',
      endDate: '01 Oct 2026',
      paymentMethod: 'UPI (GPay - kamla.v@okhdfcbank)',
      transactionId: 'TXN_ESCROW_9182301',
      financials: {
        baseRent: 5800,
        securityDeposit: 10000,
        consumables: 199,
        porterDelivery: 350,
        totalPaid: 16349,
        refundableDeposit: 10000,
      },
      porterTracking: {
        status: 'DELIVERED',
        driverName: 'Mukesh Kumar',
        driverPhone: '+91 98711 50291',
        vehicleNumber: 'HR 26 DQ 8192 (Porter Mini)',
        pickupOtp: '8492',
        returnOtp: '3910',
      },
      orderStatus: 'ACTIVE_CARE',
    },
  ]);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<EquipmentItem | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<EquipmentItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isMyRentalsOpen, setIsMyRentalsOpen] = useState<boolean>(false);
  const [isListingWizardOpen, setIsListingWizardOpen] = useState<boolean>(false);
  const [isEscrowSimulatorOpen, setIsEscrowSimulatorOpen] = useState<boolean>(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState<boolean>(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState<boolean>(false);

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
          () => {
            // Default to central Gurugram coordinates if permission denied
            setUserCoords({ lat: 28.4870, lng: 77.0890 });
            setIsNearMeActive(true);
            setDetectedLocalityName('DLF Phase 2');
            setRecentBookingToast({
              title: '📍 Location Set to Delhi NCR',
              message: 'Sorted by distance from central healthcare cluster.',
            });
            setTimeout(() => setRecentBookingToast(null), 4000);
          }
        );
      } else {
        setUserCoords({ lat: 28.4870, lng: 77.0890 });
        setIsNearMeActive(true);
        setDetectedLocalityName('DLF Phase 2');
      }
    } else {
      setIsNearMeActive(false);
      setUserCoords(null);
    }
  };

  // Filtered & Sorted Equipment
  const filteredEquipment = useMemo(() => {
    let list = equipmentList.map((item) => {
      let calculatedDistance = item.distanceKm;
      if (userCoords && item.lat && item.lng) {
        calculatedDistance = calculateDistanceKm(userCoords.lat, userCoords.lng, item.lat, item.lng);
      }
      return {
        ...item,
        distanceKm: calculatedDistance,
      };
    });

    // Category
    if (selectedCategory !== 'ALL') {
      list = list.filter((item) => item.category === selectedCategory);
    }

    // City
    if (selectedCity !== 'All Cities') {
      list = list.filter((item) => item.city.toLowerCase().includes(selectedCity.toLowerCase()));
    }

    // Sanitized only
    if (sanitizedOnly) {
      list = list.filter((item) => item.isSanitized);
    }

    // Instant only
    if (instantOnly) {
      list = list.filter((item) => item.instantDispatch);
    }

    // Max price
    list = list.filter((item) => item.monthlyRent <= maxPrice);

    // Radius Filter
    list = list.filter((item) => item.distanceKm <= selectedRadiusKm);

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.locality.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'price_asc') {
        return a.monthlyRent - b.monthlyRent;
      }
      if (sortBy === 'price_desc') {
        return b.monthlyRent - a.monthlyRent;
      }
      if (sortBy === 'rating') {
        return b.owner.rating - a.owner.rating;
      }
      return 0;
    });

    return list;
  }, [
    equipmentList,
    selectedCategory,
    selectedCity,
    sanitizedOnly,
    instantOnly,
    maxPrice,
    searchQuery,
    userCoords,
    selectedRadiusKm,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedCity('Delhi NCR');
    setSearchQuery('');
    setSanitizedOnly(false);
    setInstantOnly(false);
    setMaxPrice(15000);
    setSelectedRadiusKm(25);
    setSortBy('distance');
    setIsNearMeActive(false);
  };

  const handleListingCreated = (newListing: EquipmentItem) => {
    setEquipmentList((prev) => [newListing, ...prev]);
    setRecentBookingToast({
      title: 'Listing Published Successfully!',
      message: `${newListing.title} is now active and discoverable by patients in ${newListing.city}.`,
    });
    setTimeout(() => setRecentBookingToast(null), 6000);
  };

  const handleBookingComplete = (booking: CompletedBooking) => {
    setUserBookings((prev) => [booking, ...prev]);
    setRecentBookingToast({
      title: `Booking Confirmed: ${booking.bookingId}`,
      message: `Deposit of ₹${booking.financials.securityDeposit.toLocaleString('en-IN')} held in Escrow. Porter dispatched.`,
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
            orderStatus: 'COMPLETED_REFUNDED',
          };
        }
        return b;
      })
    );
    setRecentBookingToast({
      title: 'Deposit Refund Credited!',
      message: `₹10,000 security deposit has been refunded back to your original payment account.`,
    });
    setTimeout(() => setRecentBookingToast(null), 7000);
  };


  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
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
        onSelectCity={setSelectedCity}
        onOpenListingWizard={() => setIsListingWizardOpen(true)}
        onOpenEscrowSimulator={() => setIsEscrowSimulatorOpen(true)}
        onOpenMyRentals={() => setIsMyRentalsOpen(true)}
        onOpenQuery={() => setIsQueryModalOpen(true)}
        activeBookingsCount={userBookings.filter((b) => b.orderStatus !== 'COMPLETED_REFUNDED').length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onOpenListingWizard={() => setIsListingWizardOpen(true)}
        onOpenEscrowSimulator={() => setIsEscrowSimulatorOpen(true)}
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        selectedCity={selectedCity}
      />

      {/* Main Discovery Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Category & Quick Filter Bar with Location Tracker */}
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

        {/* Equipment Catalog Grid */}
        <EquipmentGrid
          items={filteredEquipment}
          onSelectItem={(item) => setSelectedProduct(item)}
          onResetFilters={handleResetFilters}
          selectedCity={selectedCity}
        />

        {/* Interactive Savings Calculator */}
        <SavingsCalculator onSelectEquipment={scrollToCatalog} />

        {/* Honest Comparison Table */}
        <ComparisonMatrix />

        {/* Doctor & Patient Stories */}
        <DoctorEndorsements />

        {/* How It Works & Trust Pillars */}
        <HowItWorksSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

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

      {/* My Rentals & Order Tracker Modal */}
      <MyRentalsModal
        isOpen={isMyRentalsOpen}
        onClose={() => setIsMyRentalsOpen(false)}
        bookings={userBookings}
        onExtendBooking={handleExtendBooking}
        onReturnBooking={handleReturnBooking}
      />

      {/* Listing Wizard Modal */}
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

      {/* Floating WhatsApp Support */}
      <WhatsAppFloatingButton
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Footer */}
      <Footer />
    </div>
  </AuthProvider>
);
}
