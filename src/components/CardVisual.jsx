import { useRef } from "react";
import { Check } from "lucide-react";
import s from "./CardVisual.module.css";

/**
 * Credit-card stack that tilts toward the mouse, with floating stickers.
 * The tilt writes two CSS variables once per animation frame — no animation library.
 */
export default function CardVisual() {
  const stage = useRef(null);
  const frame = useRef(0);

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = stage.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", `${(x * 24).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 18).toFixed(2)}deg`);
    });
  };

  const reset = () => {
    cancelAnimationFrame(frame.current);
    stage.current.style.setProperty("--ry", "0deg");
    stage.current.style.setProperty("--rx", "0deg");
  };

  return (
    <div className={s.stage} ref={stage} onPointerMove={onMove} onPointerLeave={reset} aria-hidden="true">
      <div className={s.ring} />

      <div className={s.tilt}>
        <div className={s.float}>
          <div className={`${s.card} ${s.back}`}>
            <span className={s.brand}>EKAM</span>
            <span className={s.num}>•••• 4021</span>
          </div>

          <div className={`${s.card} ${s.front}`}>
            <div className={s.row}>
              <span className={s.brand}>EKAM</span>
              <span className={s.contactless}><i /><i /><i /></span>
            </div>
            <span className={s.chip} />
            <span className={s.num}>5241 •••• •••• 1600</span>
            <div className={s.row}>
              <span className={s.meta}>CARD HOLDER<br /><b>YOU</b></span>
              <span className={s.cardLogo}><img src="/logo-mark.png" alt="" width="26" height="27" /></span>
            </div>
            <span className={s.shine} />
          </div>
        </div>
      </div>

      <div className={s.badge}>
        <svg viewBox="0 0 100 100">
          <defs><path id="cv-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
          <text><textPath href="#cv-ring">LOW CHARGES ✦ FAST CASH ✦ LOW CHARGES ✦ </textPath></text>
        </svg>
      </div>
      <div className={s.badgeCore}><span>1.6<small>%</small></span></div>

      <div className={s.toast}>
        <span className={s.toastIc}><Check size={18} strokeWidth={3} /></span>
        <span><b>₹49,200 sent</b><small>just now · via QR</small></span>
      </div>
    </div>
  );
}
