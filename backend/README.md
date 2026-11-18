# Kampüs API - Backend (Sprint 8)

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
| **GET** | `/events` | Listeyi getir | 200 | — | Tamamlandı |
| **GET** | `/events/:id` | Tek etkinlik | 200 | 404 | Tamamlandı |
| **POST** | `/events` | Yeni etkinlik | 201 | 400 | Tamamlandı |
| **PATCH** | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| **DELETE** | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Health Check Endpoint
- **GET** `/health` : Sunucunun çalışır durumda olduğunu ve öğrenci numarasını doğrular. (Status: `200 OK`)

### Durum Kodları (Status Codes)
- **200 OK**: İstek başarılı oldu.
- **201 Created**: Yeni etkinlik başarıyla eklendi.
- **400 Bad Request**: Mongoose şema doğrulama hatası (ValidationError).
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
