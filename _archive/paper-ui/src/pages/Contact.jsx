import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import { CONTACT, VERTICALS, themeVars, waLink } from "../data/business.js";
import Reveal from "../components/Reveal.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import s from "./Contact.module.css";

const CHANNELS = [
  { icon: MessageCircle, label: "WhatsApp", value: "Chat now — fastest reply", href: waLink(), ext: true, hot: true },
  { icon: Phone, label: "Call", value: CONTACT.phoneDisplay, href: `tel:+91${CONTACT.phone}` },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Instagram, label: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.instagram, ext: true },
];

const FIELDS = [
  { name: "name", label: "Your name", placeholder: "Full name", required: true },
  { name: "city", label: "City", placeholder: "Where are you?" },
  { name: "service", label: "I'm interested in", options: VERTICALS.map((v) => v.long), required: true, span: true },
  { name: "msg", label: "Message", type: "textarea", placeholder: "Tell us what you need…", span: true, required: true },
];

export default function Contact() {
  return (
    <div style={themeVars("orange")}>
      <section className={s.hero}>
        <div className="wrap">
          <p className="label">Contact</p>
          <h1 className={`h-display ${s.title}`}>Say hi. <em>We reply fast.</em></h1>

          <ul className={s.channels}>
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})} className={`${s.ch} ${c.hot ? s.hot : ""}`}>
                  <span className={s.chLabel}><c.icon size={18} /> {c.label}</span>
                  <span className={s.chValue}>{c.value}</span>
                  <ArrowUpRight className={s.chGo} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className={`wrap ${s.formGrid}`}>
          <Reveal className={s.formCopy}>
            <p className="label">Send an enquiry</p>
            <h2 className="h-2">Not sure who to ask? <em>Ask us.</em></h2>
            <p className="lead">Pick the business, drop a line, and we'll route it to the right person.</p>
            <div className={s.jump}>
              <p className="label">Or go straight to a business</p>
              <div className={s.jumpList}>
                {VERTICALS.map((v) => (
                  <Link key={v.slug} to={`/${v.slug}`} className={s.jumpLink} style={{ "--c": `var(--${v.color})` }}>
                    <span className="dot" /> {v.nav} <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <EnquiryForm subject="general" title="Your message" fields={FIELDS} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
