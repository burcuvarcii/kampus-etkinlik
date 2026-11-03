import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

export default function EventDetail({ event }: Props) {
  return (
    <article className="detay">
      {event.image && <img src={event.image} alt={event.title} className="detay-resim" />}
      <div className="detay-icerik">
        <span className="kart-kategori">{event.category}</span>
        <h2>{event.title}</h2>
        <dl>
          <div>
            <dt>Tarih & Saat:</dt>
            <dd>{formatDate(event.date)} - {event.time}</dd>
          </div>
          <div>
            <dt>Yer:</dt>
            <dd>{event.location}</dd>
          </div>
          <div>
            <dt>Kontenjan:</dt>
            <dd>{event.capacity} kişi</dd>
          </div>
        </dl>
        <p className="detay-aciklama">{event.description}</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
          <Link to="/events" className="buton">Listeye dön</Link>
          <Link to={`/admin/${event.id}/edit`} className="buton">Güncelle</Link>
        </div>
      </div>
    </article>
  );
}