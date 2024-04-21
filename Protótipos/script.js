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
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.querySelector(".close");

addTaskButton.addEventListener('click', addTask);
allTasksFilter.addEventListener('click', filterTasks);
pendingTasksFilter.addEventListener('click', filterTasks);
completedTasksFilter.addEventListener('click', filterTasks);
taskTypeSelect.addEventListener('change', toggleTaskInputs);

taskList.addEventListener('change', toggleTaskStatus);
taskList.addEventListener('click', handleTaskOptions);

document.addEventListener('click', function(event) {
    const infoIcon = event.target.closest('.info-icon');
    if (infoIcon) {
        const task = infoIcon.closest('.task');
        const taskText = task.querySelector('p').textContent;
        const taskType = taskTypeSelect.value;
        const taskPriority = document.getElementById('taskPriority').value;
        let status;

        if (taskType === 'Data') {
            const taskDate = document.getElementById('taskDate').value;
            const daysDifference = calculateDaysDifference(taskDate);
            if (daysDifference < 0) {
                status = `Atrasada por ${Math.abs(daysDifference)} dias`;
            } else if (daysDifference === 0) {
                status = 'Concluída';
            } else {
                status = `Falta(m) ${daysDifference} dia(s)`;
            }
            showModal(taskText, taskType, taskDate, status, taskPriority);
        } else if (taskType === 'Prazo') {
            const taskDeadline = parseInt(document.getElementById('taskDeadline').value);
            status = taskDeadline > 0 ? `Falta(m) ${taskDeadline} dia(s)` : 'Concluída';
            showModal(taskText, taskType, taskDeadline, status, taskPriority);
        } else {
            status = 'Prevista ou concluída';
            showModal(taskText, taskType, null, status, taskPriority);
        }
    }
});

closeModal.addEventListener('click', function() {
    modal.style.display = "none";
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `
            <input type="checkbox">
            <p>${taskText}</p>
            <div class="options">
                <div class="info-icon"><img src="simbolo-de-informacao.png" alt="Info" class="info-img"></div>
                <div class="three-dots">...</div>
                <div class="options-menu">
                    <div class="option-item edit-option">Editar</div>
                    <div class="option-item delete-option">Excluir</div>
                </div>
            </div>
        `;
        taskList.appendChild(task);
        taskInput.value = '';
        checkTaskList();
        activateOptions(); 
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

function showModal(taskText, taskType, taskDateOrDeadline, status, taskPriority) {
    let message;
    if (taskType === 'Data') {
        message = `Tarefa: ${taskText}<br>Tipo: ${taskType}<br>Data: ${taskDateOrDeadline}<br>Status: ${status}<br>Prioridade: ${taskPriority}`;
    } else if (taskType === 'Prazo') {
        message = `Tarefa: ${taskText}<br>Tipo: ${taskType}<br>Prazo: ${taskDateOrDeadline} dias<br>Status: ${status}<br>Prioridade: ${taskPriority}`;
    } else {
        message = `Tarefa: ${taskText}<br>Tipo: ${taskType}<br>Status: ${status}<br>Prioridade: ${taskPriority}`;
    }
    modalContent.innerHTML = message;
    modal.style.display = "block";
}

function calculateDaysDifference(date) {
    const today = new Date();
    const taskDate = new Date(date);
    const differenceInTime = taskDate.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
}
