import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

export function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre-alani">
      <div className="input-group">
        <label>Etkinlik ara</label>
        <input
          type="search"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Kategori</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}