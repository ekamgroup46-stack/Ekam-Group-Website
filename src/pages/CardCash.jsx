import { ArrowDown, BadgePercent, Zap, Landmark, ShieldCheck, FileCheck2, Headphones } from "lucide-react";
import { BANK_LOGOS, CONTACT, NETWORK_LOGOS, theme, waLink } from "../data/business.js";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import LogoStrip from "../components/LogoStrip.jsx";
import CashFlow from "../components/CashFlow.jsx";
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
        eyebrow="EKAM Card Cash · RuPay · Mastercard · Visa"
        title={<>Card limit<br />to <span className="accent">cash.</span><br />In minutes.</>}
        lead="Credit card cash withdrawal with charges starting at 1.6%. Swipe your card or scan our QR — the money goes straight to your account."
        actions={<>
          <a href="#charges" className="btn btn--primary">Calculate my cash <ArrowDown className="ic-down" /></a>
          <a href={waLink("Hi EKAM Group, I want a credit card cash withdrawal.")} target="_blank" rel="noreferrer" className="btn btn--ghost">WhatsApp us</a>
        </>}
        trust={["Charges confirmed upfront", "Never asks for PIN or OTP"]}
        stats={[["1.6%", "charges from*"], ["3", "networks"], ["5+", "major banks"]]}
        visual={<CashFlow />}
      />

      <LogoStrip items={[...NETWORK_LOGOS, ...BANK_LOGOS]} label="Cards we take" tilt={1.5} />

      <section className="section" id="charges">
        <div className="wrap">
          <Reveal className="head head--center">
            <span className="eyebrow">Calculator</span>
            <h2 className="h-lg">How much will <span className="accent">you</span> get?</h2>
            <p className="lead">Pick your network, set the amount, lock it in on WhatsApp.</p>
          </Reveal>
          <Reveal delay={100}><CashCalculator /></Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="wrap">
          <Reveal className="head head--split">
            <div className="stack">
              <span className="eyebrow">Supported banks</span>
              <h2 className="h-lg">If it's in your wallet, <span className="accent">it probably works.</span></h2>
            </div>
            <div className={s.networks}>
              <p className="lead">Eligibility depends on your issuing bank — send us your card and bank and we'll confirm first.</p>
              <div>{NETWORK_LOGOS.map((n) => <span key={n.name}><img src={`/logos/${n.logo}.png`} alt={n.name} height="22" /></span>)}</div>
            </div>
          </Reveal>

          <div className={s.banksGrid}>
            <Reveal className={s.banksPhoto}>
              <Photo name="card-counter" alt="Customer paying with a phone at a shop counter" sizes="(max-width: 900px) 100vw, 40vw" position="30% 50%" />
            </Reveal>
            <div className={s.banks}>
              {BANK_LOGOS.map((b, i) => (
                <Reveal key={b.name} delay={(i % 4) * 60} className={s.bank}>
                  <img src={`/logos/${b.logo}.png`} alt={b.name} height="34" loading="lazy" />
                </Reveal>
              ))}
              <Reveal delay={180} className={`${s.bank} ${s.more}`}>+ more banks</Reveal>
            </div>
          </div>
        </div>
      </section>

      <Steps title={<>Three steps.<br />Zero paperwork drama.</>} items={STEPS} />

      <section className="section">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Why us</span>
            <h2 className="h-lg">The details we sweat.</h2>
          </Reveal>
          <FeatureGrid items={FEATURES} />
        </div>
      </section>

      <FAQ items={FAQS} />

      <CTABand
        title="Need cash today?"
        text="Send us the amount and your card network. We'll take it from there."
        message="Hi EKAM Group, I need a credit card cash withdrawal today."
      />
    </div>
  );
}
