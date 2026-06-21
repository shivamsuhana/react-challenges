export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'recently-added' | 'priority-high-low' | 'priority-low-high' | 'alphabetical';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sort?: SortType;
  onSortChange?: (sort: SortType) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function FilterBar({ 
  filter, onFilterChange, 
  sort = 'recently-added', onSortChange,
  searchQuery = '', onSearchChange
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button data-active={filter === 'all'} onClick={() => onFilterChange('all')}>All</button>
      <button data-active={filter === 'active'} onClick={() => onFilterChange('active')}>Active</button>
      <button data-active={filter === 'completed'} onClick={() => onFilterChange('completed')}>Completed</button>

      {onSortChange && (
        <select id="sort-order" value={sort} onChange={(e) => onSortChange(e.target.value as SortType)}>
          <option value="recently-added">Recently Added</option>
          <option value="priority-high-low">Priority: High to Low</option>
          <option value="priority-low-high">Priority: Low to High</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      )}

      {onSearchChange && (
        <div>
          <input 
            id="search-input" 
            type="text" 
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery.length > 0 && (
            <button id="clear-search" onClick={() => onSearchChange('')}>
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}