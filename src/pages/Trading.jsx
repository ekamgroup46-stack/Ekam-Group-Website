import { ArrowDown, PackageSearch, Boxes, ClipboardCheck, Truck, Scale, Handshake, Search, ShieldCheck } from "lucide-react";
import { theme, waLink } from "../data/business.js";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import Marquee from "../components/Marquee.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import Steps from "../components/Steps.jsx";
import CTABand from "../components/CTABand.jsx";
import s from "./Trading.module.css";

const OFFER = [
  { icon: PackageSearch, title: "Product sourcing", text: "Tell us what you need — we find reliable suppliers and get you quotes." },
  { icon: Boxes, title: "Bulk supply", text: "Steady volumes for shops, businesses and projects, on a schedule you set." },
  { icon: ClipboardCheck, title: "Quality checks", text: "Goods are checked before dispatch, so what arrives is what you ordered." },
  { icon: Truck, title: "Logistics & delivery", text: "We coordinate transport and keep you updated until it's at your door." },
  { icon: Scale, title: "Fair pricing", text: "Clear quotes with no surprise add-ons after you've said yes." },
  { icon: Handshake, title: "Long-term partners", text: "Reorder anytime with the same team that knows your requirements." },
];

const STEPS = [
  { title: "Share the requirement", text: "Product, quantity, location and when you need it." },
  { title: "Get a quote", text: "We source, compare and send you a clear price." },
  { title: "Approve & track", text: "Confirm the order and get updates until delivery." },
  { title: "Delivered", text: "Goods arrive checked and on time. Reorder anytime." },
];

const FIELDS = [
  { name: "company", label: "Business / your name", placeholder: "Company or full name", required: true },
  { name: "city", label: "Delivery location", placeholder: "City, State", required: true },
  { name: "product", label: "What do you need?", placeholder: "Product, specs, brand…", span: true, required: true },
  { name: "qty", label: "Quantity", placeholder: "e.g. 500 units / 2 tonnes" },
  { name: "when", label: "Needed by", options: ["This week", "Within 2 weeks", "This month", "Ongoing supply", "Just exploring"] },
  { name: "notes", label: "Anything else?", type: "textarea", placeholder: "Budget, packaging, recurring orders…", span: true },
];

function SupplyArt() {
  const nodes = [
    { icon: Search, label: "Source", sub: "Verified suppliers" },
    { icon: ShieldCheck, label: "Check", sub: "Quality before dispatch" },
    { icon: Truck, label: "Deliver", sub: "Tracked to your door" },
  ];
  return (
    <div className={s.art} aria-hidden="true">
      <div className={s.frame}>
        <Photo name="trade-warehouse" alt="" priority position="40% 50%" sizes="(max-width: 960px) 80vw, 34vw" />
        <span className={s.frameShade} />
      </div>
      <div className={s.nodes}>
        <span className={s.rail}><i /></span>
        {nodes.map((n, i) => (
          <div key={n.label} className={s.node} style={{ "--i": i }}>
            <span className={s.nodeIc}><n.icon size={22} /></span>
            <div><b>{n.label}</b><small>{n.sub}</small></div>
            <span className={s.nodeNum}>0{i + 1}</span>
          </div>
        ))}
      </div>
      <div className={s.crate}><span>AQA</span></div>
    </div>
  );
}

export default function Trading() {
  return (
    <div style={theme("trading")}>
      <PageHero
        eyebrow="AQA Trading · Sourcing & supply"
        title={<>Need it?<br />We <span className="accent">source it.</span></>}
        lead="AQA Trading handles sourcing and bulk supply for businesses and projects, with honest pricing, quality checks and on-time delivery."
        actions={<>
          <a href="#quote" className="btn btn--primary">Request a quote <ArrowDown className="ic-down" /></a>
          <a href={waLink("Hi AQA Trading, I have a sourcing requirement.")} target="_blank" rel="noreferrer" className="btn btn--ghost">WhatsApp us</a>
        </>}
        trust={["Clear quotes", "Checked before dispatch"]}
        stats={[["B2B", "& bulk orders"], ["QC", "before dispatch"], ["1", "point of contact"]]}
        visual={<SupplyArt />}
      />

      <Marquee items={["Sourcing", "Bulk supply", "Quality checks", "Logistics", "Fair pricing", "On-time delivery"]} tilt={-1.5} />

      <section className="section section--light">
        <div className={`wrap ${s.offer}`}>
          <div>
            <Reveal className="head">
              <span className="eyebrow">What we offer</span>
              <h2 className="h-lg">Trade without <span className="accent">the headache.</span></h2>
              <p className="lead">From a one-off order to a monthly supply line — one team handles finding, checking and delivering.</p>
            </Reveal>
            <FeatureGrid items={OFFER} cols={2} />
          </div>
          <Reveal className={s.collage} delay={120}>
            <Photo name="trade-port" alt="Container ship being loaded at a port" className={s.c1} sizes="(max-width: 960px) 90vw, 36vw" />
            <Photo name="trade-parcel" alt="A parcel being handed over at delivery" className={s.c2} sizes="(max-width: 960px) 60vw, 22vw" position="50% 60%" />
            <span className={s.cTag}>From the port → to your door</span>
          </Reveal>
        </div>
      </section>

      <Steps title={<>From requirement<br />to delivered.</>} items={STEPS} />

      <section className="section" id="quote">
        <div className={`wrap ${s.quote}`}>
          <Reveal className={s.quoteCopy}>
            <span className="eyebrow">Get a quote</span>
            <h2 className="h-lg">Tell us what<br />you're <span className="accent">looking for.</span></h2>
            <p className="lead">The more detail you share, the sharper the quote. Your enquiry opens in WhatsApp, ready to send.</p>
            <Photo name="trade-aisle" alt="Warehouse aisle with fully stocked shelves" className={s.quotePhoto} sizes="(max-width: 960px) 100vw, 40vw" position="50% 40%" />
          </Reveal>
          <Reveal delay={100}><EnquiryForm subject="AQA Trading" title="Your requirement" fields={FIELDS} cta="Send requirement" /></Reveal>
        </div>
      </section>

      <CTABand title="Have a big order coming up?" text="Let's talk volumes, timelines and pricing." message="Hi AQA Trading, I'd like to discuss a bulk order." />
    </div>
  );
}
