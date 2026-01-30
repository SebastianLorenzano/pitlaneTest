import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

import "swiper/css"
import "swiper/css/pagination"

type YouTubeItem = {
  id: string
  youtubeId: string
}

interface Props {
  items: YouTubeItem[]
}

function buildYouTubeEmbedUrl(id: string): string {
  const params = new URLSearchParams({
    autoplay: "0",
    controls: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1"
  })

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

function stopIframe(iframe: HTMLIFrameElement | null): void {
  if (!iframe) return
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func: "stopVideo", args: [] }),
    "*"
  )
}

export default function YouTubeCarousel({ items }: Props): React.JSX.Element {
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({})
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  const paginationRef = useRef<HTMLDivElement | null>(null)

  const stopAll = () => {
    items.forEach((v) => stopIframe(iframeRefs.current[v.id]))
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-10">
      {/* LEFT ARROW */}
      <button
        ref={prevRef}
        aria-label="Previous video"
        className="
          absolute left-0 top-1/2 -translate-x-[calc(100%+1.5rem)] -translate-y-1/2
          h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2
          border-[var(--color-primary-neon)] text-[var(--color-primary-neon)]
          bg-black/30 backdrop-blur transition-all duration-300
          hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)]
          hover:shadow-[0_0_30px_rgba(0,255,255,0.35)] active:scale-95 z-10
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        ref={nextRef}
        aria-label="Next video"
        className="
          absolute right-0 top-1/2 translate-x-[calc(100%+1.5rem)] -translate-y-1/2
          h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2
          border-[var(--color-primary-neon)] text-[var(--color-primary-neon)]
          bg-black/30 backdrop-blur transition-all duration-300
          hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)]
          hover:shadow-[0_0_30px_rgba(0,255,255,0.35)] active:scale-95 z-10
        "
      >
        ›
      </button>

      {/* VIDEO CARD */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          loop
          watchSlidesProgress
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
            renderBullet: (_index, className) => {
              return `<span class="${className} pitlane-line"></span>`
            }
          }}
          onBeforeInit={(swiper) => {
            const nav = swiper.params.navigation
            if (nav && typeof nav !== "boolean") {
              nav.prevEl = prevRef.current
              nav.nextEl = nextRef.current
            }

            const pag = swiper.params.pagination
            if (pag && typeof pag !== "boolean") {
              pag.el = paginationRef.current
            }
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper

            // IMPORTANT: bind once after refs exist (prevents "double next" skipping)
            setTimeout(() => {
              if (!prevRef.current || !nextRef.current || !paginationRef.current) return

              const nav = swiper.params.navigation
              if (nav && typeof nav !== "boolean") {
                nav.prevEl = prevRef.current
                nav.nextEl = nextRef.current
              }

              const pag = swiper.params.pagination
              if (pag && typeof pag !== "boolean") {
                pag.el = paginationRef.current
              }

              swiper.navigation.destroy()
              swiper.navigation.init()
              swiper.navigation.update()

              swiper.pagination.destroy()
              swiper.pagination.init()
              swiper.pagination.render()
              swiper.pagination.update()
            }, 0)
          }}
          onSlideChange={stopAll}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="aspect-video bg-black">
                <iframe
                  ref={(el) => {
                    iframeRefs.current[item.id] = el
                  }}
                  className="w-full h-full"
                  src={buildYouTubeEmbedUrl(item.youtubeId)}
                  title="YouTube video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Custom pagination BELOW the video */}
        <div className="pitlane-pagination-wrap">
          <div ref={paginationRef} className="pitlane-pagination" />
        </div>
      </div>
    </div>
  )
}
