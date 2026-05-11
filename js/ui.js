export const renderTasks = (tasks, container) => {

    container.innerHTML = "";

    tasks.forEach(task => {
        container.innerHTML += `
            <div class="task">
                <input type="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}>
                <span>${task.title}</span>
                <button class="delete" data-id="${task.id}">X</button>
            </div>
        `;
    });
};


export const updateStats = () => {};

export const showToast = () => {};