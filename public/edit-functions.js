const todoId = location.hash.substring(1)
const todo = getSavedDataFrom('todo')
const todoElement = todo.find((value) => value.id === todoId)
let timeAgo = document.querySelector('#time-ago')

window.addEventListener('DOMContentLoaded', () => {
    timeAgo.innerHTML = lastUpdated(todoElement)
})

let titleInput = document.querySelector('#title-input')
titleInput.value = todoElement.title

document.querySelector('#title-input').addEventListener('input', (e) => {
    todoElement.title = e.target.value
    todoElement.updatedAt = dateNow()
    saveDataIn('todo', todo)
    timeAgo.innerHTML = lastUpdated(todoElement)
})

document.querySelector('#remove-button').addEventListener('click',() => {
    removeTodoElement(todoId)
    saveDataIn('todo', todo)
    location.assign('./index.html')
})

const lastUpdated = (element) => {
    let now = DateTime.local()
    let lastUpdated = DateTime.fromISO(element.updatedAt)
    let diff = now.diff(lastUpdated, ['months', 'days', 'hours', 'minutes', 'seconds']).toObject()
    if (diff.months > 0) {
        return `last updated: ${diff.months} months - ${diff.days} days ago`
    } else if (diff.days > 0) {
        return `last updated: ${diff.days} days - ${diff.hours} hours ago`
    } else if (diff.hours > 0) {
        return `last updated ${diff.hours} hours ago`
    } else if (diff.minutes > 0) {
        return `last updated ${diff.minutes} minutes ago`
    } else {
        return `last updated just now`
    }
}

window.addEventListener('storage',(e) => {
    debugger
    if (e.key === 'todo') {
        const newData = JSON.parse(e.newValue)
        const newVal = newData.find( (element) => element.id === todoId )
        if (!newVal) {
            location.assign('./index.html')
        }
        saveDataIn(todo, 'todo')
        titleInput.value = newVal.title
        timeAgo.innerHTML = lastUpdated(newVal)
    }
})

