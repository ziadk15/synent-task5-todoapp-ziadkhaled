export const renderTasks = (tasks, container) => {

    container.innerHTML = "";

    tasks.forEach(task => {

        container.innerHTML += `
        
            <div class="task">

                <span>${task.title}</span>

            </div>
        
        `;
    });

};


export const updateStats = () => {};

export const showToast = () => {};