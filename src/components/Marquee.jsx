import { Sparkle } from "lucide-react";
import s from "./Marquee.module.css";

/** Infinite ticker. `tilt` rotates the band slightly; `light` swaps lime for white. */
export default function Marquee({ items, tilt = 0, light = false, speed = 36 }) {
  // enough copies that half the track is always wider than the screen
  const copies = items.length < 8 ? 4 : 2;
  const row = Array.from({ length: copies }, () => items).flat();

  return (
    <div className={s.clip}>
      <div className={`${s.band} ${light ? s.light : ""}`} style={{ "--tilt": `${tilt}deg`, "--speed": `${speed}s` }}>
        <div className={s.track} aria-hidden="true">
          {row.map((t, i) => (
            <span key={i} className={s.item}>
              {t}
              <Sparkle size={20} className={s.star} />
            </span>
          ))}
        </div>
        <span className="sr-only">{items.join(", ")}</span>
      </div>
    </div>
  );
}
