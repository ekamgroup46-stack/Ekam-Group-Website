import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Check, QrCode, CreditCard, BadgePercent, Zap, Landmark, ShieldCheck, FileCheck2, Smile } from "lucide-react";
import { BANKS, CONTACT, NETWORKS, VERTICALS, theme, themeVars, waLink } from "../data/business.js";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import Marquee from "../components/Marquee.jsx";
import Stamp from "../components/Stamp.jsx";
import Receipt from "../components/Receipt.jsx";
import CashCalculator from "../components/CashCalculator.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";
import s from "./Home.module.css";

const WHY = [
  { icon: BadgePercent, title: "Low charges", text: "Card cash from 1.6% — some of the sharpest rates around." },
  { icon: Zap, title: "Instant mode", text: "Swipe the card or scan a QR. Minutes, not days." },
  { icon: Landmark, title: "Wide bank support", text: "Eligible cards from SBI, HDFC, ICICI, Axis, YES BANK and more." },
  { icon: ShieldCheck, title: "Secure by default", text: "A clean, simple process. We never ask for your PIN, CVV or OTP." },
  { icon: FileCheck2, title: "By the rules", text: "Eligible non-utility transactions, per bank & network rules." },
  { icon: Smile, title: "Real humans", text: "No bots, no ticket numbers. Call or WhatsApp and talk to us." },
];

const FAQS = [
  ["Which cards work for cash withdrawal?", "RuPay, Mastercard and Visa credit cards from SBI, HDFC Bank, ICICI Bank, Axis Bank, YES BANK and other supported banks. Eligibility depends on your issuing bank."],
  ["How much are the charges?", "Charges start at 1.6%. The exact rate depends on your card, bank and amount — we confirm it before you pay, every time."],
  ["What is “instant mode”?", "You either swipe your card or scan our QR. The transaction goes through on the spot and the amount is sent to your account right after."],
  ["Do you also book flights?", "Yes — domestic and international. Share your route and dates on WhatsApp and we'll send options."],
  ["Will anyone ask for my OTP or PIN?", "Never. Nobody from EKAM Group will ask for your PIN, CVV or OTP. If someone does, it isn't us."],
];

const CARD_POINTS = [
  "Charges from 1.6%, told to you upfront",
  "RuPay, Mastercard & Visa credit cards",
  "SBI, HDFC, ICICI, Axis, YES BANK & more",
  "Swipe the card or scan our QR",
];

/* ---------- decorative QR for the scan demo (not a real code) ---------- */
const QR_N = 21;
const QR_CELLS = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (x, y) => (x < 8 && y < 8) || (x > QR_N - 9 && y < 8) || (x < 8 && y > QR_N - 9);
  const out = [];
  for (let y = 0; y < QR_N; y++) for (let x = 0; x < QR_N; x++) if (!finder(x, y) && rnd() > 0.5) out.push([x, y]);
  return out;
})();

function QrArt() {
  const finder = (x, y) => (
    <g key={`f${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fffdf9" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${QR_N} ${QR_N}`} shapeRendering="crispEdges" aria-hidden="true">
      <g fill="#0c1a3b">
        {QR_CELLS.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)}
        {finder(0, 0)}
        {finder(QR_N - 7, 0)}
        {finder(0, QR_N - 7)}
      </g>
    </svg>
  );
}

function InstantDemo() {
  const [mode, setMode] = useState("scan");
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  // only run the little loops while the demo is on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className={s.demo} ref={ref} data-playing={playing || undefined}>
      <div className={s.tabs} role="tablist" aria-label="Payment mode">
        {[["scan", "Scan QR", QrCode], ["swipe", "Swipe card", CreditCard]].map(([k, label, Icon]) => (
          <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => setMode(k)}>
            <Icon size={17} /> {label}
          </button>
        ))}
      </div>

      <div className={s.stage}>
        {mode === "scan" ? (
          <div className={s.phone} key="scan">
            <span className={s.notch} />
            <p className={s.phoneTop}>Scan to pay · EKAM</p>
            <div className={s.qr}><QrArt /><span className={s.scan} /></div>
            <p className={s.phoneAmt}>₹50,000</p>
            <p className={s.phoneOk}><Check size={14} strokeWidth={3} /> ₹49,200 sent</p>
          </div>
        ) : (
          <div className={s.pos} key="swipe">
            <div className={s.posScreen}><span>Approved</span><Check size={20} strokeWidth={3} /></div>
            <div className={s.posKeys}>{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
            <span className={s.swipeCard}><i /></span>
          </div>
        )}
      </div>
      <p className={s.stageCap}>{mode === "scan" ? "Fig. 02 — Scan the QR, pay with your card." : "Fig. 02 — Or just swipe at our terminal."}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div style={theme("card-cash")}>
      {/* ---------- HERO ---------- */}
      <section className={s.hero}>
        <div className="wrap">
          <div className={s.top}>
            <p className="label">EKAM Group — four businesses, one crew</p>
            <a className={`label ${s.topPhone}`} href={`tel:+91${CONTACT.phone}`}>Call / WhatsApp · {CONTACT.phoneDisplay}</a>
          </div>

          <div className={s.headline}>
            <h1 className={s.h1}>
              <span className={s.ln}>
                Cash<Pic name="card-hand" />, flights<Pic name="travel-wing" />,
              </span>
              <span className={s.ln}>
                trade<Pic name="trade-warehouse" /> &amp; builds<Pic name="infra-site" />
              </span>
              <span className={s.ln}><em>— sorted by one crew.</em></span>
            </h1>
            <Stamp className={s.stamp} />
          </div>

          <div className={s.bottom}>
            <p className="lead">
              Credit card cash from 1.6%, flight tickets, AQA Trading and building &amp; infrastructure.
              One phone number, real people, quick replies.
            </p>
            <div className={s.actions}>
              <Link to="/card-cash" className="btn btn--ink">Get card cash <ArrowUpRight /></Link>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn--line">WhatsApp us</a>
            </div>
          </div>

          <nav className={s.index} aria-label="Our businesses">
            {VERTICALS.map((v) => (
              <Link key={v.slug} to={`/${v.slug}`} className={s.idx} style={{ ...themeVars(v.color) }}>
                <span className={s.idxNum}><span className="dot" /> {v.index}</span>
                <span className={s.idxName}>{v.nav}</span>
                <span className={s.idxTag}>{v.tagline}</span>
                <ArrowUpRight className={s.idxGo} />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <Marquee items={[...NETWORKS, ...BANKS]} />

      {/* ---------- 01 CARD CASH ---------- */}
      <section className="section">
        <div className={`wrap ${s.spot}`}>
          <Reveal className={s.spotMedia}>
            <div className={`photo ${s.spotPhoto}`}>
              <Photo name="card-counter" alt="Customer paying with a phone at a shop counter" sizes="(max-width: 960px) 100vw, 56vw" position="30% 50%" />
            </div>
            <div className={s.spotReceipt}><Receipt /></div>
            <p className={`caption ${s.spotCap}`}>Fig. 01 — Pay at the counter, cash in your account.</p>
          </Reveal>

          <Reveal className={s.spotCopy} delay={100}>
            <p className="label"><span className="dot" /> 01 — Card Cash</p>
            <h2 className="h-2">Your credit limit, <em>as cash.</em></h2>
            <p className="lead">
              Need cash and only have a credit card? Swipe it or scan our QR, and the amount — minus a small charge — lands in your bank account.
            </p>
            <ul className={s.points}>
              {CARD_POINTS.map((t, i) => (
                <li key={t}><span>0{i + 1}</span>{t}</li>
              ))}
            </ul>
            <div className={s.actions}>
              <a href="#charges" className="btn btn--ink">Check my charges <ArrowDown /></a>
              <Link to="/card-cash" className="link-arrow">Card Cash details <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CALCULATOR ---------- */}
      <section className="section section--alt" id="charges">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <p className="label">01 · Charges calculator</p>
              <h2 className="h-2">See your cash <em>before</em> you swipe.</h2>
            </div>
            <p className="lead">Pick your card network and how you'll pay, set the amount, then lock it in on WhatsApp. We confirm the final rate before you pay.</p>
          </Reveal>
          <Reveal><CashCalculator /></Reveal>
        </div>
      </section>

      {/* ---------- INSTANT MODE ---------- */}
      <section className={`section ${s.instant}`}>
        <div className={`wrap ${s.instGrid}`}>
          <Reveal className={s.instCopy}>
            <p className={`label ${s.instLabel}`}>Instant mode</p>
            <h2 className="h-2">Swipe it. Scan it. <em>Sorted.</em></h2>
            <p className={s.instLead}>No forms, no app downloads, no queue at a branch. Choose how you want to pay — the money moves as soon as it clears.</p>
            <ul className={s.ticks}>
              <li><Check size={16} strokeWidth={3} /> Works with eligible RuPay, Mastercard &amp; Visa credit cards</li>
              <li><Check size={16} strokeWidth={3} /> Charges shown before you pay</li>
              <li><Check size={16} strokeWidth={3} /> Amount sent straight to your account</li>
            </ul>
          </Reveal>
          <Reveal delay={120}><InstantDemo /></Reveal>
        </div>
      </section>

      {/* ---------- 02–04 THE OTHER BUSINESSES ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <p className="label">02 – 04 · More from EKAM</p>
              <h2 className="h-2">Three more ways <em>we've got you.</em></h2>
            </div>
            <p className="lead">Same crew, same phone number. Each business has its own team and its own page.</p>
          </Reveal>

          <div className={s.rows}>
            {VERTICALS.slice(1).map((v) => (
              <Reveal key={v.slug}>
                <Link to={`/${v.slug}`} className={s.row} style={themeVars(v.color)}>
                  <span className={s.rowNum}><span className="dot" /> {v.index}</span>
                  <div className={s.rowMain}>
                    <h3>{v.long}</h3>
                    <p>{v.blurb}</p>
                    <ul className={s.rowTags}>{v.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                    <span className={`link-arrow ${s.rowGo}`}>Explore {v.nav} <ArrowUpRight size={16} /></span>
                  </div>
                  <div className={`photo ${s.rowPhoto}`}>
                    <Photo name={v.image} alt={v.imageAlt} sizes="(max-width: 860px) 100vw, 36vw" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="section section--alt">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <p className="label">Why EKAM</p>
              <h2 className="h-2">Made for people who <em>don't do</em> waiting.</h2>
            </div>
            <p className="lead">Low charges, real people, and a process that's done before your chai gets cold.</p>
          </Reveal>
          <FeatureGrid items={WHY} />
        </div>
      </section>

      <FAQ
        items={FAQS}
        intro={<>Can't find yours? <a href={waLink("Hi EKAM Group, I have a question")} target="_blank" rel="noreferrer">Ask us on WhatsApp</a>.</>}
      />

      <CTABand title="Ready when you are." text="Cash, flights, trade or a build — one message gets you started." />
    </div>
  );
}

function Pic({ name }) {
  return (
    <span className={s.pic} aria-hidden="true">
      <img src={`/images/${name}-480.webp`} alt="" width="160" height="96" decoding="async" />
    </span>
  );
}
