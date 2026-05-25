import React, { useState } from "react";

interface FeatureCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  text: React.ReactNode;
  className?: string;
  details?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  text,
  className = "",
  details
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`
        ${className}
        cursor-pointer transition-all duration-300

        /* Border turns green when open */
        ${open ? "border-[var(--color-secondary)]" : "border-[var(--color-primary-neon)]"}
        hover:border-[var(--color-secondary)]
      `}
    >
      {/* Icon */}
      <Icon
        className={`
          text-6xl mb-4 transition-all duration-300
          ${open ? "text-[#00CA73]" : "text-cyan-300"}
          group-hover:text-[#00CA73]
        `}
      />

      {/* Title */}
      <p
        className={`
          font-semibold text-center transition-colors duration-300
          ${open ? "text-[#00CA73]" : "text-[#C4C6C9]"}
          group-hover:text-[#00CA73]
        `}
      >
        {text}
      </p>

      {/* Expandable details */}
      {details && (
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out text-sm mt-4
            text-[var(--color-text-muted)]
            max-h-40  /* Always reserve space */
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <p className="leading-relaxed px-2">{details}</p>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
