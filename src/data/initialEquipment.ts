export interface EquipmentItem {
  id: string;
  title: string;
  brand: string;
  category: "RESPIRATORY" | "HOME_ICU" | "MOBILITY" | "MONITORING";
  categoryLabel: string;
  monthlyRent: number;
  securityDeposit: number;
  originalPrice: number;
  description: string;
  condition: "Like New" | "Gently Used" | "Certified Refurbished";
  specs: {
    [key: string]: string;
  };
  image: string;
  videoDurationSec: number;
  hasWorkingProofVideo: boolean;
  isSanitized: boolean;
  sanitizationDate: string;
  city: string;
  locality: string;
  distanceKm: number;
  lat?: number;
  lng?: number;
  owner: {
    id: string;
    name: string;
    roleDesc: string;
    isAadhaarVerified: boolean;
    rating: number;
    completedRentals: number;
    responseTime: string;
  };
  features: string[];
  instantDispatch: boolean;
  isAvailable?: boolean;
}

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: "mor-ox-01",
    title: "Philips EverFlo 5L Medical Oxygen Concentrator",
    brand: "Philips Respironics",
    category: "RESPIRATORY",
    categoryLabel: "Respiratory Care",
    monthlyRent: 5800,
    securityDeposit: 10000,
    originalPrice: 55000,
    description: "Compact 5-litre continuous flow oxygen concentrator with built-in OPI (Oxygen Percentage Indicator) sensor delivering 93% ± 3% purity. Used for 3 weeks post-surgery and stored in pristine condition.",
    condition: "Like New",
    specs: {
      "Oxygen Purity": "93% ± 3% at all flow rates",
      "Flow Rate": "0.5 to 5.0 Litres/min",
      "Sound Level": "< 45 dBA (Quiet for sleep)",
      "Weight": "14 kg (Smooth caster wheels)",
      "Power": "350W power consumption"
    },
    image: "/equipment/oxygen-concentrator.jpg",
    videoDurationSec: 5,
    hasWorkingProofVideo: true,
    isSanitized: true,
    sanitizationDate: "Yesterday (Hospital Grade)",
    city: "Delhi NCR",
    locality: "DLF Phase 2, Gurugram",
    distanceKm: 2.4,
    lat: 28.4870,
    lng: 77.0890,
    owner: {
      id: "own_101",
      name: "Col. Rajesh V. (Retd.)",
      roleDesc: "Resident & Equipment Owner",
      isAadhaarVerified: true,
      rating: 4.96,
      completedRentals: 9,
      responseTime: "< 15 mins"
    },
    features: [
      "Quiet nighttime operation (<45 dB)",
      "Continuous 24x7 run certified",
      "Built-in oxygen purity alert buzzer",
      "Standard 220V plug"
    ],
    instantDispatch: true,
    isAvailable: true
  },
  {
    id: "mor-bed-02",
    title: "Paramount 3-Function Motorized ICU Hospital Bed",
    brand: "Paramount Bed Co.",
    category: "HOME_ICU",
    categoryLabel: "Home ICU & Recovery",
    monthlyRent: 5200,
    securityDeposit: 8000,
    originalPrice: 48000,
    description: "Full motorized remote-controlled cardiac bed. Remote controls backrest elevation (0-75°), knee rest (0-45°), and overall height adjustment. Comes with collapsible aluminum safety side rails and IV pole.",
    condition: "Like New",
    specs: {
      "Functions": "Backrest, Knee-rest, Height Adjustment",
      "Weight Capacity": "Up to 185 kg load",
      "Motors": "Dewert German dual actuators",
      "Dimensions": "2150 mm x 1000 mm",
      "Safety Rails": "Fold-down locking aluminum"
    },
    image: "/equipment/icu-bed.jpg",
    videoDurationSec: 5,
    hasWorkingProofVideo: true,
    isSanitized: true,
    sanitizationDate: "10 Sept 2026",
    city: "Delhi NCR",
    locality: "Greater Kailash 1, South Delhi",
    distanceKm: 5.1,
    lat: 28.5535,
    lng: 77.2340,
    owner: {
      id: "own_102",
      name: "Dr. Ananya Mathur",
      roleDesc: "Physical Therapist & Owner",
      isAadhaarVerified: true,
      rating: 4.98,
      completedRentals: 14,
      responseTime: "< 10 mins"
    },
    features: [
      "Wired hand remote control",
      "CPR quick-release safety lever",
      "Central locking 5-inch castors",
      "Complimentary IV stand included"
    ],
    instantDispatch: false,
    isAvailable: true
  },
  {
    id: "mor-cpap-03",
    title: "ResMed AirSense 10 AutoSet Auto-CPAP Machine",
    brand: "ResMed",
    category: "RESPIRATORY",
    categoryLabel: "Respiratory Care",
    monthlyRent: 4500,
    securityDeposit: 9000,
    originalPrice: 62000,
    description: "Premium auto-titrating CPAP device with integrated HumidAir heated humidifier and ClimateLineAir heated tube. Automatically adjusts pressure levels on every breath.",
    condition: "Certified Refurbished",
    specs: {
      "Pressure Range": "4 – 20 cm H2O auto-adjust",
      "Sound": "26.6 dBA (Whisper quiet)",
      "Humidifier": "Built-in heated water tub",
      "Data": "SD Card sleep report ready",
      "Weight": "1.2 kg (Travel friendly)"
    },
    image: "/equipment/cpap-machine.jpg",
    videoDurationSec: 5,
    hasWorkingProofVideo: true,
    isSanitized: true,
    sanitizationDate: "09 Sept 2026",
    city: "Delhi NCR",
    locality: "Sector 50, Noida",
    distanceKm: 7.8,
    lat: 28.5700,
    lng: 77.3650,
    owner: {
      id: "own_103",
      name: "Vikramjit Singh",
      roleDesc: "Caregiver & Resident",
      isAadhaarVerified: true,
      rating: 4.91,
      completedRentals: 6,
      responseTime: "< 30 mins"
    },
    features: [
      "AutoRamp sleep-onset detection",
      "SmartStart breath initiation",
      "Carrying travel case included",
      "New sealed mask pack"
    ],
    instantDispatch: true,
    isAvailable: true
  },
  {
    id: "mor-wheel-04",
    title: "Karma Fighter C Lightweight Motorized Electric Wheelchair",
    brand: "Karma Medical",
    category: "MOBILITY",
    categoryLabel: "Mobility & Rehabilitation",
    monthlyRent: 4800,
    securityDeposit: 7500,
    originalPrice: 38000,
    description: "Compact joystick-driven powered wheelchair designed for both indoor maneuverability and outdoor pathways. Easy fold mechanism allows trunk transport in regular hatchback cars.",
    condition: "Gently Used",
    specs: {
      "Speed": "Up to 6 km/h with 5 speed gears",
      "Range": "15 km on single battery charge",
      "Weight Capacity": "100 kg maximum",
      "Turning Radius": "Tight 75 cm for flat hallways",
      "Brakes": "Electromagnetic auto-stop"
    },
    image: "/equipment/electric-wheelchair.jpg",
    videoDurationSec: 5,
    hasWorkingProofVideo: true,
    isSanitized: true,
    sanitizationDate: "08 Sept 2026",
    city: "Delhi NCR",
    locality: "Indirapuram, Ghaziabad",
    distanceKm: 9.4,
    lat: 28.6410,
    lng: 77.3710,
    owner: {
      id: "own_104",
      name: "Pooja Hegde",
      roleDesc: "Family Caregiver",
      isAadhaarVerified: true,
      rating: 4.88,
      completedRentals: 4,
      responseTime: "< 20 mins"
    },
    features: [
      "360-degree joystick controller",
      "Detachable battery pack for easy charging",
      "Anti-tip rear wheels for slope security",
      "Breathable washable cushion"
    ],
    instantDispatch: true,
    isAvailable: true
  },
  {
    id: "mor-mat-05",
    title: "Ardo Care Alternating Pressure Anti-Bedsore Air Mattress",
    brand: "Ardo Medical",
    category: "HOME_ICU",
    categoryLabel: "Home ICU & Recovery",
    monthlyRent: 950,
    securityDeposit: 1500,
    originalPrice: 4200,
    description: "Clinical alternating bubble air mattress system with heavy-duty aluminum pump. Alternates pressure cycles every 6 minutes to stimulate blood circulation and prevent decubitus ulcers.",
    condition: "Like New",
    specs: {
      "Cycle Time": "6 minutes automated cycle",
      "Pressure Range": "40 – 100 mmHg adjustable",
      "Material": "Medical-grade non-toxic PVC",
      "Weight Limit": "135 kg capacity"
    },
    image: "/equipment/air-mattress.jpg",
    videoDurationSec: 5,
    hasWorkingProofVideo: true,
    isSanitized: true,
    sanitizationDate: "Today, 11:30 AM",
    city: "Delhi NCR",
    locality: "Vasant Vihar, New Delhi",
    distanceKm: 4.2,
    lat: 28.5600,
    lng: 77.1600,
    owner: {
      id: "own_105",
      name: "Sunil Mehra",
      roleDesc: "Resident & Owner",
      isAadhaarVerified: true,
      rating: 5.0,
      completedRentals: 11,
      responseTime: "< 5 mins"
    },
    features: [
      "Low noise vibration-damped pump",
      "130 alternating bubble cells",
      "End flaps to tuck under bed",
      "Low power consumption (7W)"
    ],
    instantDispatch: true,
    isAvailable: true
  },
  {
    id: "mor-roll-06",
    title: "KosmoCare Premium Foldable Rollator Walker with Seat",
    brand: "KosmoCare",
    category: "MOBILITY",
    categoryLabel: "Mobility & Rehabilitation",
    monthlyRent: 550,
    securityDeposit: 900,
    originalPrice: 3500,
    description: "European style 4-wheel aluminum walking frame with padded rest seat, storage basket, and loop-lock hand brakes. Essential for post-knee or hip replacement rehabilitation.",
    condition: "Like New",
    specs: {
      "Frame": "Rust-free lightweight aluminum",
      "Height Adjustable": "78 cm to 90 cm handles",
      "Weight": "6.8 kg total weight",
      "Brakes": "Dual squeeze and push-down lock"
    },
    image: "/equipment/rollator-walker.jpg",
    videoDurationSec: 5,
    hasWorkingProofVideo: true,
    isSanitized: true,
    sanitizationDate: "Yesterday",
    city: "Delhi NCR",
    locality: "Sector 14, Gurugram",
    distanceKm: 1.8,
    lat: 28.4710,
    lng: 77.0480,
    owner: {
      id: "own_106",
      name: "Meenakshi Sundaram",
      roleDesc: "Retired Educator & Owner",
      isAadhaarVerified: true,
      rating: 4.95,
      completedRentals: 7,
      responseTime: "< 15 mins"
    },
    features: [
      "Padded seat with backrest strap",
      "Under-seat storage basket",
      "Folds flat with one pull strap",
      "Rubber puncture-proof wheels"
    ],
    instantDispatch: true,
    isAvailable: true
  }
];
