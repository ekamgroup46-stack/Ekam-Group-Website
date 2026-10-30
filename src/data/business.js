import { CreditCard, Plane, PackageSearch, Building2 } from "lucide-react";

export const CONTACT = {
  phone: "8886576677",
  phoneDisplay: "+91 88865 76677",
  whatsapp: "918886576677",
  email: "ekamgroup46@gmail.com",
  instagram: "https://www.instagram.com/ekamgroups/",
  instagramHandle: "@ekamgroups",
};

export const waLink = (text = "Hi EKAM Group!") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const RATE_FROM = 1.6;

export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

export const BANKS = ["SBI Card", "HDFC Bank", "ICICI Bank", "Axis Bank", "YES BANK", "Kotak", "IndusInd", "+ more"];
export const NETWORKS = ["RuPay", "Mastercard", "Visa"];

// Official marks in /public/logos — shown only to say which cards work (see the footer disclaimer).
export const NETWORK_LOGOS = [
  { name: "RuPay", logo: "rupay" },
  { name: "Mastercard", logo: "mastercard" },
  { name: "Visa", logo: "visa" },
];
export const BANK_LOGOS = [
  { name: "SBI Card", logo: "sbi" },
  { name: "HDFC Bank", logo: "hdfc" },
  { name: "ICICI Bank", logo: "icici" },
  { name: "Axis Bank", logo: "axis" },
  { name: "YES BANK", logo: "yes" },
  { name: "Kotak", logo: "kotak" },
  { name: "IndusInd Bank", logo: "indusind" },
];

// One entry per business — drives the nav, home page, footer and page colours.
export const VERTICALS = [
  {
    slug: "card-cash",
    index: "01",
    nav: "Card Cash",
    name: "Card Cash",
    long: "Credit Card Cash Withdrawal",
    tag: "From 1.6%",
    tagline: "From 1.6% · swipe or scan",
    blurb: "Turn your RuPay, Mastercard or Visa limit into cash. Swipe or scan, from 1.6%.",
    image: "card-counter",
    icon: CreditCard,
    color: "orange",
  },
  {
    slug: "travel",
    index: "02",
    nav: "Flights & Travel",
    name: "Travel",
    long: "Flight Tickets & Travel",
    tag: "Flights",
    tagline: "Domestic & international",
    blurb: "Domestic and international flights booked by humans who actually pick up.",
    image: "travel-lounge",
    icon: Plane,
    color: "sky",
  },
  {
    slug: "trading",
    index: "03",
    nav: "Aqua Trading",
    name: "Aqua Trading",
    long: "Aqua Trading",
    tag: "B2B",
    tagline: "Sourcing & bulk supply",
    blurb: "Sourcing and bulk supply with honest pricing and on-time delivery.",
    image: "trade-warehouse",
    icon: PackageSearch,
    color: "gold",
  },
  {
    slug: "infra",
    index: "04",
    nav: "Infrastructure",
    name: "Infra",
    long: "Building & Infrastructure",
    tag: "Construction",
    tagline: "Homes, commercial & civil",
    blurb: "Residential and commercial builds — from groundwork to handover.",
    image: "infra-house",
    icon: Building2,
    color: "green",
  },
];

/** CSS custom properties that re-colour a page (or block) for one business. */
export const themeVars = (color) => ({
  "--accent": `var(--${color})`,
  "--accent-d": `var(--${color}-d)`,
  "--accent-ink": `var(--${color})`,
});

export const theme = (slug) => themeVars(VERTICALS.find((v) => v.slug === slug).color);
