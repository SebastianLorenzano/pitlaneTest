import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import backgroundImage from "../../assets/img/background1.png";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQSection(): React.ReactElement {
  var translation = useTranslation();
  var t = translation.t;

  var items = t("faq.items", { returnObjects: true }) as FAQItem[];

  var [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number): void {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  }

  function preventFocus(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
  }

  return (
    <section className="relative overflow-hidden font-orbitron w-full py-24">
      {/* Background (same as Hero) */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      {/* Blue transparent overlay (same as Hero) */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/70 z-[-10]" />

      {/* Content */}
      <div className="relative z-10 text-[var(--color-text-muted)] px-4">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header (same vibe as Hero: centered + clean) */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              {t("faq.title")}
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)]/70">
              {t("faq.subtitle")}
            </p>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {items.map(function (item, index) {
              var isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-[var(--color-primary-neon)]/35
                             bg-[var(--color-primary)]/20 backdrop-blur-md
                             shadow-lg"
                >
                  {/* Header Button (styled like Hero buttons) */}
                  <button
                    type="button"
                    onMouseDown={preventFocus}
                    onClick={function () {
                      toggle(index);
                    }}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left
                               rounded-2xl transition-all duration-300
                               hover:border-[var(--color-primary-neon)]
                               hover:bg-[var(--color-primary)]/30"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[var(--color-text-muted)]">
                      {item.question}
                    </span>

                    {/* Plus icon (neon + animated like your hover scaling) */}
                    <span
                      className={[
                        "grid place-items-center h-9 w-9 rounded-lg border-2",
                        "border-[var(--color-primary-neon)] text-[var(--color-primary-neon)]",
                        "transition-all duration-300",
                        "hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)]",
                        isOpen ? "rotate-45" : "rotate-0"
                      ].join(" ")}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer (smooth open/close) */}
                  <div
                    className={[
                      "overflow-hidden transition-all duration-300 px-5 sm:px-6",
                      isOpen ? "max-h-56 pb-6" : "max-h-0"
                    ].join(" ")}
                  >
                    <p className="text-sm sm:text-base text-[var(--color-text-muted)]/75 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional CTA row (Hero-like buttons) */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border-2 border-[var(--color-primary-neon)] text-[var(--color-primary-neon)] 
                         font-semibold shadow-lg hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)] 
                         hover:scale-105 transition-all duration-300"
            >
              {t("navbar.contact")}
            </a>

            <a
              href="#download"
              className="px-6 py-3 rounded-lg bg-[var(--color-primary-neon)] text-[var(--color-primary)] font-semibold 
                         shadow-lg hover:scale-105 transition-all duration-300"
            >
              {t("navbar.download")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
