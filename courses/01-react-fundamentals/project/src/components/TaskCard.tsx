


interface TaskCardProps {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed?: boolean;
  onToggle?: () => void;
}

export default function TaskCard({ title, description, priority, completed = false, onToggle }: TaskCardProps) {
  const textStyle = { textDecoration: completed ? 'line-through' : 'none' };

  return (
    <div data-completed={completed} className="task-card">
      
      <div style={textStyle}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Priority: {priority}</p>
      </div>
      
      {onToggle && (
        <label>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={onToggle} 
          />
          Complete
        </label>
      )}

    </div>
  );
}