'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Stethoscope } from 'lucide-react';

const REVIEWS = [
  {
    type: 'DOCTOR',
    name: 'Dr. Arvind Sethi, MD',
    title: 'Senior Pulmonologist',
    affiliation: 'Fortis Memorial, Gurugram',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    comment: 'Patients getting discharged often need an oxygen concentrator for just 2 to 4 weeks. Buying a new machine costs ₹60,000+, which makes no sense for short recovery. MedOnRent gives families sanitized, reliable machines at a fraction of the cost.',
    verifiedTag: 'Practicing Pulmonologist',
  },
  {
    type: 'DOCTOR',
    name: 'Dr. Rohini Varma, DNB',
    title: 'Neuro-Rehabilitation Specialist',
    affiliation: 'Max Hospital, Saket',
    avatar: 'https://images.unsplash.com/photo-1594824813685-30089fdfca79?auto=format&fit=crop&w=200&q=80',
    comment: 'For stroke and spine recovery at home, motorized beds and anti-bedsore mattresses are essential during the first 6 weeks. MedOnRent makes getting these at home fast and painless for patients.',
    verifiedTag: 'Neuro-Rehab Consultant',
  },
  {
    type: 'CAREGIVER',
    name: 'Sangeeta & Rajiv Narang',
    title: 'Rented Philips 5L Oxygen Concentrator',
    affiliation: 'DLF Phase 5, Gurugram',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    comment: 'Local surgical shops asked for ₹15,000 cash deposit and wouldn’t promise delivery on time. Here we rented an EverFlo in clean condition, delivered the same afternoon. Our full deposit was credited back the day we returned it.',
    verifiedTag: 'Verified Renter (Gurugram)',
  },
  {
    type: 'CAREGIVER',
    name: 'Sunita Deshmukh',
    title: 'Listed ResMed CPAP Machine',
    affiliation: 'Noida Sector 50',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    comment: 'My husband recovered and our CPAP machine was just lying unused in a cabinet. I listed it here and within a week someone in Noida rented it. Great way to help someone recovering while earning extra income.',
    verifiedTag: 'Verified Equipment Owner',
  },
];

export default function DoctorEndorsements() {
  return (
    <section className="py-12 mb-16 bg-white rounded-3xl border border-slate-200 shadow-clinical p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007791] bg-cyan-100/60 px-3 py-1 rounded-full">
            Clinical Trust & Real Caregiver Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5 tracking-tight">
            Endorsed by Clinicians, Loved by Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Partnered with discharge desks at premier hospital networks across Delhi NCR, Mumbai, and Bengaluru.
          </p>
        </div>

        {/* Hospital Partner Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pb-8 mb-8 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Fortis Healthcare Discharge Desks
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#007791]"></span>
            Max Healthcare Step-Down Network
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#0B192C]"></span>
            Medanta The Medicity Caregivers
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Apollo Hospitals Step-Down Rehab
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between relative hover:border-[#007791]/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        {rev.type === 'DOCTOR' && (
                          <Stethoscope className="w-3.5 h-3.5 text-[#007791]" />
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-600 font-medium">{rev.title}</p>
                      <p className="text-[10px] text-slate-400">{rev.affiliation}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                </div>
                <span className="flex items-center text-[#059669] font-bold text-[10px] bg-emerald-100/60 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {rev.verifiedTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
