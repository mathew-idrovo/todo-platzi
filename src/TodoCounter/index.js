import React from 'react'
import './Counter.css'
import { TodoContext } from '../TodoContext'

function TodoCounter(){ 
    const {
        completedTodos,
        totalTodos,
    } = React.useContext(TodoContext)
    return(
        <h1 className='TodoCounter'>
            Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> todo 
        </h1>
    )
    }

export {TodoCounter}