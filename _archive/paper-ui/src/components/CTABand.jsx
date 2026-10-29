import { ArrowUpRight } from "lucide-react";
import { CONTACT, waLink } from "../data/business.js";
import Reveal from "./Reveal.jsx";
import s from "./CTABand.module.css";

/** Closing call-to-action block in the page colour, with the phone number front and centre. */
export default function CTABand({ title, text, message, kicker = "Next step" }) {
  return (
    <section className="section section--tight">
      <div className="wrap">
        <Reveal className={s.band}>
          <div className={s.copy}>
            <p className={s.kicker}>{kicker}</p>
            <h2>{title}</h2>
            {text && <p className={s.text}>{text}</p>}
          </div>
          <div className={s.actions}>
            <span className={s.small}>Call or WhatsApp</span>
            <a href={`tel:+91${CONTACT.phone}`} className={s.phone}>{CONTACT.phoneDisplay}</a>
            <div className={s.btns}>
              <a href={waLink(message)} target="_blank" rel="noreferrer" className={`btn ${s.primary}`}>
                WhatsApp us <ArrowUpRight />
              </a>
              <a href={`mailto:${CONTACT.email}`} className={`btn ${s.ghost}`}>Email instead</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
