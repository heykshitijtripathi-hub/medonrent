'use client';

import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, PhoneCall, HelpCircle } from 'lucide-react';

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueryModal({ isOpen, onClose }: QueryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [equipmentType, setEquipmentType] = useState('Oxygen Concentrator');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill your Name and Mobile Number');
      return;
    }
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello MedOnRent team,\nMy Name: ${name || 'Patient Family'}\nPhone: ${phone || 'Not provided'}\nNeed help with: ${equipmentType}\nQuestion: ${message || 'I have a question about renting equipment.'}`
    );
    window.open(`https://wa.me/918175087004?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#007791] flex items-center justify-center text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Have a Question or Need Help?</h3>
              <p className="text-[11px] text-slate-300">We respond in a few minutes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Thank You, {name}!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your question has been received. Our support coordinator will call you back on <strong>{phone}</strong> shortly.
              </p>

              <div className="pt-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send directly to WhatsApp (+91 8175087004)</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline pt-2"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-xs text-slate-600 leading-relaxed">
                Confused about which machine is right for your patient, rent duration, or delivery? Send us your question below or talk to us directly on WhatsApp.
              </p>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791]"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (Calling & WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791]"
                />
              </div>

              {/* Equipment Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What equipment do you need help with?
                </label>
                <select
                  value={equipmentType}
                  onChange={(e) => setEquipmentType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#007791]"
                >
                  <option value="Oxygen Concentrator">Oxygen Concentrator (5L or 10L)</option>
                  <option value="Hospital Bed">Motorized Hospital / ICU Bed</option>
                  <option value="BiPAP or CPAP">BiPAP / CPAP Machine</option>
                  <option value="Wheelchair">Wheelchair / Recliner</option>
                  <option value="Suction Machine">Suction Machine / Nebulizer</option>
                  <option value="General Question">General Question / Deposit / Delivery</option>
                </select>
              </div>

              {/* Message / Query */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Question / Query
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you need or ask any doubt about delivery, doctor prescription, deposit refund..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007791] resize-none"
                />
              </div>

              {/* Submit & WhatsApp buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Question</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>

              {/* Direct call pill */}
              <div className="pt-2 text-center">
                <a
                  href="tel:8175087004"
                  className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-medium"
                >
                  <PhoneCall className="w-3 h-3 text-[#007791]" />
                  <span>Prefer to talk directly? Call us at <strong>+91 8175087004</strong></span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
