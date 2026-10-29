import s from "./Marquee.module.css";

/** Straight ticker band. `tone`: "ink" (default) or "accent" (uses the page colour). */
export default function Marquee({ items, tone = "ink", speed = 40 }) {
  // enough copies that half the track is always wider than the screen
  const copies = items.length < 8 ? 4 : 2;
  const row = Array.from({ length: copies }, () => items).flat();

  return (
    <div className={`${s.band} ${tone === "accent" ? s.accent : ""}`} style={{ "--speed": `${speed}s` }}>
      <div className={s.track} aria-hidden="true">
        {row.map((t, i) => (
          <span key={i} className={s.item}>
            {t}
            <span className={s.sep}>✳</span>
          </span>
        ))}
      </div>
      <span className={s.sr}>{items.join(", ")}</span>
    </div>
  );
}
