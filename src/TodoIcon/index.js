import React from 'react'
import {ReactComponent as Checksvg} from './check.svg'
import {ReactComponent as Deletesvg} from './delete.svg'
import  './TodoIcon.css'

const iconType={
    "check":(color)=><Checksvg  className='Icon-svg' fill={color} />,
    "delete":(color)=><Deletesvg className='Icon-svg'fill={color}/>
}
function TodoIcon({type,color, onClick}) {
  return (
   <span className={`Icon-container Icon-container-${type}`}
   onClick={onClick}
   >

    {iconType[type](color)}

   </span>
  )
}

export default TodoIcon