import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Check, QrCode, CreditCard, BadgePercent, Zap, Landmark, ShieldCheck, FileCheck2, MessageCircle, Instagram } from "lucide-react";
import { BANKS, CONTACT, NETWORKS, VERTICALS, theme, waLink } from "../data/business.js";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import Marquee from "../components/Marquee.jsx";
import CardVisual from "../components/CardVisual.jsx";
import CashCalculator from "../components/CashCalculator.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";
import s from "./Home.module.css";

const WORDS = [
  ["cash", "var(--orange)"],
  ["flights", "var(--sky)"],
  ["trade", "var(--gold)"],
  ["builds", "var(--green)"],
];

const STATS = [["1.6%", "charges from*"], ["3", "card networks"], ["4", "businesses"], ["2", "modes · swipe / scan"]];

const FAQS = [
  ["Which cards work for cash withdrawal?", "RuPay, Mastercard and Visa credit cards from SBI, HDFC Bank, ICICI Bank, Axis Bank, YES BANK and other supported banks. Eligibility depends on your issuing bank."],
  ["How much are the charges?", "Charges start at 1.6%. The exact rate depends on your card, bank and amount — we confirm it before you pay, every time."],
  ["What is “instant mode”?", "You either swipe your card or scan our QR. The transaction goes through on the spot and the amount is sent to your account right after."],
  ["Do you also book flights?", "Yes — domestic and international. Share your route and dates on WhatsApp and we'll send options."],
  ["Will anyone ask for my OTP or PIN?", "Never. Nobody from EKAM Group will ask for your PIN, CVV or OTP. If someone does, it isn't us."],
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
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${QR_N} ${QR_N}`} shapeRendering="crispEdges" aria-hidden="true">
      <g fill="#060914">
        {QR_CELLS.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)}
        {finder(0, 0)}
        {finder(QR_N - 7, 0)}
        {finder(0, QR_N - 7)}
      </g>
    </svg>
  );
}

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  const [word, color] = WORDS[i];
  return (
    <span className={s.rotator}>
      <span key={word} className={s.word} style={{ color }}>{word}.</span>
    </span>
  );
}

const MODES = [["scan", "Scan QR", QrCode], ["swipe", "Swipe card", CreditCard]];

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

  const idx = MODES.findIndex(([k]) => k === mode);

  return (
    <div className={s.demo} ref={ref} data-playing={playing || undefined}>
      <div className={s.tabs} role="tablist" aria-label="Payment mode" style={{ "--i": idx }}>
        <span className={s.tabBg} aria-hidden="true" />
        {MODES.map(([k, label, Icon]) => (
          <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => setMode(k)}>
            <Icon size={16} /> {label}
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
            <p className={s.paid}><Check size={14} strokeWidth={3} /> ₹49,200 sent</p>
          </div>
        ) : (
          <div className={s.pos} key="swipe">
            <div className={s.posScreen}><span>Approved</span><Check size={20} strokeWidth={3} /></div>
            <div className={s.posKeys}>{Array.from({ length: 12 }, (_, n) => <i key={n} />)}</div>
            <span className={s.swipeCard}><i /></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div style={theme("card-cash")}>
      {/* ---------- HERO ---------- */}
      <section className={s.hero}>
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="gridlines" aria-hidden="true" />

        <div className={`wrap ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <span className={`pill ${s.rise}`} style={{ "--d": 0 }}>
              <span className="live-dot" /> Card cash from 1.6% · RuPay · Mastercard · Visa
            </span>

            <h1 className={s.h1}>
              <span className="sr-only">One group. Endless cash, flights, trade and builds.</span>
              <span aria-hidden="true">
                <span className={s.lineMask}><span className={s.line} style={{ "--d": 1 }}>One group.</span></span>
                <span className={s.lineMask}><span className={s.line} style={{ "--d": 2 }}>Endless</span></span>
                <span className={s.lineMask}><span className={s.line} style={{ "--d": 3 }}><Rotator /></span></span>
              </span>
            </h1>

            <p className={`lead ${s.rise}`} style={{ "--d": 4 }}>
              Credit card cash in minutes, flights booked by real people, AQA Trading and building infrastructure —
              four businesses, one name you can call.
            </p>

            <div className={`${s.heroActions} ${s.rise}`} style={{ "--d": 5 }}>
              <Link to="/card-cash" className="btn btn--primary">Get card cash <ArrowUpRight /></Link>
              <a href="#businesses" className="btn btn--ghost">Explore EKAM <ArrowDown className="ic-down" /></a>
            </div>

            <ul className={`${s.trust} ${s.rise}`} style={{ "--d": 6 }}>
              <li><Check strokeWidth={3} /> Charges shown upfront</li>
              <li><Check strokeWidth={3} /> Never asks for PIN or OTP</li>
              <li><Check strokeWidth={3} /> Real humans on WhatsApp</li>
            </ul>
          </div>

          <div className={s.heroArt}><CardVisual /></div>
        </div>

        <div className={`wrap ${s.heroFoot}`}>
          {STATS.map(([k, v], i) => (
            <div key={v} className={s.rise} style={{ "--d": 7 + i }}>
              <b>{k}</b><span>{v}</span>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={[...NETWORKS, ...BANKS]} tilt={-2} />

      {/* ---------- BUSINESSES ---------- */}
      <section className="section" id="businesses">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <span className="eyebrow">What we do</span>
              <h2 className="h-lg">Four businesses.<br /><span className="grad">One number to call.</span></h2>
            </div>
            <p className="lead">Each business has its own team and its own page. Pick one to dive in.</p>
          </Reveal>

          <div className={s.panels}>
            {VERTICALS.map((v, i) => (
              <Reveal key={v.slug} delay={i * 80} className={s.panelWrap}>
                <Link to={`/${v.slug}`} className={s.panel} style={{ "--c": `var(--${v.color})` }}>
                  <Photo name={v.image} alt="" className={s.pPhoto} sizes="(max-width: 1080px) 100vw, 46vw" />
                  <span className={s.pShade} aria-hidden="true" />
                  <span className={s.pNum}>{v.index}</span>
                  <span className={s.pIcon}><v.icon size={28} strokeWidth={1.7} /></span>
                  <span className={s.pVert} aria-hidden="true">{v.name}</span>
                  <div className={s.pBody}>
                    <span className={s.pTag}>{v.tag}</span>
                    <h3>{v.long}</h3>
                    <p>{v.blurb}</p>
                    <span className={s.pGo}>Open page <ArrowUpRight size={18} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INSTANT MODE ---------- */}
      <section className={`section ${s.instant}`}>
        <div className={`wrap ${s.instGrid}`}>
          <Reveal className={s.instCopy}>
            <span className="eyebrow" style={{ color: "var(--lime)" }}>Instant mode</span>
            <h2 className="h-lg">Swipe it.<br />Scan it.<br /><span style={{ color: "var(--lime)" }}>Done.</span></h2>
            <p className="lead">No forms, no app downloads, no waiting on a branch. Pick how you want to pay — the money moves the moment it clears.</p>
            <ul className={s.ticks}>
              <li>Works with eligible RuPay, Mastercard &amp; Visa credit cards</li>
              <li>Charges shown before you pay</li>
              <li>Amount sent straight to your account</li>
            </ul>
          </Reveal>
          <Reveal delay={150}><InstantDemo /></Reveal>
        </div>
      </section>

      {/* ---------- CALCULATOR ---------- */}
      <section className="section" id="charges">
        <div className="wrap">
          <Reveal className="head head--center">
            <span className="eyebrow">Charges calculator</span>
            <h2 className="h-lg">See your cash <span className="accent">before</span> you swipe.</h2>
            <p className="lead">Pick your network, slide the amount, and lock it in on WhatsApp.</p>
          </Reveal>
          <Reveal delay={100}><CashCalculator /></Reveal>
        </div>
      </section>

      {/* ---------- WHY EKAM (bento on paper) ---------- */}
      <section className="section section--light">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <span className="eyebrow">Why EKAM</span>
              <h2 className="h-lg">Made for people who don't do <span className="outline">waiting.</span></h2>
            </div>
            <p className="lead">Low charges, real people, and a process that's done before your chai gets cold.</p>
          </Reveal>

          <div className={s.bento}>
            <Reveal className={`${s.tile} ${s.tDark} ${s.tA}`}>
              <span className={s.tIc} style={{ "--ic": "var(--orange)" }}><BadgePercent size={24} /></span>
              <div className={s.bigRate}>
                <small>from</small>
                <b className="grad">1.6%</b>
              </div>
              <h3>Low charges</h3>
              <p>Some of the sharpest card-cash rates around — and always told to you before you pay.</p>
              <a href="#charges" className={s.tLink}>Try the calculator <ArrowUpRight size={16} /></a>
            </Reveal>

            <Reveal delay={80} className={`${s.tile} ${s.tB}`}>
              <span className={s.tIc} style={{ "--ic": "var(--sky-d)" }}><Zap size={24} /></span>
              <h3>Instant mode</h3>
              <p>Swipe the card or scan a QR. Minutes, not days.</p>
              <div className={s.modeChips}>
                <span><QrCode size={16} /> QR scan</span>
                <span><CreditCard size={16} /> Card swipe</span>
              </div>
            </Reveal>

            <Reveal delay={160} className={`${s.tile} ${s.tC}`}>
              <span className={s.tIc} style={{ "--ic": "var(--green-d)" }}><Landmark size={24} /></span>
              <h3>Wide bank support</h3>
              <p>Eligible credit cards from India's major banks.</p>
              <ul className={s.bankChips}>
                {BANKS.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </Reveal>

            <Reveal className={`${s.tile} ${s.tD}`}>
              <span className={s.tIc} style={{ "--ic": "var(--blue)" }}><ShieldCheck size={24} /></span>
              <h3>Secure by default</h3>
              <p>A clean, simple process. We never ask for your PIN, CVV or OTP.</p>
            </Reveal>

            <Reveal delay={80} className={`${s.tile} ${s.tE}`}>
              <span className={s.tIc} style={{ "--ic": "var(--gold-d)" }}><FileCheck2 size={24} /></span>
              <h3>By the rules</h3>
              <p>Eligible non-utility transactions, per bank &amp; network rules.</p>
            </Reveal>

            <Reveal delay={160} className={`${s.tile} ${s.tLime} ${s.tF}`}>
              <span className={s.tIc} style={{ "--ic": "var(--ink)" }}><MessageCircle size={24} /></span>
              <h3>Real humans</h3>
              <p>No bots, no ticket numbers. Message us and a person replies.</p>
              <div className={s.tBtns}>
                <a href={waLink()} target="_blank" rel="noreferrer" className="btn btn--dark">WhatsApp <ArrowUpRight /></a>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className={s.igBtn} aria-label="EKAM on Instagram"><Instagram size={20} /></a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FAQ
        items={FAQS}
        intro={<>Can't find yours? <a href={waLink("Hi EKAM Group, I have a question")} target="_blank" rel="noreferrer">Ask on WhatsApp →</a></>}
      />

      <CTABand title="Ready when you are." text="Cash, flights, trade or a build — one message gets you started." />
    </div>
  );
}
