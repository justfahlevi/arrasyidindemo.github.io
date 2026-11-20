import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { t } from '../motion'
import { Btn, RevealItem } from './ui'
import { PlayIcon } from './Icons'
import { LINKS } from '../links'

/** ARA/Episode card (featured + standard): slow image zoom + growing underline on hover. */
export function EpisodeCard({ e, to = '/quick-answers' }) {
  return (
    <RevealItem>
      <motion.div initial="rest" whileHover="hover" animate="rest">
        <Link to={to} className="ep-card">
          <div className="ep-media">
            <motion.img src={e.img} alt="" variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} transition={t.slow} loading="lazy" />
          </div>
          <div className="ep-meta">
            <span className="eyebrow">{e.guest}</span>
            <span className="num-12">{e.ep}</span>
          </div>
          <div><span className="ep-title">{e.title}</span></div>
        </Link>
      </motion.div>
    </RevealItem>
  )
}

/** ARA/Guest card - carousel: scrim rises and the full story shows on hover. Opens the guest's episode on YouTube. */
export function GuestCard({ g }) {
  return (
    <a className="guest-card" href={LINKS.episode(g.slug)} target="_blank" rel="noreferrer" draggable="false">
      <img src={g.img} alt={g.name} loading="lazy" draggable="false" />
      <div className="scrim" />
      <div className="guest-foot">
        <div>
          <div className="gn">{g.name}</div>
          <div className="gm">{g.role}</div>
        </div>
        <div className="gl" />
        <p className="gs">{g.story}</p>
      </div>
    </a>
  )
}

/** Quick answer card: lifts 4px, shadow, play badge fades in. */
export function AnswerCard({ a }) {
  return (
    <div className="learn-col">
      <div className="rule" />
      <motion.div className="answer-card" initial="rest" animate="rest" whileHover="hover"
        variants={{ rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' }, hover: { y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' } }} transition={t.quick}>
        <motion.span className="play-badge" variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }} transition={t.quick}>
          <PlayIcon />
        </motion.span>
        <Link to="/quick-answers" className="answer-top" style={{ color: 'inherit' }}>
          <span className="chip">{a.topic}</span>
          <p className="answer-q">{a.q}</p>
        </Link>
        <div className="answer-foot">
          <div>
            <p className="sn">{a.who}</p>
            <p className="se">{a.ep}</p>
          </div>
          <Btn to="/quick-answers" className="sm">Watch The Answer</Btn>
        </div>
      </motion.div>
    </div>
  )
}
