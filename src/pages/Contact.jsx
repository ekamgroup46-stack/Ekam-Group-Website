import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import BrandIcon from "../components/BrandIcon.jsx";
import { CONTACT, VERTICALS, themeVars, waLink } from "../data/business.js";
import Reveal from "../components/Reveal.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import s from "./Contact.module.css";

// let the address wrap after the "@" instead of mid-word
const [emailUser, emailDomain] = CONTACT.email.split("@");

const CHANNELS = [
  { brand: "whatsapp", label: "WhatsApp", value: "Chat now — fastest", href: waLink(), ext: true, hot: true },
  { icon: Phone, label: "Call", value: CONTACT.phoneDisplay, href: `tel:+91${CONTACT.phone}` },
  { brand: "gmail", label: "Email", value: <>{emailUser}@<wbr />{emailDomain}</>, href: `mailto:${CONTACT.email}` },
  { brand: "instagram", label: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.instagram, ext: true },
];

const FIELDS = [
  { name: "name", label: "Your name", placeholder: "Full name", required: true },
  { name: "city", label: "City", placeholder: "Where are you?" },
  { name: "service", label: "I'm interested in", options: VERTICALS.map((v) => v.long), required: true, span: true },
  { name: "msg", label: "Message", type: "textarea", placeholder: "Tell us what you need…", span: true, required: true },
];

export default function Contact() {
  return (
    <div style={themeVars("lime")}>
      <section className={s.hero}>
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="gridlines" aria-hidden="true" />
        <div className={`wrap ${s.inner}`}>
          <span className={`eyebrow ${s.rise}`} style={{ "--d": 0 }}>Contact</span>
          <h1 className={`h-xl ${s.rise}`} style={{ "--d": 1 }}>
            Say <span className="accent">hi.</span><br />We reply fast.
          </h1>

          <div className={s.channels}>
            {CHANNELS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`${s.ch} ${c.hot ? s.hot : ""} ${s.rise}`}
                style={{ "--d": i + 2 }}
              >
                <span className={s.chIc}>{c.brand ? <BrandIcon name={c.brand} size={24} /> : <c.icon size={22} />}</span>
                <small>{c.label}</small>
                <b>{c.value}</b>
                <ArrowUpRight className={s.chGo} size={22} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.formGrid}`}>
          <Reveal className={s.formCopy}>
            <span className="eyebrow">Send an enquiry</span>
            <h2 className="h-lg">Not sure who<br />to ask? Ask us.</h2>
            <p className="lead">Pick the business, drop a line, and we'll route it to the right person.</p>
            <div className={s.jump}>
              <span className={s.jumpLabel}>Or go straight to a business</span>
              <div className={s.jumpList}>
                {VERTICALS.map((v) => (
                  <Link key={v.slug} to={`/${v.slug}`} className={s.jumpLink} style={{ "--c": `var(--${v.color})` }}>
                    <i aria-hidden="true" /> {v.nav} <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}><EnquiryForm subject="general" title="Your message" fields={FIELDS} /></Reveal>
        </div>
      </section>
    </div>
  );
}
