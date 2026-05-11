import { getTasks, saveTasks } from "./storage.js";
import { renderTasks, updateStats, showToast } from "./ui.js";

let tasks = getTasks();

let filter = "all";
let search = "";

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const container = document.getElementById("tasksContainer");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");

function getFiltered() {

    let result = tasks;

    return result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );
}

function render() {

    const data = getFiltered();

    renderTasks(data, container);
    updateStats(tasks);
}

btn.onclick = () => {

    tasks.push({
        id: Date.now(),
        title: input.value,
        completed: false
    });

    input.value = "";

    saveTasks(tasks);
    render();

    showToast("Added");
};

container.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("delete")) {
        tasks = tasks.filter(t => t.id !== id);
    }

    if (e.target.classList.contains("edit")) {

        const task = tasks.find(t => t.id === id);

        const newTitle = prompt("Edit", task.title);

        if (newTitle) task.title = newTitle;
    }

    if (e.target.type === "checkbox") {

        tasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    clearBtn.addEventListener("click", () => {

    tasks = [];

    renderTasks();

});

    saveTasks(tasks);
    render();
});

searchInput.oninput = (e) => {
    search = e.target.value;
    render();
};

render();