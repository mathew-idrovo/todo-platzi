import { Task } from '@/types/task'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { CalendarClock, CheckCircle, Circle, Edit, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
interface TaskItemsProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onToggleComplete: () => void
  index: number
}
export const TaskItems = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  index,
}: TaskItemsProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const isOverdue =
    task.deadline && new Date(task.deadline) < new Date() && !task.completed

  const formattedDeadline = task.deadline
    ? formatDistanceToNow(new Date(task.deadline), { addSuffix: true })
    : null

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
      ref={cardRef}
      className="mb-4"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`bg-[var(--navy-400)] rounded-xl overflow-hidden border border-[var(--navy-300)] shadow-md transition-all 
           ${task.completed ? 'bg-opacity-70' : ''}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleComplete()
                      }}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {task.completed
                        ? 'Marcar como pendiente'
                        : 'Marcar como completada'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <motion.h3
                className={`text-lg font-semibold text-white ${
                  task.completed ? 'line-through text-white/70' : ''
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {task.title}
              </motion.h3>
            </div>
            {isOverdue && (
              <motion.span
                className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-300 rounded-full"
                variants={textVariants}
                initial="initial"
                animate="animate"
              >
                vencida
              </motion.span>
            )}
            {task.completed && !isOverdue && (
              <motion.span
                className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full"
                variants={textVariants}
                initial="initial"
                animate="animate"
              >
                Completada
              </motion.span>
            )}
          </div>
          <motion.p
            className={`text-white/70 text-sm mb-4 ${
              task.completed ? 'text-white/50' : ''
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
          >
            {task.description}
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-2">
            <div className="min-h-[20px]">
              {formattedDeadline && (
                <motion.div
                  className="flex items-center text-xs text-white/60"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <CalendarClock className="h-3.5 w-3.5 mr-1" />
                  <span>Vence {formattedDeadline}</span>
                </motion.div>
              )}
            </div>

            <motion.div
              className="flex space-x-2 w-full sm:w-auto justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isHovered
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.7, scale: 0.95 }
              }
              transition={{ duration: 0.2 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-navy-300 hover:bg-navy-200 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit()
                      }}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs">Editar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar esta tarea</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-500/30 hover:bg-red-500/50 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs">Eliminar</span>
                    </Button>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
