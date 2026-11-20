import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from '../motion'
import { Btn, Reveal, Stagger, RevealItem } from '../components/ui'
import { EpisodeCard } from '../components/Cards'
import { Testimonials, JoinPartner } from './Home'
import { LINKS } from '../links'

const CHIPS = ['All', 'Debt and starting again', 'Money, halal and haram', 'Marriage']
const MORE = ['Health', 'Faith', 'Parenting', 'Career']
const SORTS = ['Newest', 'Oldest', 'Most watched']

const ALL = [
  { guest: 'Hafizul Faiz', ep: 'EP 43', title: 'A rubber tapper’s son who worked as a cleaner overseas', img: 'img/grid-hafizul2.jpg', tag: 1 },
  { guest: 'Hazirah Maulana', ep: 'EP 28', title: 'Rebuilt after RM5 million in business debt', img: 'img/grid-hazirah2.jpg', tag: 1 },
  { guest: 'Mdnoor', ep: 'EP 12', title: 'Youngest of 12, out of poverty and now his family’s provider', img: 'img/grid-mdnoor2.jpg', tag: 1 },
  { guest: 'Ustaz Dr Zaharuddin', ep: 'EP 10', title: 'Niat ubah segalanya: when work becomes worship', img: 'img/grid-zaharuddin.jpg', tag: 2 },
  { guest: 'Madam Mu', ep: 'EP 43', title: 'From Besut to KL, building a business empire', img: 'img/grid-madam-mu.jpg', tag: 2 },
  { guest: 'Dr Razin Jaafar', ep: 'EP 28', title: 'Why being ill costs more than staying healthy', img: 'img/grid-razin.jpg', tag: 3 },
  { guest: 'Dr Azura Hashim', ep: 'EP 12', title: 'Faith when tested, and strength in Asmaul Husna', img: 'img/grid-azura.jpg', tag: 3 },
  { guest: 'Broku', ep: 'EP 10', title: 'From tens of millions in profit to RM5 million in debt', img: 'img/grid-broku.jpg', tag: 1 },
  { guest: 'Mdnoor', ep: 'EP 43', title: 'Youngest of 12, out of poverty and now his family’s provider.', img: 'img/grid-mdnoor3.jpg', tag: 1 },
  { guest: 'Najib Asaddok', ep: 'EP 28', title: 'From top student in Johor to business trainer, through every fall.', img: 'img/grid-najib2.jpg', tag: 2 },
  { guest: 'Hasbullah Awang', ep: 'EP 12', title: 'Nearly RM100 million in baju kurung sales, then RM20 million in debt.', img: 'img/grid-hasbullah2.jpg', tag: 1 },
  { guest: 'Hafizul Faiz', ep: 'EP 10', title: 'A rubber tapper’s son who worked as a cleaner overseas.', img: 'img/grid-hafizul3.jpg', tag: 3 },
]

function Dropdown({ label, items, onPick, left, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sort" onMouseLeave={() => setOpen(false)}>
      <button className="fchip" onClick={() => setOpen((o) => !o)} aria-expanded={open}>{children || label}
        <motion.svg width="12" height="8" viewBox="0 0 12 8" animate={{ rotate: open ? 180 : 0 }} transition={t.quick}><path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.2" /></motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className={`dropdown ${left ? 'left' : ''}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0, transition: t.quick }} exit={{ opacity: 0, transition: t.exit }}>
            {items.map((i) => <button key={i} onClick={() => { onPick(i); setOpen(false) }}>{i}</button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Episodes() {
  const [active, setActive] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [expanded, setExpanded] = useState(false)
  const idx = CHIPS.indexOf(active)
  let list = idx > 0 ? ALL.filter((e) => e.tag === idx) : ALL
  if (sort === 'Oldest') list = [...list].reverse()
  const shown = expanded ? [...list, ...list.slice(0, 4)] : list

  return (
    <>
      <section className="page-intro">
        <Stagger className="container">
          <RevealItem className="eyebrow">The conversation</RevealItem>
          <RevealItem as="h1" className="h-60">School teaches for exams.<br />Life teaches the rest.</RevealItem>
          <RevealItem as="p" className="lead">Explore honest conversations about business, faith, health and family. Watch in Bahasa Melayu, at your own pace.</RevealItem>
        </Stagger>
      </section>

      <section className="container">
        <div className="ep-hero">
          <Reveal className="ep-hero-img"><img src="img/ep-hero-hazirah.jpg" alt="Hazirah Maulana in conversation" /></Reveal>
          <Stagger>
            <RevealItem className="kicker">Start here · EP64</RevealItem>
            <RevealItem as="h2">Rebuilt after RM5 million in business debt</RevealItem>
            <RevealItem className="g">Hazirah Maulana</RevealItem>
            <RevealItem as="p" className="d">An honest conversation about loss, rebuilding and finding a different measure of success.</RevealItem>
            <RevealItem><Btn href={LINKS.episode('ep64')} newTab>Watch Full Episode</Btn></RevealItem>
          </Stagger>
        </div>

        <div className="filters">
          <div className="chips" role="tablist">
            {CHIPS.map((c) => (
              <button key={c} role="tab" aria-selected={active === c} className="fchip" onClick={() => setActive(c)}>
                {active === c && <motion.span layoutId="chipActive" className="bg" transition={t.medium} />}
                <span>{c}</span>
              </button>
            ))}
            <Dropdown label="More" items={MORE} onPick={() => setActive('All')} left />
          </div>
          <Dropdown items={SORTS} onPick={setSort}><span style={{ color: 'var(--text-secondary)' }}>Sort by</span>&nbsp;{sort}</Dropdown>
        </div>

        <motion.div className="grid12" layout transition={t.medium}>
          <AnimatePresence mode="popLayout">
            {shown.map((e, i) => (
              <motion.div key={e.img + i} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ...t.medium, delay: (i % 4) * 0.04 }}>
                <EpisodeCard e={e} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="center-cta" style={{ margin: '40px 0 110px' }}>
          {!expanded && <Btn onClick={() => setExpanded(true)}>See More Episodes</Btn>}
        </div>
      </section>
      <Testimonials />
      <JoinPartner />
    </>
  )
}
