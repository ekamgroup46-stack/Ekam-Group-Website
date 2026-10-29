import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { VERTICALS } from "../data/business.js";

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ minHeight: "86vh", display: "grid", placeItems: "center", textAlign: "center", overflow: "hidden", isolation: "isolate", paddingTop: "calc(var(--bar-h) + 140px)" }}
    >
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="wrap" style={{ display: "grid", gap: 24, justifyItems: "center" }}>
        <h1 className="h-xl grad">404</h1>
        <p className="lead">This page took a flight we didn't book.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
          <Link to="/" className="btn btn--light">Back home <ArrowUpRight /></Link>
          {VERTICALS.map((v) => <Link key={v.slug} to={`/${v.slug}`} className="btn btn--ghost">{v.nav}</Link>)}
        </div>
      </div>
    </section>
  );
}
