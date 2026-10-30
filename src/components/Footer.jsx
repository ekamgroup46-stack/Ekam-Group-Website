import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp, Phone } from "lucide-react";
import BrandIcon from "./BrandIcon.jsx";
import { CONTACT, VERTICALS, waLink } from "../data/business.js";
import s from "./Footer.module.css";

// real brand logos, each in its own brand colour
const SOCIALS = [
  { label: "WhatsApp", href: waLink(), brand: "whatsapp", c: "#25D366", ext: true },
  { label: "Instagram", href: CONTACT.instagram, brand: "instagram", c: "#E4405F", ext: true },
  { label: "Email", href: `mailto:${CONTACT.email}`, brand: "gmail", c: "#EA4335" },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.top}>
          <div className={s.pitch}>
            <div className={s.brandRow}>
              <span className={s.logo}><img src="/logo-mark.png" alt="EKAM Groups logo" width="40" height="41" /></span>
              <span className={s.brandName}>EKAM <span>Groups</span><b>.</b></span>
            </div>
            <h2 className="h-lg">
              Got a plan?<br />
              <span className="grad">Let's make it move.</span>
            </h2>
            <div className={s.ctas}>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn--light">Start on WhatsApp <ArrowUpRight /></a>
              <a href={`tel:+91${CONTACT.phone}`} className="btn btn--ghost"><Phone /> {CONTACT.phoneDisplay}</a>
            </div>
            <div className={s.socials}>
              {SOCIALS.map(({ label, href, brand, c, ext }) => (
                <a key={label} href={href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} className={s.social} style={{ "--c": c }} aria-label={label}>
                  <BrandIcon name={brand} size={20} color="currentColor" />
                </a>
              ))}
              <a href={`tel:+91${CONTACT.phone}`} className={s.social} style={{ "--c": "var(--sky)" }} aria-label="Call"><Phone size={19} /></a>
            </div>
          </div>

          <div className={s.cols}>
            <div>
              <h4>Businesses</h4>
              {VERTICALS.map((v) => (
                <Link key={v.slug} to={`/${v.slug}`} style={{ "--c": `var(--${v.color})` }}>
                  <i className={s.dot} aria-hidden="true" /> {v.nav}
                </Link>
              ))}
            </div>
            <div>
              <h4>Reach us</h4>
              <a href={`tel:+91${CONTACT.phone}`}><Phone size={15} /> {CONTACT.phoneDisplay}</a>
              <a href={waLink()} target="_blank" rel="noreferrer"><BrandIcon name="whatsapp" size={15} /> WhatsApp</a>
              <a href={`mailto:${CONTACT.email}`}><BrandIcon name="gmail" size={15} /> {CONTACT.email}</a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer"><BrandIcon name="instagram" size={15} /> {CONTACT.instagramHandle}</a>
            </div>
            <div>
              <h4>Company</h4>
              <Link to="/">Home</Link>
              <Link to="/contact">Contact</Link>
              <a href={waLink("Hi EKAM Group, I have a question")} target="_blank" rel="noreferrer">Ask a question</a>
            </div>
          </div>
        </div>

        <div className={s.word} aria-hidden="true">EKAM</div>

        <div className={s.bottom}>
          <p>© {new Date().getFullYear()} EKAM Group. All rights reserved.</p>
          <button type="button" className={s.toTop} onClick={() => window.scrollTo({ top: 0 })}>
            Back to top <ArrowUp size={15} />
          </button>
        </div>
        <p className={s.legal}>
          *Terms and conditions apply. Service availability, transaction eligibility and charges are subject to the issuing bank,
          card network (RuPay, Mastercard, Visa) rules and applicable regulations. Bank and network names indicate card compatibility
          only; EKAM Group is not affiliated with or endorsed by them. We never ask for your card PIN, CVV or OTP.
        </p>
      </div>
    </footer>
  );
}
