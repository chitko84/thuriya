
export default function BrandLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Helix Icon Container */}
      <div className="w-10 h-10 bg-[#161B22] border border-[#1E262F] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
        {/* Dual-Stranded Helix SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 animate-pulse"
        >
          {/* Strand 1 (Electric Cyan) */}
          <path
            d="M4 6C8 6 8 18 12 18C16 18 16 6 20 6"
            stroke="#00E5FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Strand 2 (Helix Crimson) */}
          <path
            d="M4 18C8 18 8 6 12 6C16 6 16 18 20 18"
            stroke="#FF5252"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          {/* Connecting base pairs */}
          <line x1="8" y1="9" x2="8" y2="15" stroke="#8A99A5" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="12" y1="6" x2="12" y2="18" stroke="#8A99A5" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="16" y1="9" x2="16" y2="15" stroke="#8A99A5" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>
      {/* Typography */}
      <span className="text-xl font-bold tracking-wide select-none">
        <span className="text-[#F7F9FA] font-extrabold">Career</span>
        <span className="text-[#00E5FF] font-black">DNA</span>
      </span>
    </div>
  );
}
