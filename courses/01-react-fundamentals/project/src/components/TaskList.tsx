

import TaskCard from './TaskCard';

export interface Task {
  id: number ;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle?: (id: number) => void;
}

// justfor fallback case
const HARDCODED_TASKS: Task[] = [
  { id: 1, title: 'Task One', description: 'First hardcoded task', priority: 'High', completed: false },
  { id: 2, title: 'Task Two', description: 'Second hardcoded task', priority: 'Medium', completed: false },
  { id: 3, title: 'Task Three', description: 'Third hardcoded task', priority: 'Low', completed: false },
];

export default function TaskList({ tasks, onToggle }: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS;

  return (
    <div>
      {list.map((task) => (
        <TaskCard 
          key={task.id} 
          title={task.title} 
          description={task.description} 
          priority={task.priority}
          completed={task.completed}
          onToggle={() => onToggle?.(task.id)} 
        />
      ))}
    </div>
  );
}