import React from 'react'
import './Counter.css'

function TodoCounter({ completedTodos, totalTodos }) {
  return (
    <h1 className="TodoCounter">
      Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span>{' '}
      todo
    </h1>
  )
}

export { TodoCounter }
