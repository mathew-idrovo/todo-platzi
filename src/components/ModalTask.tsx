import { Task } from '@/types/task'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { MotionText } from './MotionText'
import { AnimatePresence, motion } from 'motion/react'
import { Textarea } from './ui/textarea'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: Task) => void
  task: Task | null
}

export function ModalTask({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState({ title: false })
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title)
        setDescription(task.description)
        setDeadline(
          task.deadline
            ? new Date(task.deadline).toISOString().split('T')[0]
            : ''
        )
        setCompleted(task.completed)
      } else {
        setTitle('')
        setDescription('')
        setDeadline('')
        setCompleted(false)
      }
      setErrors({ title: false })
    }
  }, [isOpen, task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setErrors({ title: true })
      return
    }

    const newTask: Task = {
      id: task?.id || uuidv4(),
      title,
      description,
      deadline: deadline ? new Date(deadline).toISOString() : '',
      createdAt: task?.createdAt || new Date().toISOString(),
      completed,
    }
    onSave(newTask)
  }
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        ref={modalRef}
        className="sm:max-w-[425px] bg-[var(--navy-500)] border-[var(--navy-500)] text-white"
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            <MotionText
              text={task ? 'Editar Tarea' : 'Crear Nueva Tarea'}
              animation="bounce"
              tag="h1"
            />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <AnimatePresence mode="wait">
            <div className="space-y-2">
              <Label htmlFor="title" className="required text-right">
                Titulo
              </Label>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    if (e.target.value.trim()) {
                      setErrors({ ...errors, title: false })
                    }
                  }}
                  placeholder="Título de la tarea"
                  className={`bg-[var(--navy-400)] border-[var(--navy-300)] text-white placeholder:text-white/50 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                />
              </motion.div>
              {errors.title && (
                <motion.p
                  className="text-sm text-red-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  El título es obligatorio
                </motion.p>
              )}
            </div>
          </AnimatePresence>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-right">
              Descripcion
            </Label>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción de la tarea"
                rows={3}
                className="bg-[var(--navy-400)]  border-[var(--navy-300)] text-white placeholder:text-white/50"
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-white">
              Fecha límite (opcional)
            </Label>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-[var(--navy-400)]  border-[var(--navy-300)]  text-white"
              />
            </motion.div>
          </div>

          <DialogFooter className="pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-[var(--navy-300)] text-white hover:bg-[var(--navy-400)]"
              >
                Cancelar
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="bg-[var(--navy-400)] hover:b g-[var(--navy-300)] text-white"
              >
                Guardar
              </Button>
            </motion.div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
