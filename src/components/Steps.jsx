import Reveal from "./Reveal.jsx";
import s from "./Steps.module.css";

/** Numbered process row. items: [{ title, text }] */
export default function Steps({ eyebrow = "How it works", title, items }) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h-lg">{title}</h2>
        </Reveal>
        <ol className={s.steps} style={{ "--n": items.length }}>
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 110} className={s.step}>
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
