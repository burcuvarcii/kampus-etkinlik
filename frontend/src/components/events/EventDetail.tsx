import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <section className="detail-page">
      <article className="detay">
        {event.image && (
          <figure className="afis-alani">
            <img src={event.image} alt={event.title} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        <div className="kunye">
          <h3>Etkinlik Künyesi</h3>
          <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
          <p><strong>Yer:</strong> {event.location}</p>
          <p><strong>Kategori:</strong> {event.category}</p>
          <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        </div>

        <div className="aciklama-alani">
          <h3>Açıklama</h3>
          <p>{event.description}</p>
        </div>

        <div className="detay-islemler">
          <button className="back-btn" onClick={onBack}>
            ← Listeye dön
          </button>
          <button className="edit-btn" onClick={() => onEdit(event.id)}>
            Bu etkinliği güncelle
          </button>
        </div>
      </article>
    </section>
  );
}