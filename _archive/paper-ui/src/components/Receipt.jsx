import { Check } from "lucide-react";
import { RATE_FROM, inr } from "../data/business.js";
import s from "./Receipt.module.css";

/** Printed-receipt card used as a photo overlay on the card-cash sections. Illustrative numbers. */
export default function Receipt({ amount = 50000, network = "RuPay", mode = "QR scan" }) {
  const fee = (amount * RATE_FROM) / 100;
  const rows = [
    ["Amount", inr(amount)],
    ["Network", network],
    ["Mode", mode],
    [`Charges ${RATE_FROM}%`, "– " + inr(fee)],
  ];

  return (
    <div className={s.shadow} aria-hidden="true">
      <div className={s.receipt}>
        <div className={s.head}>
          <img src="/logo-mark.png" alt="" width="28" height="29" />
          <span><b>EKAM · Instant mode</b>Paid just now</span>
        </div>
        <p className={s.ok}><Check size={14} strokeWidth={3} /> Payment successful</p>
        <dl className={s.rows}>
          {rows.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <div className={s.total}>
          <span>Sent to your account</span>
          <b>{inr(amount - fee)}</b>
        </div>
        <p className={s.thanks}>Thank you — see you again</p>
      </div>
    </div>
  );
}
