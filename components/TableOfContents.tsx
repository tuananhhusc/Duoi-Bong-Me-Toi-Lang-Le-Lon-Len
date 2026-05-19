"use client";

import { useState, useEffect, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
        setIsDrawerOpen(false);
      }
    },
    []
  );

  // Close drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const tocContent = (
    <nav aria-label="Mục lục">
      <h2 className="font-[family-name:var(--font-playfair)] text-sm font-semibold uppercase tracking-[0.15em] text-[#7B2D3B] mb-4 pb-3 border-b-2 border-[#D4AF37]">
        Mục lục
      </h2>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`toc-link ${item.level === 3 ? "toc-link-sub" : ""} ${
                activeId === item.id ? "active" : ""
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="toc-sidebar pr-4">{tocContent}</div>
      </aside>

      {/* Mobile TOC Toggle Button */}
      <button
        className="fixed bottom-24 right-8 w-11 h-11 max-sm:bottom-20 max-sm:right-5 max-sm:w-10 max-sm:h-10 rounded-full bg-[#1E3A5F] hover:bg-[#2A4F7F] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(30,58,95,0.3)] hover:shadow-[0_6px_16px_rgba(30,58,95,0.4)] cursor-pointer z-30 border-none transition-all duration-300 hover:-translate-y-0.5 lg:hidden"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Mở mục lục"
        id="toc-toggle"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
      </button>

      {/* Mobile Drawer Overlay */}
      <div
        className={`toc-drawer-overlay lg:hidden ${isDrawerOpen ? "open" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`toc-drawer lg:hidden ${isDrawerOpen ? "open" : ""}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#7B2D3B]">
              Mục lục
            </h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(123,45,59,0.08)] transition-colors"
              aria-label="Đóng mục lục"
              id="toc-close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="border-t-2 border-[#D4AF37] pt-4">
            <ul className="space-y-0.5">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`toc-link ${
                      item.level === 3 ? "toc-link-sub" : ""
                    } ${activeId === item.id ? "active" : ""}`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
