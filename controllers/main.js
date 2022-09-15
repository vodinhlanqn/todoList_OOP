
import Task from "../models/Task.js";
import TaskService from "../models/TaskList.js";

let dateField = querySel('#currentDate');
// Get current date
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = today.toLocaleString('default', { month: 'long' });
const yyyy = today.getFullYear();

today = `${mm}, ${dd}, ${yyyy}`;
dateField.innerHTML = today;

// Lấy dữ liệu từ dưới LocalStorage
// Kiểm tra dữ liệu từ LocalStorage
let getLocal = () => {
    if (localStorage.getItem("DsTask")) {
        return JSON.parse(localStorage.getItem("DsTask"));
    }
}
// Tạo mảng task từ Local để hiện thị ra giao diện
let arr = new TaskService(getLocal());

// Thêm Công việc
querySel('#addItem').onclick = () => {
    let idTask = Math.random();
    let taskName = querySel('#newTask').value;

    // Tạo đối tượng Task
    let task = new Task(idTask, taskName, 'todo');
    arr.addTask(task);
    setLocal(arr.taskList);
    renderData(arr.taskList);
    querySel('#newTask').value = "";
}
// Hiển thị Dữ liệu ra ứng dụng
let renderData = (arrTask) => {
    let arrayTodo = [];
    let arrayComplete = [];
    if (arrTask) {
        arrTask.map(item => {
            if (item.status === 'todo') {
                arrayTodo += createTable(item);
            } else {
                arrayComplete += createTable(item);
            }
        });
    }
    querySel('#todo').innerHTML = arrayTodo;
    querySel('#completed').innerHTML = arrayComplete;
}

let createTable = (itemTask) => {
    return `
        <li>
            <span>${itemTask.taskName}</span>
            <div>
                <button class="removeTask" onclick = "deleteTask(${itemTask.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="completeTask" onclick = "changeStatus(${itemTask.id})">
                    <i class="far fa-check-circle"></i>
                </button>
            </div>
        </li>
        `;
}

// Xóa Task
window.deleteTask = (id) => {
    arr.deleteTask(id);
    setLocal(arr.taskList);
    renderData(arr.taskList);
}

// Change Task
window.changeStatus = (id) => {
    arr.changeStatus(id);
    setLocal(arr.taskList);
    renderData(arr.taskList);
}

// Sắp xếp Task
const filterA_Z = querySel('#two');
filterA_Z.onclick = () => {
    arr.taskList.sort(compare);
    renderData(arr.taskList);
    setLocal(arr.taskList);
}
const filterZ_A = querySel('#three');
filterZ_A.onclick = () => {
    arr.taskList.sort(compareDecrement);
    renderData(arr.taskList);
    setLocal(arr.taskList);
}
// A-Z
const compare = function (a, b) {
    // Dùng toUpperCase() để không phân biệt ký tự hoa thường
    const genreA = a.taskName.toUpperCase();
    const genreB = b.taskName.toUpperCase();
    let comparison = 0;
    if (genreA < genreB) {
        comparison = -1;
    } else {
        comparison = 1;
    }
    return comparison;
};
// Z-A
const compareDecrement = function (a, b) {
    //nghịch đảo giá trị trả lại bằng cách nhân với -1
    const genreA = a.taskName.toUpperCase();
    const genreB = b.taskName.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = -1;
    } else {
        comparison = 1;
    }
    return comparison;
};


// Lưu dữ liệu xuống LocalStorage
let setLocal = (data) => {
    localStorage.setItem("DsTask", JSON.stringify(data));
}

function querySel(id) {
    return document.querySelector(id);
}

// Khi load web lại, render dữ liệu ra bên ngoài
window.onload = renderData(arr.taskList);

