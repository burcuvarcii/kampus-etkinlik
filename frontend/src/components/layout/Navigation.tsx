import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const navItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Etkinlik Ekle" },
];

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="main-nav">
      {navItems.map((item) => (
        <button
          key={item.name}
          className={current === item.name ? "active" : ""}
          onClick={() => onNavigate(item.name)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}