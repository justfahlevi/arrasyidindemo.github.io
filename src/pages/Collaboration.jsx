import { motion } from 'framer-motion'
import { t } from '../motion'
import { Reveal, Stagger, RevealItem } from '../components/ui'
import { SectionHead, Numbers, Testimonials } from './Home'
import Form from '../components/Form'

const WAYS = [
  { n: '01', h: 'Co-produced series', p: 'A run of episodes built around a theme you care about, from research and guests to filming and release.', li: ['Long-form episodes on one theme', 'Clips cut for TikTok and Reels', 'Presenting-partner credit'] },
  { n: '02', h: 'Branded episode', p: 'One full conversation on a topic close to your business, with a guest we choose together.', li: ['One long-form episode', 'Short clips from the conversation', 'Credit in the episode and description'] },
  { n: '03', h: 'Short-form clips', p: 'Short videos made for your own channels, drawn from our conversations or filmed for you.', li: ['Vertical clips for your channels', 'Captions in English and Malay', 'Rights to post on your channels'] },
]

export default function Collaboration() {
  return (
    <>
      <section className="hero collab-hero">
        <motion.div className="hero-media" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
          <img src="img/collab-hero.jpg" alt="Dr Hanzalah Mizi" />
        </motion.div>
        <div className="hero-shade" />
        <div className="hero-copy" style={{ paddingBottom: 110 }}>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t.slow, delay: 0.25 }}>Together impacting millions.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t.slow, delay: 0.37 }}>We make long-form conversations and short clips with brands that share our values. Tell us what you want to say, and we will shape it into a series, an episode or a set of clips.</motion.p>
        </div>
      </section>
      <Numbers />
      <Testimonials />
      <section className="section container" style={{ paddingTop: 40 }}>
        <SectionHead eyebrow="More than just collaboration" title="Three ways to work together." />
        <Stagger className="ways">
          {WAYS.map((w) => (
            <RevealItem key={w.n} className="way" whileHover={{ y: -4 }} transition={t.quick}>
              <div className="n">{w.n}</div>
              <h3>{w.h}</h3>
              <p>{w.p}</p>
              <ul>{w.li.map((l) => <li key={l}>{l}</li>)}</ul>
            </RevealItem>
          ))}
        </Stagger>
      </section>
      <section className="container connect">
        <div>
          <Reveal as="h2" className="h-53" style={{ margin: 0 }}>Let’s connect.</Reveal>
          <Reveal as="p" style={{ fontSize: 15, margin: '10px 0 40px' }}>Share a few details and our collaboration team will reply by email.</Reveal>
          <Form selectLabel="Collaboration format" selectPlaceholder="Select an collaboration format" options={['Co-produced series', 'Branded episode', 'Short-form clips', 'Not sure yet']} submitLabel="Send Message" />
        </div>
        <Reveal style={{ overflow: 'hidden' }}><img src="img/collab-lounge.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></Reveal>
      </section>
    </>
  )
}
