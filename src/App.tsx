import { motion } from 'motion/react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
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
        <Button variant="default" size="lg" className="bg-blue-500">
          Nueva tarea
        </Button>
      </motion.main>
    </>
  )
}

export default App
