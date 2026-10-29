import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Phone, X, Zap } from "lucide-react";
import { CONTACT, VERTICALS, waLink } from "../data/business.js";
import s from "./Navbar.module.css";

const cx = (...c) => c.filter(Boolean).join(" ");

const BAR_KEY = "ekam-bar-dismissed";
const readDismissed = () => {
  try { return localStorage.getItem(BAR_KEY) === "1"; } catch { return false; }
};

const SHEET_LINKS = [
  { to: "/", label: "Home", sub: "Everything EKAM", color: "lime" },
  ...VERTICALS.map((v) => ({ to: `/${v.slug}`, label: v.nav, sub: v.tagline, color: v.color })),
  { to: "/contact", label: "Contact", sub: "Call, WhatsApp or email", color: "lime" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bar, setBar] = useState(() => !readDismissed());
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // heroes pad themselves by --bar-h so nothing hides under the bar
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--bar-h", bar ? "40px" : "0px");
  }, [bar]);

  const closeBar = () => {
    setBar(false);
    try { localStorage.setItem(BAR_KEY, "1"); } catch { /* private mode — just hide it */ }
  };

  return (
    <>
      <header className={cx(s.header, scrolled && s.scrolled, bar && s.hasBar, open && s.menuOpen)}>
        {bar && (
          <div className={s.bar}>
            <p className={s.barText}>
              <Zap size={14} aria-hidden="true" />
              <span className={s.barLong}>Card cash from 1.6% on RuPay, Mastercard &amp; Visa — swipe or scan, money in minutes.</span>
              <span className={s.barShort}>Card cash from 1.6% · swipe or scan</span>
              <Link to="/card-cash#charges" className={s.barLink}>Check charges →</Link>
            </p>
            <button type="button" className={s.barClose} onClick={closeBar} aria-label="Dismiss announcement">
              <X size={16} />
            </button>
          </div>
        )}

        <div className={s.navWrap}>
          <div className={s.inner}>
            <Link to="/" className={s.brand} aria-label="EKAM Group — home">
              <span className={s.logo}><img src="/logo-mark.png" alt="" width="30" height="31" /></span>
              <span className={s.word}>EKAM<b>.</b></span>
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

            <a href={waLink()} target="_blank" rel="noreferrer" className={`btn btn--light ${s.cta}`}>
              Let's talk <ArrowUpRight />
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

            <span className={s.progress} aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* outside the header: the header moves on scroll, and a transformed
          parent would break this full-screen fixed layer */}
      <div id="mobile-menu" className={cx(s.sheet, open && s.open, scrolled && s.sheetScrolled)} aria-hidden={!open}>
        <nav className={s.sheetNav} aria-label="Mobile" onClick={(e) => e.target.closest("a") && setOpen(false)}>
          {SHEET_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className={cx(s.sheetLink, pathname === l.to && s.sheetActive)}
              style={{ "--c": `var(--${l.color})`, "--i": i }}
            >
              <span className={s.sheetNum}>0{i}</span>
              <span>
                <b>{l.label}</b>
                <small>{l.sub}</small>
              </span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </nav>
        <div className={s.sheetCtas}>
          <a href={`tel:+91${CONTACT.phone}`} className="btn btn--ghost"><Phone /> Call</a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn--light">WhatsApp <ArrowUpRight /></a>
        </div>
      </div>
    </>
  );
}
