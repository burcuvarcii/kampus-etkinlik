import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (form) {
  form.setAttribute("novalidate", "true"); // Tarayıcı balonlarını kapat

  // ADIM 11: Güncelleme Sayfası Mantığı (id ile veya id'siz açılış)
  if (form.dataset.mode === "guncelle") {
    const etkinlik = events.find(e => e.id === id);
    if (!etkinlik) {
      form.outerHTML = `
        <div class="hata-kutusu" style="border: 1px solid #d32f2f; color: #d32f2f; padding: 15px; margin: 20px 0; border-radius: 4px; background: #ffebee;">
          Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
        </div>
        <a href="etkinlikler.html" class="buton" style="display: inline-block; padding: 10px 15px; background: #2e7d32; color: white; text-decoration: none; border-radius: 4px;">Etkinliklere git</a>
      `;
    } else {
      if (form.elements["ad"]) form.elements["ad"].value = etkinlik.title;
      if (form.elements["kategori"]) form.elements["kategori"].value = etkinlik.category;
      if (form.elements["tarih"]) {
        const [g, a, y] = etkinlik.date.split("-");
        form.elements["tarih"].value = `${y}-${a}-${g}`;
      }
      if (form.elements["saat"]) form.elements["saat"].value = etkinlik.time;
      if (form.elements["yer"]) form.elements["yer"].value = etkinlik.location;
      if (form.elements["kontenjan"]) form.elements["kontenjan"].value = etkinlik.capacity;
      if (form.elements["aciklama"]) form.elements["aciklama"].value = etkinlik.description;
    }
  }

  // ADIM 9 & 10: Form Gönderimi ve Hata Kontrolü
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      id: id || `event-${events.length + 1}`,
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: fd.get("yer") ? fd.get("yer").trim() : "",
      capacity: fd.get("kontenjan") && fd.get("kontenjan").trim() !== "" ? Number(fd.get("kontenjan")) : null,
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
    };

    // Temizlik
    document.querySelectorAll(".hata-mesaji").forEach(el => {
      el.textContent = "";
      el.style.color = "red";
      el.style.fontSize = "0.85em";
      el.style.display = "block";
    });
    document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    const mesajKutusu = document.querySelector("#form-mesaj");
    if (mesajKutusu) mesajKutusu.innerHTML = "";

    const errors = {};

    // Doğrulama Kuralları
    if (!data.title || data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1-1000 arasında olmalıdır.";
    }

    // Hata Varsa Ekrana Yazdır
    if (Object.keys(errors).length > 0) {
      for (const [key, msg] of Object.entries(errors)) {
        const inputEl = form.elements[key];
        if (inputEl) {
          inputEl.setAttribute("aria-invalid", "true");
          let errorSpan = document.querySelector(`#${key}-hata`);
          if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.id = `${key}-hata`;
            errorSpan.className = "hata-mesaji";
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "0.85em";
            errorSpan.style.display = "block";
            inputEl.parentNode.insertBefore(errorSpan, inputEl.nextSibling);
          }
          errorSpan.textContent = msg;
        }
      }
      return;
    }

    // Başarılı Gönderim: JSON Çıktısını Yeşil Kutuda Göster
    if (mesajKutusu) {
      mesajKutusu.innerHTML = `
        <div style="background: #e8f5e9; border: 1px solid #4caf50; padding: 15px; margin-top: 15px; border-radius: 4px;">
          <p style="color: #2e7d32; font-weight: bold; margin-top: 0;">Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
          <pre style="background: #fff; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: monospace; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}