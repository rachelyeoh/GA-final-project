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

// localStorage.clear()
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

 // Create Task
 const createTaskHTML = (task) => {
    // newTask.forEach(task => {
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
                    <button type="button" class="btn btn-success mark-done">Mark as done</button>
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
// })
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

// const newInstanceOfTask = (e) => {
//     let taskName = e.target.taskname.value
//     let description = e.target.description.value
//     let assigneeFirstName = e.target.assigneeFName.value
//     let assigneeLastName = e.target.assigneeLName.value
//     let dueDate = e.target.dueDate.value
//     let status = e.target.status.value
//     // Create new instance
//     insertNewTask = new TaskManager(taskName, description, assigneeFirstName, assigneeLastName, dueDate, status)
// }


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
    // newInstanceOfTask(e)
    // Call methods within TaskManager class
    insertNewTask.addTask();
    // insertNewTask.getAllTasks();
    // insertNewTask.getTasksWithStatus("To do")
    displayCorrectStatus(e.target.status.value);
    newTask.forEach(task => {
        createTaskHTML(task)
    });
    render(e.target.status.value);
    // Clear form
    e.target.reset()
});


document.addEventListener("click", (e) => {
    // Select task wrapper variable
    const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
    // Get id of the selected task
    const taskId = taskWrapper.getAttribute("data-id")

    /****************   Update Tasks   ****************/
    /* Edit Task form */
    if (e.target.classList.contains("edit-btn")) {
        // console.log(taskWrapper)
        // console.log(taskId)
        console.log(taskWrapper)
        console.log(TaskManager.getTaskWithId(taskId))
    };

    /* Mark as Done Button */
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
    }

    /****************   Delete Task   ****************/
    if (e.target.classList.contains("delete-btn")) {
        // delete task
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




// TO DELETE CODES
    // console.log(newTask)
    // if(TaskManager.getTasksWithStatus("To do")) {
    //     console.log(TaskManager.getTasksWithStatus("To do"))
    //     console.log("It's To do")
    //     TaskManager.getTasksWithStatus("To do").push(newTask)
    // }
    // console.log(newTask)
    // TaskManager.getTasksWithStatus("In Progress") ? inProgressContainer.insertAdjacentElement("beforeend", newTaskCard) : null
    // TaskManager.getTasksWithStatus("To review") ? toReviewContainer.insertAdjacentElement("beforeend", newTaskCard) : null
    // TaskManager.getTasksWithStatus("Done") ? completedContainer.insertAdjacentElement("beforeend", newTaskCard) : null


// Mark as Done button
// document.addEventListener("click", (e) => {
//     // Select task wrapper variable
//     const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
//     // Get id of the selected task
//     const taskId = e.target.parentElement.getAttribute("data-id")

//     if (e.target.classList.contains("mark-done")) {
//         // Change to correct status visually in task card
//         e.target.previousElementSibling.innerHTML = 
//         `<select class="status">
//             <option class="bg-light">To do</option>
//             <option class="bg-warning">In Progress</option>
//             <option class="bg-danger">To review</option>
//             <option class="bg-success" selected>Done</option>
//         </select>`
//         // Change to correct status in newTask array (task object)
//         insertNewTask.setDoneStatus(newTask[insertNewTask.getIndexOfTask(taskId)])
//         // Move to 'Completed' container
//         completedContainer.insertAdjacentElement("beforeend", taskWrapper);
//         // Remove mark as done button
//         e.target.remove();
//     }
// });

// $(document).on('click', '.mark-done', (e) => {
//     // Select task wrapper variable
//     const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
//     // Get id of the selected task
//     const taskId = taskWrapper.getAttribute("data-id")
//     // Change to correct status visually in task card
//     e.target.previousElementSibling.innerHTML = 
//     `<select class="status">
//         <option class="bg-light">To do</option>
//         <option class="bg-warning">In Progress</option>
//         <option class="bg-danger">To review</option>
//         <option class="bg-success" selected>Done</option>
//     </select>`
//     // Change to correct status in newTask array (task object)
//     insertNewTask.setDoneStatus(newTask[insertNewTask.getIndexOfTask(taskId)])
//     // Move to 'Completed' container
//     completedContainer.insertAdjacentElement("beforeend", taskWrapper);
//     // Remove mark as done button
//     $( e.target ).remove();
// })

/****************   Delete Task   ****************/
// document.addEventListener("click", (e) => {
//     const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
//     console.log(taskWrapper)
//     const taskId = taskWrapper.getAttribute("data-id")
//     if (e.target.classList.contains("delete-btn")) {
//         // delete task
//         insertNewTask.deleteTask(taskId)
//         console.log(insertNewTask)
//         // Remove the task card
//         taskWrapper.remove();
//     }
// });    
// $(document).on('click', '.delete-btn', (e) => {
//     const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
//     // console.log(taskWrapper)
//     const taskId = taskWrapper.getAttribute("data-id")
//     // 
//     insertNewTask.deleteTask(taskId)
//     // Remove the task card
//     $( taskWrapper ).remove();
// })



    // Select task wrapper variable
    // const taskWrapper = e.target.parentElement.parentElement.parentElement.parentElement
    // Get id of the selected task
    // const taskId = e.target.parentElement.getAttribute("data-id")
// const taskId = e.target.getAttribute("data-id")



    //     const displayCorrectStatus = () => {
    //         if (status === "To do") {
    //             console.log("It's todo")
    //             return selectedOption = 
    //             `<select class="status">
    //                         <option class="bg-light" selected>To do</option>
    //                         <option class="bg-warning">In Progress</option>
    //                         <option class="bg-danger">To review</option>
    //                         <option class="bg-success">Done</option>
    //             </select>` 
    //         } else if(status === "In Progress") {
    //             return selectedOption =
    //             `<select class="status">
    //                         <option class="bg-light">To do</option>
    //                         <option class="bg-warning" selected>In Progress</option>
    //                         <option class="bg-danger">To review</option>
    //                         <option class="bg-success">Done</option>
    //             </select>`
    //         } else if(status === "To review") {
    //             return selectedOption =
    //             `<select class="status">
    //                         <option class="bg-light">To do</option>
    //                         <option class="bg-warning">In Progress</option>
    //                         <option class="bg-danger" selected>To review</option>
    //                         <option class="bg-success">Done</option>
    //             </select>` 
    //         } else if(status === "Done") {
    //             return selectedOption =
    //             `<select class="status">
    //                         <option class="bg-light">To do</option>
    //                         <option class="bg-warning">In Progress</option>
    //                         <option class="bg-danger">To review</option>
    //                         <option class="bg-success" selected>Done</option>
    //             </select>` 
    //         }
            
    //     }
    
    //     // Create Task
    //     const createTaskHTML = () => {
    //             displayCorrectStatus();
    //             newTaskCard = document.createElement("div");
    //             taskCard = 
    //             `<div data-id=${task.id} class="card shadow p-3 mb-2 bg-body rounded list-group-item">
    //                 <div class="card-body">
    //                 <div class="row">
    //                     <div class="col-9">
    //                     <h5>${task.name}</h5>
    //                     <p>${task.description}</p>
    //                     </div>
    //                     <div class="col-3 status-container">
    //                         ${selectedOption}
    //                         <button type="button" class="btn btn-success mark-done">Mark as done</button>
    //                     </div>
    //                     <div class="row"></div>
    //                     <div class="col-5">
    //                     <h6>Assign to: ${task.assignedFName} ${task.assignedLName}</h6>
    //                     </div>
    //                     <div class="col-4">
    //                     <h6>Due date: ${task.dueDate}</h6>
    //                     </div>
    //                     <div class="col-3">
    //                     <button
    //                         id="edit-btn"
    //                         type="button"
    //                         class="btn btn-warning m-2 edit-btn"
    //                         data-bs-toggle="modal"
    //                         data-bs-target="#editTaskModal"
    //                     >
    //                         Edit Task
    //                     </button>
    //                     <button class="btn btn-danger delete-btn" type="button">Delete</button>
    //                     </div>
    //                 </div>
    //                 </div>
    //             </div>` 
    //         newTaskCard.innerHTML = taskCard
    //     };
    //     createTaskHTML();
    
    //     // Display Task
    //     const render = () => {
    //         if (status === "To do") {
    //             todoContainer.insertAdjacentElement("beforeend", newTaskCard);
    //         } else if(status === "In Progress") {
    //             inProgressContainer.insertAdjacentElement("beforeend", newTaskCard);
    //         } else if(status === "To review") {
    //             toReviewContainer.insertAdjacentElement("beforeend", newTaskCard);
    //         } else if(status === "Done") {
    //             completedContainer.insertAdjacentElement("beforeend", newTaskCard);
    //         }
    //     }
    //     render();  
    // })
        // console.log(task)
        // createTask(task.status)
        // newTaskCard = document.createElement("div");
        //     taskCard = 
        //     `<div data-id=${task.id} class="card shadow p-3 mb-2 bg-body rounded list-group-item">
        //         <div class="card-body">
        //         <div class="row">
        //             <div class="col-9">
        //             <h5>${task.name}</h5>
        //             <p>${task.description}</p>
        //             </div>
        //             <div class="col-3 status-container">
        //                 ${selectedOption}
        //                 <button type="button" class="btn btn-success mark-done">Mark as done</button>
        //             </div>
        //             <div class="row"></div>
        //             <div class="col-5">
        //             <h6>Assign to: ${task.assignedFName} ${task.assignedLName}</h6>
        //             </div>
        //             <div class="col-4">
        //             <h6>Due date: ${task.dueDate}</h6>
        //             </div>
        //             <div class="col-3">
        //             <button
        //                 id="edit-btn"
        //                 type="button"
        //                 class="btn btn-warning m-2 edit-btn"
        //                 data-bs-toggle="modal"
        //                 data-bs-target="#editTaskModal"
        //             >
        //                 Edit Task
        //             </button>
        //             <button class="btn btn-danger delete-btn" type="button">Delete</button>
        //             </div>
        //         </div>
        //         </div>
        //     </div>` 
        // newTaskCard.innerHTML = taskCard
        // console.log(taskCard)
        // if (task.status === "To do") {
        //     console.log("It's todo")
        //     console.log(todoContainer)
        //     todoContainer.insertAdjacentElement("beforeend", newTaskCard);
        // } else if(task.status === "In Progress") {
        //     console.log("It's in progress")
        //     inProgressContainer.insertAdjacentElement("beforeend", newTaskCard);
        // } else if(task.status === "To review") {
        //     toReviewContainer.insertAdjacentElement("beforeend", newTaskCard);
        // } else if(task.status === "Done") {
        //     completedContainer.insertAdjacentElement("beforeend", newTaskCard);
        // }

        // createTask(newTask.status)
    // NOT DISPLAYING CORRECT TASK - NEED TO FIX THIS
    // newTask.forEach(task => {
        // console.log(newTask)
        // let status = newTask.forEach(task => {
        //     task.status
        // })

        // let selectedOption
        // taskCard = ''


            // const displayCorrectStatus = () => {
    //     if (status === "To do") {
    //         return selectedOption = 
    //         `<select class="status">
    //                     <option class="bg-light" selected>To do</option>
    //                     <option class="bg-warning">In Progress</option>
    //                     <option class="bg-danger">To review</option>
    //                     <option class="bg-success">Done</option>
    //         </select>` 
    //     } else if(status === "In Progress") {
    //         return selectedOption =
    //         `<select class="status">
    //                     <option class="bg-light">To do</option>
    //                     <option class="bg-warning" selected>In Progress</option>
    //                     <option class="bg-danger">To review</option>
    //                     <option class="bg-success">Done</option>
    //         </select>`
    //     } else if(status === "To review") {
    //         return selectedOption =
    //         `<select class="status">
    //                     <option class="bg-light">To do</option>
    //                     <option class="bg-warning">In Progress</option>
    //                     <option class="bg-danger" selected>To review</option>
    //                     <option class="bg-success">Done</option>
    //         </select>` 
    //     } else if(status === "Done") {
    //         return selectedOption =
    //         `<select class="status">
    //                     <option class="bg-light">To do</option>
    //                     <option class="bg-warning">In Progress</option>
    //                     <option class="bg-danger">To review</option>
    //                     <option class="bg-success" selected>Done</option>
    //         </select>` 
    //     }
        
    // }

    // // Create Task
    // const createTaskHTML = () => {
    //     newTask.forEach(task => {
    //         displayCorrectStatus();
    //         newTaskCard = document.createElement("div");
    //         taskCard = 
    //         `<div data-id=${task.id} class="card shadow p-3 mb-2 bg-body rounded list-group-item">
    //             <div class="card-body">
    //             <div class="row">
    //                 <div class="col-9">
    //                 <h5>${task.name}</h5>
    //                 <p>${task.description}</p>
    //                 </div>
    //                 <div class="col-3 status-container">
    //                     ${selectedOption}
    //                     <button type="button" class="btn btn-success mark-done">Mark as done</button>
    //                 </div>
    //                 <div class="row"></div>
    //                 <div class="col-5">
    //                 <h6>Assign to: ${task.assignedFName} ${task.assignedLName}</h6>
    //                 </div>
    //                 <div class="col-4">
    //                 <h6>Due date: ${task.dueDate}</h6>
    //                 </div>
    //                 <div class="col-3">
    //                 <button
    //                     id="edit-btn"
    //                     type="button"
    //                     class="btn btn-warning m-2 edit-btn"
    //                     data-bs-toggle="modal"
    //                     data-bs-target="#editTaskModal"
    //                 >
    //                     Edit Task
    //                 </button>
    //                 <button class="btn btn-danger delete-btn" type="button">Delete</button>
    //                 </div>
    //             </div>
    //             </div>
    //         </div>` 
    //     newTaskCard.innerHTML = taskCard
        
    // })};
    // createTaskHTML();

    // // Display Task
    // const render = () => {
    //     if (status === "To do") {
    //         todoContainer.insertAdjacentElement("beforeend", newTaskCard);
    //     } else if(status === "In Progress") {
    //         inProgressContainer.insertAdjacentElement("beforeend", newTaskCard);
    //     } else if(status === "To review") {
    //         toReviewContainer.insertAdjacentElement("beforeend", newTaskCard);
    //     } else if(status === "Done") {
    //         completedContainer.insertAdjacentElement("beforeend", newTaskCard);
    //     }
    // }
    // render();  

    // const createTask = (status) => {
    // let taskName = e.target.taskname.value
    // let description = e.target.description.value
    // let assigneeFirstName = e.target.assigneeFName.value
    // let assigneeLastName = e.target.assigneeLName.value
    // let dueDate = e.target.dueDate.value
    // let status = e.target.status.value
    

   
    // createTaskHTML();

    
// }