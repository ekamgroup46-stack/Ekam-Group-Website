import s from "./LogoStrip.module.css";

/** Endless strip of real logos on white chips. items: [{ name, logo }] from /public/logos. */
export default function LogoStrip({ items, label, speed = 40, tilt = 0 }) {
  // enough copies that half the track is always wider than the screen
  const row = Array.from({ length: items.length < 6 ? 4 : 2 }, () => items).flat();

  return (
    <div className={s.clip}>
      <div className={s.band} style={{ "--tilt": `${tilt}deg`, "--speed": `${speed}s` }}>
        {label && <span className={s.label}>{label}</span>}
        <div className={s.viewport}>
          <div className={s.track} aria-hidden="true">
            {row.map((it, i) => (
              <span key={i} className={s.chip}>
                <img src={`/logos/${it.logo}.png`} alt="" height="28" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
        <span className="sr-only">{items.map((it) => it.name).join(", ")}</span>
      </div>
    </div>
  );
}
