import { useEffect, useRef, useState } from 'react'

const VIDEO_ID = 'oR1-UFrcZ0k'
const START_TIME = 55
const END_TIME = 115

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onStateChange?: (event: { data: number }) => void
          }
        }
      ) => { seekTo: (seconds: number, allowSeekAhead: boolean) => void; loadVideoById: (options: { videoId: string; startSeconds: number; endSeconds: number }) => void }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

const YT_PLAYER_STATE_ENDED = 0

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReturnType<typeof window.YT.Player> | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const initPlayer = () => {
      if (!window.YT?.Player) return

      const playerDiv = document.getElementById('youtube-player')
      if (!playerDiv) return

      const player = new window.YT.Player('youtube-player', {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          start: START_TIME,
          end: END_TIME,
        },
        events: {
          onStateChange: (event: { data: number }) => {
            if (event.data === YT_PLAYER_STATE_ENDED) {
              player.loadVideoById({
                videoId: VIDEO_ID,
                startSeconds: START_TIME,
                endSeconds: END_TIME,
              })
            }
          },
        },
      })

      playerRef.current = player
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      window.onYouTubeIframeAPIReady = undefined
    }
  }, [isVisible])

  return (
    <section className="section video-section" ref={containerRef}>
      <h2 className="section-title">WATCH</h2>
      <div className="video-container">
        {isVisible ? (
          <div id="youtube-player" className="video-iframe" />
        ) : (
          <div className="video-placeholder">
            <p>Scroll to play</p>
          </div>
        )}
      </div>
    </section>
  )
}
