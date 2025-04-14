import { motion } from 'motion/react'
import './App.css'
import { Button } from './components/ui/button'
import { ModalTask } from './components/ModalTask'
import { useState } from 'react'
import { Task } from './types/task'
import { useLocalStorage } from './hooks/useLocalStorage'
import { TaskList } from './components/TaskList'

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openCreateModal = () => {
    setCurrentTask(null)
    setIsModalOpen(true)
  }
  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }
  return (
    <>
      {' '}
      <motion.header animate={{ rotate: 360 }}>
        <div>
          <h1 className="text-2xl">taskify</h1>
          <h1>Gestiona tus tareas diarias de forma sencilla y rápida.</h1>
        </div>
      </motion.header>
      <motion.main>
        <Button
          variant="default"
          size="lg"
          className="bg-blue-500"
          onClick={openCreateModal}
        >
          Nueva tarea
        </Button>
        <TaskList tasks={tasks} />
        <ModalTask
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(task) => {
            addTask(task)
            setIsModalOpen(false)
          }}
          task={currentTask}
        />
      </motion.main>
    </>
  )
}

export default App
