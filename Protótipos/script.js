document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const allTasksFilter = document.getElementById('allTasks');
const pendingTasksFilter = document.getElementById('pendingTasks');
const completedTasksFilter = document.getElementById('completedTasks');
const noTasksMessage = document.querySelector('.noTasksMessage');
const taskTypeSelect = document.getElementById('taskType');
const dateInputContainer = document.getElementById('dateInputContainer');
const deadlineInputContainer = document.getElementById('deadlineInputContainer');

addTaskButton.addEventListener('click', addTask);
allTasksFilter.addEventListener('click', filterTasks);
pendingTasksFilter.addEventListener('click', filterTasks);
completedTasksFilter.addEventListener('click', filterTasks);
taskTypeSelect.addEventListener('change', toggleTaskInputs);

taskList.addEventListener('change', toggleTaskStatus);
taskList.addEventListener('click', handleTaskOptions);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `
            <input type="checkbox">
            <p>${taskText}</p>
            <div class="options">
                ...
                <div class="options-menu">
                    <div class="option-item edit-option">Editar</div>
                    <div class="option-item delete-option">Excluir</div>
                </div>
            </div>
        `;
        taskList.appendChild(task);
        taskInput.value = '';
        checkTaskList();
        activateOptions(); // Ativar opções para a nova tarefa
    }
}

function filterTasks(event) {
    const filter = event.target.id;
    const tasks = document.querySelectorAll('.task');
    const activeFilter = document.querySelector('.filter.active');
    if (activeFilter) {
        activeFilter.classList.remove('active');
    }
    event.target.classList.add('active');
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (filter === 'allTasks') {
            task.style.display = 'flex';
        } else if (filter === 'pendingTasks') {
            task.style.display = checkbox.checked ? 'none' : 'flex';
        } else if (filter === 'completedTasks') {
            task.style.display = checkbox.checked ? 'flex' : 'none';
        }
    });
    checkTaskList();
}

function checkTaskList() {
    const tasks = document.querySelectorAll('.task');
    let noTasksMessageText = 'Você não tem tarefas aqui';
    if (tasks.length === 0) {
        noTasksMessage.textContent = noTasksMessageText;
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none';
    }
}

function activateOptions() {
    const optionsMenus = document.querySelectorAll('.options');
    optionsMenus.forEach(menu => {
        const optionsMenu = menu.querySelector('.options-menu');
        menu.addEventListener('click', () => {
            optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
        });
        // Adiciona event listener para fechar o menu quando clicar fora dele
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target)) {
                optionsMenu.style.display = 'none';
            }
        });
    });
}

function toggleTaskStatus(event) {
    if (event.target.type === 'checkbox') {
        const task = event.target.parentElement;
        if (event.target.checked) {
            task.querySelector('p').classList.add('completed-task');
        } else {
            task.querySelector('p').classList.remove('completed-task');
        }
    }
}

function handleTaskOptions(event) {
    if (event.target.classList.contains('option-item')) {
        const task = event.target.closest('.task');
        if (event.target.classList.contains('delete-option')) {
            task.remove();
            checkTaskList();
        } else if (event.target.classList.contains('edit-option')) {
            const taskText = task.querySelector('p').textContent;
            taskInput.value = taskText;
            task.remove();
        }
    }
}

function toggleTaskInputs() {
    const selectedType = taskTypeSelect.value;
    if (selectedType === 'Data') {
        dateInputContainer.style.display = 'block';
        deadlineInputContainer.style.display = 'none';
    } else if (selectedType === 'Prazo') {
        dateInputContainer.style.display = 'none';
        deadlineInputContainer.style.display = 'block';
    } else {
        dateInputContainer.style.display = 'none';
        deadlineInputContainer.style.display = 'none';
    }
}
