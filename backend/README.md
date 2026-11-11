# Kampüs API - Backend (Sprint 7)

Express.js ile geliştirilmiş Kampüs Etkinlikleri REST API uygulaması.

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki komutları izleyin:

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirici sunucusunu (otomatik yeniden başlatma ile) çalıştırın
npm run dev

# veya normal başlatma için
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## ⚙️ Ortam Değişkenleri (PORT)

Sunucu port yapılandırmasını `.env` dosyasından okur:

```env
PORT=3000
```

- `.env.example` dosyası repoda yer alır ve örnek yapılandırmayı içerir.
- `.env` dosyası gizli tutulur ve `.gitignore` ile korunur.

---

## 📋 REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/events` | Listeyi getir | 200 | — | Bu sprint |
| **GET** | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| **POST** | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| **PATCH** | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| **DELETE** | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Health Check Endpoint
- **GET** `/health` : Sunucunun çalışır durumda olduğunu ve öğrenci numarasını doğrular. (Status: `200 OK`)

### Durum Kodları (Status Codes)
- **200 Tamam**: İstek başarılı oldu.
- **201 Oluşturuldu**: Yeni etkinlik başarıyla eklendi.
- **204 İçerik Yok**: Başarılı işlem sonrası içerik dönmüyor.
- **400 Eksik/Yanlış Veri**: Gerekli alanlar eksik (`title`, `category`, `date`).
- **404 Bulunamadı**: Belirtilen etkinlik veya route bulunamadı.

### Hata Yanıt Formatı
Tüm hata yanıtları standart formatta döner:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```
