import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Clean Flat 2D Vector Logo for MedOnRent (Concept 1)
 * Combines a Medical Cross (Teal #007791) with an Infinity Loop (Emerald #10B981).
 * Pure SVG - crisp at any screen density and scale.
 */
export function MedOnRentMark({ className = '', size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MedOnRent Logo Mark"
    >
      {/* Medical Cross (Teal) */}
      <path
        d="M40 10H60V35H85V55H60V90H40V55H15V35H40V10Z"
        fill="#007791"
      />
      {/* Infinity Loop (Emerald Green) */}
      <path
        d="M26 34C15.5 34 8 41.5 8 50C8 58.5 15.5 66 26 66C36.5 66 43 57 50 50C57 43 63.5 34 74 34C84.5 34 92 41.5 92 50C92 58.5 84.5 66 74 66C63.5 66 57 57 50 50C43 43 36.5 34 26 34Z"
        stroke="#10B981"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function MedOnRentLogo({
  className = '',
  markSize = 36,
  textSize = 'text-lg',
}: {
  className?: string;
  markSize?: number;
  textSize?: string;
}) {
  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <MedOnRentMark size={markSize} className="shrink-0" />
      <span className={`${textSize} font-black tracking-tight text-[#0B192C] leading-none`}>
        Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
      </span>
    </div>
  );
}
