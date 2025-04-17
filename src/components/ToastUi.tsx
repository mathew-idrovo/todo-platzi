import { CheckCircle, Edit, Trash, PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ToastUiProps {
  title: string
  description: string
  action: 'create' | 'update' | 'delete'
}

export function ToastUi({ title, description, action }: ToastUiProps) {
  // Determinar el icono y color basado en la acción
  const getIcon = () => {
    switch (action) {
      case 'create':
        return <PlusCircle className="h-5 w-5 text-green-500" />
      case 'update':
        return <Edit className="h-5 w-5 text-blue-500" />
      case 'delete':
        return <Trash className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getColor = () => {
    switch (action) {
      case 'create':
        return 'bg-green-500/10 border-green-500/20'
      case 'update':
        return 'bg-blue-500/10 border-blue-500/20'
      case 'delete':
        return 'bg-red-500/10 border-red-500/20'
      default:
        return 'bg-green-500/10 border-green-500/20'
    }
  }

  return (
    <motion.div
      className={`rounded-lg p-3 ${getColor()} border flex items-start gap-3 bg-[var9]`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <motion.div
        initial={{ rotate: 45, scale: 0.5 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {getIcon()}
      </motion.div>
      <div>
        <h4 className="font-medium text-white mb-1">{title}</h4>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </motion.div>
  )
}
