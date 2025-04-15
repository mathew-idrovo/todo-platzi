import { Task } from '@/types/task'
import { motion } from 'motion/react'
import { Button } from './ui/button'
interface TaskItemsProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
}
export const TaskItems = ({ task, onEdit, onDelete }: TaskItemsProps) => {
  const cardVariants = {
    initial: { scale: 0.96, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  }

  return (
    <motion.div
      className="mb-4"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      <div className="bg-blue-300 rounded-xl overflow-hidden border border-amber-300">
        {task.title}
        {task.description}
      </div>
      <Button onClick={onEdit}>
        <span className="text-sm">Editar</span>
      </Button>
      <Button onClick={onDelete}>
        <span className="text-sm">Eliminar</span>
      </Button>
    </motion.div>
  )
}
