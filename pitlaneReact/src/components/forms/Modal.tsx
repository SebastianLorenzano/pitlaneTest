import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  errors?: Record<string, string>;
  onClose: () => void;
  type?: "success" | "error" | "warning";
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  message,
  errors,
  onClose,
  type = "success",
}) => {
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal target exists (important for SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(false);
    }
  }, [open]);

  // Block background scroll completely
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  const color =
    type === "success"
      ? "text-green-400"
      : type === "warning"
      ? "text-yellow-400"
      : "text-red-400";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* BACKDROP — blocks all interaction */}
      <div
        className={`
          absolute inset-0 bg-black/70 backdrop-blur-sm
          transition-opacity duration-300
          ${animate ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`
          relative z-10 bg-[#0e1a29] text-white
          w-[90%] max-w-md p-6 rounded-xl
          border border-[#15415c]
          shadow-[0_0_50px_rgba(0,0,0,0.8)]
          transform transition-all duration-300 ease-out
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        role="dialog"
        aria-modal="true"
      >
        <h3 className={`text-xl font-semibold mb-2 ${color}`}>
          {title}
        </h3>

        <p className="text-sm text-gray-200 mb-4">
          {message}
        </p>

        {errors && Object.keys(errors).length > 0 && (
          <ul className="text-red-300 text-sm mb-4 list-disc pl-5">
            {Object.entries(errors).map(([field, msg]) => (
              <li key={field}>{msg}</li>
            ))}
          </ul>
        )}

        <button
          className="w-full mt-2 py-2 bg-[#12374d] hover:bg-[#1a4e68] transition rounded-lg text-sm font-medium"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
