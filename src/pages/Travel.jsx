import { ArrowDown, ArrowUpRight, Plane, Globe2, Users, RefreshCcw, Briefcase, Headphones } from "lucide-react";
import { theme, waLink } from "../data/business.js";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import Steps from "../components/Steps.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";
import s from "./Travel.module.css";

const SERVICES = [
  { icon: Plane, title: "Domestic flights", text: "All major Indian airlines and routes, booked fast." },
  { icon: Globe2, title: "International flights", text: "Visiting family, studying abroad or a work trip — we'll find the routing." },
  { icon: Users, title: "Group bookings", text: "Weddings, family trips, team travel — one person handles it all." },
  { icon: RefreshCcw, title: "Changes & cancellations", text: "Plans moved? We handle reschedules and cancellations for you." },
  { icon: Briefcase, title: "Corporate travel", text: "Repeat bookings for businesses, with one point of contact." },
  { icon: Headphones, title: "Travel-day support", text: "Questions before you fly? Message us — a human replies." },
];

const ROUTES = [
  ["HYD", "DEL", "Hyderabad", "New Delhi"],
  ["HYD", "BOM", "Hyderabad", "Mumbai"],
  ["BLR", "HYD", "Bengaluru", "Hyderabad"],
  ["HYD", "DXB", "Hyderabad", "Dubai"],
  ["MAA", "SIN", "Chennai", "Singapore"],
  ["DEL", "LHR", "New Delhi", "London"],
];

const STEPS = [
  { title: "Tell us the trip", text: "From, to, dates and how many people. Use the form or just WhatsApp." },
  { title: "Pick your option", text: "We send you fares and timings to choose from." },
  { title: "Fly", text: "Tickets arrive on WhatsApp and email. Changes later? We've got it." },
];

const FAQS = [
  ["Which airlines can you book?", "All major domestic and international carriers. Tell us your preference and we'll match it where possible."],
  ["How do I receive my ticket?", "Your e-ticket is sent on WhatsApp and email as soon as the booking is confirmed."],
  ["Can you help with reschedules?", "Yes. Message us with your booking details and new dates; we'll share options and any airline fees."],
  ["Do you book for groups?", "Yes — family trips, weddings and team travel. Share the head-count and dates to get started."],
];

const FIELDS = [
  { name: "from", label: "From", placeholder: "Hyderabad (HYD)", required: true },
  { name: "to", label: "To", placeholder: "Delhi (DEL)", required: true },
  { name: "depart", label: "Departure", type: "date", required: true },
  { name: "return", label: "Return (optional)", type: "date" },
  { name: "pax", label: "Passengers", options: ["1", "2", "3", "4", "5", "6+"], required: true },
  { name: "class", label: "Class", options: ["Economy", "Premium Economy", "Business", "First"] },
  { name: "name", label: "Your name", placeholder: "Full name", span: true },
];

const ROUTE_D = "M40 210 C 120 40, 280 40, 360 150";

function FlightArt() {
  return (
    <div className={s.art} aria-hidden="true">
      <div className={s.frame}>
        <Photo name="travel-wing" alt="" priority position="62% 50%" sizes="(max-width: 960px) 90vw, 40vw" />
        <span className={s.frameShade} />
      </div>

      <svg viewBox="0 0 400 260" className={s.path}>
        <defs>
          <linearGradient id="fa-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#4da8ff" />
            <stop offset="1" stopColor="#d4ff5a" />
          </linearGradient>
          <mask id="fa-draw">
            <path d={ROUTE_D} className={s.draw} pathLength="1" />
          </mask>
        </defs>
        <path d={ROUTE_D} className={s.route} mask="url(#fa-draw)" />
        <circle cx="40" cy="210" r="18" fill="#4da8ff" opacity=".22" />
        <circle cx="40" cy="210" r="8" fill="#4da8ff" />
        <circle cx="360" cy="150" r="18" fill="#d4ff5a" opacity=".22" />
        <circle cx="360" cy="150" r="8" fill="#d4ff5a" />
        <g className={s.plane}>
          <path d="M-14 -2.5 H6 L14 0 L6 2.5 H-14 Z M-2 -2 L-9 -13 H-5 L5 -2 Z M-2 2 L-9 13 H-5 L5 2 Z M-13 -2 L-16 -7 H-13 L-9 -2 Z M-13 2 L-16 7 H-13 L-9 2 Z" fill="#f2f4ff" />
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={ROUTE_D} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.25 1" />
        </g>
      </svg>

      <div className={s.pass}>
        <div className={s.passMain}>
          <span className={s.passLabel}>Boarding pass · EKAM Travel</span>
          <div className={s.passRoute}>
            <div><b>HYD</b><small>Hyderabad</small></div>
            <Plane size={22} />
            <div><b>DEL</b><small>New Delhi</small></div>
          </div>
          <div className={s.passMeta}>
            <div><small>Seat</small><b>12A</b></div>
            <div><small>Gate</small><b>24</b></div>
            <div><small>Class</small><b>ECO</b></div>
          </div>
        </div>
        <div className={s.passStub}><span /></div>
      </div>
    </div>
  );
}

const Flap = ({ code }) => (
  <span className={s.flap}>{code.split("").map((c, i) => <i key={i}>{c}</i>)}</span>
);

function DepartureBoard() {
  return (
    <div className={s.board}>
      <div className={s.boardHead}>
        <span>Popular routes</span>
        <span>Tap to enquire</span>
      </div>
      <ul className={s.boardList}>
        {ROUTES.map(([a, b, ca, cb]) => (
          <li key={a + b}>
            <a
              className={s.boardRow}
              href={waLink(`Hi EKAM Travel, I need a flight from ${ca} (${a}) to ${cb} (${b}).`)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Enquire about flights from ${ca} to ${cb}`}
            >
              <Flap code={a} />
              <Plane size={15} className={s.boardPlane} aria-hidden="true" />
              <Flap code={b} />
              <span className={s.boardCity}>{ca} → {cb}</span>
              <span className={s.boardGo}>Enquire <ArrowUpRight size={15} /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Travel() {
  return (
    <div style={theme("travel")}>
      <PageHero
        eyebrow="EKAM Travel · Flights & more"
        title={<>Window seat?<br /><span className="accent">Sorted.</span></>}
        lead="Domestic and international flight tickets booked by real people. Send your route and dates — get options in your WhatsApp."
        actions={<>
          <a href="#book" className="btn btn--primary">Find my flight <ArrowDown className="ic-down" /></a>
          <a href={waLink("Hi EKAM Travel, I need a flight ticket.")} target="_blank" rel="noreferrer" className="btn btn--ghost">WhatsApp us</a>
        </>}
        trust={["Fares sent on WhatsApp", "Help with changes later"]}
        stats={[["Domestic", "+ international"], ["Groups", "& corporate"], ["1", "point of contact"]]}
        visual={<FlightArt />}
      />

      <section className="section" id="book">
        <div className={`wrap ${s.book}`}>
          <Reveal className={s.bookCopy}>
            <span className="eyebrow">Quick enquiry</span>
            <h2 className="h-lg">Where to <span className="accent">next?</span></h2>
            <p className="lead">Tap a popular route or fill in the form — it opens WhatsApp with your trip details ready.</p>
            <DepartureBoard />
          </Reveal>
          <Reveal delay={100}>
            <EnquiryForm subject="flight" title="Trip details" fields={FIELDS} cta="Get fares on WhatsApp" />
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className={`wrap ${s.services}`}>
          <Reveal className={s.servicesMedia}>
            <Photo name="travel-lounge" alt="Traveller with a suitcase waiting at an airport gate" sizes="(max-width: 960px) 100vw, 40vw" position="60% 50%" />
            <span className={s.servicesTag}>✈ Gate's open. You're on it.</span>
          </Reveal>
          <div>
            <Reveal className="head">
              <span className="eyebrow">What we handle</span>
              <h2 className="h-lg">Every trip. Every kind.</h2>
            </Reveal>
            <FeatureGrid items={SERVICES} layout="list" />
          </div>
        </div>
      </section>

      <Steps title={<>Trip sorted in<br />three messages.</>} items={STEPS} />
      <FAQ items={FAQS} />
      <CTABand title="Holiday? Work? Wedding?" text="Tell us where you're going. We'll get you there." message="Hi EKAM Travel, I'd like to book a trip." />
    </div>
  );
}
