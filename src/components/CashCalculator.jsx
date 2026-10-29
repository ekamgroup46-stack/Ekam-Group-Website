import { useState } from "react";
import { ArrowUpRight, QrCode, CreditCard } from "lucide-react";
import { NETWORKS, RATE_FROM, inr, waLink } from "../data/business.js";
import s from "./CashCalculator.module.css";

const MIN = 1000;
const MAX = 500000;
const PRESETS = [10000, 25000, 50000, 100000];
const NETWORK_OPTS = NETWORKS.map((n) => ({ value: n, label: n }));
const MODE_OPTS = [
  { value: "QR scan", label: "QR scan", icon: QrCode },
  { value: "Card swipe", label: "Card swipe", icon: CreditCard },
];

/** Segmented control with a pill that slides to the selected option (pure CSS). */
function Segmented({ label, options, value, onChange }) {
  const i = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <div className={s.group}>
      <span className={s.label} id={`seg-${label}`}>{label}</span>
      <div className={s.seg} role="radiogroup" aria-labelledby={`seg-${label}`} style={{ "--i": i, "--n": options.length }}>
        <span className={s.segBg} aria-hidden="true" />
        {options.map(({ value: v, label: l, icon: Icon }) => (
          <button key={v} type="button" role="radio" aria-checked={value === v} onClick={() => onChange(v)}>
            {Icon && <Icon size={16} />} {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CashCalculator() {
  const [amount, setAmount] = useState(50000);
  const [network, setNetwork] = useState("RuPay");
  const [mode, setMode] = useState("QR scan");

  const fee = amount * (RATE_FROM / 100);
  const clamped = Math.min(Math.max(amount, MIN), MAX);
  const pct = ((clamped - MIN) / (MAX - MIN)) * 100;

  const onText = (e) => setAmount(Math.min(parseInt(e.target.value.replace(/\D/g, ""), 10) || 0, 9999999));

  const msg = `Hi EKAM Group! I want to withdraw ${inr(amount)} from my ${network} credit card via ${mode}. Please confirm the charges.`;

  return (
    <div className={s.calc}>
      <div className={s.left}>
        <Segmented label="Card network" options={NETWORK_OPTS} value={network} onChange={setNetwork} />
        <Segmented label="Mode" options={MODE_OPTS} value={mode} onChange={setMode} />

        <div className={s.group}>
          <label className={s.label} htmlFor="calc-amt">I need</label>
          <div className={s.amt}>
            <span>₹</span>
            <input
              id="calc-amt"
              size={1}
              inputMode="numeric"
              autoComplete="off"
              value={amount ? amount.toLocaleString("en-IN") : ""}
              onChange={onText}
              placeholder="0"
            />
          </div>
          <input
            type="range" min={MIN} max={MAX} step={1000} value={clamped}
            onChange={(e) => setAmount(+e.target.value)}
            className={s.range} style={{ "--p": `${pct}%` }} aria-label="Amount slider"
          />
          <div className={s.presets}>
            {PRESETS.map((p) => (
              <button key={p} type="button" aria-pressed={amount === p} onClick={() => setAmount(p)}>{inr(p)}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.right}>
        <div className={s.line}><span>Amount</span><b key={"a" + amount} className={s.roll}>{inr(amount)}</b></div>
        <div className={s.line}><span>Charges (from {RATE_FROM}%)</span><b key={"f" + amount} className={s.roll}>– {inr(fee)}</b></div>
        <hr />
        <div className={s.total}>
          <span>You receive approx.</span>
          <b key={"t" + amount} className={s.roll}>{inr(Math.max(amount - fee, 0))}</b>
        </div>
        <a href={waLink(msg)} target="_blank" rel="noreferrer" className="btn btn--dark btn--block">
          Lock this on WhatsApp <ArrowUpRight />
        </a>
        <p className={s.note}>*Estimate. Final charges depend on card &amp; bank and are confirmed before you pay.</p>
      </div>
    </div>
  );
}
