/****************   Imports   ****************/
import TaskManager from './taskManager.js';
import { newTask } from './taskManager.js';

/****************   Buttons   ****************/
const createTaskButton = document.querySelector("#newTaskForm")

/****************   Input form   ****************/
/*--- FOR VALIDATION ---*/
// Name
let taskName = document.querySelectorAll(".taskname");
const taskNameInvalidFeedback = document.querySelector(".taskNameInvalidFeedback");
// Description
let descname = document.querySelectorAll(".descname");
const descnameInvalidFeedback = document.querySelector(".descnameInvalidFeedback");
// Assignee
let assigneename  = document.querySelectorAll(".assigneename");
const assigneenameInvalidFeedback = document.querySelector(".assigneenameInvalidFeedback");

/*--- CREATE TASK---*/
let insertNewTask;
let taskCard;
let newTaskCard;
let todoContainer = document.querySelector('#to-do');
let inProgressContainer = document.querySelector('#in-progress');
let toReviewContainer = document.querySelector('#to-review');
let completedContainer = document.querySelector('#completed');

/*--- UPDATE TASK ---*/

/****************   Date   ****************/
// Current date
let currentDateSpan = document.querySelector("#current-date");
let todayDate = new Date();
let date = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
let todayDatePrimitive = todayDate[Symbol.toPrimitive]('number');
// Due date
let dueDate = document.querySelectorAll(".duedate");
const dueDateError = document.querySelector(".dueDateError")

/****************   Display current date   ****************/
const changeCurrentDate = () => {
    currentDateSpan.innerText = date;
}

changeCurrentDate();

/****************   Form validation   ****************/
taskName.forEach(name => {
    name.addEventListener('keyup', () => {
        // If input length for name is less than or equal to 8
        if(name.value.length <= 8) {
            taskNameInvalidFeedback.style.display = "inline";
            name.classList.add("is-invalid")
            name.focus();
        } else {
            taskNameInvalidFeedback.style.display = "none";
            name.classList.remove("is-invalid")
        };
    });
});

descname.forEach(desc => {
    desc.addEventListener('keyup', () => {
        // If input length for description is less than or equal to 15
        if(desc.value.length <= 15) {
            descnameInvalidFeedback.style.display = "inline";
            desc.classList.add("is-invalid")
            desc.focus();
        } else {
            descnameInvalidFeedback.style.display = "none";
            desc.classList.remove("is-invalid")
        };
    });
});

assigneename.forEach(assignee => {
    assignee.addEventListener('keyup', () => {
        // If input length for assignee first name is less than or equal to 8
        if(assignee.value.length <= 8) {
            assigneenameInvalidFeedback.style.display = "inline";
            assignee.classList.add("is-invalid")
            assignee.focus();
        } else {
            assigneenameInvalidFeedback.style.display = "none";
            assignee.classList.remove("is-invalid")
        };
    });
});

dueDate.forEach(dueDate => {
    dueDate.addEventListener('mouseout', () => {
        // If date is a past date
        if(new Date(dueDate.value).getTime() <= todayDatePrimitive) {
            dueDateError.style.display = "inline";
            dueDate.classList.add("is-invalid")
            dueDate.focus();
        } else {
            dueDateError.style.display = "none";
            dueDate.classList.remove("is-invalid")
        };
    });
});

/****************   Create task   ****************/


createTaskButton.addEventListener("submit", e => {
    e.preventDefault();
    let taskName = e.target.taskname.value
    let description = e.target.description.value
    let assigneeFirstName = e.target.assigneeFName.value
    let assigneeLastName = e.target.assigneeLName.value
    let dueDate = e.target.dueDate.value
    let status = e.target.status.value
    let selectedOption
    taskCard = ''
    insertNewTask = new TaskManager(taskName, description, assigneeFirstName, assigneeLastName, dueDate, status)
    insertNewTask.addTask();
    insertNewTask.getAllTasks();
    e.target.reset()
    
    const displayCorrectStatus = () => {
        if (status === "To do") {
            return selectedOption = 
            `<select class="status">
                        <option class="bg-light" selected>To do</option>
                        <option class="bg-warning">In Progress</option>
                        <option class="bg-danger">To review</option>
                        <option class="bg-success">Done</option>
            </select>` 
        } else if(status === "In Progress") {
            return selectedOption =
            `<select class="status">
                        <option class="bg-light">To do</option>
                        <option class="bg-warning" selected>In Progress</option>
                        <option class="bg-danger">To review</option>
                        <option class="bg-success">Done</option>
            </select>`
        } else if(status === "To review") {
            return selectedOption =
            `<select class="status">
                        <option class="bg-light">To do</option>
                        <option class="bg-warning">In Progress</option>
                        <option class="bg-danger" selected>To review</option>
                        <option class="bg-success">Done</option>
            </select>` 
        } else if(status === "Done") {
            return selectedOption =
            `<select class="status">
                        <option class="bg-light">To do</option>
                        <option class="bg-warning">In Progress</option>
                        <option class="bg-danger">To review</option>
                        <option class="bg-success" selected>Done</option>
            </select>` 
        }
        
    }
    
    // Create Task
    const createTaskHTML = () => {
        newTask.forEach(task => {
            displayCorrectStatus();
            newTaskCard = document.createElement("div");
            taskCard = 
            `<div class="card shadow p-3 mb-2 bg-body rounded list-group-item">
                <div class="card-body">
                <div class="row">
                    <div class="col-9">
                    <h5>${task.name}</h5>
                    <p>${task.description}</p>
                    </div>
                    <div class="col-3 status-container">
                    ${selectedOption}
                    </div>
                    <div class="row"></div>
                    <div class="col-5">
                    <h6>Assign to: ${task.assignedFName} ${task.assignedLName}</h6>
                    </div>
                    <div class="col-4">
                    <h6>Due date: ${task.dueDate}</h6>
                    </div>
                    <div class="col-3">
                    <button
                        type="button"
                        class="btn btn-warning m-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editTaskModal"
                    >
                        Edit Task
                    </button>
                    <button class="btn btn-danger" type="button">Delete</button>
                    </div>
                </div>
                </div>
            </div>` 
            newTaskCard.innerHTML = taskCard
    })};
    createTaskHTML();

    // Display Task
    const render = () => {
        if (status === "To do") {
            todoContainer.insertAdjacentElement("beforeend", newTaskCard);
        } else if(status === "In Progress") {
            inProgressContainer.insertAdjacentElement("beforeend", newTaskCard);
        } else if(status === "To review") {
            toReviewContainer.insertAdjacentElement("beforeend", newTaskCard);
        } else if(status === "Done") {
            completedContainer.insertAdjacentElement("beforeend", newTaskCard);
        }
    }
    render();  
});




/****************   Update Task   ****************/



/****************   Delete Task   ****************/
const deleteTask = () => {

};