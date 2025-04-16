import { Task } from '@/types/task'
import { AnimatePresence, motion } from 'motion/react'

import { TaskItems } from './TaskItems'
import { useRef } from 'react'
interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskListProps) => {
  const emptyStateRef = useRef<HTMLDivElement>(null)
  if (tasks.length === 0) {
    return (
      <motion.div
        ref={emptyStateRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 border border-dashed rounded-xl bg-navy-400/30 border-navy-300 text-white/70"
      >
        <p>No hay tareas. ¡Crea una para comenzar!</p>
      </motion.div>
    )
  } // Ordenar tareas: primero las no completadas, luego las completadas
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      // Si ambas tienen el mismo estado de completado, ordenar por fecha de creación (más reciente primero)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    // Las no completadas van primero
    return a.completed ? 1 : -1
  })
  return (
    <AnimatePresence mode="popLayout">
      <div>
        {sortedTasks.map((task, index) => (
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
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
              onToggleComplete={() => onToggleComplete(task.id)}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}
