"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tiến độ đọc"
      />

      {/* Back to top button */}
      <button
        className={`fixed right-8 bottom-8 w-11 h-11 max-sm:right-5 max-sm:bottom-5 max-sm:w-10 max-sm:h-10 rounded-full bg-[#7B2D3B] hover:bg-[#9B3A4A] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(123,45,59,0.3)] hover:shadow-[0_6px_16px_rgba(123,45,59,0.4)] cursor-pointer transition-all duration-300 z-30 border-none ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Quay lại đầu trang"
        id="back-to-top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
