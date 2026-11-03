# React + TypeScript + Vite

# Kampüs Etkinlikleri - Sprint 6 & Vize Projesi

Bu proje, üniversite kampüsündeki etkinliklerin listelendiği, detaylarının incelendiği, yönetildiği (ekleme, silme, güncelleme) ve kullanıcı giriş/kayıt işlemlerini içeren tek sayfalık bir web uygulamasıdır (SPA).

---

## 🌐 Canlı Yayın (Vercel)
* **Canlı Demo Adresi:** [https://burcuvarci-frontend.vercel.app](https://burcuvarci-frontend.vercel.app)  
*(Not: Projenizi Vercel'e yüklediğinizde kendi Vercel linkinizi buraya yazabilirsiniz)*

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# 1. Gerekli paketleri yükleyin
npm install

# 2. Geliştirici sunucusunu başlatın
npm run dev
```

Tarayıcınızda açmak için terminalde verilen adrese (varsayılan: `http://localhost:5173/` veya `http://localhost:5175/`) gidin.

---

## 🧭 Route (Sayfa) Listesi

Uygulamada **10 adres ve 10 sayfa** React Router ile yapılandırılmıştır:

| Adres | Sayfa Bileşeni | Açıklama |
| :--- | :--- | :--- |
| `/` | `HomePage` | Yaklaşan 2 etkinliği ve genel bilgileri gösterir. |
| `/events` | `EventsPage` | Tüm etkinliklerin listelendiği, arama ve kategori filtresi yapılan sayfa. |
| `/events/:id` | `EventDetailPage` | Seçilen etkinliğin detaylarını gösterir (`/events/event-1`). |
| `/login` | `LoginPage` | Kullanıcı giriş formu. |
| `/register` | `RegisterPage` | Yeni kullanıcı kayıt formu (şifre tekrarı kontrolü içerir). |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama talep sayfası. |
| `/admin` | `AdminPage` | Etkinliklerin listelendiği, silindiği ve düzenlemeye yönlendiren yönetim tablosu. |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu (doğrulama kuralları içerir). |
| `/admin/:id/edit` | `EditEventPage` | Mevcut bir etkinliği güncelleme formu. |
| `*` | `NotFoundPage` | Tanımsız rotalar için 404 "Sayfa bulunamadı" ekranı. |

---

## 🛠️ Kullanılan Teknolojiler
* **React** (TypeScript ile)
* **Vite** (Hızlı derleme aracı)
* **React Router Dom** (İstemci taraflı sayfa yönlendirmesi)
* **React Context API** (Global state & CRUD yönetimi)