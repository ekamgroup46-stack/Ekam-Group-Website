import { Fragment } from "react";
import { ArrowDown, BadgePercent, Zap, Landmark, ShieldCheck, FileCheck2, Headphones } from "lucide-react";
import { BANKS, CONTACT, NETWORKS, theme, waLink } from "../data/business.js";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Marquee from "../components/Marquee.jsx";
import Receipt from "../components/Receipt.jsx";
import Stamp from "../components/Stamp.jsx";
import CashCalculator from "../components/CashCalculator.jsx";
import Steps from "../components/Steps.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";
import s from "./CardCash.module.css";

const FEATURES = [
  { icon: BadgePercent, title: "Charges from 1.6%", text: "Competitive, transparent rates — told to you before you pay." },
  { icon: Zap, title: "Quick cash", text: "A QR-based flow that wraps up in minutes." },
  { icon: Landmark, title: "Wide bank support", text: "Eligible cards from SBI, HDFC, ICICI, Axis, YES BANK and more." },
  { icon: ShieldCheck, title: "Secure transactions", text: "A straightforward process. We never ask for PIN, CVV or OTP." },
  { icon: FileCheck2, title: "Non-utility only", text: "For eligible non-utility transactions, per bank & network rules." },
  { icon: Headphones, title: "Human support", text: `Stuck? Call ${CONTACT.phoneDisplay} and talk to a person.` },
];

const STEPS = [
  { title: "Message us", text: "WhatsApp or call with your card network and the amount you need." },
  { title: "Swipe or scan", text: "We share the QR (or you swipe). Charges are confirmed upfront." },
  { title: "Cash lands", text: "The amount, minus charges, is sent straight to your account." },
];

const FAQS = [
  ["Which credit cards are supported?", "RuPay, Mastercard and Visa credit cards from SBI, HDFC Bank, ICICI Bank, Axis Bank, YES BANK and other supported banks. Final eligibility depends on your issuing bank."],
  ["What are the charges?", "Charges start at 1.6%. Your exact rate depends on card, bank and amount, and is always confirmed before the transaction."],
  ["How long does it take?", "With instant mode — swipe or QR scan — the transaction is processed on the spot and the amount is sent right after."],
  ["Is there a minimum or maximum amount?", "Limits depend on your card's available limit and bank rules. Message us with the amount and we'll confirm."],
  ["Will you ask for my OTP, PIN or CVV?", "Never. Nobody from EKAM Group will ask for these. If someone does, it isn't us — please report it to your bank."],
];

export default function CardCash() {
  return (
    <div style={theme("card-cash")}>
      <PageHero
        index="01"
        name="Card Cash"
        title={<>Card limit to cash. <em>In minutes.</em></>}
        lead="Credit card cash withdrawal for RuPay, Mastercard and Visa cardholders, with charges starting at 1.6%. Swipe your card or scan our QR — the amount goes straight to your account."
        actions={<>
          <a href="#charges" className="btn btn--ink">Calculate my cash <ArrowDown /></a>
          <a href={waLink("Hi EKAM Group, I want a credit card cash withdrawal.")} target="_blank" rel="noreferrer" className="btn btn--line">WhatsApp us</a>
        </>}
        stats={[["1.6%", "charges from*"], ["3", "card networks"], ["5+", "major banks"]]}
        image="card-hand"
        imageAlt="Hand holding a credit card"
        position="38% 50%"
        overlay={<Receipt />}
        caption="Fig. 01 — One card, one swipe, cash in your account."
      />

      <Marquee items={[...NETWORKS, ...BANKS]} />

      <section className="section section--alt" id="charges">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <p className="label">Charges calculator</p>
              <h2 className="h-2">How much will <em>you</em> get?</h2>
            </div>
            <p className="lead">Pick your network, set the amount, and lock it in on WhatsApp. No hidden extras — the rate is confirmed before you pay.</p>
          </Reveal>
          <Reveal><CashCalculator /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.banks}`}>
          <Reveal className={s.banksHead}>
            <p className="label">Supported banks &amp; networks</p>
            <h2 className="h-2">If it's in your wallet, <em>it probably works.</em></h2>
            <p className="lead">Eligibility depends on your issuing bank. Send us your card network and bank — we'll confirm before anything happens.</p>
            <div className={s.networks}>
              {NETWORKS.map((n) => <span key={n}>{n}</span>)}
            </div>
          </Reveal>
          <Reveal className={s.bankCloud} delay={100}>
            <Stamp className={s.stamp} ring="SUPPORTED ✳ CREDIT CARDS ✳ SUPPORTED ✳ " value="5+" note="banks" />
            {BANKS.map((b, i) => (
              <Fragment key={b}>
                <span className={s.bank}>{b}</span>
                {i < BANKS.length - 1 && <><i className={s.slash} aria-hidden="true">/</i>{" "}</>}
              </Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      <Steps alt title={<>Three steps. <em>Zero paperwork drama.</em></>} items={STEPS} />

      <section className="section">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <p className="label">Why us</p>
              <h2 className="h-2">The details <em>we sweat.</em></h2>
            </div>
            <p className="lead">Small things that make a money transaction feel safe and simple.</p>
          </Reveal>
          <FeatureGrid items={FEATURES} />
        </div>
      </section>

      <FAQ alt items={FAQS} />

      <CTABand
        title="Need cash today?"
        text="Send us the amount and your card network. We'll take it from there."
        message="Hi EKAM Group, I need a credit card cash withdrawal today."
      />
    </div>
  );
}
