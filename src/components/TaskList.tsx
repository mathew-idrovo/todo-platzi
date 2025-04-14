import { Task } from '@/types/task'
import React from 'react'
interface TaskListProps {
  tasks: Task[]
  onEdit?: (task: Task) => void
  onDelete?: (id: string) => void
}

export const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p>No hay tareas ,!Crea una para comenza</p>
  }
  return (
    <div>
      {tasks.map((task: any) => (
        <div key={task.id} className="task">
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.deadline}</p>
          <button onClick={() => onEdit && onEdit(task)}>Editar</button>
          <button onClick={() => onDelete && onDelete(task.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  )
}
