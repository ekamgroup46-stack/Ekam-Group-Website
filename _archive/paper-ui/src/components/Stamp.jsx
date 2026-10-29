import { useId } from "react";
import s from "./Stamp.module.css";

/** Rubber-stamp roundel: ring text around a value, e.g. "from 1.6%". */
export default function Stamp({ ring = "CARD CASH ✳ RUPAY · MASTERCARD · VISA ✳ ", value = "1.6%", note = "from", className = "" }) {
  const id = "stamp" + useId().replace(/:/g, "");
  return (
    <div className={`${s.stamp} ${className}`} aria-label={`${note} ${value}`} role="img">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <text className={s.ring}>
          <textPath href={`#${id}`} textLength="282">{ring}</textPath>
        </text>
      </svg>
      <span className={s.core}>
        <small>{note}</small>
        {value}
      </span>
    </div>
  );
}
