import React from "react";

interface EventFormProps {
  onSubmit: () => void;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Etkinlik Adı</label>
        <input type="text" placeholder="Örn. Kariyer Günleri 2026" />
      </div>

      <div className="form-group">
        <label>Kategori</label>
        <select>
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Topluluk">Topluluk</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tarih</label>
        <input type="date" />
      </div>

      <div className="form-group">
        <label>Saat</label>
        <input type="time" />
      </div>

      <div className="form-group">
        <label>Yer</label>
        <input type="text" placeholder="Örn. A Blok Konferans Salonu" />
      </div>

      <div className="form-group">
        <label>Kontenjan</label>
        <input type="number" />
      </div>

      <div className="form-group">
        <label>Açıklama</label>
        <textarea rows={4}></textarea>
      </div>

      <button type="submit" className="save-btn">
        Kaydet
      </button>
    </form>
  );
}
     