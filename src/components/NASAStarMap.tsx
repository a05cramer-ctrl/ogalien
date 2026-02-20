import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const VIEW_SIZE = 1000
const CENTER = VIEW_SIZE / 2

// Orbital radii in AU (approximate)
const PLANETS = [
  { name: 'Mercury', au: 0.39 },
  { name: 'Venus', au: 0.72 },
  { name: 'Earth', au: 1.0 },
  { name: 'Mars', au: 1.52 },
  { name: 'Jupiter', au: 5.2 },
  { name: 'Saturn', au: 9.5 },
  { name: 'Uranus', au: 19.2 },
  { name: 'Neptune', au: 30.1 },
] as const

// Scale: 1 AU ≈ 12px for default view (Neptune ~360px from center)
const AU_TO_PX = 12

const ET_PLANET_X = 420
const ET_PLANET_Y = 120
const NEPTUNE_R = auToRadius(30.1)

function auToRadius(au: number) {
  return au * AU_TO_PX
}

export function NASAStarMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const lastWheelRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 })

  const minScale = 0.08
  const maxScale = 3.5

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    }
  }, [pan.x, pan.y])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return
      setPan({
        x: dragStartRef.current.panX + e.clientX - dragStartRef.current.x,
        y: dragStartRef.current.panY + e.clientY - dragStartRef.current.y,
      })
    },
    []
  )

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  useEffect(() => {
    const onUp = () => { isDraggingRef.current = false }
    window.addEventListener('mouseup', onUp)
    return () => window.removeEventListener('mouseup', onUp)
  }, [])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = -e.deltaY * 0.001
      const now = Date.now()
      if (now - lastWheelRef.current < 16) return
      lastWheelRef.current = now

      setScale((s) => Math.min(maxScale, Math.max(minScale, s + delta)))
    },
    [minScale, maxScale]
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const preventScroll = (e: WheelEvent) => e.preventDefault()
    el.addEventListener('wheel', preventScroll, { passive: false })
    return () => el.removeEventListener('wheel', preventScroll)
  }, [])

  const showGrid = scale < 0.4
  const showStarField = scale < 0.5
  const showSolarSystemLabel = scale < 0.35
  const showEarthFocus = scale > 2

  // Star field (when zoomed out) - stable positions
  const stars = useMemo(() => {
    const s: Array<{ x: number; y: number; size: number }> = []
    const rng = (seed: number) => ((seed * 9301 + 49297) % 233280) / 233280
    for (let i = 0; i < 120; i++) {
      s.push({
        x: (rng(i) - 0.5) * VIEW_SIZE * 2.5,
        y: (rng(i + 100) - 0.5) * VIEW_SIZE * 2.5,
        size: rng(i + 200) * 0.4 + 0.3,
      })
    }
    return s
  }, [])

  const transform = `translate(${CENTER + pan.x}, ${CENTER + pan.y}) scale(${scale}) translate(${-CENTER}, ${-CENTER})`

  return (
    <section className="section nasa-star-map-section">
      <h2 className="section-title">HOME</h2>
      <div
        ref={containerRef}
        className="nasa-star-map-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="nasa-star-map"
        >
          <rect width={VIEW_SIZE} height={VIEW_SIZE} fill="#000" />

          {/* Grid lines (zoomed out) */}
          {showGrid && (
            <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.3">
              {[-2, -1, 0, 1, 2].map((i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={CENTER + i * 200}
                  x2={VIEW_SIZE}
                  y2={CENTER + i * 200}
                />
              ))}
              {[-2, -1, 0, 1, 2].map((i) => (
                <line
                  key={`v${i}`}
                  x1={CENTER + i * 200}
                  y1={0}
                  x2={CENTER + i * 200}
                  y2={VIEW_SIZE}
                />
              ))}
            </g>
          )}

          {/* Coordinate markings */}
          {showGrid && (
            <g fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="system-ui, sans-serif">
              {[-2, -1, 0, 1, 2].map((i) => (
                <text key={`cx${i}`} x={CENTER + i * 200} y={CENTER - 8} textAnchor="middle">
                  {i === 0 ? '0' : `${i * 2}k AU`}
                </text>
              ))}
            </g>
          )}

          {/* Star field */}
          {showStarField &&
            stars.map((s, i) => (
              <circle key={i} cx={s.x + CENTER} cy={s.y + CENTER} r={s.size} fill="#fff" opacity="0.9" />
            ))}

          <g transform={transform}>
            {/* E.T Planet trajectory (dotted line from Neptune) */}
            <path
              d={`M ${CENTER + NEPTUNE_R} ${CENTER} 
                  Q ${CENTER + NEPTUNE_R + 100} ${CENTER - 80} ${ET_PLANET_X} ${ET_PLANET_Y}`}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.6"
              strokeDasharray="3 4"
            />

            {/* E.T Planet */}
            <g transform={`translate(${ET_PLANET_X}, ${ET_PLANET_Y})`}>
              <circle r="4" fill="#e8d5b7" />
              <text
                y="14"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="9"
                fontFamily="system-ui, sans-serif"
              >
                E.T Planet
              </text>
            </g>

            {/* Orbital rings */}
            {PLANETS.map((planet) => {
              const r = auToRadius(planet.au)
              return (
                <circle
                  key={planet.name}
                  cx={CENTER}
                  cy={CENTER}
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.5"
                />
              )
            })}

            {/* Sun */}
            <circle cx={CENTER} cy={CENTER} r="6" fill="#fff" />
            <text
              x={CENTER}
              y={CENTER - 14}
              textAnchor="middle"
              fill="rgba(255,255,255,0.8)"
              fontSize="8"
              fontFamily="system-ui, sans-serif"
            >
              Sun
            </text>

            {/* Planets */}
            {PLANETS.map((planet) => (
              <g key={planet.name} transform={`translate(${CENTER + auToRadius(planet.au)}, ${CENTER})`}>
                <circle r="2" fill="#fff" />
                <text
                  y="12"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="7"
                  fontFamily="system-ui, sans-serif"
                >
                  {planet.name}
                </text>
              </g>
            ))}

            {/* Solar System label (zoomed out) */}
            {showSolarSystemLabel && (
              <text
                x={CENTER}
                y={CENTER + auToRadius(35)}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="10"
                fontFamily="system-ui, sans-serif"
              >
                Solar System
              </text>
            )}
          </g>

          {/* Earth focus overlay (zoomed in) */}
          {showEarthFocus && (
            <g transform={transform}>
              <circle
                cx={CENTER}
                cy={CENTER}
                r={auToRadius(1) + 20}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <text
                x={CENTER + auToRadius(1) + 25}
                y={CENTER}
                fill="rgba(255,255,255,0.6)"
                fontSize="8"
                fontFamily="system-ui, sans-serif"
              >
                1.0 AU
              </text>
              <text
                x={CENTER}
                y={CENTER - auToRadius(1) - 25}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="7"
                fontFamily="system-ui, sans-serif"
              >
                Earth orbital path
              </text>
              <text
                x={CENTER}
                y={CENTER + auToRadius(1) + 35}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="6"
                fontFamily="system-ui, sans-serif"
              >
                Mission trajectory
              </text>
            </g>
          )}
        </svg>
      </div>
      <p className="nasa-star-map-hint">Scroll to zoom · Drag to pan</p>
    </section>
  )
}
