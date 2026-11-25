# Kampüs API - Backend (Sprint 9)

Express.js ve Mongoose / MongoDB ile geliştirilmiş Kampüs Etkinlikleri REST API uygulaması.

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Örnek veritabanı verilerini yükleyin (Seed)
npm run seed

# 3. Geliştirici sunucusunu çalıştırın
npm run dev

# veya normal başlatma için
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## ⚙️ Ortam Değişkenleri (.env)

Sunucu ve veritabanı yapılandırmasını `.env` dosyasından okur:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

- `.env.example` dosyası repoda yer alır ve örnek yapılandırmayı (yer tutucu) içerir.
- `.env` dosyası gizli tutulur ve `.gitignore` ile korunur (asla repoya commit edilmez).

---

## 📋 REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sunucu durumu | 200 | — | çalışıyor |
| **GET** | `/events ?search= & ?category=` | Listele, ara ve filtrele | 200 | — | çalışıyor |
| **GET** | `/events/upcoming` | Yaklaşan etkinlikler (tarihe göre sıralı) | 200 | — | çalışıyor |
| **GET** | `/events/:id` | Tek etkinlik | 200 | 404 | çalışıyor |
| **POST** | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| **PATCH** | `/events/:id` | Güncelle (güncel kayıt döner) | 200 | 400, 404 | çalışıyor |
| **DELETE** | `/events/:id` | Sil (gövde yok) | 204 | 404 | çalışıyor |

### Notlar
- Tarih alanı tüm API istek ve yanıtlarında `"GG-AA-YYYY"` biçimindedir (ör. `"15-10-2026"`).
- Geçersiz veya bulunamayan `:id` tüm tekil endpoint'lerde `404` döndürür.

### Durum Kodları (Status Codes)
- **200 OK**: İstek başarılı oldu.
- **201 Created**: Yeni etkinlik başarıyla eklendi.
- **204 No Content**: Etkinlik başarıyla silindi (yanıt gövdesi yok).
- **400 Bad Request**: Doğrulama, tarih biçimi, boş gövde veya korumalı alan hatası.
- **404 Not Found**: Belirtilen ID'ye sahip etkinlik veya route bulunamadı.
- **500 Internal Server Error**: Beklenmeyen sunucu hatası.

### Hata Yanıt Formatı
Tüm hata yanıtları standart formatta döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```
