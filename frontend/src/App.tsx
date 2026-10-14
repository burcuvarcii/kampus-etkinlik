import { useState, useEffect } from "react";
import { events as initialEvents } from "./data/event";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import "./App.css";

type Page = "home" | "events" | "add" | "update" | "detail";

export default function App() {
  const [events] = useState<CampusEvent[]>(initialEvents);
  const [page, setPage] = useState<Page>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Arama ve Filtreleme State'leri
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Dinamik Kategori Listesi
  const categories = [...new Set(events.map((e) => e.category))];

  // Filtrelenmiş liste
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  // Seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sekme Başlığı Güncelleme (useEffect - Adım 11)
  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri — ${selected.title}`;
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  const go = (newPage: Page, id: string | null = null) => {
    setPage(newPage);
    if (id) setSelectedId(id);
  };

  return (
    <div className="app-container">
      {/* ÜST MENÜ (NAV) */}
      <header className="main-header">
        <h1>{page === "detail" && selected ? selected.title : "Kampüs Etkinlikleri"}</h1>
        {page !== "detail" && (
          <p className="header-subtitle">
            Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
          </p>
        )}
        <nav className="main-nav">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => go("home")}
          >
            Ana Sayfa
          </button>
          <button
            className={page === "events" ? "active" : ""}
            onClick={() => go("events")}
          >
            Etkinlikler
          </button>
          <button
            className={page === "add" ? "active" : ""}
            onClick={() => go("add")}
          >
            Ekle
          </button>
        </nav>
      </header>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section className="home-page">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-listesi">
              {events.slice(0, 2).map((e) => (
                <div key={e.id} className="kart">
                  <h3>{e.title}</h3>
                  <span className="kategori">{e.category}</span>
                  <p><strong>Tarih:</strong> {e.date}, {e.time}</p>
                  <p><strong>Yer:</strong> {e.location}</p>
                  <p><strong>Kontenjan:</strong> {e.capacity} kişi</p>
                  <p className="aciklama-ozet">{e.description}</p>
                  <button className="link-btn" onClick={() => go("detail", e.id)}>
                    Detayları gör
                  </button>
                </div>
              ))}
            </div>
            <button className="tum-etkinlikler-btn" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {/* ETKİNLİKLER SAYFASI (ARAMA VE FİLTRELEME) */}
        {page === "events" && (
          <section className="events-page">
            <h2>Tüm Etkinlikler</h2>
            <p className="page-desc">Ekim ayında kampüste düzenlenen etkinlikler.</p>
            <div className="filtre-alani">
              <div className="input-group">
                <label>Etkinlik ara</label>
                <input
                  type="search"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="sonuc-sayisi">
              {filteredEvents.length === 0
                ? "bulunamadı"
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-listesi">
              {filteredEvents.map((e) => (
                <div key={e.id} className="kart">
                  <h3>{e.title}</h3>
                  <span className="kategori">{e.category}</span>
                  <p><strong>Tarih:</strong> {e.date}, {e.time}</p>
                  <p><strong>Yer:</strong> {e.location}</p>
                  <p><strong>Kontenjan:</strong> {e.capacity} kişi</p>
                  <p className="aciklama-ozet">{e.description}</p>
                  <button className="link-btn" onClick={() => go("detail", e.id)}>
                    Detayları gör
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <section className="detail-page">
            {!selected ? (
              <div>
                <p>Etkinlik bulunamadı.</p>
                <button onClick={() => go("events")}>Listeye dön</button>
              </div>
            ) : (
              <article className="detay">
                {selected.image && (
                  <figure className="afis-alani">
                    <img src={selected.image} alt={selected.title} />
                    <figcaption>{selected.title} afişi</figcaption>
                  </figure>
                )}
                <div className="kunye">
                  <h3>Etkinlik Künyesi</h3>
                  <p><strong>Tarih:</strong> {selected.date}, {selected.time}</p>
                  <p><strong>Yer:</strong> {selected.location}</p>
                  <p><strong>Kategori:</strong> {selected.category}</p>
                  <p><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
                </div>
                <div className="aciklama">
                  <h3>Açıklama</h3>
                  <p>{selected.description}</p>
                </div>
                <div className="detay-butonlar">
                  <button className="listeye-don-btn" onClick={() => go("events")}>
                    ← Listeye dön
                  </button>
                  <button className="guncelle-btn" onClick={() => go("update", selected.id)}>
                    Bu etkinliği güncelle
                  </button>
                </div>
              </article>
            )}
          </section>
        )}

        {/* EKLE / GÜNCELLE FORMU (ADIM 13) */}
        {(page === "add" || page === "update") && (
          <section className="form-page">
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="form-bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                id="title"
                maxLength={80}
                placeholder="Örn. Kariyer Günleri 2026"
                defaultValue={page === "update" ? selected?.title : ""}
              />

              <label htmlFor="category">Kategori</label>
              <select id="category" defaultValue={page === "update" ? selected?.category : ""}>
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label htmlFor="date">Tarih</label>
              <input
                type="date"
                id="date"
                defaultValue={page === "update" ? selected?.date : ""}
              />

              <label htmlFor="time">Saat</label>
              <input
                type="time"
                id="time"
                defaultValue={page === "update" ? selected?.time : ""}
              />

              <label htmlFor="location">Yer</label>
              <input
                id="location"
                placeholder="Örn. A Blok Konferans Salonu"
                defaultValue={page === "update" ? selected?.location : ""}
              />

              <label htmlFor="capacity">Kontenjan</label>
              <input
                type="number"
                id="capacity"
                defaultValue={page === "update" ? selected?.capacity : ""}
              />

              <label htmlFor="description">Açıklama</label>
              <textarea
                id="description"
                rows={5}
                defaultValue={page === "update" ? selected?.description : ""}
              />

              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Burcu Varcı - 2311012043</p>
      </footer>
    </div>
  );
}