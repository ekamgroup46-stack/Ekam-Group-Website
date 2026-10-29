import { ArrowDown, Check, PackageSearch, Boxes, ClipboardCheck, Truck, Scale, Handshake } from "lucide-react";
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
  { icon: Boxes, title: "Bulk supply", text: "Steady volumes for shops, businesses and projects, on your schedule." },
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

function Tracker() {
  const steps = [
    ["Sourced", "Verified supplier", true],
    ["Quality checked", "Passed before dispatch", true],
    ["Out for delivery", "Arriving on schedule", false],
  ];
  return (
    <div className={s.tracker} aria-hidden="true">
      <p className={s.trTop}><span>AQA Trading</span><span>Your order</span></p>
      <ol>
        {steps.map(([t, d, done]) => (
          <li key={t} className={done ? s.done : s.now}>
            <i>{done && <Check size={12} strokeWidth={3.5} />}</i>
            <span><b>{t}</b><small>{d}</small></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Trading() {
  return (
    <div style={theme("trading")}>
      <PageHero
        index="03"
        name="AQA Trading"
        title={<>Need it? <em>We source it.</em></>}
        lead="AQA Trading handles product sourcing and bulk supply for shops, businesses and projects — with clear quotes, quality checks and on-time delivery."
        actions={<>
          <a href="#quote" className="btn btn--ink">Request a quote <ArrowDown /></a>
          <a href={waLink("Hi AQA Trading, I have a sourcing requirement.")} target="_blank" rel="noreferrer" className="btn btn--line">WhatsApp us</a>
        </>}
        stats={[["B2B", "& bulk orders"], ["QC", "before dispatch"], ["1", "point of contact"]]}
        image="trade-warehouse"
        imageAlt="Warehouse floor stacked with yellow boxes"
        position="45% 50%"
        overlay={<Tracker />}
        caption="Fig. 01 — Stock, sorted and ready to move."
      />

      <Marquee tone="accent" items={["Sourcing", "Bulk supply", "Quality checks", "Logistics", "Fair pricing", "On-time delivery"]} />

      <section className="section">
        <div className={`wrap ${s.offer}`}>
          <div>
            <Reveal className="head">
              <p className="label">What we offer</p>
              <h2 className="h-2">Trade without <em>the headache.</em></h2>
              <p className="lead">From a one-off order to a monthly supply line — one team handles finding, checking and delivering.</p>
            </Reveal>
            <FeatureGrid items={OFFER} layout="list" />
          </div>
          <Reveal className={s.collage} delay={100}>
            <div className={`photo ${s.c1}`}>
              <Photo name="trade-port" alt="Container ship being loaded at a port" sizes="(max-width: 960px) 100vw, 40vw" />
            </div>
            <div className={`photo ${s.c2}`}>
              <Photo name="trade-parcel" alt="A parcel being handed over at delivery" sizes="(max-width: 960px) 60vw, 22vw" position="50% 60%" />
            </div>
            <p className={`caption ${s.cap}`}>Fig. 02 — From the port to your door.</p>
          </Reveal>
        </div>
      </section>

      <Steps alt title={<>From requirement <em>to delivered.</em></>} items={STEPS} />

      <section className="section" id="quote">
        <div className={`wrap ${s.quote}`}>
          <Reveal className={s.quoteCopy}>
            <p className="label">Get a quote</p>
            <h2 className="h-2">Tell us what <em>you're looking for.</em></h2>
            <p className="lead">The more detail you share, the sharper the quote. Your enquiry opens in WhatsApp, ready to send.</p>
            <div className={`photo ${s.quotePhoto}`}>
              <Photo name="trade-aisle" alt="Warehouse aisle with fully stocked shelves" sizes="(max-width: 960px) 100vw, 40vw" position="50% 40%" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <EnquiryForm subject="AQA Trading" title="Your requirement" fields={FIELDS} cta="Send requirement" />
          </Reveal>
        </div>
      </section>

      <CTABand title="Big order coming up?" text="Let's talk volumes, timelines and pricing." message="Hi AQA Trading, I'd like to discuss a bulk order." />
    </div>
  );
}
