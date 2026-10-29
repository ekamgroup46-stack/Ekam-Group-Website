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
  { icon: Globe2, title: "International flights", text: "Family visits, study abroad or work trips — we find the routing." },
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

function BoardingPass() {
  return (
    <div className={s.pass} aria-hidden="true">
      <div className={s.passMain}>
        <p className={s.passTop}><img src="/logo-mark.png" alt="" width="20" height="21" /> EKAM Travel · Boarding pass</p>
        <div className={s.passRoute}>
          <div><b>HYD</b><small>Hyderabad</small></div>
          <Plane size={20} />
          <div><b>DEL</b><small>New Delhi</small></div>
        </div>
        <div className={s.passMeta}>
          <div><small>Seat</small><b>12A</b></div>
          <div><small>Gate</small><b>24</b></div>
          <div><small>Boards</small><b>06:40</b></div>
        </div>
      </div>
      <div className={s.passStub}><span /></div>
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
        index="02"
        name="Flights & Travel"
        title={<>Window seat? <em>Sorted.</em></>}
        lead="Domestic and international flight tickets booked by real people. Send your route and dates, get fare options on WhatsApp, and fly."
        actions={<>
          <a href="#book" className="btn btn--ink">Find my flight <ArrowDown /></a>
          <a href={waLink("Hi EKAM Travel, I need a flight ticket.")} target="_blank" rel="noreferrer" className="btn btn--line">WhatsApp us</a>
        </>}
        stats={[["Domestic", "+ international"], ["Groups", "& corporate"], ["1", "point of contact"]]}
        image="travel-wing"
        imageAlt="Aircraft wing above the clouds at sunset"
        position="62% 50%"
        overlay={<BoardingPass />}
        caption="Fig. 01 — Somewhere above the clouds."
      />

      <section className="section section--alt" id="book">
        <div className={`wrap ${s.book}`}>
          <Reveal className={s.bookCopy}>
            <p className="label">Quick enquiry</p>
            <h2 className="h-2">Where to <em>next?</em></h2>
            <p className="lead">Tap a popular route or fill in the form — it opens WhatsApp with your trip details ready to send.</p>
            <DepartureBoard />
          </Reveal>
          <Reveal delay={100}>
            <EnquiryForm subject="flight" title="Trip details" fields={FIELDS} cta="Get fares on WhatsApp" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.services}`}>
          <Reveal className={s.servicesMedia}>
            <div className={`photo ${s.servicesPhoto}`}>
              <Photo name="travel-lounge" alt="Traveller with a suitcase waiting at an airport gate" sizes="(max-width: 960px) 100vw, 40vw" position="60% 50%" />
            </div>
            <p className="caption">Fig. 02 — Gate's open. You're on it.</p>
          </Reveal>
          <div>
            <Reveal className="head">
              <p className="label">What we handle</p>
              <h2 className="h-2">Every trip. <em>Every kind.</em></h2>
            </Reveal>
            <FeatureGrid items={SERVICES} layout="list" />
          </div>
        </div>
      </section>

      <Steps alt title={<>Trip sorted in <em>three messages.</em></>} items={STEPS} />
      <FAQ items={FAQS} />
      <CTABand title="Holiday? Work? Wedding?" text="Tell us where you're going. We'll get you there." message="Hi EKAM Travel, I'd like to book a trip." />
    </div>
  );
}
