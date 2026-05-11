import { renderTasks } from "./ui.js";

let tasks = [];

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

    render();

};


render();