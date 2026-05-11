import { getTasks, saveTasks } from "./storage.js";
import { renderTasks, updateStats, showToast } from "./ui.js";

let tasks = getTasks();

let search = "";

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const container = document.getElementById("tasksContainer");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");

function getFiltered() {
    return tasks.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );
}

function render() {
    const data = getFiltered();

    renderTasks(data, container);
    updateStats(tasks);
}

// Add Task
btn.onclick = () => {

    if (!input.value.trim()) {
        showToast("Enter a task");
        return;
    }

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

// Task Actions (delete / edit / checkbox)
container.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    // Delete
    if (e.target.classList.contains("delete")) {
        tasks = tasks.filter(t => t.id !== id);
    }

    // Edit
    if (e.target.classList.contains("edit")) {

        const task = tasks.find(t => t.id === id);

        const newTitle = prompt("Edit task", task.title);

        if (newTitle && newTitle.trim()) {
            task.title = newTitle;
        }
    }

    // Toggle checkbox
    if (e.target.type === "checkbox") {
        tasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    saveTasks(tasks);
    render();
});

// Clear All (FIXED)
clearBtn.addEventListener("click", () => {
    tasks = [];
    saveTasks(tasks);
    render();
    showToast("All tasks cleared");
});

// Search
searchInput?.addEventListener("input", (e) => {
    search = e.target.value;
    render();
});

render();