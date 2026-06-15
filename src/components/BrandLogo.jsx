import thuriyaLogo from '../../thuriya_logo.png';

export default function BrandLogo({ className = '', variant = 'light' }) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={thuriyaLogo}
        alt="Thuriya"
        className={`h-11 w-auto flex-shrink-0 object-contain ${isDark ? 'brightness-0 invert' : ''}`}
        loading="eager"
        decoding="async"
      />
      <div className="select-none leading-none">
        <span className={`block text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          Thuriya
        </span>
        <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/55' : 'text-[#6B6254]'}`}>
          Your Future. Made Clear.
        </span>
      </div>
    </div>
  );
}
