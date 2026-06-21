// export default function FilterBar() {
//   return <div id="filter-bar" />
// }


export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'recently-added' | 'priority-high-low' | 'priority-low-high' | 'alphabetical';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sort?: SortType;
  onSortChange?: (sort: SortType) => void;
}

export default function FilterBar({ filter, onFilterChange,sort = 'recently-added', onSortChange}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button 
        data-active={filter === 'all'} 
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button 
        data-active={filter === 'active'} 
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>
      <button 
        data-active={filter === 'completed'} 
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>

      {onSortChange && (
        <select 
          id="sort-order" 
          value={sort} 
          onChange={(e) => onSortChange(e.target.value as SortType)}
        >
          <option value="recently-added">Recently Added</option>
          <option value="priority-high-low">Priority: High to Low</option>
          <option value="priority-low-high">Priority: Low to High</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      )}
    </div>
  );
}