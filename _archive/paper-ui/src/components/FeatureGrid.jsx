import Reveal from "./Reveal.jsx";
import s from "./FeatureGrid.module.css";

/**
 * Features as a hairline grid (default) or as a ruled list (layout="list").
 * items: [{ icon, title, text }]
 */
export default function FeatureGrid({ items, cols = 3, layout = "grid" }) {
  if (layout === "list") {
    return (
      <ul className={s.list}>
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 50} className={s.row}>
            <Icon className={s.rowIc} size={22} strokeWidth={1.75} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ul>
    );
  }

  return (
    <div className={s.grid} style={{ "--cols": cols }}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={(i % cols) * 70} className={s.cell}>
          <span className={s.top}>
            <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
            <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>
      ))}
    </div>
  );
}
