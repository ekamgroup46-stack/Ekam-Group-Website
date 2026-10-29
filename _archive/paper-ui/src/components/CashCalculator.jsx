import { useState } from "react";
import { ArrowUpRight, QrCode, CreditCard } from "lucide-react";
import { NETWORKS, RATE_FROM, inr, waLink } from "../data/business.js";
import s from "./CashCalculator.module.css";

const MIN = 1000;
const MAX = 500000;
const PRESETS = [10000, 25000, 50000, 100000];
const MODES = [["QR scan", QrCode], ["Card swipe", CreditCard]];

function Segmented({ label, options, value, onChange }) {
  return (
    <div className={s.group} role="group" aria-label={label}>
      <span className={s.glabel}>{label}</span>
      <div className={s.seg}>
        {options.map(([opt, Icon]) => (
          <button key={opt} type="button" aria-pressed={value === opt} onClick={() => onChange(opt)}>
            {Icon && <Icon size={16} />} {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Charges calculator styled as a ticket: inputs on the left, the stub shows what you get. */
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
    <div className={s.ticket}>
      <div className={s.form}>
        <Segmented label="Card network" options={NETWORKS.map((n) => [n])} value={network} onChange={setNetwork} />
        <Segmented label="How you'll pay" options={MODES} value={mode} onChange={setMode} />

        <div className={s.group}>
          <label className={s.glabel} htmlFor="calc-amt">Amount I need</label>
          <div className={s.amount}>
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

      <div className={s.stub}>
        <p className={s.stubHead}>Your estimate</p>
        <div className={s.line}><span>Amount</span><b key={"a" + amount} className={s.tick}>{inr(amount)}</b></div>
        <div className={s.line}><span>Charges (from {RATE_FROM}%)</span><b key={"f" + amount} className={s.tick}>– {inr(fee)}</b></div>
        <div className={s.total}>
          <span>You receive approx.</span>
          <b key={"t" + amount} className={s.tick}>{inr(Math.max(amount - fee, 0))}</b>
        </div>
        <a href={waLink(msg)} target="_blank" rel="noreferrer" className="btn btn--ink btn--block">
          Lock this on WhatsApp <ArrowUpRight />
        </a>
        <p className={s.note}>*Estimate only. Final charges depend on your card and bank, and are confirmed before you pay.</p>
      </div>
    </div>
  );
}
