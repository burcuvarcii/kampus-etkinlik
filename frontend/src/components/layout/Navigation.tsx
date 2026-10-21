import React from "react";

interface NavigationProps {
  current: string;
  onNavigate: (page: any) => void;
}

export function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="main-nav">
      <button
        className={`nav-btn ${current === "home" ? "active" : ""}`}
        onClick={() => onNavigate("home")}
      >
        Ana Sayfa
      </button>
      <button
        className={`nav-btn ${current === "events" ? "active" : ""}`}
        onClick={() => onNavigate("events")}
      >
        Etkinlikler
      </button>
      <button
        className={`nav-btn ${current === "add" ? "active" : ""}`}
        onClick={() => onNavigate("add")}
      >
        Etkinlik Ekle
      </button>
    </nav>
  );
}

export default Navigation;