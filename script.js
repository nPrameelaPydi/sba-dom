//console.log(`SBA - dom manipulation`);

//caching elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('#taskList');
//const addTaskBtn = document.getElementById('addTask');

//creating list items
const listItem = document.createElement('li');

function addTask() {
    event.preventDefault();
    //read and cache the input element
    const taskInputValue = taskInput.value;

    //create li item and add the taskInputValue to it
    const newLi = document.createElement('li');
    newLi.textContent = taskInputValue;

    //append to ul
    taskList.appendChild(newLi);

    //clear input value
    taskInput.value = '';
    //focus input element
    taskInput.focus();
}


taskForm.addEventListener('submit', addTask);

