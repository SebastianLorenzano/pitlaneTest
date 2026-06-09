import React, { useEffect, useRef, useState } from "react"

interface FeatureCardProps {
  Icon: React.ComponentType<{ className?: string }>
  text: React.ReactNode
  className?: string
  details?: React.ReactNode
  autoOpenOnScroll?: boolean
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  text,
  className = "",
  details,
  autoOpenOnScroll = false
}) => {
  const [open, setOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoOpenOnScroll) {
      return
    }

    const card = cardRef.current

    if (!card) {
      return
    }

    const observer = new IntersectionObserver(
      function (entries) {
        const entry = entries[0]

        if (entry.isIntersecting) {
          setOpen(true)
        } else {
          setOpen(false)
        }
      },
      {
        threshold: 0.45,
        rootMargin: "-10% 0px -10% 0px"
      }
    )

    observer.observe(card)

    return function () {
      observer.unobserve(card)
    }
  }, [autoOpenOnScroll])

  function handleClick(): void {
    setOpen(!open)
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`
        ${className}
        cursor-pointer transition-all duration-300
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
      <div
        className={`
          font-semibold text-center transition-colors duration-300
          ${open ? "text-[#00CA73]" : "text-[#C4C6C9]"}
          group-hover:text-[#00CA73]
        `}
      >
        {text}
      </div>

      {/* Expandable details */}
      {details && (
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out text-sm
            text-[var(--color-text-muted)]
            ${open ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0 pointer-events-none"}
          `}
        >
          <p className="leading-relaxed px-2">{details}</p>
        </div>
      )}
    </div>
  )
}

export default FeatureCard