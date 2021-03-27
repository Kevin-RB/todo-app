const todoList = document.querySelector('#todo-list')
const todosLeft = document.querySelector('#todos-left')

//Creates a luxon function that returns the date
const DateTime = luxon.DateTime;
const dateNow = () => DateTime.local()

//Fetch existing data from local storage
const getSavedDataFrom = (KeyName) => {
    const dataJSON = localStorage.getItem(`${KeyName}`)
    try {
        return dataJSON ? JSON.parse(dataJSON) : []
    } catch (error) {
        return []
    }
}
// Save data to localstorage
const saveDataIn = function (KeyName, data) {
    localStorage.setItem(`${KeyName}`, JSON.stringify(data))
}

//Renders the todolist to the DOM
const renderTodos = (list, filters) => {
    //Filters the array by the "hide completed" filter and checks if the element contains the word we are looking for
    const sortedList = sortListBy(list, filters.sortBy)
    const filteredList = sortedList.filter((value) => {
        return filters.hideCompleted && value.completed ? false : value.title.toLowerCase().includes(filters.filterByTitle.toLowerCase())
    })
    //Filters the previous array and returns the elements that are not completed
    const incompleteTodos = filteredList.filter((value) => !value.completed)

    //Clears the List div so that there won't be duplicate data
    todoList.innerHTML = ''
    todosLeft.innerHTML = ''
    //Apends the a title to the list that has the number of incompleted todos on it
    todosLeft.appendChild(incompleteTodosTitle(incompleteTodos))
    //Generate all of the list elements and shows them on screen
    filteredList.forEach((value) => {
        todoList.appendChild(generateTodoDom(value))
    })
}

//Sorts the list by the selected filter and returns a new list
const sortListBy = (list, filter) => {
    if (filter === 'byEdited') {
        return list.sort((a, b) => {
            const firstElement = DateTime.fromISO(a.updatedAt).valueOf()
            const secondElement = DateTime.fromISO(b.updatedAt).valueOf()
            if (firstElement > secondElement) {
                return -1
            } else if (firstElement < secondElement) {
                return 1
            } else {
                return 0
            }
        })
    } else if (filter === 'byCreated') {
        return list.sort((a, b) => {
            const firstElement = DateTime.fromISO(a.createdAt).valueOf()
            const secondElement = DateTime.fromISO(b.createdAt).valueOf()
            if (firstElement > secondElement) {
                return -1
            } else if (firstElement < secondElement) {
                return 1
            } else {
                return 0
            }
        })
    } else if (filter === 'alphabetical') {
        return list.sort((a, b) => {
            const firstElement = a.title.toLowerCase()
            const secondElement = b.title.toLowerCase()
            if (firstElement > secondElement) {
                return 1
            } else if (firstElement < secondElement) {
                return -1
            } else {
                return 0
            }
        })
    }
}

//Returns an H2 element with the numbers of todos left
const incompleteTodosTitle = (list) => {
    const todosLeft = document.createElement('h2')
    todosLeft.textContent = `You have ${list.length} todos left`
    return todosLeft
}

//Returns a P element with the name of a todo element on a list
const generateTodoDom = (value) => {
    //Create nesesary elements for a todo element
    const container = document.createElement('div')
    const containerTodo = document.createElement('label')
    const containerButton = document.createElement('div')
    const checkBox = document.createElement('input')
    const newElement = document.createElement('a')
    const removeButton = document.createElement('div')

    containerButton.className = 'h-full px-3 bg-red-500 flex items-center rounded-r-md hover:bg-red-400 cursor-pointer'
    containerTodo.className = 'h-full w-full cursor-pointer flex items-center pl-2 text-blue-500 font-semibold'
    newElement.className = 'hover:text-indigo-700 cursor-default' 
    container.className = 'flex items-center justify-between h-9 bg-gray-100 rounded-md hover:bg-gray-200'
    checkBox.className = 'mr-4 h-5 w-5 text-green-400 border-0 focus:ring-0 rounded-md focus:ring-offset-0'


    //apends the inner divs to the main Todo container
    container.appendChild(containerTodo)
    container.appendChild(containerButton)


    //Setup todo checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = value.completed
    containerTodo.appendChild(checkBox)
    checkBox.addEventListener('change', () => {
        toggleTodos(value.id)
        saveDataIn('todo', todo)
        renderTodos(todo, filters)
    })

    //Checks if the element contains a title and adds it to the span element, if not, adds a default text
    value.title.length > 0 ? newElement.textContent = value.title : newElement.textContent = 'Unnamed todo'

    newElement.setAttribute('href', `./edit.html#${value.id}`)
    containerTodo.appendChild(newElement)

    //Setup remove button `🗑`
    const removeIcon = document.createElement('i')
    removeIcon.className = 'fas fa-trash text-white'
    removeButton.appendChild(removeIcon)

    containerButton.addEventListener('click', () => {
        removeTodoElement(value.id) |
            saveDataIn('todo', todo)
        renderTodos(todo, filters)
    })
    containerButton.appendChild(removeButton)

    return container
}

//Function that removes a Todo element when clicked on it's button
const removeTodoElement = (id) => {

    let index = todo.findIndex((value) => value.id === id)
    index !== -1 ? todo.splice(index, 1) : console.log('Error (no se pudo encontrar el id de este elemento)')
}
//Function that checks if the checkbox has been toggled
const toggleTodos = (id) => {
    const todoElement = todo.find((value) => value.id === id)
    todoElement ? todoElement.completed = !todoElement.completed : console.log(`status: ${todoElement.completed}`)
}