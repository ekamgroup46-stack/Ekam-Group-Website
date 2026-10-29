import { useState } from "react";
import { ArrowUpRight, Check, PencilLine } from "lucide-react";
import { waLink } from "../data/business.js";
import s from "./EnquiryForm.module.css";

/**
 * Config-driven enquiry form. On submit it opens WhatsApp with every
 * filled field pre-typed, then shows a success state with a fallback link.
 *
 * fields: [{ name, label, type?, options?, placeholder?, span?, required? }]
 */
export default function EnquiryForm({ title, subject, fields, cta = "Send on WhatsApp" }) {
  const [values, setValues] = useState({});
  const [sentLink, setSentLink] = useState(null);

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = fields
      .filter((f) => values[f.name])
      .map((f) => `• ${f.label}: ${values[f.name]}`);
    const link = waLink([`Hi EKAM Group! New ${subject} enquiry:`, ...lines].join("\n"));
    window.open(link, "_blank", "noopener");
    setSentLink(link);
  };

  if (sentLink) {
    return (
      <div className={s.success} role="status">
        <span className={s.check}><Check size={30} strokeWidth={3} /></span>
        <h3>Your message is ready.</h3>
        <p>WhatsApp opened in a new tab with your details filled in — just hit send and we'll reply there.</p>
        <div className={s.successActions}>
          <a href={sentLink} target="_blank" rel="noreferrer" className="btn btn--primary">Open WhatsApp again <ArrowUpRight /></a>
          <button type="button" className="btn btn--ghost" onClick={() => setSentLink(null)}><PencilLine /> Edit details</button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      {title && (
        <div className={s.top}>
          <h3 className={s.title}>{title}</h3>
          <span className={s.req}>* required</span>
        </div>
      )}
      <div className={s.grid}>
        {fields.map((f) => {
          const id = `f-${subject}-${f.name}`.replace(/\s+/g, "-");
          const label = f.required ? `${f.label} *` : f.label;
          return (
            <div key={f.name} className={`field ${f.span ? s.full : ""}`}>
              <label htmlFor={id}>{label}</label>
              {f.options ? (
                <select id={id} required={f.required} value={values[f.name] || ""} onChange={set(f.name)}>
                  <option value="" disabled>Select…</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea id={id} placeholder={f.placeholder} required={f.required} value={values[f.name] || ""} onChange={set(f.name)} />
              ) : (
                <input id={id} type={f.type || "text"} placeholder={f.placeholder} required={f.required} value={values[f.name] || ""} onChange={set(f.name)} />
              )}
            </div>
          );
        })}
      </div>
      <button type="submit" className="btn btn--primary btn--block">{cta} <ArrowUpRight /></button>
      <p className={s.hint}>Opens WhatsApp with your details filled in. Nothing is stored on this site.</p>
    </form>
  );
}
