//console.log(`SBA - dom manipulation`);

//caching elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('#taskList');
//const addTaskBtn = document.getElementById('addTask');

function addTask() {
    event.preventDefault();

    // Validating input
    if (!taskInput.value.trim()) {
        alert('Task cannot be empty');
        return;
    }
    //read and cache the input element
    //create li item and add the taskInputValue to it
    const taskInputValue = taskInput.value;
    const newLi = document.createElement('li');
    newLi.textContent = taskInputValue;

    //complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completed';
    completeBtn.addEventListener('click', () => {
        newLi.classList.toggle('completed');
        completeBtn.textContent = newLi.classList.contains('completed') ? 'Add Again' : 'Completed'
    })

    newLi.appendChild(completeBtn);

    //using document fragment for performance optimization
    const fragment = document.createDocumentFragment();
    fragment.appendChild(newLi);
    taskList.appendChild(fragment);

    //clear input value
    taskInput.value = '';
    //focus input element
    taskInput.focus();
}

taskForm.addEventListener('submit', addTask);

//html attribute validation
taskInput.addEventListener('input', () => {
    if (taskInput.value.length < 3) {
        taskInput.setCustomValidity('Task must be at least 3 characters long.');
    } else {
        taskInput.setCustomValidity('');
    }
})

//regex.test(string);
taskInput.addEventListener('input', () => {
    if (/^[^a-zA-Z0-9]/.test(taskInput.value.trim())) {
        taskInput.setCustomValidity('Task must not start with special characters.');
    } else {
        taskInput.setCustomValidity('');
    }
})

//clear completed tasks
const clearBtn = window.document.createElement('button');
clearBtn.textContent = 'Clear Completed Tasks';
clearBtn.onclick = () => {
    const completedTasks = taskList.querySelectorAll('.completed');
    completedTasks.forEach(task => taskList.removeChild(task));
}
taskForm.appendChild(clearBtn);
clearBtn.style.marginLeft = '10px';

//BOM properties
//once the page and all resources are loaded, the heading text will change to "Welcome to Your To-Do List!"
window.onload = function () {
    const heading = document.querySelector('h4');
    heading.textContent = 'Welcome to Your To-Do List!';
};

//to get the URL of the previous page that linked to this app. (This can be useful for analytics or customizing the user experience)
const referrer = window.document.referrer;
if (referrer) {
    console.log(`User came from: ${referrer}`);
}



//road blocker: trail to remove line-trhu on undo button
//if (isCompleted) {
//    newLi.style.textDecoration = 'line-through';
//    newLi.style.color = 'gray';
//    completeBtn.textContent = 'Undo';
//} else {
//    newLi.style.textDecoration = 'none';
//    newLi.style.color = '';
//    completeBtn.textContent = 'Complete';
//}

////append to ul
//taskList.appendChild(newLi);
//creating list items
//const listItem = document.createElement('li');
