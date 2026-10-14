import type { CampusEvent } from "../types/campus-event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onSelectEvent: (id: string) => void;
}

export function EventList({ events, onSelectEvent }: EventListProps) {
  if (events.length === 0) {
    return <p className="bos-mesaj">Aranan kriterlere uygun etkinlik bulunamadı.</p>;
  }

  return (
    <div className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onSelect={onSelectEvent} />
      ))}
    </div>
  );
}