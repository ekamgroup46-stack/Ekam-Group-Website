import { Check } from "lucide-react";
import { NETWORKS, RATE_FROM, inr } from "../data/business.js";
import s from "./Receipt.module.css";

/** Payment receipt used as the Card Cash hero visual. Illustrative numbers. */
export default function Receipt({ amount = 50000 }) {
  const fee = (amount * RATE_FROM) / 100;
  const rows = [
    ["Amount", inr(amount)],
    ["Network", "RuPay"],
    ["Mode", "QR scan"],
    [`Charges (${RATE_FROM}%)`, "– " + inr(fee)],
  ];

  return (
    <div className={s.wrap} aria-hidden="true">
      <div className={s.chips}>
        {NETWORKS.map((n, i) => <span key={n} style={{ "--i": i }}>{n}</span>)}
      </div>
      <div className={s.shadow}>
        <div className={s.receipt}>
          <div className={s.top}>
            <span className={s.ok}><Check size={22} strokeWidth={3} /></span>
            <div><b>Payment successful</b><small>EKAM · Instant mode</small></div>
            <img className={s.logo} src="/logo-mark.png" alt="" width="34" height="35" />
          </div>
          <div className={s.rows}>
            {rows.map(([k, v], i) => (
              <div key={k} className={s.row} style={{ "--i": i }}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
          <div className={s.total}>
            <span>Sent to your account</span>
            <b>{inr(amount - fee)}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
