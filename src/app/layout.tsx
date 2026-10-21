import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medonrent.in"),
  title: {
    default: "MedOnRent — Medical Equipment on Rent in Delhi NCR | Oxygen, ICU Beds & Wheelchairs",
    template: "%s | MedOnRent",
  },
  description:
    "Rent hospital-grade medical equipment in Delhi NCR, Gurgaon & Noida. 5L/10L oxygen concentrators, motorized ICU beds, BiPAP, CPAP, and electric wheelchairs with same-day doorstep delivery and 100% refundable deposit.",
  keywords: [
    "medical equipment on rent",
    "oxygen concentrator on rent Delhi",
    "oxygen concentrator rent Gurgaon",
    "hospital bed on rent Noida",
    "ICU bed on rent Delhi NCR",
    "BiPAP machine rent",
    "CPAP machine rental Delhi",
    "wheelchair on rent near me",
    "motorized wheelchair rent",
    "air mattress rent bedsore",
    "medical equipment rental near me",
    "patient bed rental",
  ],
  authors: [{ name: "MedOnRent" }],
  creator: "MedOnRent",
  publisher: "MedOnRent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://medonrent.in",
  },
  openGraph: {
    title: "MedOnRent — Medical Equipment on Rent | Same-Day Delivery in Delhi NCR",
    description:
      "Affordable medical equipment rentals: 5L Oxygen Concentrators, ICU Beds, BiPAP, and Wheelchairs. Fast delivery, sanitization certified, 100% refundable deposit.",
    url: "https://medonrent.in",
    siteName: "MedOnRent",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/medonrent-app-icon.jpg",
        width: 800,
        height: 800,
        alt: "MedOnRent - Medical Equipment on Rent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MedOnRent — Medical Equipment on Rent",
    description:
      "Rent oxygen concentrators, hospital beds & wheelchairs delivered to your doorstep across Delhi NCR with 100% deposit protection.",
    images: ["/assets/medonrent-app-icon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/medonrent-app-icon.jpg",
    apple: "/assets/medonrent-app-icon.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://medonrent.in/#organization",
      name: "MedOnRent",
      url: "https://medonrent.in",
      logo: "https://medonrent.in/assets/medonrent-app-icon.jpg",
      description:
        "Medical equipment rental marketplace providing oxygen concentrators, motorized ICU beds, BiPAP/CPAP devices, and wheelchairs on flexible monthly rental.",
      telephone: "+91-8175087004",
      priceRange: "₹550 - ₹6,000 / month",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi NCR",
        addressRegion: "Delhi",
        addressCountry: "IN",
      },
      areaServed: [
        "Delhi",
        "Gurgaon",
        "Noida",
        "Ghaziabad",
        "Faridabad",
        "Delhi NCR",
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://medonrent.in/#website",
      url: "https://medonrent.in",
      name: "MedOnRent",
      publisher: {
        "@id": "https://medonrent.in/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://medonrent.in/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/assets/medonrent-app-icon.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F8FAFC] text-[#0B192C] selection:bg-[#007791] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
