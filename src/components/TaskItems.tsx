import { Task } from '@/types/task'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Edit, Trash2 } from 'lucide-react'
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
  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  }

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
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
      <div className="bg-[var(--navy-400)] rounded-xl overflow-hidden border border-[var(--navy-300)]">
        <div className="p-10">
          <div className="flex justify-between items-start mb-16">
            <motion.h3
              className="text-lg font-semibold text-white"
              variants={textVariants}
              custom={0}
            >
              {task.title}
            </motion.h3>
          </div>
          <motion.p
            className="text-white/70 text-sm mb-4"
            variants={textVariants}
            custom={2}
          >
            {task.description}
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-2">
            <div className="min-h-[2.0rem]"></div>
            <motion.div
              className="flex space-x-2 w-full sm:w-auto justify-end"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-[var(--navy-300)] hover:bg-[var(--navy-200)] text-white"
                onClick={onEdit}
              >
                <Edit className="mr-1.5 h-3.5 w-2.5" />
                <span className="text-xs">Editar</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-[var(--navy-300)] hover:bg-[var(--navy-200)] text-white"
                onClick={onDelete}
              >
                <Trash2 className="mr-1.5 h-3.5 w-2.5" />
                <span className="text-xs">Eliminar</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
