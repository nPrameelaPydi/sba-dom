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
    completeBtn.textContent = 'Done';
    completeBtn.addEventListener('click', () => {
        newLi.classList.toggle('completed');
        completeBtn.textContent = newLi.classList.contains('completed') ? 'Undo' : 'Done'
        saveTasks(); //Save tasks to local storage whenever a task is completed or undone

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
    saveTasks();// save tasks to local storage after adding a new task

}

//localStorage.setItem('username', 'JohnDoe');
//const username = localStorage.getItem('username'); // 'JohnDoe'

//JSON.parse() is a JavaScript method used to convert a JSON string into a JavaScript object or value. It takes a string that is formatted as JSON and parses it, creating an equivalent JavaScript object or array.

//const jsonString = '{"name": "Alice", "age": 30}';
//const userObject = JSON.parse(jsonString);
//console.log(userObject.name); // Output: "Alice"

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // saving tasks as a JSON string
    //JSON.stringify(tasks): This method converts a JavaScript object or array into a JSON string. It is necessary because localStorage can only store strings.
}

// Load tasks from localStorage
function loadTasks() {
    const tasksObj = localStorage.getItem('tasks');
    if (tasksObj) {
        const tasks = JSON.parse(tasksObj); // parsing JSON string back to an array of tasks
        tasks.forEach(task => {
            const newLi = document.createElement('li');
            newLi.textContent = task.text;
            if (task.completed) {
                newLi.classList.add('completed');
            }
            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Undo' : 'Done';
            completeBtn.addEventListener('click', () => {
                newLi.classList.toggle('completed');
                completeBtn.textContent = newLi.classList.contains('completed') ? 'Undo' : 'Done';
                saveTasks(); // save tasks to local storage whenever a task is completed or undone
            });
            newLi.appendChild(completeBtn);
            taskList.appendChild(newLi);
        });
    }
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

//regex.test(string);  .test() method is a built-in function of JavaScript's RegExp (regular expression) objects. It is used to check if a string matches a specific pattern defined by a regular expression. The method returns a boolean value: true if the pattern matches the string, and false otherwise.
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
    saveTasks(); //updating local storage after clearing tasks
}
taskForm.appendChild(clearBtn);
clearBtn.style.marginLeft = '10px';

//BOM properties
//once the page and all resources are loaded, the heading text will change to "Welcome to Your To-Do List!"
window.onload = function () {
    const heading = document.querySelector('h4');
    heading.textContent = 'Welcome to Your To-Do List!';
    loadTasks(); //loading tasks from local storage when the page loads
    console.log(localStorage.getItem('tasks'));
};

//to get the URL of the previous page that linked to this app. (This can be useful for analytics or customizing the user experience)
const referrer = window.document.referrer;
if (referrer) {
    console.log(`User came from: ${referrer}`);
}


//trailwork
//function loadTasks() {
//    const tasks = localStorage.getItem('tasks');
//    if (tasks) {
//        const taskArray = tasks.split('|'); // Use '|' as a delimiter
//        taskArray.forEach(task => {
//            if (task) { // Check if task is not empty
//                const taskElement = createTaskElement(task);
//                taskList.appendChild(taskElement);
//            }
//        });
//    }
//    updateTaskCount();
//}
// Function to save tasks to localStorage
//function saveTaskToLocalStorage(task) {
//    const currentTasks = localStorage.getItem('tasks') || '';
//    const updatedTasks = currentTasks ? `${currentTasks}|${task}` : task; // Append task with delimiter
//    localStorage.setItem('tasks', updatedTasks);
//}
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