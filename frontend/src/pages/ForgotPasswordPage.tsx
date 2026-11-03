import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section className="sayfa auth-kutu">
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı <strong>{email}</strong> adresine gönderildi (demo).
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="form">
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <button type="submit" className="buton">Bağlantı gönder</button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <Link to="/login">← Girişe dön</Link>
      </div>
    </section>
  );
}