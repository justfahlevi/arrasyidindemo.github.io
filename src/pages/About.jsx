import { motion } from 'framer-motion'
import { t } from '../motion'
import { Reveal, Stagger, RevealItem } from '../components/ui'
import { SectionHead, Testimonials } from './Home'
import { CohostList } from '../components/Cohosts'

const LINES = [
  ['Ar-Rasyidin means', 'img/pill-1.jpg', 'the rightly guided.'],
  ['Every life', 'img/pill-2.jpg', 'carries a lesson.'],
  ['One person’s fall', 'img/pill-3.jpg', 'can show'],
  ['someone the way to the righteous.', 'img/pill-4.jpg', null],
]

function Statement() {
  return (
    <section className="statement container">
      <Stagger as="p" amount={0.4}>
        {LINES.map(([a, pill, b], i) => (
          <motion.span key={i} className="ln" variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { ...t.slow, delay: i * 0.12 } } }}>
            <span>{a}</span>
            <motion.span className="pill" variants={{ hidden: { width: 0 }, show: { width: '2.88em', transition: { ...t.slow, delay: 0.3 + i * 0.12 } } }}>
              <img src={pill} alt="" />
            </motion.span>
            {b && <span>{b}</span>}
          </motion.span>
        ))}
      </Stagger>
    </section>
  )
}

const REASONS = [
  { n: '01', title: 'The Problem', d: 'Many of us were never taught how to recover from debt, care for our health, or raise children.', img: 'img/editorial-problem.jpg' },
  { n: '02', title: 'What We Believe', d: 'The best lessons come from people who have lived through it — both success and failure.', img: 'img/editorial-belief.jpg' },
  { n: '03', title: 'Our Answer', d: 'Long, honest conversations that leave every viewer with a lesson they can put into practice.', img: 'img/editorial-answer.jpg' },
]

export default function About() {
  return (
    <>
      <section className="about-hero">
        <motion.video src="video/ar-logo.mp4" poster="img/about-hero.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />
      </section>
      <Statement />
      <section className="container">
        <SectionHead eyebrow="This academy exist for a reason" title={<>School teaches for exams.<br />Life teaches the rest.</>} />
        <Stagger className="reasons">
          {REASONS.map((it) => (
            <RevealItem key={it.n}>
              <div className="reason-img"><img src={it.img} alt="" loading="lazy" /></div>
              <div className="reason-body"><span className="num-12">{it.n}</span><div><h3>{it.title}</h3><p className="body-16">{it.d}</p></div></div>
            </RevealItem>
          ))}
        </Stagger>
      </section>
      <section className="section hosts container">
        <SectionHead eyebrow="Meet our hosts" title="The faces behind every conversation." sub="Hosts who bring real experience — not a script." />
        <div className="hosts-grid" style={{ borderBottom: 0 }}>
          <Reveal className="host-portrait"><img src="img/host-hanzalah.jpg" alt="Dr Hanzalah Mizi" loading="lazy" /></Reveal>
          <Stagger>
            <RevealItem as="h3" className="host-name" style={{ margin: 0 }}>Dr Hanzalah Mizi</RevealItem>
            <RevealItem className="host-role">Lead Host · Medical Doctor</RevealItem>
            <RevealItem as="p" className="host-bio">Grew up as a prayer caller at a surau in Sungkai, Perak. Now sharing life lessons with hundreds of thousands of viewers each month.</RevealItem>
            <RevealItem className="cohosts-label">Co-hosts</RevealItem>
            <CohostList photos={false} />
          </Stagger>
        </div>
      </section>
      <Testimonials />
    </>
  )
}
