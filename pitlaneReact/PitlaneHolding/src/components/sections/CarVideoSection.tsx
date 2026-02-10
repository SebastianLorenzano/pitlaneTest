import { useEffect, useRef, useState } from "react";
import SectionStage from "../animation/car_animation/SectionStage";

interface CarVideoSectionProps {
  videoSrc: string;
}

export default function CarVideoSection({ videoSrc }: CarVideoSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          video.currentTime = 0;
          setEnded(false);
          video.play();
        } else {
          //  Pausa cuando deja de verse
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Detecta cuando el video termina
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onended = () => {
      setEnded(true); 
    };
  }, []);

  return (
  <section
    id="download"
    ref={sectionRef}
    className="relative w-full h-[90vh] overflow-hidden transition-colors duration-1000"
    style={{
      backgroundColor: ended ? "var(--color-primary)" : "black",
    }}
  >

    {/*  Capa azul translúcida — AHORA ENCIMA DEL VIDEO */}
    <div
      className="absolute inset-0 z-[4] pointer-events-none"
      style={{ backgroundColor: "rgba(13,44,83,0.4)" }}
    />

    {/*  VIDEO */}
    <video
      ref={videoRef}
      src={videoSrc}
      muted
      playsInline
      preload="auto"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-[3] ${
        ended ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    />

    {/* Contenido post-video */}
    {ended && (
      <div className="absolute inset-0 flex items-center justify-center z-[5]">
        <SectionStage visible={true} animation="pop" animation_duration={0.6} />
      </div>
    )}
  </section>
);



}
