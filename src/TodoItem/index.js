import CompleteIcon from '../TodoIcon/CompleteIcon'
import DeleteIcon from '../TodoIcon/DeleteIcon'
import './Todo.css'

function Todo(props) {
  return (
    <li className='TodoItem'>
      
       <CompleteIcon
       completed={props.completed}
       onComplete={props.onComplete}
       
       />
       <DeleteIcon
         onDelete={ props.onDelete} 
         />
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>{props.text}</p>
      
    </li>
  )
}

export { Todo }
