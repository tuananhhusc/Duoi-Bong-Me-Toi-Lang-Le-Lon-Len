export default function Footer() {
  return (
    <footer className="footer py-12 mt-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="opacity-40"
          >
            <path
              d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z"
              fill="#7B2D3B"
            />
          </svg>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#5C1F2B] mb-2">
          Dưới bóng Mẹ, tôi lặng lẽ lớn lên
        </h3>
        <p className="font-[family-name:var(--font-lora)] text-sm text-[#6B7280] mb-6">
          Phân tích Đa chiều về Tình mẫu tử và Quá trình Trưởng thành
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-6 opacity-50" />

        {/* Copyright */}
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          © 2026 · Báo cáo Nghiên cứu Học thuật · Mọi quyền được bảo lưu
        </p>
        <p className="text-xs text-[#9CA3AF] mt-1 opacity-60">
          Nội dung được biên soạn cho mục đích học thuật và nghiên cứu
        </p>
      </div>
    </footer>
  );
}
