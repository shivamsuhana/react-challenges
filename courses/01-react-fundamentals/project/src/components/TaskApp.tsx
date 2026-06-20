

import { useEffect } from 'react';
import TaskList, { Task } from './TaskList';
import TaskForm from './TaskForm'; 

interface TaskAppProps {
  tasks?: Task[];
  setTasks?: (tasks: Task[]) => void;
  showForm?: boolean;
  countFormat?: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'First Task', description: 'Desc 1', priority: 'High', completed: false },
  { id: 2, title: 'Second Task', description: 'Desc 2', priority: 'Medium', completed: false },
  { id: 3, title: 'Third Task', description: 'Desc 3', priority: 'Low', completed: false },
  { id: 4, title: 'Fourth Task', description: 'Desc 4', priority: 'High', completed: false },
  { id: 5, title: 'Fifth Task', description: 'Desc 5', priority: 'Medium', completed: false },
];

export default function TaskApp({ tasks = [], setTasks, showForm }: TaskAppProps) {
  
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

  const countText = `${tasks.length} Tasks`;

  return (
    <div>
      <div id="task-count">{countText}</div>
      {showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList tasks={tasks} />
    </div>
  );
}