import { Link } from "react-router-dom";
import Photo from "./Photo.jsx";
import s from "./PageHero.module.css";

/**
 * Hero for the business pages: copy on the left, a real photo on the right
 * with a designed object (receipt, boarding pass…) laid over it.
 */
export default function PageHero({ index, name, title, lead, actions, stats, image, imageAlt, position, overlay, caption }) {
  return (
    <section className={s.hero}>
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={`label ${s.crumbs}`}>
            <Link to="/">EKAM</Link>
            <span aria-hidden="true">/</span>
            <span className="dot" />
            <span>{index} — {name}</span>
          </p>
          <h1 className={`h-display ${s.title}`}>{title}</h1>
          <p className="lead">{lead}</p>
          {actions && <div className={s.actions}>{actions}</div>}
          {stats && (
            <dl className={s.stats}>
              {stats.map(([k, v]) => (
                <div key={v}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
        </div>

        <figure className={s.media}>
          <div className={`photo ${s.photo}`}>
            <Photo name={image} alt={imageAlt} position={position} priority sizes="(max-width: 960px) 100vw, 46vw" />
          </div>
          {overlay && <div className={s.overlay}>{overlay}</div>}
          {caption && <figcaption className={`caption ${s.caption}`}>{caption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
