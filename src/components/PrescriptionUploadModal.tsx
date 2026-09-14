'use client';

import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  PhoneCall
} from 'lucide-react';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchFound: (category: string) => void;
}

export default function PrescriptionUploadModal({
  isOpen,
  onClose,
  onMatchFound,
}: PrescriptionUploadModalProps) {
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analyzedResult, setAnalyzedResult] = useState<{
    hospital: string;
    doctor: string;
    detectedNeed: string;
    recommendedCategory: string;
    availableUnitsNearby: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSimulateUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzedResult({
        hospital: 'Max Super Speciality Hospital, Saket',
        doctor: 'Dr. V. K. Chopra, Pulmonology',
        detectedNeed: 'Oxygen Concentrator (5L continuous, OPI certified) + Anti-Bedsore Mattress',
        recommendedCategory: 'RESPIRATORY',
        availableUnitsNearby: 4,
      });
    }, 1800);
  };

  const handleProceedToResults = () => {
    if (analyzedResult) {
      onMatchFound(analyzedResult.recommendedCategory);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-bold text-white">
                Upload Hospital Discharge Prescription
              </h2>
              <p className="text-[11px] text-slate-400">
                Instant equipment matching by our Clinical Concierge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {!analyzedResult ? (
            <>
              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 text-cyan-950 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#007791] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Unsure which machine model is required?</h4>
                  <p className="text-cyan-800 text-[11px] mt-0.5 leading-relaxed">
                    Upload a photo of the doctor&apos;s discharge slip or prescription. We extract the exact oxygen flow rate, BiPAP pressure settings, or ICU bed specifications and match verified equipment in your sector.
                  </p>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-slate-300 hover:border-[#007791] rounded-2xl p-8 text-center bg-slate-50/80 hover:bg-cyan-50/20 cursor-pointer transition-all group"
              >
                {analyzing ? (
                  <div className="py-4">
                    <span className="w-8 h-8 border-3 border-[#007791] border-t-transparent rounded-full animate-spin inline-block mb-3"></span>
                    <h4 className="font-bold text-slate-800 text-sm">Analyzing Doctor Prescription...</h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Extracting prescribed flow rate, pressure settings, and matching nearest stock in Delhi NCR
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-cyan-100 text-[#007791] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      Click to Select or Drag Prescription Photo / PDF
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Supports JPG, PNG, PDF up to 15MB • 100% Encrypted & HIPAA/DPDP Compliant
                    </p>
                    <span className="mt-3 inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-[#007791] font-semibold text-[11px] shadow-sm">
                      Or click here to simulate sample discharge analysis
                    </span>
                  </>
                )}
              </div>

              {/* Phone Alternative */}
              <div className="p-3.5 bg-slate-100/70 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-700 font-medium">
                  <PhoneCall className="w-4 h-4 text-[#007791]" />
                  <span>Need immediate help over phone?</span>
                </div>
                <a
                  href="tel:18001209988"
                  className="text-xs font-bold text-[#007791] hover:underline"
                >
                  Call 1800-120-RENT
                </a>
              </div>
            </>
          ) : (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Prescription Analyzed Successfully</h4>
                  <p className="text-emerald-800 text-xs mt-0.5">
                    Identified hospital: <strong>{analyzedResult.hospital}</strong>
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Attending Specialist:</span>
                  <span className="font-bold text-slate-900">{analyzedResult.doctor}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Prescribed Equipment:</span>
                  <span className="font-bold text-[#007791] text-right">{analyzedResult.detectedNeed}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500 font-medium">Available Units Nearby:</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[11px]">
                    {analyzedResult.availableUnitsNearby} Units Ready in 90 Mins
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToResults}
                className="w-full py-3 rounded-xl bg-[#007791] hover:bg-[#005F73] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.98]"
              >
                <span>View Matching Equipment Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
