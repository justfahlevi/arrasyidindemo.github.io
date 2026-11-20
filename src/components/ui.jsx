import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'
import { t, fadeUp, STEP } from '../motion'

const MotionLink = motion(Link)

/** ARA/Button - outline. Hover fill is CSS (160ms), press is a spring to 97%. */
export function Btn({ to, href, children, className = '', onClick, type, newTab }) {
  const common = { className: `btn ${className}`, whileTap: { scale: 0.97 }, transition: t.press }
  if (to) return <MotionLink to={to} {...common}>{children}</MotionLink>
  if (href) return <motion.a href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noreferrer' : undefined} {...common}>{children}</motion.a>
  return <motion.button type={type || 'button'} onClick={onClick} {...common}>{children}</motion.button>
}

/** Fade-up once when scrolled into view. */
export function Reveal({ as = 'div', children, delay = 0, className, style, amount = 0.2 }) {
  const M = motion[as]
  return (
    <M className={className} style={style} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount }} transition={{ ...t.slow, delay }}>
      {children}
    </M>
  )
}

/** Container that staggers its <RevealItem> children. */
export function Stagger({ as = 'div', children, className, style, amount = 0.15 }) {
  const M = motion[as]
  return (
    <M className={className} style={style} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={{ hidden: {}, show: { transition: { staggerChildren: STEP * 1.5 } } }}>
      {children}
    </M>
  )
}
export function RevealItem({ as = 'div', children, className, style, ...rest }) {
  const M = motion[as]
  return <M className={className} style={style} variants={fadeUp} {...rest}>{children}</M>
}

/** "100M+" → counts up from 0 when visible, keeping prefix/suffix and decimals. */
export function CountUp({ value, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const m = String(value).match(/^([^\d]*)([\d.]+)(.*)$/)
  const [display, setDisplay] = useState(m ? `${m[1]}0${m[3]}` : value)
  useEffect(() => {
    if (!inView || !m) return
    const target = parseFloat(m[2])
    const decimals = (m[2].split('.')[1] || '').length
    const controls = animate(0, target, {
      duration: 1.4, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${m[1]}${v.toFixed(decimals)}${m[3]}`),
    })
    return () => controls.stop()
  }, [inView])
  return <span ref={ref} className={className}>{display}</span>
}

/** Horizontal drag-to-scroll for carousels (mouse); touch scrolls natively. */
export function useDragScroll() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let down = false, startX = 0, startLeft = 0, moved = false
    const onDown = (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft }
    const onMove = (e) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 4) { moved = true; el.classList.add('dragging') } el.scrollLeft = startLeft - dx }
    const onUp = () => { down = false; el.classList.remove('dragging') }
    const onClick = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false } }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('click', onClick, true)
    return () => { el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); el.removeEventListener('click', onClick, true) }
  }, [])
  return ref
}
