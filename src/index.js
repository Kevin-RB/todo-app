// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { getFilters, setFilters } from "./filters";
import { createTodo, getTodos, removeTodo, toggleTodo } from "./todos";
import { renderTodos } from "./views";

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#filter-todo').addEventListener('input', (e) => {
    setFilters({
        filterByTitle: e.target.value
    })
    renderTodos()
})
// Set up checkbox handler
document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderTodos()
})

document.querySelector('#hide-todos').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})
// Set up form submission handler
document.querySelector('#submit-todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const value = e.target.elements.newTodoInput.value.trim()
    const id = createTodo(value)
    e.target.elements.newTodoInput.value = ''
    location.assign(`./edit.html#${id}`)
})
// Bonus: Add a watcher for local storage