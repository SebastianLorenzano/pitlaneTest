import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type CarouselImage = {
  id: string
  src: string
  alt: string
}

interface Props {
  images: CarouselImage[]
}

export default function ImageCarousel({ images }: Props): React.JSX.Element {
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    return () => {
      swiperRef.current = null
    }
  }, [])

  if (!Array.isArray(images) || images.length === 0) {
    return <div />
  }

  return (
    <div
      className="
        w-full overflow-hidden rounded-2xl
        border border-[var(--color-border)]/30
        bg-[var(--color-panel)]/10 backdrop-blur-md
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
    >
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        onSwiper={(s) => {
          swiperRef.current = s
        }}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={12}
        slidesPerView={1}
        loop={images.length > 1}
        className="w-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="relative w-full aspect-[21/9]">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Optional gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
