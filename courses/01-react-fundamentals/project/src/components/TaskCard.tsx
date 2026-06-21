import { useState, useEffect } from 'react';

interface TaskCardProps {
  id?: number; 
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onUpdateTask?: (id: number, updates: { title: string; description: string; priority: 'Low' | 'Medium' | 'High' }) => void;
}

export default function TaskCard({ 
  id = 0, 
  title, description, priority, completed = false, 
  onToggle, onDelete, 
  isEditing, onEditStart, onEditCancel, onUpdateTask 
}: TaskCardProps) {
  
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const editing = isEditing !== undefined ? isEditing : isLocalEditing;

  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);

  useEffect(() => {
    if (editing) {
      setEditTitle(title);
      setEditDesc(description);
      setEditPriority(priority);
    }
  }, [editing, title, description, priority]);

  const handleEditClick = () => {
    setIsLocalEditing(true);
    if (onEditStart) onEditStart();
  };

  const handleCancelClick = () => {
    setIsLocalEditing(false);
    if (onEditCancel) onEditCancel();
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure?")) {
      if (onDelete) onDelete();
    }
  };

  const handleSave = () => {
    if (editTitle.trim() === '') return; 
    
    if (onUpdateTask) {
      onUpdateTask(id, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        priority: editPriority
      });
    }
    
    setIsLocalEditing(false);
    if (onEditCancel) onEditCancel();
  };

  if (editing) {
    return (
      <div className="task-card" data-completed={completed}>
        <input 
          type="text" 
          value={editTitle} 
          onChange={(e) => setEditTitle(e.target.value)} 
        />
        <textarea 
          value={editDesc} 
          onChange={(e) => setEditDesc(e.target.value)} 
        />
        <select 
          value={editPriority} 
          onChange={(e) => setEditPriority(e.target.value as 'Low' | 'Medium' | 'High')}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    );
  }

  return (
    <div 
      className="task-card" 
      data-completed={completed}
      style={{ textDecoration: completed ? 'line-through' : 'none' }} 
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      
      {onToggle && (
        <label>
          <input type="checkbox" checked={completed} onChange={onToggle} /> Complete
        </label>
      )}
      <button onClick={handleEditClick}>Edit</button>
      {onDelete && <button onClick={handleDeleteClick}>Delete</button>}
    </div>
  );
}