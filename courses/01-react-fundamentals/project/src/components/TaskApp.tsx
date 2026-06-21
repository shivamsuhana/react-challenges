import { useEffect, useState } from 'react';
import TaskList, { Task } from './TaskList';
import TaskForm from './TaskForm'; 
import FilterBar, { FilterType, SortType } from './FilterBar';

interface TaskAppProps {
  tasks?: Task[];
  setTasks?: (tasks: Task[]) => void;
  showForm?: boolean;
  showFilterBar?: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'First Task', description: 'Desc 1', priority: 'High', completed: false },
  { id: 2, title: 'Second Task', description: 'Desc 2', priority: 'Medium', completed: false },
];

export default function TaskApp({ tasks = [], setTasks, showForm, showFilterBar }: TaskAppProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('recently-added');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // STRICT ADDITION: Debounce architecture states
  const [searchQuery, setSearchQuery] = useState(''); // Immediate raw input
  const [debouncedQuery, setDebouncedQuery] = useState(''); // Delayed execution input
  const [isSearching, setIsSearching] = useState(false); // Indicator flag

  useEffect(() => {
    if (setTasks) {
      try {
        const savedData = localStorage.getItem('task-app-tasks');
        if (savedData) setTasks(JSON.parse(savedData));
        else setTasks(INITIAL_TASKS);
      } catch (error) {
        setTasks(INITIAL_TASKS);
      }
      setIsInitialized(true);
    }
  }, []); 

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('task-app-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  
  useEffect(() => {
    setIsSearching(true);
    
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    // Agar 300ms se pehle naya keystroke aaya toh purana timer destroy hoga
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleAddTask = (newTask: Task) => {
    if (setTasks) setTasks([...tasks, newTask]);
  };

  const handleToggle = (id: number) => {
    if (setTasks) setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id: number) => {
    if (setTasks) setTasks(tasks.filter(t => t.id !== id));
  };

  const handleUpdateTask = (id: number, updates: { title: string; description: string; priority: 'Low' | 'Medium' | 'High' }) => {
    if (setTasks) setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true; 
  });

  const searchedTasks = filteredTasks.filter(t => {
    if (!debouncedQuery.trim()) return true;
    const lowerQuery = debouncedQuery.toLowerCase();
    return t.title.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery);
  });

  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  
  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sort === 'priority-high-low') return priorityWeight[b.priority] - priorityWeight[a.priority];
    if (sort === 'priority-low-high') return priorityWeight[a.priority] - priorityWeight[b.priority];
    if (sort === 'alphabetical') return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    return 0;
  });

  return (
    <div>
      {showFilterBar && (
        <FilterBar 
          filter={filter} 
          onFilterChange={setFilter} 
          sort={sort}
          onSortChange={setSort}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSearching={isSearching} 
        />
      )}
      {showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList 
        tasks={sortedTasks} 
        totalTasksCount={tasks.length} 
        onToggle={handleToggle} 
        onDelete={handleDelete} 
        editingId={editingId}
        setEditingId={setEditingId}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}