import React from 'react';

// Procedural SVG artwork for Book pages and Puzzle memory photos

export const MoonTreeArt: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="treeSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#090d16" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <radialGradient id="treeGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#059669" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="240" fill="url(#treeSky)" rx="12" />
    <circle cx="200" cy="110" r="85" fill="url(#treeGlow)" />
    {/* Earth */}
    <circle cx="340" cy="50" r="24" fill="#0284c7" />
    <path d="M 330 45 Q 340 40 350 48 Q 345 55 330 52 Z" fill="#22c55e" opacity="0.8" />
    {/* Banyan Tree silhouette */}
    <path d="M 175 220 Q 185 150 160 120 Q 180 100 200 130 Q 220 95 240 120 Q 215 160 225 220 Z" fill="#452b1f" />
    <circle cx="150" cy="100" r="45" fill="#065f46" />
    <circle cx="250" cy="95" r="42" fill="#047857" />
    <circle cx="200" cy="75" r="55" fill="#059669" />
    <circle cx="200" cy="65" r="38" fill="#10b981" />
    {/* Stars */}
    <circle cx="60" cy="40" r="2" fill="#ffffff" />
    <circle cx="110" cy="70" r="1.5" fill="#fde047" />
    <circle cx="290" cy="30" r="2" fill="#ffffff" />
    {/* Ground */}
    <ellipse cx="200" cy="235" rx="210" ry="25" fill="#334155" />
    {/* Empty bench */}
    <rect x="90" y="195" width="45" height="6" rx="2" fill="#94a3b8" />
    <rect x="95" y="201" width="6" height="12" fill="#64748b" />
    <rect x="124" y="201" width="6" height="12" fill="#64748b" />
  </svg>
);

export const SurveyorArt: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg viewBox="0 0 400 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="craterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0b0f19" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#craterGrad)" rx="12" />
    {/* Moon crater curves */}
    <path d="M 0 160 Q 200 220 400 160 L 400 240 L 0 240 Z" fill="#334155" />
    <path d="M 50 180 Q 200 230 350 180" stroke="#475569" strokeWidth="3" fill="none" />
    {/* Surveyor 3 Robot */}
    <g transform="translate(200, 150)">
      {/* Shadow */}
      <ellipse cx="0" cy="30" rx="45" ry="8" fill="rgba(15, 23, 42, 0.6)" />
      {/* 3 Legs */}
      <line x1="-12" y1="-5" x2="-45" y2="28" stroke="#94a3b8" strokeWidth="4" />
      <line x1="12" y1="-5" x2="45" y2="28" stroke="#94a3b8" strokeWidth="4" />
      <line x1="0" y1="-5" x2="0" y2="32" stroke="#64748b" strokeWidth="4" />
      {/* Footpads */}
      <ellipse cx="-45" cy="28" rx="8" ry="3" fill="#64748b" />
      <ellipse cx="45" cy="28" rx="8" ry="3" fill="#64748b" />
      <ellipse cx="0" cy="32" rx="8" ry="3" fill="#475569" />
      {/* Main triangular frame */}
      <polygon points="-24,0 24,0 0,-25" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
      {/* Mast */}
      <line x1="0" y1="-25" x2="0" y2="-65" stroke="#64748b" strokeWidth="4" />
      {/* Solar Panel */}
      <rect x="-24" y="-76" width="48" height="12" rx="2" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
      {/* Camera "Mắt Tròn" */}
      <circle cx="12" cy="-42" r="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
      <circle cx="14" cy="-42" r="7" fill="#0f172a" />
      <circle cx="11" cy="-45" r="3" fill="#ffffff" />
      {/* Scoop Arm */}
      <line x1="-15" y1="-5" x2="-35" y2="10" stroke="#eab308" strokeWidth="3" />
      <line x1="-35" y1="10" x2="-52" y2="22" stroke="#eab308" strokeWidth="3" />
      <rect x="-60" y="18" width="12" height="8" rx="2" fill="#ca8a04" />
    </g>
  </svg>
);

export const ScoopEventArt: React.FC<{ className?: string }> = ({ className = 'w-full h-36' }) => (
  <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#0f172a" rx="8" />
    {/* Soil Surface */}
    <rect x="0" y="110" width="320" height="70" fill="#475569" />
    {/* 4 Trenches dug by scoop */}
    <rect x="80" y="125" width="60" height="8" rx="3" fill="#1e293b" />
    <rect x="100" y="140" width="70" height="8" rx="3" fill="#1e293b" />
    <rect x="90" y="155" width="55" height="8" rx="3" fill="#1e293b" />
    {/* Soil Scoop Arm digging */}
    <path d="M 230 40 L 170 85 L 145 125" stroke="#eab308" strokeWidth="6" fill="none" strokeLinecap="round" />
    <rect x="132" y="118" width="22" height="15" rx="3" fill="#ca8a04" />
    {/* Soil specks */}
    <circle cx="160" cy="115" r="3" fill="#94a3b8" />
    <circle cx="150" cy="105" r="2.5" fill="#cbd5e1" />
    <circle cx="130" cy="110" r="2" fill="#94a3b8" />
    {/* Badge */}
    <rect x="12" y="12" width="105" height="24" rx="6" fill="#1e293b" />
    <text x="64" y="28" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">20/04/1967</text>
  </svg>
);

export const CameraEventArt: React.FC<{ className?: string }> = ({ className = 'w-full h-36' }) => (
  <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#090d16" rx="8" />
    {/* Flash / Aperture Rings */}
    <circle cx="160" cy="90" r="65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
    <circle cx="160" cy="90" r="50" stroke="#0ea5e9" strokeWidth="3" fill="#0f172a" />
    <circle cx="160" cy="90" r="35" fill="#0284c7" />
    <circle cx="160" cy="90" r="20" fill="#0f172a" />
    <circle cx="154" cy="84" r="6" fill="#ffffff" />
    {/* Photo film thumbnails transmitted */}
    <rect x="30" y="55" width="48" height="34" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
    <rect x="242" y="85" width="48" height="34" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
    <line x1="78" y1="72" x2="110" y2="82" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="210" y1="92" x2="242" y2="102" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Badge */}
    <rect x="12" y="12" width="115" height="24" rx="6" fill="#1e293b" />
    <text x="69" y="28" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">6.315 BỨC ẢNH</text>
  </svg>
);

export const ApolloEventArt: React.FC<{ className?: string }> = ({ className = 'w-full h-36' }) => (
  <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="180" fill="#0a0f1d" rx="8" />
    {/* Moon ground */}
    <rect x="0" y="125" width="320" height="55" fill="#334155" />
    {/* Apollo 12 Astronaut in white space suit */}
    <g transform="translate(100, 75)">
      {/* Backpack PLSS */}
      <rect x="18" y="8" width="14" height="28" rx="3" fill="#e2e8f0" stroke="#94a3b8" />
      {/* Body */}
      <rect x="4" y="10" width="22" height="32" rx="6" fill="#f8fafc" />
      {/* Helmet & Gold Visor */}
      <circle cx="15" cy="4" r="12" fill="#f1f5f9" />
      <ellipse cx="12" cy="4" rx="7" ry="6" fill="#eab308" />
      {/* Arms reaching out to Surveyor */}
      <path d="M 22 18 L 45 25" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
      {/* Legs */}
      <rect x="5" y="40" width="8" height="20" rx="3" fill="#f1f5f9" />
      <rect x="17" y="40" width="8" height="20" rx="3" fill="#f1f5f9" />
    </g>
    {/* Surveyor 3 Robot silhouette on the right */}
    <g transform="translate(210, 100)">
      <polygon points="-15,0 15,0 0,-18" fill="#cbd5e1" />
      <line x1="0" y1="-18" x2="0" y2="-45" stroke="#64748b" strokeWidth="3" />
      <circle cx="8" cy="-30" r="10" fill="#38bdf8" />
      <line x1="-10" y1="0" x2="-28" y2="25" stroke="#94a3b8" strokeWidth="3" />
      <line x1="10" y1="0" x2="28" y2="25" stroke="#94a3b8" strokeWidth="3" />
    </g>
    {/* Badge */}
    <rect x="12" y="12" width="105" height="24" rx="6" fill="#1e293b" />
    <text x="64" y="28" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">19/11/1969</text>
  </svg>
);
