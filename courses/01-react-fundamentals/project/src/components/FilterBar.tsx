// export default function FilterBar() {
//   return <div id="filter-bar" />
// }


export type FilterType = 'all' | 'active' | 'completed';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
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
    </div>
  );
}