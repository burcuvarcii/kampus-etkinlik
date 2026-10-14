import { useState } from "react";
import type { CampusEvent, Category } from "../types/campus-event";

interface EventFormProps {
  onAddEvent: (event: Omit<CampusEvent, "id">) => void;
}

export function EventForm({ onAddEvent }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Seminer");
  const [capacity, setCapacity] = useState<number>(50);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time || !location) {
      alert("Lütfen gerekli alanları doldurun!");
      return;
    }

    onAddEvent({
      title,
      category,
      capacity,
      date,
      time,
      location,
      description,
    });

    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <form className="etkinlik-formu" onSubmit={handleSubmit}>
      <h3>Yeni Etkinlik Ekle</h3>
      <input
        type="text"
        placeholder="Etkinlik Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>
      <input
        type="number"
        placeholder="Kontenjan"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <input
        type="text"
        placeholder="Mekan"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Etkinlik Ekle</button>
    </form>
  );
}