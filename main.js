const taskForm = document.getElementById('task-form')
const textInput = document.getElementById('text-input')
const taskList = document.getElementById('task-list')

window.addEventListener("beforeunload", () => {
   window.scrollTo(0, 0);
});

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
if(tasks) renderTasks()

taskForm.addEventListener('submit',  (e) => {
  e.preventDefault()
  return addTask(e)
})

function addTask(e) {
  const text = String(textInput.value).trim()
  textInput.value=''
  const id = Date.now()
  tasks.push({id:id, text: text, isCompleted: false})
  saveToLocalStorage();
  renderTasks()
}

function renderTasks() {
  taskList.innerHTML = ''
  if(!tasks)console.warn('No tasks to display')
  tasks.forEach( (task) => {
    let li = document.createElement('li')
    li.classList.add('list-item')
    li.setAttribute('data-id',task.id)
    li.innerHTML = `
      <p class="list-item-text">${task.text}</p>
      <button class="btn" data-id="${task.id}">Delete</button>
    `
    let textRender = li.getElementsByClassName('list-item-text')
    console.log(textRender)
    if(task.isCompleted) textRender[0].classList.add('completed')
    taskList.appendChild(li)

    // Adding event listener to list item for completion and deletion of the task
    li.addEventListener('click', (e)=> {
      const id = Number(e.target.getAttribute('data-id'))
      if(e.target.tagName === 'BUTTON'){
        e.stopPropagation()
        tasks = tasks.filter( (task) => task.id !== id)
        renderTasks()
        saveToLocalStorage()
      }else {
        task.isCompleted =!task.isCompleted
        saveToLocalStorage()
        if(task.isCompleted) {
           li.querySelector(".list-item-text").classList.add("completed");
        }else {
          li.querySelector(".list-item-text").classList.remove("completed");
        }
        }
    })
  })
}
function saveToLocalStorage() {
  localStorage.setItem('tasks',JSON.stringify(tasks))
}