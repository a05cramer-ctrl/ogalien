import { useEffect, useRef, useState } from 'react'

export function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="mouse-glow"
      style={{
        background: `radial-gradient(
          circle 450px at ${position.x}px ${position.y}px,
          rgba(218, 165, 32, 0.1) 0%,
          rgba(184, 134, 11, 0.05) 35%,
          transparent 70%
        )`,
      }}
      aria-hidden
    />
  )
}
