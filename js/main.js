import { getTasks, saveTasks } from "./storage.js";
import { renderTasks } from "./ui.js";

let tasks = getTasks();

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const container = document.getElementById("tasksContainer");

function render() {
    renderTasks(tasks, container);
}

btn.onclick = () => {

    if (!input.value) return;

    tasks.push({
        id: Date.now(),
        title: input.value,
        completed: false
    });

    input.value = "";

    saveTasks(tasks);
    render();
};

container.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("delete")) {
        tasks = tasks.filter(t => t.id !== id);
    }

    if (e.target.type === "checkbox") {
        tasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    saveTasks(tasks);
    render();
});

render();