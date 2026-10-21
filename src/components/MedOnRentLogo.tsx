import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * MedOnRentMark - Concept 1 Flat Vector Logo Mark
 * Exact geometry matching the Concept 1 design:
 * - A centered Medical Cross in teal (#007791)
 * - An interwoven Infinity Loop in emerald green (#10B981) with rounded ends
 * - Non-overlapping layout with proper aspect ratio and viewBox padding
 */
export function MedOnRentMark({ className = '', size = 34 }: LogoProps) {
  // Natural aspect ratio is wider than tall (around 1.3:1)
  const width = Math.round(size * 1.25);
  const height = size;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MedOnRent Logo"
    >
      {/* 1. Medical Cross (Teal) with rounded corners */}
      <path
        d="M48 6C48 3.79086 49.7909 2 52 2H68C70.2091 2 72 3.79086 72 6V30H96C98.2091 30 100 31.7909 100 34V62C100 64.2091 98.2091 66 96 66H72V90C72 92.2091 70.2091 94 68 94H52C49.7909 94 48 92.2091 48 90V66H24C21.7909 66 20 64.2091 20 62V34C20 31.7909 21.7909 30 24 30H48V6Z"
        fill="#007791"
      />

      {/* 2. Infinity Loop (Emerald Green) - Intersecting horizontal ribbon */}
      <path
        d="M34 26C18 26 6 36 6 48C6 60 18 70 34 70C48 70 54 58 60 48C66 38 72 26 86 26C102 26 114 36 114 48C114 60 102 70 86 70C72 70 66 58 60 48C54 38 48 26 34 26Z"
        stroke="#10B981"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function MedOnRentLogo({
  className = '',
  markSize = 34,
  textSize = 'text-lg',
  textColor = 'text-[#0B192C]',
}: {
  className?: string;
  markSize?: number;
  textSize?: string;
  textColor?: string;
}) {
  return (
    <div className={`inline-flex items-center space-x-2.5 ${className}`}>
      <MedOnRentMark size={markSize} className="shrink-0" />
      <span className={`${textSize} font-black tracking-tight ${textColor} leading-none whitespace-nowrap`}>
        Med<span className="text-[#007791]">On</span><span className="text-[#10B981]">Rent</span>
      </span>
    </div>
  );
}
