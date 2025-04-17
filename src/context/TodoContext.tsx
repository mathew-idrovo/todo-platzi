import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Task } from '@/types/task'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import React, { createContext, useContext, useState } from 'react'
import { ToastUi } from '@/components/ToastUi'

interface TaskContestType {
  tasks: Task[]
  currentTask: Task | null
  filteredTasks: Task[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void
  isModalOpen: boolean
  openCreateModal: () => void
  openEditModal: (task: Task) => void
  closeModal: () => void
  deleteTask: (id: string) => void
  updateTask: (task: Task) => void
  toggleTaskComplete: (id: string) => void
}
const TaskContext = createContext<TaskContestType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      id: uuidv4(),
      ...task,
      createdAt: new Date().toISOString(),
      completed: false,
    }
    setTasks([...tasks, newTask])
    toast(
      <ToastUi
        title="Tarea creada"
        description="La tarea ha sido creada exitosamente"
        action="create"
      />
    )
  }
  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
  }
  const openCreateModal = () => {
    setCurrentTask(null)
    setIsModalOpen(true)
  }
  const openEditModal = (task: Task) => {
    setCurrentTask(task)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTask(null)
  }
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  const toggleTaskComplete = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed
          toast(
            <ToastUi
              title={completed ? 'Tarea completada' : 'Tarea pendiente'}
              description={
                completed
                  ? '¡Felicidades! Has completado la tarea'
                  : 'La tarea ha sido marcada como pendiente'
              }
              action={completed ? 'create' : 'update'}
            />
          )
          return { ...task, completed }
        }
        return task
      })
    )
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        searchQuery,
        currentTask,
        setSearchQuery,
        addTask,
        isModalOpen,
        openCreateModal,
        openEditModal,
        deleteTask,
        closeModal,
        updateTask,
        toggleTaskComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
