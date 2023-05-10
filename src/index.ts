/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import confetti from 'canvas-confetti';
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

console.log(uuidv4());

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector("#new-task-title") as HTMLInputElement | null;

const tasks: Task[] = loadTasks()
tasks.forEach(AddListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if(!input?.value) return

  const task: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(task)
  saveTasks()
  AddListItem(task)
  
  //clear the text after value is added to list
  input.value = ""
})

function AddListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  // save data in browser's local storage
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if(!taskJSON) {
    return []
  }
  return JSON.parse(taskJSON)
}

