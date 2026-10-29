import Reveal from "./Reveal.jsx";
import s from "./Steps.module.css";

/** Numbered process on a dashed timeline. items: [{ title, text }] */
export default function Steps({ label = "How it works", title, items, alt = false }) {
  return (
    <section className={`section ${alt ? "section--alt" : ""}`}>
      <div className="wrap">
        <Reveal className="head">
          <p className="label">{label}</p>
          <h2 className="h-2">{title}</h2>
        </Reveal>
        <ol className={s.steps} style={{ "--n": items.length }}>
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 90} className={s.step}>
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
