/****************   Buttons   ****************/
const createTaskButton = document.querySelector("#create-task")
/****************   Input form   ****************/
// Name
const taskName = document.querySelectorAll(".taskname");
const taskNameInvalidFeedback = document.querySelector(".taskNameInvalidFeedback");
// Description
const descname = document.querySelectorAll(".descname");
const descnameInvalidFeedback = document.querySelector(".descnameInvalidFeedback");
// Assignee
const assigneename  = document.querySelectorAll(".assigneename");
const assigneenameInvalidFeedback = document.querySelector(".assigneenameInvalidFeedback");
/****************   Date   ****************/
// Current date
let currentDateSpan = document.querySelector("#current-date");
let todayDate = new Date();
let date = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
let todayDatePrimitive = todayDate[Symbol.toPrimitive]('number');
// Due date
const dueDate = document.querySelectorAll(".duedate");
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
            console.log(taskNameInvalidFeedback)
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

/****************   Task Class/Object   ****************/
 


/****************   Display task   ****************/
// createTaskButton.addEventListener("click", () => {
    
// });