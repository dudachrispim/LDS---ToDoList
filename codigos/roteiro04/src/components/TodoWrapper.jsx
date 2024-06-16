import React, { useState } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { v4 as uuidv4 } from "uuid";
export const TodoWrapper = () => {
const [todos, setTodos] = useState([]);
const addTodo = (todo) => {
setTodos([
...todos,
{ id: uuidv4(), description: todo, completed: false },
]);
}
const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

//Ver se precisa disso aqui ou não (no último passo do reteiro 3 não tem)
const toggleComplete = id => {
const newTodos = todos.map(todo => todo.id === id ? {...todo, completed:
!todo.completed} : todo);
setTodos(newTodos);
localStorage.setItem('todos', JSON.stringify(newTodos));
}
// Fim disso

const editTodo = (id) => {
setTodos(
todos.map((todo) =>
todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
)
);
}
return (
<div className='TodoWrapper'>
<h1>Lista de Tarefas</h1>
<TodoForm addTodo={addTodo}/>
{todos.map((todo) =>
<TodoList
key={todo.id}
task={todo}
deleteTodo={deleteTodo}
toggleComplete={toggleComplete} //Ver se precisa disso aqui ou não (no último passo do reteiro 3 não tem)
editTodo={editTodo}
/>
)
}
</div>
);
}