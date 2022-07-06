/****************   Imports   ****************/
import TaskManager from './taskManager.js';
import { newTask } from './taskManager.js';

/****************   Buttons   ****************/
const newTaskForm = document.querySelector("#newTaskForm")

/****************   Input form   ****************/
/*--- FOR VALIDATION ---*/
// To enable/disable button depending on validation
const createTaskButton = document.querySelector("#create-task")
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

/*--- UPDATE TASK---*/
const editTaskName = document.querySelector("#editTaskModal .taskname")
const editDesc = document.querySelector("#editTaskModal .descname")
const editAssigneedFirstName = document.querySelector("#editTaskModal .assigneename")
const editAssigneeLastName = document.querySelector("#editTaskModal .assigneeLName")
const editDueDate = document.querySelector("#editTaskModal .duedate")
const editStatus = document.querySelector("#editTaskModal #status")

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
const isInvalid = (element) => {
    if(element.classList.contains("is-invalid")) {
        createTaskButton.setAttribute("disabled", "");
    } else {
        createTaskButton.removeAttribute("disabled", "");
    }
};

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
        isInvalid(name);
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
        isInvalid(desc);
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
        isInvalid(assignee);
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
        isInvalid(dueDate);
    });
});



/****************   Create task   ****************/
let selectedOption
taskCard = ''

// Display correct status
const displayCorrectStatus = (status) => {
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

 // Create Task card
 export const createTaskHTML = (task) => {
        displayCorrectStatus();
        newTaskCard = document.createElement("div");
        taskCard = 
        `<div data-id=${task.id} class="card shadow p-3 mb-2 bg-body rounded list-group-item">
            <div class="card-body">
            <div class="row">
                <div class="col-9">
                <h5>${task.name}</h5>
                <p>${task.description}</p>
                </div>
                <div class="col-3 status-container">
                    ${selectedOption}
                    ${task.status === "Done" ? `` : `<button type="button" class="btn btn-success mark-done">Mark as done</button>`}
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
                    id="edit-btn"
                    type="button"
                    class="btn btn-warning m-2 edit-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#editTaskModal"
                >
                    Edit Task
                </button>
                <button class="btn btn-danger delete-btn" type="button">Delete</button>
                </div>
            </div>
            </div>
        </div>` 
    newTaskCard.innerHTML = taskCard
};

// Display Task
const render = (status) => {
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


// Fire actions when new task form is submitted
newTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    let taskName = e.target.taskname.value
    let description = e.target.description.value
    let assigneeFirstName = e.target.assigneeFName.value
    let assigneeLastName = e.target.assigneeLName.value
    let dueDate = e.target.dueDate.value
    let status = e.target.status.value
    // // Create new instance
    insertNewTask = new TaskManager(taskName, description, assigneeFirstName, assigneeLastName, dueDate, status)

    // Call methods within TaskManager class
    insertNewTask.addTask();
    displayCorrectStatus(e.target.status.value);
    newTask.forEach(task => {
        createTaskHTML(task)
    });
    render(e.target.status.value);
    // Clear form
    e.target.reset()
});


/****************   Update Tasks   ****************/
const editModal = document.querySelector("#editTaskModal")
    editModal.addEventListener("submit", (e) => {
    // Change value inside array
    TaskManager.updateTask();
    // Update local storage
    TaskManager.setitems();
    // Display task card
    const selectedStatus = e.target.children[4].lastElementChild.value
    // Wait for 0.5 second (after window auto refresh) before displaying the newly appended card
    setTimeout(() => {render(selectedStatus)}, 500) 
});

document.addEventListener("click", (e) => {
    // Select task wrapper variable
    const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
    // Get id of the selected task
    const taskId = taskWrapper.getAttribute("data-id")
    /****************   Update Tasks Continued...   ****************/
    /* Display value on Edit Task form */
    if (e.target.classList.contains("edit-btn")) {
        TaskManager.displayValueOnForm(taskId)
    };

    /*  Mark as Done Button */
    if (e.target.classList.contains("mark-done")) {
        // Change to correct status visually in task card
        e.target.previousElementSibling.innerHTML = 
        `<select class="status">
            <option class="bg-light">To do</option>
            <option class="bg-warning">In Progress</option>
            <option class="bg-danger">To review</option>
            <option class="bg-success" selected>Done</option>
        </select>`
        // Change to correct status in newTask array (task object)
        TaskManager.setDoneStatus(newTask[TaskManager.getIndexOfTask(taskId)])
        // Move to 'Completed' container
        completedContainer.insertAdjacentElement("beforeend", taskWrapper);
        // Remove mark as done button
        e.target.remove();
    };

    /*  Status options */
    if (e.target.classList.contains("status")) {
        // Find out the selected status index
        const prevSelectedIndex = e.target.options.selectedIndex
        e.target.addEventListener("change", () => {
            // If selected index is 3, which is 'Done'
            if(prevSelectedIndex === 3) {
                const markDoneBtn = `<button type="button" class="btn btn-success mark-done">Mark as done</button>`
                // Add a mark done button
                e.target.insertAdjacentHTML("afterend", markDoneBtn)
            } else if(prevSelectedIndex !== 3 && e.target.value === "Done") {
                // If task card goes from other status to "Done", remove all mark done button
                while (e.target.nextElementSibling) {
                    e.target.nextElementSibling.remove()
                  };
                // If task card move from one status to another and not from/to 'Done' status 
            } else if(prevSelectedIndex !== 3 && e.target.value !== "Done") {
                // if there are more than 1 mark done button, remove any addition mark done button
                if(e.target.parentElement.childElementCount > 2) {
                    e.target.nextElementSibling.remove()
                };
            };
            // Display correct status
            displayCorrectStatus(e.target.value)
            // Update selected option
            e.target.innerHTML = selectedOption
            if(e.target.value === "To do") {
                // Display updated task card
                todoContainer.insertAdjacentElement("beforeend", taskWrapper)
                // Update status in array
                newTask[TaskManager.getIndexOfTask(taskId)].status = "To do"
            } else if(e.target.value === "In Progress") {
                // Display updated task card
                inProgressContainer.insertAdjacentElement("beforeend", taskWrapper)
                // Update status in array
                newTask[TaskManager.getIndexOfTask(taskId)].status = "In Progress"
            } else if(e.target.value === "To review") {
                // Display updated task card
                toReviewContainer.insertAdjacentElement("beforeend", taskWrapper);
                // Update status in array
                newTask[TaskManager.getIndexOfTask(taskId)].status = "To review"
            } else if(e.target.value === "Done") {
                // Display updated task card
                completedContainer.insertAdjacentElement("beforeend", taskWrapper);
                // Update status in array
                newTask[TaskManager.getIndexOfTask(taskId)].status = "Done"
            }
            // Update Local Storage
            TaskManager.setitems()
        });
    };

    /****************   Delete Task   ****************/
    if (e.target.classList.contains("delete-btn")) {
        // Delete task
        TaskManager.deleteTask(taskId)
        // Remove the task card
        taskWrapper.remove();
    }
});


/****************   Persist task on load   ****************/
window.onload = () => {
    if(JSON.parse(TaskManager.getAllTasks())) {
        for(let i = 0; i < JSON.parse(TaskManager.getAllTasks()).length; i++) {
            newTask.push(JSON.parse(TaskManager.getAllTasks())[i])
        };
    };
    newTask.forEach(task => {
        displayCorrectStatus(task.status)
        createTaskHTML(task)
        render(task.status)
    });
};


export { editTaskName, editDesc, editAssigneedFirstName, editAssigneeLastName, editDueDate, editStatus };

