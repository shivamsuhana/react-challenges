
import { useEffect,useState, } from 'react';
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
  { id: 3, title: 'Third Task', description: 'Desc 3', priority: 'Low', completed: false },
  { id: 4, title: 'Fourth Task', description: 'Desc 4', priority: 'High', completed: false },
  { id: 5, title: 'Fifth Task', description: 'Desc 5', priority: 'Medium', completed: false },
];

export default function TaskApp({ tasks = [], setTasks, showForm,showFilterBar  }: TaskAppProps) {

  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('recently-added');
  


    useEffect(() => {
    if (tasks.length === 0 && setTasks) {
      setTasks(INITIAL_TASKS);
    }
  }, []);



    const handleAddTask = (newTask: Task) => {
    if (setTasks) {
      
      setTasks([...tasks, newTask]);
    }
  };

  
  const handleToggle = (id: number) => {
    if (setTasks) {
      setTasks(tasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    }
  };

  const handleDelete = (id: number) => {
    if (setTasks) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true; 
  });

  const priorityWeight = { High: 3, Medium: 2, Low: 1 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'priority-high-low') {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    if (sort === 'priority-low-high') {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    if (sort === 'alphabetical') {
      // Case-insensitive sorting using localeCompare i convertd all in smaller case
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    }
   
    return 0;
  });


  return (
    <div>
      {showFilterBar && (
        <FilterBar
         filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort} />
      )}

      {showForm && <TaskForm onAddTask={handleAddTask} />}

      <TaskList 
      tasks={sortedTasks}
      totalTasksCount={tasks.length}
      onToggle={handleToggle}
      onDelete={handleDelete} />
    </div>
  );
}