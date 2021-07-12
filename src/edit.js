import { DateTime } from "luxon";
import { getTodos, updateTodo } from "./todos";

const hashId = location.hash.substring(1)
const todos = getTodos()
const todo = todos.find((value) => value.id === hashId)
const timeAgo = document.querySelector('#time-ago')

window.addEventListener('DOMContentLoaded', () => {
    timeAgo.innerHTML = lastUpdated(todo)
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

let titleInput = document.querySelector('#title-input')
titleInput.value = todo.title

document.querySelector('#title-input').addEventListener('input', (e) => {
    updateTodo({
        id: todo.id,
        title: e.target.value
    })
    timeAgo.innerHTML = lastUpdated(todo)
})