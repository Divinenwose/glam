import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  animate,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise (or slide) into view once, with optional delay. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.8,
  className = '',
  as = 'div',
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Container that staggers its <StaggerItem> children as it scrolls into view. */
export function Stagger({ children, className = '', gap = 0.1, delay = 0, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 30, ...rest }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Headline whose words rise into place one after another. */
export function SplitWords({ text, className = '', delay = 0, stagger = 0.07 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Counts up to `to` the first time it is visible. */
export function Counter({ to, decimals = 0, suffix = '', prefix = '', duration = 2.2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

/** Infinite horizontal scroller. Pauses on hover. */
export function Marquee({ children, speed = 40, className = '', reverse = false }) {
  return (
    <div className={`marquee ${className}`} style={{ '--marquee-speed': `${speed}s` }}>
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

/** Card with a soft gold spotlight that follows the cursor. */
export function SpotlightCard({ children, className = '', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </div>
  )
}

/** Thin gold progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-burgundy-500 via-gold-400 to-gold-200"
    />
  )
}

/** Gentle vertical parallax on scroll. */
export function Parallax({ children, offset = 40, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useMotionValue(0)
  useEffect(() => {
    return scrollYProgress.on('change', (p) => y.set((p - 0.5) * -2 * offset))
  }, [scrollYProgress, offset, y])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/** Continuous gentle float. */
export function Float({ children, amplitude = 12, duration = 6, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Floating gold sparkles / particles used as hero ambience. */
export function Sparkles({ count = 18 }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  const dots = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280
    const r = (n) => ((seed * (n + 1)) % 1000) / 1000
    return {
      left: `${r(1) * 100}%`,
      top: `${r(2) * 100}%`,
      size: 2 + r(3) * 4,
      delay: r(4) * 6,
      duration: 5 + r(5) * 7,
    }
  })
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute bg-gold-300"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            filter: 'drop-shadow(0 0 6px rgba(240,202,89,0.9))',
          }}
          animate={{ y: [0, -34, 0], opacity: [0, 0.9, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
