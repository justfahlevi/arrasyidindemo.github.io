import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoMark } from './Icons'
import { NAV_ITEMS } from '../links'
import { t, STEP, RISE } from '../motion'

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Ar Rasyidin Academy — home">
      <LogoMark />
      <span className="wm"><b>Ar Rasyidin</b> <span>Academy</span></span>
    </Link>
  )
}

/** Two lines that cross into an ✕ (Menu icon component, Menu ↔ Close). */
function MenuIcon({ open }) {
  return (
    <motion.svg width="22" height="22" viewBox="0 0 22 22" initial={false} animate={open ? 'close' : 'menu'} whileHover="hover">
      <motion.line x1="3" x2="19" y1="7.5" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        variants={{ menu: { y1: 7.5, y2: 7.5, rotate: 0 }, hover: { y1: 6, y2: 6 }, close: { y1: 11, y2: 11, rotate: 45 } }}
        style={{ originX: '50%', originY: '50%' }} transition={t.medium} />
      <motion.line x1="3" x2="19" y1="14.5" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        variants={{ menu: { y1: 14.5, y2: 14.5, rotate: 0 }, hover: { y1: 16, y2: 16 }, close: { y1: 11, y2: 11, rotate: -45 } }}
        style={{ originX: '50%', originY: '50%' }} transition={t.medium} />
    </motion.svg>
  )
}

export default function Nav({ tone = 'light' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const mode = tone === 'dark' && !scrolled ? 'dark' : 'light'

  return (
    <>
      <header className={`nav ${mode}`}>
        <div className="nav-bar">
          <Logo />
          <button className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <MenuIcon open={false} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mega" role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: t.medium }} exit={{ opacity: 0, transition: t.exit }}>
            <div className="nav-bar" style={{ marginTop: 8, width: '100%' }}>
              <Logo />
              <button className="menu-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
                <MenuIcon open />
              </button>
            </div>
            <motion.nav className="mega-links" initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: STEP, delayChildren: 0.05 } } }}>
              {NAV_ITEMS.map((item) => (
                <motion.div key={item.to} variants={{ hidden: { opacity: 0, y: RISE() }, show: { opacity: 1, y: 0, transition: t.medium } }}>
                  <motion.span style={{ display: 'inline-block' }} whileHover={{ x: -12 }} transition={t.quick}>
                    <Link to={item.to} className={`mega-link ${pathname === item.to ? 'current' : ''}`}>{item.label}</Link>
                  </motion.span>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
