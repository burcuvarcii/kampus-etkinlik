import type { Category } from "../types/campus-event";

interface EventFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: Category | "";
  onCategoryChange: (category: Category | "") => void;
}

export function EventFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre-alani">
      <input
        type="text"
        placeholder="Etkinlik ara..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="arama-input"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        className="kategori-select"
      >
        <option value="">Tüm Kategoriler</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>
    </div>
  );
}