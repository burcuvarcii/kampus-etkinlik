import type { CampusEvent } from "../../types/campus-event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onSelect: (id: string) => void;
  emptyText?: string;
}

export function EventList({ events, onSelect, emptyText = "Aranan kriterlere uygun etkinlik bulunamadı." }: EventListProps) {
  if (events.length === 0) {
    return <p className="bos-mesaj">{emptyText}</p>;
  }

  return (
    <div className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onSelect} />
      ))}
    </div>
  );
}