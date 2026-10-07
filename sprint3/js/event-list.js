import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Tarihi Türkçe formatına çeviren fonksiyon (Örn: 12 Ekim 2026)
function formatTarih(tarihStr) {
  const [gun, ay, yil] = tarihStr.split("-");
  const dateObj = new Date(yil, ay - 1, gun);
  return dateObj.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

// Kart Şablonu Üretimi
function createCard(event) {
  return `
    <article class="kart">
      <h2>${event.title}</h2>
      <span class="kategori">${event.category}</span>
      <p><strong>Tarih:</strong> ${formatTarih(event.date)}, ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>
  `;
}

// Kartları Ekrana Bastırma
function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = "";
    if (sonucSatiri) sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    return;
  }
  list.innerHTML = dizi.map(createCard).join("");
  if (sonucSatiri) {
    sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
  }
}

// Dinamik Kategori Seçeneklerini Doldurma
function kategorileriDoldur() {
  if (!kategoriSelect) return;
  const kategoriler = [...new Set(events.map(e => e.category))];
  kategoriler.forEach(kat => {
    const opt = document.createElement("option");
    opt.value = kat;
    opt.textContent = kat;
    kategoriSelect.appendChild(opt);
  });
}

// Arama ve Kategori Filtreleme
function filtrele() {
  const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
  const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

  const sonuc = events.filter(e => {
    const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
                        e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
                        e.location.toLocaleLowerCase("tr-TR").includes(aranan);
    const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);
}

// Sayfa Yüklendiğinde Çalışacak Kodlar
if (list) {
  if (list.dataset.limit) {
    // Ana Sayfa: Tarihi en yakın ilk 2 etkinliği sırala ve göster
    const yaklasan = [...events]
      .sort((a, b) => {
        const [g1, a1, y1] = a.date.split("-");
        const [g2, a2, y2] = b.date.split("-");
        return new Date(`${y1}-${a1}-${g1}`) - new Date(`${y2}-${a2}-${g2}`);
      })
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // Etkinlikler Sayfası
    kategorileriDoldur();
    render(events);

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
  }
}