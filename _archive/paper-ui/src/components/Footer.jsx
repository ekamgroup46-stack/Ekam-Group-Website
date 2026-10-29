import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { CONTACT, VERTICALS, waLink } from "../data/business.js";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        {/* the four businesses as a big, plain index — doubles as navigation */}
        <nav className={s.index} aria-label="Our businesses">
          {VERTICALS.map((v) => (
            <Link key={v.slug} to={`/${v.slug}`} className={s.indexLink} style={{ "--c": `var(--${v.color}-lt)` }}>
              <span className={s.indexNum}>{v.index}</span>
              <span className={s.indexName}>{v.nav}</span>
              <span className={s.indexTag}>{v.tagline}</span>
              <ArrowUpRight className={s.indexGo} />
            </Link>
          ))}
        </nav>

        <div className={s.grid}>
          <div className={s.brand}>
            <span className={s.logoChip}><img src="/logo-mark.png" alt="EKAM Group logo" width="52" height="54" /></span>
            <p>
              <b>EKAM Group</b>
              Card cash, flights & travel, AQA Trading and building & infrastructure — one crew, one number.
            </p>
          </div>

          <div className={s.col}>
            <h4>Reach us</h4>
            <a href={`tel:+91${CONTACT.phone}`}><Phone size={15} /> {CONTACT.phoneDisplay}</a>
            <a href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>
            <a href={`mailto:${CONTACT.email}`}><Mail size={15} /> {CONTACT.email}</a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer"><Instagram size={15} /> {CONTACT.instagramHandle}</a>
          </div>

          <div className={s.col}>
            <h4>Pages</h4>
            <Link to="/">Home</Link>
            {VERTICALS.map((v) => <Link key={v.slug} to={`/${v.slug}`}>{v.nav}</Link>)}
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <p className={s.legal}>
          *Terms and conditions apply. Service availability, transaction eligibility and charges are subject to the issuing bank,
          card network (RuPay, Mastercard, Visa) rules and applicable regulations. Bank and network names indicate card compatibility
          only; EKAM Group is not affiliated with or endorsed by them. We never ask for your card PIN, CVV or OTP.
        </p>

        <div className={s.bottom}>
          <span>© {new Date().getFullYear()} EKAM Group. All rights reserved.</span>
          <button type="button" className={s.top} onClick={() => window.scrollTo({ top: 0 })}>
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
