import { useState, useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { motion } from '../lib/motion'

interface Partner {
  name: string
  /** A logo cropped to its mark, with no padding of its own (public/partners). */
  logo: string
  /** The cropped file's width and height in pixels. */
  size: [number, number]
  /** Extra weight for a mark drawn in hairlines, which reads lighter at the same size. */
  boost?: number
}

/**
 * Every logo gets the same area rather than the same height, within the
 * cell. Same-height logos made a square badge loom over a long wordmark, and
 * same-width ones did the opposite; equal area is what reads as equal size.
 */
const fit = ([w, h]: [number, number], area: number, maxW: number, maxH: number, boost = 1) => {
  const ratio = w / h
  const width = Math.sqrt(area * boost * ratio)
  const height = Math.sqrt((area * boost) / ratio)
  const k = Math.min(1, maxW / width, maxH / height)
  return { width: Math.round(width * k), height: Math.round(height * k) }
}

interface PartnerCarouselProps {
  partners: Partner[]
  direction: 'left' | 'right'
  speed?: number
}

const PartnerCarousel = ({ partners, direction, speed = 30 }: PartnerCarouselProps) => {
  const reduceMotion = useReducedMotion()
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const currentXRef = useRef(0)
  const isDraggingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragOffsetRef = useRef(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const seamlessPartners = [...partners, ...partners, ...partners]

  const ITEM_WIDTH = isMobile ? 121 : 180
  const GAP = isMobile ? 52 : 76
  const TOTAL_ITEM_WIDTH = ITEM_WIDTH + GAP
  const singleSetWidth = partners.length * TOTAL_ITEM_WIDTH

  const normalizePosition = useCallback((x: number) => {
    let normalized = x
    if (normalized <= -singleSetWidth * 2) {
      normalized = normalized + singleSetWidth
    } else if (normalized >= 0) {
      normalized = normalized - singleSetWidth
    }
    return normalized
  }, [singleSetWidth])

  const updateTransform = useCallback((x: number) => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${x}px)`
    }
  }, [])

  useEffect(() => {
    currentXRef.current = -singleSetWidth
    updateTransform(-singleSetWidth)
    setIsInitialized(true)
  }, [singleSetWidth, updateTransform])

  useEffect(() => {
    if (!isInitialized || reduceMotion) return

    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (isDraggingRef.current || isHoveredRef.current) {
        lastTime = currentTime
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      const moveDistance = (deltaTime / speed) * 1
      let newX = currentXRef.current

      if (direction === 'left') {
        newX = newX - moveDistance
      } else {
        newX = newX + moveDistance
      }

      newX = normalizePosition(newX)
      currentXRef.current = newX
      updateTransform(newX)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInitialized, reduceMotion, direction, speed, normalizePosition, updateTransform])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragOffsetRef.current = 0
    wrapperRef.current?.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return

    const delta = e.clientX - dragStartXRef.current
    dragOffsetRef.current = delta
    const newX = normalizePosition(currentXRef.current + delta)
    updateTransform(newX)
  }, [normalizePosition, updateTransform])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return

    wrapperRef.current?.releasePointerCapture(e.pointerId)

    const finalX = normalizePosition(currentXRef.current + dragOffsetRef.current)
    currentXRef.current = finalX
    isDraggingRef.current = false
  }, [normalizePosition])

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden w-full cursor-grab active:cursor-grabbing select-none"
      style={{
        touchAction: 'pan-y',
        // Fade the track out before the clip, over most of a logo's width, so
        // one is never left half-drawn and sharp at the edge.
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        className="flex items-center will-change-transform"
        style={{ gap: `${GAP}px`, transform: `translateX(${-singleSetWidth}px)` }}
      >
        {seamlessPartners.map((partner, index) => {
          const { width, height } = isMobile
            ? fit(partner.size, 1500, ITEM_WIDTH - 24, 46, partner.boost)
            : fit(partner.size, 3000, ITEM_WIDTH - 24, 64, partner.boost)
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: `${ITEM_WIDTH}px`, height: isMobile ? '77px' : '96px' }}
            >
              <img
                src={partner.logo}
                alt={index < partners.length ? partner.name : ''}
                width={width}
                height={height}
                loading="lazy"
                className="object-contain !mx-0"
                style={{ width, height }}
                draggable={false}
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default PartnerCarousel