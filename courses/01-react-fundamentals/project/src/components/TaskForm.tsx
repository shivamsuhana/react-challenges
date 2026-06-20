import { useState, FormEvent } from 'react';
import { Task } from './TaskList';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 

   
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }

   
    const newTask: Task = {
      id: Date.now(), 
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      completed: false,
    };

   
    onAddTask(newTask);

   
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} id="task-form">
   
      {error && <div id="task-form-error">{error}</div>}
      
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      
      <button type="submit">Add Task</button>
    </form>
  );
}