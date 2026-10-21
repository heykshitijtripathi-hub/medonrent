import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * MedOnRentMark - Exact Concept 1 Flat Vector Logo Mark
 * Direct transparent asset extracted from Concept 1:
 * - Cross in Teal (#007791)
 * - Infinity Loop in Emerald Green (#10B981)
 * - 100% authentic, exactly matching the approved Concept 1 image
 */
export function MedOnRentMark({ className = '', size = 36 }: LogoProps) {
  // Natural aspect ratio is 302 x 235 = ~1.28
  const width = Math.round(size * 1.28);
  const height = size;

  return (
    <div
      className={`relative inline-block shrink-0 select-none ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src="/assets/medonrent-mark-exact.png"
        alt="MedOnRent Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export default function MedOnRentLogo({
  className = '',
  markSize = 36,
  textSize = 'text-lg',
  textColor = 'text-[#0B192C]',
}: {
  className?: string;
  markSize?: number;
  textSize?: string;
  textColor?: string;
}) {
  return (
    <div className={`inline-flex items-center space-x-3 ${className}`}>
      <MedOnRentMark size={markSize} className="shrink-0" />
      <span className={`${textSize} font-black tracking-tight ${textColor} leading-none whitespace-nowrap`}>
        Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
      </span>
    </div>
  );
}
