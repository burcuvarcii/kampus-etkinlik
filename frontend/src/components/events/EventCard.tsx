import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <article className="kart">
      {event.image && <img src={event.image} alt={event.title} className="kart-resim" />}
      <div className="kart-icerik">
        <span className="kart-kategori">{event.category}</span>
        <h3 className="kart-baslik">{event.title}</h3>
        <p className="kart-tarih">{formatDate(event.date)} - {event.time}</p>
        <p className="kart-yer">{event.location}</p>
        <Link to={`/events/${event.id}`} className="buton">
          Detayları gör
        </Link>
      </div>
    </article>
  );
}