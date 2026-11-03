import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="sayfa" style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/" className="buton">Ana sayfaya dön</Link>
      </div>
    </section>
  );
}