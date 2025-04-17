import { useTaskContext } from '@/context/TodoContext'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export const TaskStats = () => {
  const { tasks } = useTaskContext()
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const overdueTasks = tasks.filter(
    (task) =>
      task.deadline && new Date(task.deadline) < new Date() && !task.completed
  ).length

  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <motion.div
      className="bg-[var(--navy-400)] rounded-xl p-4 mb-6 border border-navy-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-white text-lg font-medium mb-3">Resumen de Tareas</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-white">
          <Circle className="h-5 w-5 text-white/70" />
          <span className="text-sm">
            Pendientes: <strong>{pendingTasks}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-white">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <span className="text-sm">
            Completadas: <strong>{completedTasks}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-white">
          <Clock className="h-5 w-5 text-red-400" />
          <span className="text-sm">
            Vencidas: <strong>{overdueTasks}</strong>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-white/70 mb-1">
          <span>Progreso</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-navy-300/30 rounded-full h-2.5">
          <motion.div
            className="bg-green-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
