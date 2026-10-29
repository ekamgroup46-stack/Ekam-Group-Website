import { useId, useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal.jsx";
import s from "./FAQ.module.css";

export default function FAQ({ items, label = "FAQ", title = <>Questions? <em>Fair.</em></>, intro, alt = false }) {
  const [open, setOpen] = useState(0);
  const uid = useId().replace(/:/g, "");

  return (
    <section className={`section ${alt ? "section--alt" : ""}`}>
      <div className={`wrap ${s.grid}`}>
        <Reveal className={s.head}>
          <p className="label">{label}</p>
          <h2 className="h-2">{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </Reveal>

        <Reveal className={s.list} delay={80}>
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className={`${s.item} ${isOpen ? s.open : ""}`}>
                <h3 className={s.qWrap}>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    className={s.q}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={s.qText}>{q}</span>
                    <span className={s.ic} aria-hidden="true"><Plus size={18} /></span>
                  </button>
                </h3>
                <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className={s.a}>
                  <div><p>{a}</p></div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
