import { Task } from '@/types/task'
import { motion } from 'motion/react'
import React from 'react'
import { TaskItems } from './TaskItems'
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
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          layout
        >
          <TaskItems
            task={task}
            onEdit={() => (onEdit ? onEdit(task) : undefined)}
            onDelete={() => (onDelete ? onDelete(task.id) : undefined)}
          />
        </motion.div>
      ))}
    </div>
  )
}
