import type { CampusEvent } from "../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onClose: () => void;
}

export function EventDetail({ event, onClose }: EventDetailProps) {
  return (
    <div className="detay-modal">
      <div className="detay-icerik">
        <button className="kapat-btn" onClick={onClose}>✕</button>
        <h2>{event.title}</h2>
        <span className="kategori">{event.category}</span>
        <p><strong>Tarih & Saat:</strong> {event.date} - {event.time}</p>
        <p><strong>Mekan:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p><strong>Açıklama:</strong> {event.description}</p>
      </div>
    </div>
  );
}