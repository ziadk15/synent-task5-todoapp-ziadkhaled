export const renderTasks = (tasks, container) => {

    container.innerHTML = "";

    tasks.forEach(task => {
        container.innerHTML += `
            <div class="task">
                <input type="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}>
                <span>${task.title}</span>
                <button class="edit" data-id="${task.id}">Edit</button>
                <button class="delete" data-id="${task.id}">X</button>
            </div>
        `;
    });
};

export const updateStats = (tasks) => {

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(t => t.completed).length;
};

export const showToast = (msg) => {
    alert(msg);
};