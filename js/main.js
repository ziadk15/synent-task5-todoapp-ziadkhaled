import { getTasks, saveTasks } from "./storage.js";
import { renderTasks, updateStats } from "./ui.js";

let tasks = getTasks();

let filter = "all";
let search = "";

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const container = document.getElementById("tasksContainer");
const searchInput = document.getElementById("searchInput");

function getFiltered() {

    let result = tasks;

    if (filter === "completed") {
        result = result.filter(t => t.completed);
    }

    if (filter === "pending") {
        result = result.filter(t => !t.completed);
    }

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
};

searchInput.oninput = (e) => {
    search = e.target.value;
    render();
};

render();