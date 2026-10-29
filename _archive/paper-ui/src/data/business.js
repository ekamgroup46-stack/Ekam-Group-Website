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

// One entry per business — drives the nav, home page, footer and page colours.
export const VERTICALS = [
  {
    slug: "card-cash",
    index: "01",
    nav: "Card Cash",
    long: "Credit Card Cash Withdrawal",
    tagline: "From 1.6% · swipe or scan",
    blurb: "Turn your RuPay, Mastercard or Visa credit limit into cash, with charges from 1.6%.",
    tags: ["RuPay", "Mastercard", "Visa", "Instant mode"],
    image: "card-hand",
    imageAlt: "Hand holding a credit card next to a laptop",
    icon: CreditCard,
    color: "orange",
  },
  {
    slug: "travel",
    index: "02",
    nav: "Flights & Travel",
    long: "Flight Tickets & Travel",
    tagline: "Domestic & international",
    blurb: "Flight tickets booked by real people. Fares, dates, group trips and reschedules handled on WhatsApp.",
    tags: ["Domestic", "International", "Groups", "Reschedules"],
    image: "travel-lounge",
    imageAlt: "Traveller waiting at an airport gate while a plane takes off",
    icon: Plane,
    color: "blue",
  },
  {
    slug: "trading",
    index: "03",
    nav: "AQA Trading",
    long: "AQA Trading",
    tagline: "Sourcing & bulk supply",
    blurb: "Product sourcing and bulk supply for shops, businesses and projects — checked, fairly priced, delivered on time.",
    tags: ["Sourcing", "Bulk supply", "Quality checks", "Delivery"],
    image: "trade-port",
    imageAlt: "Container ship being loaded at a port",
    icon: PackageSearch,
    color: "butter",
  },
  {
    slug: "infra",
    index: "04",
    nav: "Infrastructure",
    long: "Building & Infrastructure",
    tagline: "Homes, commercial & civil",
    blurb: "Residential and commercial construction, renovations and civil works — from the first site visit to handover.",
    tags: ["Residential", "Commercial", "Renovation", "Civil works"],
    image: "infra-house",
    imageAlt: "Modern two-storey house at dusk",
    icon: Building2,
    color: "green",
  },
];

const ON_ACCENT = { orange: "var(--ink)", blue: "var(--paper)", butter: "var(--ink)", green: "var(--paper)" };

/** CSS custom properties that re-colour a page or block for one business. */
export const themeVars = (color) => ({
  "--accent": `var(--${color})`,
  "--accent-ink": `var(--${color}-ink)`,
  "--on-accent": ON_ACCENT[color],
});

export const theme = (slug) => themeVars(VERTICALS.find((v) => v.slug === slug).color);
