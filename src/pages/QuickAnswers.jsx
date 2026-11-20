import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from '../motion'
import { Btn, Reveal, Stagger, RevealItem } from '../components/ui'
import { EpisodeCard } from '../components/Cards'
import { SectionHead } from './Home'
import { PlayIcon } from '../components/Icons'
import { FEATURED_EPISODES, EPISODES } from '../data'
import { LINKS } from '../links'

const ANSWERS = [
  ['6:24', 'What does Islam say about discount cards?', 'Ustaz Dr Zaharuddin Abd Rahman'],
  ['8:10', 'Is buy now, pay later halal?', 'Ustaz Dr Zaharuddin Abd Rahman'],
  ['5:42', 'Can I use a credit card if I pay it off every month?', 'Dr Hanzalah Mizi'],
  ['4:48', 'Is cashback from e-wallets riba?', 'Ustaz Dr Zaharuddin Abd Rahman'],
  ['7:12', 'Can I take a home loan from a conventional bank?', 'Dr Hanzalah Mizi'],
  ['6:58', 'Do I pay zakat on my savings and gold?', 'Ustaz Dr Zaharuddin Abd Rahman'],
  ['7:30', 'Is it halal to invest in cryptocurrency?', 'Ustaz Dr Zaharuddin Abd Rahman'],
  ['9:05', 'Is it wrong to want to be rich?', 'Dr Azura Hashim'],
]

function Player({ playing, onToggle, total }) {
  return (
    <motion.div className="player" onClick={onToggle} layoutId="hero.media" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={t.slow}
      role="button" aria-label={playing ? 'Pause' : 'Play'}>
      <img src="img/player-zaharuddin.jpg" alt="" />
      <div className="shade" />
      <motion.span className="play" animate={{ opacity: playing ? 0 : 1, scale: playing ? 0.8 : 1 }} transition={t.medium}><PlayIcon size={16} /></motion.span>
      <div className="bar">
        <div className="track"><motion.div className="fill" initial={{ width: '18%' }} animate={{ width: playing ? '100%' : '18%' }} transition={playing ? { duration: 30, ease: 'linear' } : t.medium} /></div>
        <span>1:12 / {total}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="1.3"><path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" /></svg>
      </div>
    </motion.div>
  )
}

export default function QuickAnswers() {
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(0)
  const [time, title, who] = ANSWERS[active]
  return (
    <>
      <section className="container">
        <Player playing={playing} onToggle={() => setPlaying((p) => !p)} total={time} />
        <div className="qa-head">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t.medium}>
              <span className="chip light">Money, halal and haram</span>
              <h1>{title}</h1>
              <div className="qa-meta"><span>{who}</span><span>{parseInt(time)} min answer</span><span>In Bahasa Melayu</span></div>
            </motion.div>
          </AnimatePresence>
          <Btn href={LINKS.episode('ep52')} newTab>View Full Episode</Btn>
        </div>
        <div className="qa-body">
          <Reveal>
            <p className="desc">Membership and discount cards are everywhere, from petrol stations to pharmacies. In this six-minute answer from Episode 52, Ustaz Dr Zaharuddin explains when a card’s fee and its discount turn into riba, and which cards are safe to keep.</p>
            <div className="scholar">
              <img src="img/scholar-zaharuddin.jpg" alt="" />
              <div><b>Ustaz Dr Zaharuddin Abd Rahman</b><small>Islamic finance scholar</small><Link to="/guests" className="ulink">See more</Link></div>
            </div>
          </Reveal>
          <Reveal className="answers">
            <h2>More short answers</h2>
            {ANSWERS.map(([tm, q, by], i) => (
              <button key={i} className={`arow ${i === active ? 'active' : ''}`} onClick={() => { setActive(i); setPlaying(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                {i === active && <motion.span layoutId="rowActive" className="hl" transition={t.medium} />}
                <span className="tm">{tm}</span>
                <span><span className="qt">{q}</span><span className="by">{by}</span></span>
                <span className="np">{i === active ? 'Now playing' : ''}</span>
              </button>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="container">
        <SectionHead eyebrow="Want to learn more" title="Explore and learn from other episodes." />
        <div className="episodes" style={{ borderBottom: 0, paddingBottom: 110 }}>
          <Stagger className="ep-featured">{FEATURED_EPISODES.map((e) => <EpisodeCard key={e.ep} e={e} />)}</Stagger>
          <Stagger className="ep-grid">{EPISODES.map((e) => <EpisodeCard key={e.ep + e.guest} e={e} />)}</Stagger>
          <Reveal><Btn to="/episodes">View All Episodes</Btn></Reveal>
        </div>
      </section>
    </>
  )
}
