


interface TaskCardProps {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({ title, description, priority, completed = false, onToggle, onDelete }: TaskCardProps) {
  const textStyle = { textDecoration: completed ? 'line-through' : 'none' };
  const handleDeleteClick = () => {
    if (window.confirm("Are you sure?")) {
      if (onDelete) onDelete();
    }
  };

  return (
    <div style={textStyle} data-completed={completed} className="task-card">
      
      <div >
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

      {onDelete && (
        <button onClick={handleDeleteClick}>Delete</button>
      )}

    </div>
  );
}