import { useId, useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal.jsx";
import s from "./FAQ.module.css";

export default function FAQ({ items, title = <>Questions? <span className="accent">Fair.</span></>, intro }) {
  const [open, setOpen] = useState(0);
  const uid = useId().replace(/:/g, "");

  return (
    <section className="section glow-top">
      <div className={`wrap ${s.grid}`}>
        <Reveal className={s.head}>
          <span className="eyebrow">FAQ</span>
          <h2 className="h-lg">{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </Reveal>

        <div className={s.list}>
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={i * 60} className={`${s.item} ${isOpen ? s.open : ""}`}>
                <h3 className={s.qWrap}>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    className={s.q}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{q}</span>
                    <span className={s.ic} aria-hidden="true"><Plus size={20} /></span>
                  </button>
                </h3>
                <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className={s.a}>
                  <div><p>{a}</p></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
