import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "";
  onCategoryChange: (category: Category | "") => void;
  categories: Category[];
}

export default function EventFilter({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: EventFilterProps) {
  return (
    <div className="filtre-alani">
      <input
        type="text"
        placeholder="Etkinlik ara..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}