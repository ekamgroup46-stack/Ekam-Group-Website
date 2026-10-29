import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { VERTICALS } from "../data/business.js";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "70vh" }}>
      <div className="wrap" style={{ display: "grid", gap: 24, justifyItems: "start" }}>
        <p className="label">Error 404</p>
        <h1 className="h-display">This page took a flight <em>we didn't book.</em></h1>
        <p className="lead">The link may be old or mistyped. Try one of these instead:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link to="/" className="btn btn--ink">Back home <ArrowUpRight /></Link>
          {VERTICALS.map((v) => (
            <Link key={v.slug} to={`/${v.slug}`} className="btn btn--line">{v.nav}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
