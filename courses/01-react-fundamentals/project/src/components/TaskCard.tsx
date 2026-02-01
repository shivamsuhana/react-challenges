interface TaskCardProps {
  title?: string
  description?: string
  priority?: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onUpdateTask?: (id: string | number, updates: Record<string, unknown>) => void
  editingId?: string | number | null
  linkToTaskDetail?: boolean
  taskId?: string | number
}

export default function TaskCard(_props: TaskCardProps) {
  return <article id="task-card" />
}
