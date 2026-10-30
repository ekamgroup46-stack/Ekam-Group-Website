import { siWhatsapp, siInstagram, siGmail, siAirindia, siIndigo, siAkasaair, siEmirates } from "simple-icons";

// Real brand marks (Simple Icons). Only the ones the site uses are imported, so the rest tree-shake away.
const ICONS = {
  whatsapp: siWhatsapp,
  instagram: siInstagram,
  gmail: siGmail,
  airindia: siAirindia,
  indigo: siIndigo,
  akasa: siAkasaair,
  emirates: siEmirates,
};

/**
 * Single-colour brand logo as inline SVG. `color` defaults to the brand's own
 * colour; pass "currentColor" to inherit text colour.
 */
export default function BrandIcon({ name, size = 20, color, title, className }) {
  const icon = ICONS[name];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={icon.path} fill={color ?? `#${icon.hex}`} />
    </svg>
  );
}
