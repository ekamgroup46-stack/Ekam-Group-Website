import { useEffect, useRef, useState } from "react";
import { Check, QrCode, CreditCard, Banknote } from "lucide-react";
import QrArt from "./QrArt.jsx";
import Receipt from "./Receipt.jsx";
import s from "./CashFlow.module.css";

const STEPS = [
  { key: "scan", label: "Scan QR", icon: QrCode, ms: 3400 },
  { key: "swipe", label: "or swipe", icon: CreditCard, ms: 3400 },
  { key: "cash", label: "Get cash", icon: Banknote, ms: 4600 },
];

function ScanScene() {
  return (
    <div className={`${s.scene} ${s.scan}`}>
      <div className={s.standee}>
        <p className={s.standeeTop}><img src="/logo-mark.png" alt="" width="22" height="23" /> Scan &amp; pay · EKAM</p>
        <div className={s.standeeQr}><QrArt /></div>
        <div className={s.standeeLogos}>
          {["rupay", "mastercard", "visa"].map((l) => <img key={l} src={`/logos/${l}.png`} alt="" height="14" />)}
        </div>
      </div>
      <div className={s.phone}>
        <span className={s.notch} />
        <div className={s.cam}>
          <QrArt />
          <span className={s.corners} />
          <span className={s.scanLine} />
        </div>
        <p className={s.phoneAmt}>Paying <b>₹50,000</b></p>
        <p className={s.phoneOk}><Check size={14} strokeWidth={3} /> QR verified</p>
      </div>
    </div>
  );
}

function SwipeScene() {
  return (
    <div className={`${s.scene} ${s.swipe}`}>
      <div className={s.pos}>
        <div className={s.posScreen}>
          <span className={s.posWait}>Swipe card…</span>
          <span className={s.posOk}><Check size={18} strokeWidth={3} /> Approved</span>
        </div>
        <p className={s.posAmt}>₹50,000</p>
        <div className={s.posKeys}>{Array.from({ length: 12 }, (_, n) => <i key={n} />)}</div>
        <span className={s.slot} />
      </div>
      <div className={s.card}>
        <span className={s.cardBrand}>EKAM</span>
        <span className={s.cardChip} />
        <span className={s.cardNum}>5241 •••• 1600</span>
        <img className={s.cardNet} src="/logos/mastercard.png" alt="" height="26" />
      </div>
    </div>
  );
}

function CashScene() {
  return (
    <div className={`${s.scene} ${s.cash}`}>
      <div className={s.receipt}><Receipt /></div>
      <div className={s.sms}>
        <span className={s.smsIc}>₹</span>
        <span><b>₹49,200 credited</b><small>to your bank account · just now</small></span>
      </div>
      {Array.from({ length: 6 }, (_, i) => <span key={i} className={s.note} style={{ "--i": i }}>₹</span>)}
    </div>
  );
}

const SCENES = { scan: ScanScene, swipe: SwipeScene, cash: CashScene };

/**
 * Card Cash hero animation: scan the QR (or swipe the card) → money lands in your account.
 * Auto-plays only while on screen; the step buttons jump straight to a scene.
 */
export default function CashFlow() {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(reduced ? 2 : 0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const t = setTimeout(() => setI((n) => (n + 1) % STEPS.length), STEPS[i].ms);
    return () => clearTimeout(t);
  }, [i, playing, reduced]);

  const Scene = SCENES[STEPS[i].key];

  return (
    <div className={s.flow} ref={ref}>
      <div className={s.steps} role="tablist" aria-label="How card cash works">
        {STEPS.map((st, n) => (
          <button key={st.key} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)}>
            <st.icon size={16} /> {st.label}
            {n === i && !reduced && <i key={i} className={s.bar} style={{ "--ms": `${st.ms}ms` }} data-paused={!playing || undefined} />}
          </button>
        ))}
      </div>
      <div className={s.stage} aria-hidden="true">
        <Scene key={i} />
      </div>
    </div>
  );
}
