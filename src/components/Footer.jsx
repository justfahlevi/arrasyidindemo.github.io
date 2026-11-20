import { SOCIALS, SocialIcon } from './Icons'
import { LINKS } from '../links'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        {SOCIALS.map((s) => (
          <a key={s.key} href={LINKS[s.key]} target="_blank" rel="noreferrer" aria-label={s.label}>
            <SocialIcon icon={s} />
          </a>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="left">
          <span>© Ar Rasyidin 2026</span>
          <nav aria-label="Legal">
            <a className="ulink" href={LINKS.terms}>Terms &amp; Conditions</a>
            <a className="ulink" href={LINKS.privacy}>Privacy Policy</a>
            <a className="ulink" href={LINKS.cookies}>Cookie Policy</a>
          </nav>
        </div>
        <a className="ulink" href={LINKS.orius} target="_blank" rel="noreferrer">Powered by oriusdigital</a>
      </div>
    </footer>
  )
}
