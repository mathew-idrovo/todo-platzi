import { motion } from 'motion/react'
import './App.css'
import { Button } from './components/ui/button'
import { ModalTask } from './components/ModalTask'
import { useState } from 'react'
import { Task } from './types/task'
import { useLocalStorage } from './hooks/useLocalStorage'
import { TaskList } from './components/TaskList'
import { PlusCircle } from 'lucide-react'
import { SearchBar } from './components/SearchBar'

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const openCreateModal = () => {
    setCurrentTask(null)
    setIsModalOpen(true)
  }
  const openEditModal = (task: Task) => {
    setCurrentTask(task)
    setIsModalOpen(true)
  }
  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  }
  return (
    <>
      <div className="min-h-screen bg-[#151A3D] flex justify-center">
        <div className="w-full max-w-3xl px-6 py-10">
          <div className="flex flex-col space-y-8">
            <motion.header className="text-center mb-8">
              <motion.h1
                className="text-5xl font-bold text-white mb-2"
                initial="hidden"
                animate="visible"
                variants={textAnimation}
                custom={0}
              >
                Taskify
              </motion.h1>

              <motion.p
                className="text-white/80"
                initial="hidden"
                animate="visible"
                variants={textAnimation}
                custom={1}
              >
                Gestiona tus tareas diarias de forma eficiente
              </motion.p>
            </motion.header>

            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Buscar por título de tarea..."
              />
              <Button
                className="w-full md:w-auto bg-[#3B4374] hover:bg-[#4A5283] text-white"
                onClick={openCreateModal}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Tarea
              </Button>
            </motion.div>

            <motion.div
              key={filteredTasks.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TaskList
                tasks={filteredTasks}
                onEdit={openEditModal}
                onDelete={deleteTask}
              />
              <ModalTask
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(task) => {
                  if (currentTask) {
                    setTasks(
                      tasks.map((t) => (t.id === currentTask.id ? task : t))
                    )
                  } else {
                    addTask(task)
                  }
                  setIsModalOpen(false)
                }}
                task={currentTask}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
