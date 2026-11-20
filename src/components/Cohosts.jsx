import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from '../motion'
import { RevealItem } from './ui'
import { COHOSTS } from '../data'

/** Co-host rows. Clicking a row opens a pop-up with that co-host's name, title and write-up. */
export function CohostList({ photos = true }) {
  const [open, setOpen] = useState(null)
  return (
    <>
      {COHOSTS.map((c) => (
        <RevealItem as="button" type="button" className="cohost" key={c.name} onClick={() => setOpen(c)} aria-haspopup="dialog">
          {photos ? <img src={c.img} alt="" /> : <span className="dot" />}
          <span className="n">{c.name}</span>
          <span className="r">{c.title} · {c.role}</span>
        </RevealItem>
      ))}
      {createPortal(
        <AnimatePresence>{open && <CohostModal c={open} onClose={() => setOpen(null)} />}</AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function CohostModal({ c, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div className="cohost-modal" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: t.medium }} exit={{ opacity: 0, transition: t.exit }}>
      <motion.div
        className="cohost-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cohost-modal-name"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: t.slow }}
        exit={{ opacity: 0, y: 12, transition: t.exit }}
      >
        <button ref={closeRef} type="button" className="cohost-modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
        <img className="cohost-modal-photo" src={c.img} alt="" />
        <h3 id="cohost-modal-name" className="cohost-modal-name">{c.name}</h3>
        <div className="cohost-modal-title">{c.title}</div>
        <p className="cohost-modal-bio">{c.bio}</p>
      </motion.div>
    </motion.div>
  )
}
