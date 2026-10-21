import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <div className="kart">
      {event.image && (
        <img src={event.image} alt={event.title} className="kart-gorsel" />
      )}
      <div className="kart-icerik">
        <span className="kategori">{event.category}</span>
        <h2>{event.title}</h2>
        <p><strong>Tarih:</strong> {formatDate(event.date)} - {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p className="aciklama-ozet">{event.description}</p>
        <button className="link-btn" onClick={() => onShowDetail(event.id)}>
          Detayları gör
        </button>
      </div>
    </div>
  );
}