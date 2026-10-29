import { ArrowUpRight } from "lucide-react";
import { CONTACT, waLink } from "../data/business.js";
import Reveal from "./Reveal.jsx";
import s from "./CTABand.module.css";

export default function CTABand({ title, text, message }) {
  return (
    <section className="section section--tight">
      <div className="wrap">
        <Reveal className={s.band}>
          <span className={s.orb} aria-hidden="true" />
          <span className={`${s.orb} ${s.orb2}`} aria-hidden="true" />
          <span className={s.dots} aria-hidden="true" />
          <div className={s.copy}>
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className={s.actions}>
            <span className={s.small}>Call or WhatsApp</span>
            <a href={`tel:+91${CONTACT.phone}`} className={s.phone}>{CONTACT.phoneDisplay}</a>
            <div className={s.btns}>
              <a href={waLink(message)} target="_blank" rel="noreferrer" className="btn btn--dark">
                WhatsApp us <ArrowUpRight />
              </a>
              <a href={`mailto:${CONTACT.email}`} className={`btn ${s.ghost}`}>Email us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
