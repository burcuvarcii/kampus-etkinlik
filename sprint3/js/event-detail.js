import { events } from "./data.js";

const container = document.querySelector("#detay-container") || document.querySelector("main") || document.body;

function formatTarih(tarihStr) {
  const [gun, ay, yil] = tarihStr.split("-");
  const dateObj = new Date(yil, ay - 1, gun);
  return dateObj.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const event = events.find(e => e.id === id);

if (!event) {
  container.innerHTML = `
    <div class="hata-kutusu" style="border: 1px solid #d32f2f; color: #d32f2f; padding: 15px; margin: 20px 0; border-radius: 4px;">
      "${id || ''}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
    </div>
    <a href="etkinlikler.html" class="buton">Listeye dön</a>
  `;
} else {
  document.title = `${event.title} - Etkinlik Detayı`;
  container.innerHTML = `
    <h1>${event.title}</h1>
    <div class="detay-duzen" style="display: flex; gap: 20px; flex-wrap: wrap;">
      <div class="afis-alani" style="flex: 1; min-width: 250px; background: #1b3a2b; color: white; padding: 40px; text-align: center; border-radius: 6px;">
        <h2>${event.title}</h2>
        <p>${formatTarih(event.date)} - ${event.location}</p>
      </div>
      <div class="kunye-alani" style="flex: 1; min-width: 250px;">
        <h3>Etkinlik Künyesi</h3>
        <p><strong>Tarih:</strong> ${formatTarih(event.date)}, ${event.time}</p>
        <p><strong>Yer:</strong> ${event.location}</p>
        <p><strong>Kategori:</strong> ${event.category}</p>
        <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      </div>
    </div>
    <div class="aciklama" style="margin-top: 20px;">
      <h3>Açıklama</h3>
      <p>${event.description}</p>
    </div>
    <div style="margin-top: 20px; display: flex; gap: 10px;">
      <a href="etkinlikler.html" class="buton">Listeye dön</a>
      <a href="etkinlik-guncelle.html?id=${event.id}" class="buton">Bu etkinliği güncelle</a>
    </div>
  `;
}