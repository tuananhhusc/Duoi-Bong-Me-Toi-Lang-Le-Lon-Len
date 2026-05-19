export function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z"
          fill="#D4AF37"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export function CrossDivider() {
  return (
    <div className="flex items-center justify-center my-8" aria-hidden="true">
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-15"
      >
        <rect x="10" y="0" width="4" height="32" fill="#7B2D3B" />
        <rect x="2" y="8" width="20" height="4" fill="#7B2D3B" />
      </svg>
    </div>
  );
}
