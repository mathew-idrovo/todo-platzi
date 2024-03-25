import logo from './platzi.webp';
import './App.css';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { Todo } from './TodoItem';
import { TodoButton } from './TodoButtom';

function App() {
  return (
    <div className="App">
      <TodoCounter/>
      <TodoSearch/>

      <TodoList>
      <Todo/>
      <Todo/>
      <Todo/>
      </TodoList>

      <TodoButton/>

      
    </div>
  );
}

export default App;

