import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";

// Setup the empty todos array
let todos = []
// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {
    const dataJSON = localStorage.getItem(`todo`)
    try {
        return dataJSON ? JSON.parse(dataJSON) : []
    } catch (error) {
        return []
    }
}
// saveTodos
// Arguments: none
// Return value: none
const saveTodos = function () {
    localStorage.setItem(`todo`, JSON.stringify(todos))
}
// getTodos
// Arguments: none
// Return value: todos array
todos = loadTodos()
const getTodos = () => todos
// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (title) => {
    const id = uuidv4()
    const dateOfCreation = DateTime.now()
    todos.push({
        id,
        title,
        completed: false,
        createdAt: dateOfCreation,
        updatedAt: dateOfCreation
    })
    saveTodos()
    return id
}
// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (id) => {
    let index = todos.findIndex((value) => value.id === id)
    if (index !== -1) {
        todos.splice(index, 1)
        saveTodos()
    } else { console.log('Error (no se pudo encontrar el id de este elemento)') }
}
// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (id) => {
    const todoElement = todos.find((value) => value.id === id)
    if (todoElement) {
        todoElement.completed = !todoElement.completed
        saveTodos()
    } else { console.log(`status: ${todoElement.completed}`) }
}


// updateTodo
// Arguments: id of todo to update
// Return value: none
const updateTodo = (updates) =>{
    const todo = todos.find((value) => value.id === updates.id)
    todo.title = updates.title
    todo.updatedAt = DateTime.now()
    saveTodos()
}

// Make sure to call loadTodos and setup the exports

export {getTodos, createTodo, removeTodo, toggleTodo, updateTodo }