import { Task } from '@/types/task'
import { AnimatePresence, motion } from 'motion/react'

import { TaskItems } from './TaskItems'
interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 border border-dashed rounded-xl bg-navy-400/30 border-navy-300 text-white/70"
      >
        <p>No hay tareas. ¡Crea una para comenzar!</p>
      </motion.div>
    )
  }
  return (
    <AnimatePresence mode="popLayout">
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
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}
