import './Button.css'

function TodoButton(){
    return(
      <button className='CreateTodoButton'
      onClick={(event)=> {console.log('click')
    console.log(event)
    console.log(event.target);
  }} >+</button>
      
    )
    }
    
    export {TodoButton}

