import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type VideoItem = {
  id: string
  srcMp4: string
  srcWebm?: string
  poster?: string
  title?: string
}

interface VideoCarouselProps {
  items: VideoItem[]
}

export default function VideoCarousel({ items }: VideoCarouselProps): React.JSX.Element {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  const pauseAll = () => {
    Object.values(videoRefs.current).forEach((v) => {
      if (!v) return
      v.pause()
      // optional: rewind when leaving the slide
      v.currentTime = 0
    })
  }

  useEffect(() => {
    return () => pauseAll()
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        onSlideChange={pauseAll}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 shadow-lg">
              <div className="aspect-video bg-black">
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el
                  }}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  // if you want autoplay per slide, add:
                  // muted
                  // autoPlay
                  // loop
                  poster={item.poster}
                >
                  {item.srcWebm ? <source src={item.srcWebm} type="video/webm" /> : null}
                  <source src={item.srcMp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {item.title ? (
                <div className="px-3 py-2 text-sm text-[var(--color-text-muted)]">
                  {item.title}
                </div>
              ) : null}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
