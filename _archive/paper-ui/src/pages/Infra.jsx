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

function SiteUpdate() {
  return (
    <div className={s.update} aria-hidden="true">
      <p className={s.uTop}><span className={s.uDot} /> Site update</p>
      <b>Slab work — Floor 2</b>
      <div className={s.uBar}><i /></div>
      <p className={s.uMeta}><span>68% complete</span><span>On schedule ✓</span></p>
    </div>
  );
}

export default function Infra() {
  return (
    <div style={theme("infra")}>
      <PageHero
        index="04"
        name="Infrastructure"
        title={<>We build what <em>you picture.</em></>}
        lead="Residential and commercial construction, renovations and civil works — from the first site visit to the day you get the keys."
        actions={<>
          <a href="#project" className="btn btn--ink">Plan my project <ArrowDown /></a>
          <a href={waLink("Hi EKAM Infra, I'd like to discuss a construction project.")} target="_blank" rel="noreferrer" className="btn btn--line">WhatsApp us</a>
        </>}
        stats={[["Homes", "& commercial"], ["Itemised", "estimates"], ["1", "accountable team"]]}
        image="infra-site"
        imageAlt="Construction crew in safety gear on a building foundation"
        position="50% 60%"
        overlay={<SiteUpdate />}
        caption="Fig. 01 — Groundwork, done right."
      />

      <Marquee items={["Residential", "Commercial", "Renovation", "Civil works", "Planning", "Handover"]} />

      <section className="section">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <p className="label">Services</p>
              <h2 className="h-2">Ground up. <em>Done right.</em></h2>
            </div>
            <p className="lead">Whether it's your first home or your next commercial space, one team plans it, builds it and hands it over.</p>
          </Reveal>

          <div className={s.kinds}>
            {KINDS.map(([img, label, alt], i) => (
              <Reveal key={img} delay={i * 80} className={s.kind}>
                <div className="photo"><Photo name={img} alt={alt} sizes="(max-width: 760px) 100vw, 40vw" /></div>
                <p className="caption"><span>0{i + 1}</span>{label}</p>
              </Reveal>
            ))}
          </div>

          <FeatureGrid items={SERVICES} />
        </div>
      </section>

      <Steps alt label="Our process" title={<>Four stages. <em>No guesswork.</em></>} items={STEPS} />

      <section className="section" id="project">
        <div className={`wrap ${s.project}`}>
          <Reveal className={s.projectCopy}>
            <p className="label">Start a project</p>
            <h2 className="h-2">Let's talk about <em>your build.</em></h2>
            <p className="lead">Share a few details and we'll set up a site visit. Your enquiry opens in WhatsApp, ready to send.</p>
            <div className={`photo ${s.planPhoto}`}>
              <Photo name="infra-plan" alt="Architect sketching a building plan" sizes="(max-width: 960px) 100vw, 40vw" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <EnquiryForm subject="construction" title="Project details" fields={FIELDS} cta="Book a site visit" />
          </Reveal>
        </div>
      </section>

      <CTABand title="Got a plot? Let's build." text="Tell us what you have in mind — we'll bring the plan." message="Hi EKAM Infra, I have a plot and want to build." />
    </div>
  );
}
