// CarStage.tsx
import { Parallax } from "react-scroll-parallax"
import car from '../../../assets/img/car_anim.png' 

interface CarStageProps {
  startParallax: boolean
  visible: boolean
  carRef: React.RefObject<HTMLImageElement | null>
}

export default function CarStage({ startParallax, visible, carRef }: CarStageProps) {
  return (
    <div
      className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <Parallax translateX={startParallax ? [-200, 500] : [0, 0]} className="z-10 relative">
        <div className="relative">
          {/* {startParallax && (
            <div className="absolute -left-20 bottom-5 w-40 h-20 bg-gray-400/40 rounded-full blur-2xl animate-smokeFade" />
          )} */}
          {startParallax && (
            <div className="absolute -left-20 bottom-5 w-40 h-20 bg-gray-400/40 rounded-full blur-2xl ground-shadow" />
          )}

          <img
            ref={carRef}
            src={car}
            alt="Racing car"
            style={{ willChange: "transform, filter", transform: "translateZ(0)" }}
            // className="w-[70vw] md:w-[60vw] lg:w-[70vw] max-w-[90vw]"
            className={`w-[70vw] md:w-[60vw] lg:w-[70vw] max-w-[90vw] 
              ${startParallax ? "speed-blur camera-shake" : ""}`}
          />
        </div>
      </Parallax>
    </div>
  )
}
