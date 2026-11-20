import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { t } from '../motion'
import { Btn, Reveal, Stagger, RevealItem, CountUp, useDragScroll } from '../components/ui'
import { EpisodeCard, GuestCard, AnswerCard } from '../components/Cards'
import { LINKS } from '../links'
import { CohostList } from '../components/Cohosts'
import { HOME_GUEST_ROW, FEATURED_EPISODES, EPISODES, QUICK_ANSWERS, TESTIMONIALS, IMPACT, PLATFORM_STATS } from '../data'

export function SectionHead({ eyebrow, title, sub, className = '' }) {
  return (
    <Stagger className={`section-head ${className}`}>
      <RevealItem className="eyebrow">{eyebrow}</RevealItem>
      <RevealItem as="h2" className="h-60" style={{ margin: '12px 0 0' }}>{title}</RevealItem>
      {sub && <RevealItem as="p" className="body-16 sub">{sub}</RevealItem>}
    </Stagger>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const lines = ['One conversation', 'can change a life.']
  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y }} initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
        <video src="video/ar-rasyidin-hero.mp4" poster="img/hero-poster.jpg" autoPlay muted loop playsInline preload="auto" />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-copy">
        <h1 className="h-display" style={{ margin: 0 }}>
          {lines.map((l, i) => (
            <span className="hero-line" key={l}>
              <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ ...t.slow, duration: 0.9, delay: 0.25 + i * 0.12 }}>{l}</motion.span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}

function Platforms() {
  return (
    <section className="platforms">
      <div className="platforms-strip">
        <span className="eyebrow">Across all platforms</span>
        <span className="label-13">YouTube · TikTok · Facebook · Instagram</span>
      </div>
      <div className="stats4">
        {PLATFORM_STATS.map((s) => (
          <div className="stat4" key={s.label}>
            <CountUp className="v" value={s.v} />
            <span className="label-13">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Why() {
  const items = [
    { n: '01', title: 'The Problem', d: 'Many of us were never taught how to recover from debt, care for our health, or raise children.', img: 'img/editorial-problem.jpg' },
    { n: '02', title: 'What We Believe', d: 'The best lessons come from people who have lived through it — both success and failure.', img: 'img/editorial-belief.jpg' },
    { n: '03', title: 'Our Answer', d: 'Long, honest conversations that leave every viewer with a lesson they can put into practice.', img: 'img/editorial-answer.jpg' },
  ]
  return (
    <section className="section container">
      <SectionHead eyebrow="This academy exist for a reason" title={<>School teaches for exams.<br />Life teaches the rest.</>} />
      <Stagger className="reasons">
        {items.map((it) => (
          <RevealItem key={it.n}>
            <div className="reason-img"><img src={it.img} alt="" loading="lazy" /></div>
            <div className="reason-body">
              <span className="num-12">{it.n}</span>
              <div><h3>{it.title}</h3><p className="body-16">{it.d}</p></div>
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  )
}

export function Hosts() {
  return (
    <section className="section hosts container">
      <SectionHead eyebrow="Meet our hosts" title="The faces behind every conversation." sub="Hosts who bring real experience — not a script." />
      <div className="hosts-grid">
        <Reveal className="host-portrait"><img src="img/host-hanzalah.jpg" alt="Dr Hanzalah Mizi" loading="lazy" /></Reveal>
        <Stagger>
          <RevealItem as="h3" className="host-name" style={{ margin: 0 }}>Dr Hanzalah Mizi</RevealItem>
          <RevealItem className="host-role">Lead host · Medical doctor</RevealItem>
          <RevealItem as="p" className="host-bio">Grew up as a prayer caller at a surau in Sungkai, Perak. Now sharing life lessons with hundreds of thousands of viewers each month.</RevealItem>
          <RevealItem className="cohosts-label">Co-hosts</RevealItem>
          <CohostList />
        </Stagger>
      </div>
    </section>
  )
}

function GuestsRow() {
  const row = useDragScroll()
  return (
    <section className="section guests">
      <div className="container">
        <SectionHead eyebrow="Our guests" title="The people who have taken this seat." sub="Doctors, entrepreneurs, Islamic scholars and parents to share their real stories." />
      </div>
      <div className="guest-row" ref={row}>
        {HOME_GUEST_ROW.map((g, i) => <Reveal key={i} delay={Math.min(i, 4) * 0.09} amount={0.1} style={{ flex: 'none' }}><GuestCard g={g} /></Reveal>)}
      </div>
      <Reveal className="center-cta" style={{ marginTop: 26 }}><Btn to="/guests">View All 50+ Guests</Btn></Reveal>
    </section>
  )
}

function QuickLearnings() {
  const row = useDragScroll()
  return (
    <section className="section" style={{ paddingTop: 100 }}>
      <div className="container">
        <SectionHead eyebrow="Quick learnings" title="Short answer to real questions." />
      </div>
      <div className="learn-row" ref={row}>
        {QUICK_ANSWERS.map((a, i) => <AnswerCard key={i} a={a} />)}
      </div>
    </section>
  )
}

function StartHere() {
  return (
    <section className="section container">
      <SectionHead eyebrow="New here?" title="Start with these episodes." />
      <div className="episodes">
        <Stagger className="ep-featured">{FEATURED_EPISODES.map((e) => <EpisodeCard key={e.ep} e={e} />)}</Stagger>
        <Stagger className="ep-grid">{EPISODES.map((e) => <EpisodeCard key={e.ep + e.guest} e={e} />)}</Stagger>
        <Reveal><Btn to="/episodes">View All Episodes</Btn></Reveal>
      </div>
    </section>
  )
}

export function Numbers() {
  return (
    <section className="container">
      <div className="numbers">
        <Stagger className="intro">
          <RevealItem className="eyebrow">Our impact in numbers</RevealItem>
          <RevealItem as="h2" className="h-60" style={{ margin: 0 }}>Numbers that<br />reflect your trust.</RevealItem>
          <RevealItem as="p" style={{ fontSize: 14.1, lineHeight: 1.4 }}>As of November 2026. Updated quarterly.</RevealItem>
        </Stagger>
        <Stagger className="numbers-grid">
          {IMPACT.map((s) => (
            <RevealItem className="num-cell" key={s.label}>
              <div className="rule" />
              <CountUp className={`v ${s.medium ? 'medium' : ''}`} value={s.v} />
              <span className="label-13">{s.label}</span>
              <span className="d">{s.d}</span>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="section container">
      <SectionHead eyebrow="Stories that stay" title="Lessons that change lives." sub="Real comments from our viewers, shared their stories." />
      <Stagger className="testi">
        {TESTIMONIALS.map((x) => (
          <RevealItem className="testi-cell" key={x.who}>
            <div><div className="qm">“</div><p className="q">{x.q}</p></div>
            <div><p className="who">{x.who}</p><p className="ctx">{x.ctx}</p></div>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  )
}

export function JoinPartner() {
  return (
    <section className="container">
      <div className="join">
        <Stagger className="join-col">
          <RevealItem className="eyebrow">For viewers</RevealItem>
          <RevealItem as="h2" className="h-53" style={{ margin: 0 }}>Join 650K+ learning with us</RevealItem>
          <RevealItem as="p" className="desc">New episodes weekly. Daily clips on TikTok.<br />Updates straight to your WhatsApp.</RevealItem>
          <RevealItem><Btn href={LINKS.whatsapp} newTab>Join Our Community</Btn></RevealItem>
        </Stagger>
        <Stagger className="join-col partner">
          <RevealItem className="eyebrow">For partners</RevealItem>
          <RevealItem as="h2" className="h-53" style={{ margin: 0 }}>Collab with Ar Rasyidin</RevealItem>
          <RevealItem className="options">
            <b>Sponsorship</b><span>Reach 650K+ followers seeking knowledge, not just entertainment.</span>
            <b>Be A Guest</b><span>Have a story that could change lives? Apply to be interviewed.</span>
            <b>Collaborations</b><span>Joint projects, live events and branded content.</span>
          </RevealItem>
          <RevealItem><Btn to="/collaboration">Learn More</Btn></RevealItem>
        </Stagger>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Platforms />
      <Why />
      <Hosts />
      <GuestsRow />
      <QuickLearnings />
      <StartHere />
      <Numbers />
      <Testimonials />
      <JoinPartner />
    </>
  )
}
