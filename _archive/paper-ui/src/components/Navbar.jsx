import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { CONTACT, VERTICALS, waLink } from "../data/business.js";
import s from "./Navbar.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

const SHEET_LINKS = [
  { to: "/", num: "00", title: "Home", sub: "Everything EKAM", color: "ink" },
  ...VERTICALS.map((v) => ({ to: `/${v.slug}`, num: v.index, title: v.nav, sub: v.tagline, color: v.color })),
  { to: "/contact", num: "05", title: "Contact", sub: "Call, WhatsApp or email", color: "ink" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cx(s.bar, (scrolled || open) && s.scrolled)}>
      <div className={`wrap ${s.inner}`}>
        <Link to="/" className={s.brand} aria-label="EKAM Group — home">
          <img src="/logo-mark.png" alt="" width="40" height="41" />
          <span className={s.word}>EKAM<small>Group</small></span>
        </Link>

        <nav className={s.links} aria-label="Main">
          {VERTICALS.map((v) => (
            <NavLink
              key={v.slug}
              to={`/${v.slug}`}
              className={({ isActive }) => cx(s.link, isActive && s.active)}
              style={{ "--c": `var(--${v.color})` }}
            >
              <i className={s.dot} aria-hidden="true" />
              {v.nav}
            </NavLink>
          ))}
          <NavLink to="/contact" className={({ isActive }) => cx(s.link, isActive && s.active)}>
            Contact
          </NavLink>
        </nav>

        <a href={waLink()} target="_blank" rel="noreferrer" className={`btn btn--ink ${s.cta}`}>
          WhatsApp us <ArrowUpRight />
        </a>

        <button
          type="button"
          className={cx(s.burger, open && s.burgerOpen)}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span /><span />
        </button>
      </div>

      <div id="mobile-menu" className={cx(s.sheet, open && s.open)} aria-hidden={!open}>
        <nav aria-label="Mobile" onClick={(e) => e.target.closest("a") && setOpen(false)}>
          {SHEET_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={cx(s.sheetLink, pathname === l.to && s.sheetActive)} style={{ "--c": `var(--${l.color})` }}>
              <span className={s.sheetNum}>{l.num}</span>
              <span>
                <b>{l.title}</b>
                <small>{l.sub}</small>
              </span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </nav>
        <div className={s.sheetCtas}>
          <a href={`tel:+91${CONTACT.phone}`} className="btn btn--line"><Phone /> Call</a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn--wa">WhatsApp <ArrowUpRight /></a>
        </div>
      </div>
    </header>
  );
}
