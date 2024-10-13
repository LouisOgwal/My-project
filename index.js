const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksDiv = document.getElementById('tasks');

function addTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskDiv.remove();
    });

    taskDiv.appendChild(deleteBtn);

    tasksDiv.appendChild(taskDiv);
}

addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value;
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

const API_URL = 'https://github.com/jigsawpieces/dog-api-images#dog-api-images'

function fetchTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.slice(0, 5).forEach(task => {
                addTask(task.title);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function postTask(task) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: task, completed: false })
    })
    .then(response => response.json())
    .then(data => console.log('Task added:', data))
    .catch(error => console.error('Error adding task:', error));
}

addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value;
    if (task) {
        addTask(task);
        postTask(task);
        taskInput.value = '';
    }
});

fetchTasks();