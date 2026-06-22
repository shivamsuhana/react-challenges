import { useState, useEffect } from 'react';

interface TaskCardProps {
  id?: number; 
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed?: boolean;
  category?: string;
  tags?: string[];
  dueDate?: string;
  onToggle?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  onEditStart?: () => void;
  onEditCancel?: () => void;
  onUpdateTask?: (id: number, updates: { title: string; description: string; priority: 'Low' | 'Medium' | 'High'; category: string; tags: string[]; dueDate?: string }) => void;
}

export default function TaskCard({ 
  id = 0, title, description, priority, completed = false, 
  category = 'General', tags = [], dueDate,
  onToggle, onDelete, isEditing, onEditStart, onEditCancel, onUpdateTask 
}: TaskCardProps) {
  
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const editing = isEditing !== undefined ? isEditing : isLocalEditing;

  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);
  const [editCategory, setEditCategory] = useState(category);
  const [editTags, setEditTags] = useState(tags.join(', '));
  const [editDueDate, setEditDueDate] = useState(dueDate || '');

  useEffect(() => {
    if (editing) {
      setEditTitle(title);
      setEditDesc(description);
      setEditPriority(priority);
      setEditCategory(category);
      setEditTags(tags.join(', '));
      setEditDueDate(dueDate || '');
    }
  }, [editing, title, description, priority, category, tags, dueDate]);

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
    
    const parsedTags = editTags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    if (onUpdateTask) {
      onUpdateTask(id, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        priority: editPriority,
        category: editCategory.trim() || 'General',
        tags: parsedTags,
        dueDate: editDueDate || undefined
      });
    }
    
    setIsLocalEditing(false);
    if (onEditCancel) onEditCancel();
  };

  let isOverdue = false;
  let isDueToday = false;
  let isDueSoon = false;
  let formattedDate = '';

  if (dueDate) {
    const [y, m, d] = dueDate.split('-');
    const taskDate = new Date(Number(y), Number(m) - 1, Number(d));
    taskDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    formattedDate = taskDate.toLocaleDateString();
    
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (!completed) {
      if (diffDays < 0) isOverdue = true;
      else if (diffDays === 0) isDueToday = true;
      else if (diffDays > 0 && diffDays <= 3) isDueSoon = true;
    }
  }

  if (editing) {
    return (
      <div className="task-card" data-completed={completed}>
        <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value as 'Low' | 'Medium' | 'High')}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
        <input type="text" value={editTags} onChange={(e) => setEditTags(e.target.value)} placeholder="tags" />
        <input type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    );
  }

  return (
    <div 
      className="task-card" 
      data-completed={completed} 
      data-overdue={isOverdue}
      style={{ 
        textDecoration: completed ? 'line-through' : 'none',
        border: isOverdue ? '2px solid red' : '1px solid #ccc'
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Priority: {priority}</p>
      
      {dueDate && (
        <div id="task-due-date">
          Due: {formattedDate}
          {isOverdue && <span style={{ color: 'red', marginLeft: '10px' }}>Overdue</span>}
          {isDueToday && <span style={{ color: 'orange', marginLeft: '10px' }}>Due Today</span>}
          {isDueSoon && <span style={{ color: 'blue', marginLeft: '10px' }}>Due Soon</span>}
        </div>
      )}

      <div id="task-category">Category: {category}</div>
      <div id="task-tags">
        {tags.map((tag, idx) => (
          <span key={idx} data-tag={tag} className="tag-badge" style={{ marginRight: '5px', padding: '2px 6px', background: '#eee', borderRadius: '4px' }}>
            {tag}
          </span>
        ))}
      </div>
      
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