import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { t, RISE } from '../motion'
import { Btn } from './ui'

/** Form with Idle → Sending → Sent states (Sending waits 1200ms, as in the prototype). */
export default function Form({ selectLabel, selectPlaceholder, options, submitLabel = 'Submit' }) {
  const [state, setState] = useState('idle')
  const onSubmit = (e) => {
    e.preventDefault()
    setState('sending')
    setTimeout(() => setState('sent'), 1200)
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      {state !== 'sent' ? (
        <motion.form key="form" className="form" onSubmit={onSubmit}
          initial={{ opacity: 0, y: RISE() }} animate={{ opacity: state === 'sending' ? 0.6 : 1, y: 0 }} exit={{ opacity: 0, transition: t.exit }} transition={t.medium}>
          <div className="field"><label htmlFor="f-name">Full name *</label><input id="f-name" required placeholder="Your name" /></div>
          <div className="field"><label htmlFor="f-email">Email address *</label><input id="f-email" type="email" required placeholder="you@example.com" /></div>
          <div className="field"><label htmlFor="f-org">Organisation</label><input id="f-org" placeholder="Company or organisation" /></div>
          <div className="field">
            <label htmlFor="f-sel">{selectLabel}</label>
            <select id="f-sel" defaultValue="" required={selectLabel.includes('*')}>
              <option value="" disabled>{selectPlaceholder}</option>
              {options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="field full"><label htmlFor="f-msg">Your message *</label><textarea id="f-msg" required placeholder="Tell us a little about your question, story or idea..." /></div>
          <div className="form-foot">
            <small>Fields marked * are required.</small>
            <Btn type="submit">{state === 'sending' ? <><span className="spinner" />Sending…</> : submitLabel}</Btn>
          </div>
        </motion.form>
      ) : (
        <motion.div key="sent" className="sent" initial={{ opacity: 0, y: RISE() }} animate={{ opacity: 1, y: 0 }} transition={t.medium}>
          <span className="check">
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 11.5 9.2 15.5 17 7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <h3>Message received.</h3>
          <p>Thank you. Our team will reply by email within 2 working days.</p>
          <Btn onClick={() => setState('idle')}>Send another message</Btn>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
