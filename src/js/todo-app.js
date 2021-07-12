const todo = getSavedDataFrom('todo')

const filters = {
    filterByTitle: '',
    hideCompleted: false,
    sortBy: 'byEdited'
}

renderTodos(todo, filters)

document.querySelector('#filter-todo').addEventListener('input', (e) => {
    filters.filterByTitle = e.target.value
    renderTodos(todo, filters)
})

document.querySelector('#submit-todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const value = e.target.elements.newTodoInput.value.trim()
    if(value.length===0){return}
    const id = uuidv4()
    const dateOfCreation = dateNow()
    todo.push({
        id: id,
        title: value,
        completed: false,
        createdAt: dateOfCreation,
        updatedAt: dateOfCreation
    })
    saveDataIn('todo', todo)
    e.target.elements.newTodoInput.value = ''
    location.assign(`./edit.html#${id}`)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderTodos(todo, filters)
})

document.querySelector('#hide-todos').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todo, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todo') {
        const newData = JSON.parse(e.newValue)
        renderTodos(newData, filters)
    }
})