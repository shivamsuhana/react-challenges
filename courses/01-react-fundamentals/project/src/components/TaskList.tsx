import TaskCard from './TaskCard';


export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  category: string;
  tags: string[];
  dueDate?: string; 
}

interface TaskListProps {
  tasks: Task[];
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  totalTasksCount?: number;
  editingId?: number | null;
  setEditingId?: (id: number | null) => void;
  onUpdateTask?: (id: number, updates: { title: string; description: string; priority: 'Low' | 'Medium' | 'High'; category: string; tags: string[]; dueDate?: string }) => void;
}

export default function TaskList({ 
  tasks, onToggle, onDelete, totalTasksCount, 
  editingId, setEditingId, onUpdateTask 
}: TaskListProps) {
  const total = totalTasksCount !== undefined ? totalTasksCount : tasks.length;

  return (
    <div>
      <div id="task-count">
        Showing {tasks.length} of {total} tasks
      </div>

      <div id="task-list">
        {tasks.length === 0 ? (
          <div id="filter-empty-message">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              id={task.id}
              title={task.title} 
              description={task.description} 
              priority={task.priority}
              completed={task.completed} 
              category={task.category}
              tags={task.tags}
              dueDate={task.dueDate}
              onToggle={onToggle ? () => onToggle(task.id) : undefined} 
              onDelete={onDelete ? () => onDelete(task.id) : undefined}
              isEditing={editingId === task.id}
              onEditStart={setEditingId ? () => setEditingId(task.id) : undefined}
              onEditCancel={setEditingId ? () => setEditingId(null) : undefined}
              onUpdateTask={onUpdateTask} 
            />
          ))
        )}
      </div>
    </div>
  );
}