import { Phone } from "lucide-react";
import BrandIcon from "./BrandIcon.jsx";
import { CONTACT, waLink } from "../data/business.js";
import s from "./MobileDock.module.css";

export default function MobileDock() {
  return (
    <div className={s.dock}>
      <a href={`tel:+91${CONTACT.phone}`} className={s.call}><Phone size={18} /> Call</a>
      <a href={waLink()} target="_blank" rel="noreferrer" className={s.wa}><BrandIcon name="whatsapp" size={19} color="currentColor" /> WhatsApp us</a>
    </div>
  );
}
