import { Phone, MessageCircle } from "lucide-react";
import { CONTACT, waLink } from "../data/business.js";
import s from "./MobileDock.module.css";

export default function MobileDock() {
  return (
    <div className={s.dock}>
      <a href={`tel:+91${CONTACT.phone}`} className={s.call}><Phone size={18} /> Call</a>
      <a href={waLink()} target="_blank" rel="noreferrer" className={s.wa}><MessageCircle size={18} /> WhatsApp us</a>
    </div>
  );
}
