import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from '../motion'
import { Btn, Stagger, RevealItem } from '../components/ui'
import { GuestCard } from '../components/Cards'
import { SectionHead, Testimonials, Numbers } from './Home'
import { GUESTS } from '../data'

export default function Guests() {
  const [rows, setRows] = useState(3)
  const cards = Array.from({ length: rows * 4 }, (_, i) => GUESTS[i % 4])
  return (
    <>
      <section className="page-intro">
        <Stagger className="container">
          <RevealItem className="eyebrow">The people behind the lessons</RevealItem>
          <RevealItem as="h1" className="h-60">Different lives.<br />Something for all of us.</RevealItem>
          <RevealItem as="p" className="lead">Meet the entrepreneurs, scholars and everyday people who bring their experience to the Ar Rasyidin table.</RevealItem>
        </Stagger>
      </section>
      <section className="section" style={{ paddingTop: 70 }}>
        <div className="container" style={{ paddingLeft: 100 }}>
          <SectionHead eyebrow="Our guests" title="The people who have taken the seat." sub="Every guest brings a different perspective. Every conversation is a chance to learn." />
        </div>
        <div className="ggrid" style={{ maxWidth: 1440, margin: '50px auto 0' }}>
          <AnimatePresence>
            {cards.map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ ...t.slow, delay: (i % 4) * 0.08 }}>
                <GuestCard g={g} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="center-cta" style={{ margin: '48px 0 90px' }}>
          {rows < 5 && <Btn onClick={() => setRows((r) => r + 1)}>Load More</Btn>}
        </div>
      </section>
      <Testimonials />
      <Numbers />
    </>
  )
}
