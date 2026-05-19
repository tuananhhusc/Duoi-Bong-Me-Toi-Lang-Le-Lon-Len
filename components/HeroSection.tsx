export default function HeroSection() {
  return (
    <section className="hero-section min-h-[85vh] flex items-center justify-center relative" id="hero">
      {/* Light rays effect */}
      <div className="hero-light-rays" />
      <div className="hero-light-beam" />

      {/* Subtle cross motif */}
      <div className="hero-cross">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="0" width="10" height="80" fill="#D4AF37" />
          <rect x="5" y="20" width="50" height="10" fill="#D4AF37" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-shimmer"
            style={{
              width: `${2 + i * 0.5}px`,
              height: `${2 + i * 0.5}px`,
              background: `rgba(212, 175, 55, ${0.15 + i * 0.05})`,
              top: `${15 + i * 12}%`,
              left: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Academic label */}
        <div className="animate-fade-in-up mb-6">
          <span className="inline-block px-5 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-[#D4AF37] border border-[rgba(212,175,55,0.3)] rounded-full bg-[rgba(212,175,55,0.05)]">
            Báo cáo Nghiên cứu Chuyên sâu
          </span>
        </div>

        {/* Main title */}
        <h1 className="animate-fade-in-up-delay-1 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FDFBF7] leading-tight mb-6">
          Dưới bóng Mẹ,
          <br />
          <span className="text-[#D4AF37]">tôi lặng lẽ lớn lên</span>
        </h1>

        {/* Decorative line */}
        <div className="animate-fade-in-up-delay-2 flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-60">
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#D4AF37" />
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 font-[family-name:var(--font-lora)] text-base sm:text-lg md:text-xl text-[rgba(253,251,247,0.75)] leading-relaxed max-w-2xl mx-auto mb-8">
          Phân tích Đa chiều về Tình mẫu tử và Quá trình Trưởng thành:{" "}
          <br className="hidden sm:block" />
          Từ Cấu trúc Tâm lý học Phát triển đến Biểu tượng Văn hóa và Văn chương
        </p>

        {/* Meta information */}
        <div className="animate-fade-in-up-delay-3 flex flex-wrap items-center justify-center gap-6 text-sm text-[rgba(253,251,247,0.5)]">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Tháng 5, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span>Nghiên cứu Học thuật</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up-delay-3 mt-12">
          <a href="#content" className="inline-flex flex-col items-center gap-2 text-[rgba(253,251,247,0.4)] hover:text-[#D4AF37] transition-colors">
            <span className="text-xs tracking-wider uppercase">Đọc bài viết</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
              <path d="M7 13l5 5 5-5" />
              <path d="M7 6l5 5 5-5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
