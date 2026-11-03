import { useState, type FormEvent } from "react";
import type { EventFormData } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  onSubmit: (data: EventFormData) => void;
  submitText: string;
}

export default function EventForm({ initialData, onSubmit, submitText }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateEvent(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="etkinlik-formu">
      <div>
        <label>Başlık</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div>
        <label>Kategori</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          <option value="Yazılım">Yazılım</option>
          <option value="Kültür & Sanat">Kültür & Sanat</option>
          <option value="Spor">Spor</option>
          <option value="Müzik">Müzik</option>
          <option value="Akademik">Akademik</option>
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div>
        <label>Tarih</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div>
        <label>Saat</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div>
        <label>Konum</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div>
        <label>Kontenjan</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div>
        <label>Açıklama</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button type="submit" className="buton">{submitText}</button>
    </form>
  );
}