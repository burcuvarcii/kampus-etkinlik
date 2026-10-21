import { useState, useEffect } from "react";
import { events as initialEvents } from "./data/event";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import "./App.css";
import type { PageName } from "./types/page";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import { EventList } from "./components/events/EventList";
import { EventFilter } from "./components/events/EventFilter";
import { EventDetail } from "./components/events/EventDetail";
import { EventForm } from "./components/forms/EventForm";



export default function App() {
  const [events] = useState<CampusEvent[]>(initialEvents);
  const [page, setPage] = useState<PageName>("home");
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

  const go = (newPage: PageName, id: string | null = null) => {
    setPage(newPage);
    if (id) setSelectedId(id);
  };

  return (
    <div className="app-container">
      {/* ÜST MENÜ (NAV) */}
      <Header title={page === "detail" && selected ? selected.title : "Kampüs Etkinlikleri"} text={page !== "detail" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." : undefined} />
<Navigation current={page} onNavigate={setPage} />

      
          <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section className="home-page">
            <h2>Yaklaşan 2 Etkinlik</h2>

            <EventList events={events.slice(0, 2)} onSelect={(id) => go("detail", id)} />

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
            <EventFilter
  searchText={searchText}
  category={category}
  categories={categories}
  onSearchChange={setSearchText}
  onCategoryChange={setCategory}
/>    
     <EventList events={filteredEvents} onSelect={(id) => go("detail", id)} emptyText="Etkinlik bulunamadı." />     
          </section>
        )}
          {/* DETAY SAYFASI */}
      {page === "detail" && selected && (
        <EventDetail
          event={selected}
          onBack={() => go("events")}
          onEdit={(id) => go("update", id)}
        />
      )}
        {/* EKLE / GÜNCELLE FORMU */}
      {(page === "add" || page === "update") && (
        <section className="form-page">
          <h2>{page === "add" ? "Yeni Etkinlik Ekle" : "Etkinliği Güncelle"}</h2>
          <p className="page-desc">
            Bu sprinte form sadece görünümdür; kayıt yapılmaz.
          </p>

          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        </section>
      )}
      </main>

<footer />
     
    </div>
  );
}