import type { CampusEvent } from "../types/campus-event";

interface EventCardProps {
  event: CampusEvent;
  onSelect: (id: string) => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <div className="kart" onClick={() => onSelect(event.id)}>
      {event.image && (
        <img src={event.image} alt={event.title} className="kart-gorsel" />
      )}
      <div className="kart-icerik">
        <span className="kategori">{event.category}</span>
        <h2>{event.title}</h2>
        <p><strong>Tarih:</strong> {event.date} - {event.time}</p>
        <p><strong>Mekan:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>
    </div>
  );
}