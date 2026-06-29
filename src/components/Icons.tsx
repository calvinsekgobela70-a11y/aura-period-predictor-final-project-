import React from 'react';

export const UterusIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    stroke="currentColor" 
    strokeWidth="4" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Body */}
    <path 
      d="M 35 60 C 35 35, 65 35, 65 60 C 65 80, 55 90, 50 95 C 45 90, 35 80, 35 60 Z" 
      fill="currentColor" 
      fillOpacity="0.2"
    />
    {/* Fallopian tubes */}
    <path d="M 37 45 Q 20 40, 15 50" />
    <path d="M 63 45 Q 80 40, 85 50" />
    {/* Ovaries */}
    <circle cx="12" cy="55" r="6" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="88" cy="55" r="6" fill="currentColor" fillOpacity="0.4"/>
    {/* Cervix/Vagina canal */}
    <path d="M 45 85 L 45 100 M 55 85 L 55 100" />
  </svg>
);
