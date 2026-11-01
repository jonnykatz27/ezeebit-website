import { useState, useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { motion } from '../lib/motion'

interface Partner {
  name: string
  logo: string
  scale?: number
  mobileScale?: number
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
        // Fade the track out before the clip, so a logo is not cut off mid-mark.
        maskImage: 'linear-gradient(to right, transparent, #000 2.75rem, #000 calc(100% - 2.75rem), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 2.75rem, #000 calc(100% - 2.75rem), transparent)',
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
        {seamlessPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center overflow-hidden p-3"
            style={{ width: `${ITEM_WIDTH}px`, height: isMobile ? '77px' : '96px' }}
          >
            {/*
              One box for every logo, object-contain, no per-logo scale.
              Scaling past the box was clipping marks and making neighbours
              different sizes.
            */}
            <img
              src={partner.logo}
              alt={index < partners.length ? partner.name : ''}
              width={isMobile ? 120 : 160}
              height={isMobile ? 48 : 56}
              loading="lazy"
              className="object-contain !mx-0 h-10 md:h-12 w-auto max-w-full"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default PartnerCarousel