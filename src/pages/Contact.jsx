import { Reveal, Stagger, RevealItem, CountUp } from '../components/ui'
import Form from '../components/Form'
import { PLATFORM_STATS } from '../data'

export default function Contact() {
  return (
    <>
      <section className="page-intro">
        <Stagger className="container">
          <RevealItem className="eyebrow">Get in touch</RevealItem>
          <RevealItem as="h1" className="h-60">Every conversation<br />starts with hello.</RevealItem>
          <RevealItem as="p" className="lead">A question, a story worth sharing or an idea for working together? Tell us what is on your mind.</RevealItem>
        </Stagger>
      </section>
      <section className="container">
        <Stagger className="contact-stats">
          {PLATFORM_STATS.map((s) => (
            <RevealItem key={s.label}><CountUp className="v" value={s.v} /><div className="l">{s.label}</div></RevealItem>
          ))}
          <RevealItem><div className="eyebrow" style={{ marginTop: 14 }}>Across all platforms</div><div className="l" style={{ fontSize: 15 }}>YouTube · TikTok · Facebook · Instagram</div></RevealItem>
        </Stagger>
        <div className="contact-body">
          <Stagger className="side">
            <RevealItem as="h2">A place for your<br />next conversation.</RevealItem>
            <RevealItem as="p">Choose the topic that best fits your message and tell us a little about yourself.</RevealItem>
            <RevealItem><h3>For our viewers</h3><p>Share a reflection, ask a question or suggest a topic you would like us to explore.</p></RevealItem>
            <RevealItem><h3>For future guests</h3><p>Tell us about an experience or expertise that could help someone else.</p></RevealItem>
            <RevealItem><h3>For partners</h3><p>Explore sponsorship, content collaborations and live events.</p></RevealItem>
          </Stagger>
          <Reveal className="main">
            <h2>Send us a message</h2>
            <Form selectLabel="I am getting in touch about *" selectPlaceholder="Select an enquiry type" options={['A question or reflection', 'Being a guest', 'Partnership or sponsorship', 'Something else']} submitLabel="Send Message" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
