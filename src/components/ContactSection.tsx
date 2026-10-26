'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    equipment: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0B192C]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] bg-emerald-900/30 px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
            Need Help Finding the Right Equipment?
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Our clinical concierge team will call you back within 15 minutes and recommend the exact equipment prescribed by your doctor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {[
              {
                icon: <Phone className="w-5 h-5 text-[#10B981]" />,
                title: 'Call Us Directly',
                value: '+91 8175-087-004',
                sub: 'Available 7 AM – 10 PM, 7 days a week',
                href: 'tel:+918175087004',
                bg: 'bg-emerald-900/20 border-emerald-500/20',
              },
              {
                icon: <MessageCircle className="w-5 h-5 text-green-400" />,
                title: 'WhatsApp Us',
                value: 'Chat on WhatsApp',
                sub: 'Send photos of your discharge slip for instant matching',
                href: 'https://wa.me/918175087004',
                bg: 'bg-green-900/20 border-green-500/20',
              },
              {
                icon: <Mail className="w-5 h-5 text-[#007791]" />,
                title: 'Email Support',
                value: 'support@medonrent.in',
                sub: 'We respond within 2 hours on business days',
                href: 'mailto:support@medonrent.in',
                bg: 'bg-cyan-900/20 border-cyan-500/20',
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`flex items-start space-x-4 p-4 rounded-2xl border ${item.bg} hover:brightness-110 transition-all group block`}
              >
                <div className="p-2.5 rounded-xl bg-slate-800 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">{item.title}</div>
                  <div className="text-white font-bold text-sm group-hover:text-[#10B981] transition-colors">{item.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{item.sub}</div>
                </div>
              </a>
            ))}

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#007791] shrink-0" />
                <div>
                  <div className="text-white font-bold text-xs">Delhi NCR</div>
                  <div className="text-slate-500 text-[11px]">Primary Service Area</div>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#10B981] shrink-0" />
                <div>
                  <div className="text-white font-bold text-xs">90 Minutes</div>
                  <div className="text-slate-500 text-[11px]">Fastest Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Query Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Query Received!</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Our team will call you back on <span className="font-bold text-slate-800">{form.phone}</span> within 15 minutes.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', city: '', equipment: '', message: '' }); }}
                  className="mt-2 text-xs text-[#007791] font-bold hover:underline"
                >
                  Submit another query →
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-900">Send Us a Query</h3>
                  <p className="text-slate-500 text-xs mt-1">We&apos;ll call you back within 15 minutes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Your City</label>
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition"
                      >
                        <option value="">Select city</option>
                        {['Delhi', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad', 'Other'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Equipment Needed</label>
                      <select
                        value={form.equipment}
                        onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition"
                      >
                        <option value="">Select equipment</option>
                        {[
                          'Oxygen Concentrator',
                          'Motorized ICU Bed',
                          'CPAP / BiPAP',
                          'Electric Wheelchair',
                          'Anti-Bedsore Mattress',
                          'Rollator / Walker',
                          'Other / Not Sure',
                        ].map((eq) => (
                          <option key={eq} value={eq}>{eq}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Message / Special Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need 5L oxygen concentrator for post-surgery recovery, patient in Gurugram, required from tomorrow morning..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007791]/30 focus:border-[#007791] transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send My Query</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    By submitting, you agree to be contacted by our team. No spam, ever.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
