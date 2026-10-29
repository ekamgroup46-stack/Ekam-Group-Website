import Reveal from "./Reveal.jsx";
import s from "./FeatureGrid.module.css";

/**
 * Feature tiles with a cursor-following glow (default), or a compact
 * ruled list (layout="list"). items: [{ icon, title, text }]
 */
export default function FeatureGrid({ items, cols = 3, layout = "grid" }) {
  if (layout === "list") {
    return (
      <ul className={s.list}>
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 50} className={s.row}>
            <span className={s.rowIc}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ul>
    );
  }

  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div className={s.grid} style={{ "--cols": cols }}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={(i % cols) * 80} className={s.tile} onPointerMove={glow}>
          <span className={s.ic}><Icon size={24} strokeWidth={1.8} aria-hidden="true" /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>
      ))}
    </div>
  );
}
