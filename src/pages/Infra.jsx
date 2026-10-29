import { ArrowDown, Home, Building, Hammer, ClipboardList, HardHat, Ruler } from "lucide-react";
import { theme, waLink } from "../data/business.js";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import Marquee from "../components/Marquee.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import Steps from "../components/Steps.jsx";
import CTABand from "../components/CTABand.jsx";
import s from "./Infra.module.css";

const SERVICES = [
  { icon: Home, title: "Residential construction", text: "Independent houses, villas and apartments — built to last." },
  { icon: Building, title: "Commercial buildings", text: "Shops, offices and mixed-use spaces delivered on schedule." },
  { icon: Hammer, title: "Renovation & extensions", text: "New floors, remodels and upgrades for existing structures." },
  { icon: Ruler, title: "Planning & estimates", text: "Clear plans and itemised estimates before work begins." },
  { icon: HardHat, title: "Civil works", text: "Foundations, structure, masonry and site works by experienced crews." },
  { icon: ClipboardList, title: "Project management", text: "One accountable team, regular updates, and a clean handover." },
];

const KINDS = [
  ["infra-house", "Residential", "Modern two-storey house at dusk"],
  ["infra-commercial", "Commercial", "Contemporary commercial building with a glass facade"],
  ["infra-earth", "Civil works", "Excavators levelling ground on a large site"],
];

const STEPS = [
  { title: "Site visit", text: "We understand your plot, needs and budget." },
  { title: "Plan & estimate", text: "Drawings, timeline and an itemised quote." },
  { title: "Build", text: "Quality work with regular progress updates." },
  { title: "Handover", text: "Final checks, walkthrough and keys in hand." },
];

const FIELDS = [
  { name: "name", label: "Your name", placeholder: "Full name", required: true },
  { name: "city", label: "Site location", placeholder: "Area, City", required: true },
  { name: "type", label: "Project type", options: ["Independent house", "Villa", "Apartment", "Commercial", "Renovation / extension", "Other"], required: true },
  { name: "size", label: "Plot / built-up size", placeholder: "e.g. 200 sq. yards" },
  { name: "budget", label: "Budget range", options: ["Under ₹25 L", "₹25 L – ₹50 L", "₹50 L – ₹1 Cr", "₹1 Cr+", "Not sure yet"] },
  { name: "start", label: "Planning to start", options: ["Right away", "In 1–3 months", "In 3–6 months", "Just exploring"] },
  { name: "notes", label: "Tell us more", type: "textarea", placeholder: "Floors, rooms, special requirements…", span: true },
];

function BuildingArt() {
  const floors = 6;
  return (
    <div className={s.art} aria-hidden="true">
      <div className={s.sun} />
      <div className={s.crane}>
        <span className={s.mast} />
        <span className={s.jib}><i /></span>
      </div>
      <div className={s.tower}>
        {Array.from({ length: floors }, (_, i) => (
          <div key={i} className={s.floor} style={{ "--f": floors - 1 - i }}>
            {Array.from({ length: 4 }, (__, w) => <i key={w} style={{ "--w": i * 4 + w }} />)}
          </div>
        ))}
      </div>
      <div className={s.side}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={s.floor} style={{ "--f": 2 - i }}><i style={{ "--w": i * 3 + 1 }} /><i style={{ "--w": i * 3 + 2 }} /></div>
        ))}
      </div>
      <div className={s.ground} />
      <div className={s.tag}>
        <b>Floor 6</b>
        <span>On schedule ✓</span>
        <span className={s.tagBar}><i /></span>
      </div>
    </div>
  );
}

export default function Infra() {
  return (
    <div style={theme("infra")}>
      <PageHero
        eyebrow="EKAM Infra · Building & Infrastructure"
        title={<>We build<br />what you <span className="accent">picture.</span></>}
        lead="Residential and commercial construction, renovations and civil works — from the first site visit to the day you get the keys."
        actions={<>
          <a href="#project" className="btn btn--primary">Plan my project <ArrowDown className="ic-down" /></a>
          <a href={waLink("Hi EKAM Infra, I'd like to discuss a construction project.")} target="_blank" rel="noreferrer" className="btn btn--ghost">WhatsApp us</a>
        </>}
        trust={["Itemised estimates", "Regular site updates"]}
        stats={[["Homes", "& commercial"], ["Itemised", "estimates"], ["1", "accountable team"]]}
        visual={<BuildingArt />}
      />

      <Marquee items={["Residential", "Commercial", "Renovation", "Civil works", "Planning", "Handover"]} tilt={1.5} light />

      <section className="section section--light">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <span className="eyebrow">Services</span>
              <h2 className="h-lg">Ground up.<br /><span className="accent">Done right.</span></h2>
            </div>
            <p className="lead">Whether it's your first home or your next commercial space, one team plans it, builds it and hands it over.</p>
          </Reveal>

          <div className={s.kinds}>
            {KINDS.map(([img, label, alt], i) => (
              <Reveal key={img} delay={i * 90} className={s.kind}>
                <Photo name={img} alt={alt} sizes="(max-width: 760px) 100vw, 40vw" />
                <span className={s.kindTag}>0{i + 1} · {label}</span>
              </Reveal>
            ))}
          </div>

          <FeatureGrid items={SERVICES} />
        </div>
      </section>

      <Steps eyebrow="Our process" title={<>Four stages.<br />No guesswork.</>} items={STEPS} />

      <section className="section" id="project">
        <div className={`wrap ${s.project}`}>
          <Reveal className={s.projectCopy}>
            <span className="eyebrow">Start a project</span>
            <h2 className="h-lg">Let's talk about<br />your <span className="accent">build.</span></h2>
            <p className="lead">Share a few details and we'll set up a site visit. Your enquiry opens in WhatsApp, ready to send.</p>
            <Photo name="infra-plan" alt="Architect sketching a building plan" className={s.planPhoto} sizes="(max-width: 960px) 100vw, 40vw" />
          </Reveal>
          <Reveal delay={100}><EnquiryForm subject="construction" title="Project details" fields={FIELDS} cta="Book a site visit" /></Reveal>
        </div>
      </section>

      <CTABand title="Got a plot? Let's build." text="Tell us what you have in mind — we'll bring the plan." message="Hi EKAM Infra, I have a plot and want to build." />
    </div>
  );
}
