'use client';

import React from 'react';
import { MedOnRentMark } from '@/components/MedOnRentLogo';
import { 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Lock 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B192C] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <MedOnRentMark size={32} />
              <span className="text-lg font-black tracking-tight text-white">
                Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              India&apos;s leading peer-to-peer medical equipment rental marketplace. Transforming idle post-recovery medical hardware into liquid, affordable community care.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs pt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>RBI-Licensed Escrow Protection</span>
            </div>
          </div>

          {/* Col 2: High Demand Rentals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Popular Equipment Rentals
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalog-section" className="hover:text-cyan-300 transition-colors">
                  5L & 10L Oxygen Concentrators
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-cyan-300 transition-colors">
                  3-Function Motorized Hospital Beds
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-cyan-300 transition-colors">
                  AutoSet BiPAP & CPAP Machines
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-cyan-300 transition-colors">
                  Electric Motorized Wheelchairs
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-cyan-300 transition-colors">
                  Alternating Anti-Bedsore Air Mattresses
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-cyan-300 transition-colors">
                  Post-Op Rollators & Crutches
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Active Metros */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Metro Coverage
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-[#007791]" />
                <span>Delhi NCR (Gurugram, Noida, South Delhi)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-[#007791]" />
                <span>Mumbai (Andheri, Bandra, Thane)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-[#007791]" />
                <span>Bengaluru (Indiranagar, Whitefield, HSR)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-[#007791]" />
                <span>Hyderabad (Gachibowli, Jubilee Hills)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-[#007791]" />
                <span>Pune (Kothrud, Baner, Viman Nagar)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-[#007791]" />
                <span>Chennai & Kolkata</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Safety & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Caregiver Support & Grievance
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
                <div className="text-slate-400 text-[11px]">Direct Patient & Caregiver Helpline:</div>
                <a href="tel:8175087004" className="text-emerald-400 font-bold text-sm block mt-0.5 hover:underline">
                  +91 8175087004 (Calling & WhatsApp)
                </a>
                <div className="text-[10px] text-slate-400 mt-1">Available 9:00 AM – 9:00 PM (Mon-Sun)</div>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#007791]" />
                <a href="mailto:care@medonrent.in" className="hover:underline">care@medonrent.in</a>
              </div>
              <div className="flex items-start space-x-2 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#007791] mt-0.5 shrink-0" />
                <span>MedOnRent Hub: Sector 44, Institutional Area, Gurugram, Haryana - 122003</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>UIDAI Aadhaar Verified Peer Verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Medical Intermediary Disclaimer */}
        <div className="pt-8 text-[11px] text-slate-400 leading-relaxed space-y-2.5">
          <p>
            <strong className="text-slate-300">Medical Device Intermediary Notice:</strong> MedOnRent operates as an online peer-to-peer sharing and rental platform under Section 79 of the Information Technology Act, 2000. MedOnRent connects individuals seeking temporary medical gear with owners of idle equipment. MedOnRent is not a hospital, medical practitioner, or manufacturer. All life-support and respiratory medical equipment should only be operated following instructions provided by your attending doctor or hospital discharge summary.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/60 text-slate-400">
            <div>
              © 2026 MedOnRent Technologies Private Limited. All rights reserved. Registered under MCA (Govt. of India).
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <a href="#" className="hover:text-slate-200">Terms of Service</a>
              <a href="#" className="hover:text-slate-200">Security Deposit Policy</a>
              <a href="#" className="hover:text-slate-200">Hygiene & Sterilization Standards</a>
              <a href="#" className="hover:text-slate-200">Grievance Officer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
