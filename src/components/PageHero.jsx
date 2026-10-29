import { Check } from "lucide-react";
import s from "./PageHero.module.css";

/** Shared hero for the business pages. `visual` renders on the right. */
export default function PageHero({ eyebrow, title, lead, actions, trust, stats, visual }) {
  return (
    <section className={s.hero}>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="gridlines" aria-hidden="true" />

      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <span className={`pill ${s.rise}`} style={{ "--d": 0 }}>
            <span className="live-dot" /> {eyebrow}
          </span>
          <h1 className={`h-xl ${s.title} ${s.rise}`} style={{ "--d": 1 }}>{title}</h1>
          <p className={`lead ${s.rise}`} style={{ "--d": 2 }}>{lead}</p>
          {actions && <div className={`${s.actions} ${s.rise}`} style={{ "--d": 3 }}>{actions}</div>}
          {trust && (
            <ul className={`${s.trust} ${s.rise}`} style={{ "--d": 4 }}>
              {trust.map((t) => <li key={t}><Check strokeWidth={3} /> {t}</li>)}
            </ul>
          )}
          {stats && (
            <dl className={`${s.stats} ${s.rise}`} style={{ "--d": 5 }}>
              {stats.map(([k, v]) => (
                <div key={v}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
        </div>
        {visual && <div className={s.visual}>{visual}</div>}
      </div>
    </section>
  );
}
