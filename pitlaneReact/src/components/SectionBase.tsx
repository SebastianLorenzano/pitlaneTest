import React from "react";

interface SectionBaseProps {
  title: string;
  buttonText: string;
  buttonLink?: string;
  
  onClick?: () => void;
}

const SectionBase: React.FC<SectionBaseProps> = ({ title, buttonText, buttonLink, onClick }) => {
  return (
    <section
      className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20]"
    >
      <h2 className="text-4xl md:text-5xl font-orbitron text-[var(--color-text-muted)]  mb-10 tracking-wide">
        {title}
      </h2>

      {buttonLink ? (
        <a
          href={buttonLink}
          download
          className="px-8 py-4 bg-[var(--primary-color,#3db2ff)] text-[var(--color-text-muted)] font-orbitron text-lg rounded-md 
                     transition-transform transform hover:scale-[1.05] hover:bg-[var(--primary-hover,#29a1f5)] hover:shadow-lg"
        >
          {buttonText}
        </a>
      ) : (
        <button
          onClick={onClick}
          className="px-8 py-4 bg-[var(--primary-color,#3db2ff)] text-[var(--color-text-muted)]  font-semibold text-lg rounded-md 
                     transition-transform transform hover:scale-[1.05] hover:bg-[var(--primary-hover,#29a1f5)] hover:shadow-lg"
        >
          {buttonText}
        </button>
      )}
    </section>
  );
};

export default SectionBase;