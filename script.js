/****************   Buttons   ****************/
const createTaskButton = document.querySelector("#create-task")
/****************   Input form   ****************/
// Name
const taskName = document.querySelector("#taskname");
const taskNameInvalidFeedback = document.querySelector("#taskNameInvalidFeedback");
// Description
const descname = document.querySelector("#descname");
const descnameInvalidFeedback = document.querySelector("#descnameInvalidFeedback");
// Assignee
const assigneename  = document.querySelector("#assigneename");
const assigneenameInvalidFeedback = document.querySelector("#assigneenameInvalidFeedback");
/****************   Date   ****************/
// Current date
let currentDateSpan = document.querySelector("#current-date");
let todayDate = new Date();
let date = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
let todayDatePrimitive = todayDate[Symbol.toPrimitive]('number');
// Due date
const dueDate = document.querySelector("#duedate");
const dueDateError = document.querySelector("#dueDateError")


const changeCurrentDate = () => {
    currentDateSpan.innerText = date;
}

changeCurrentDate();

const formValidation = () => {
    // If input length for name is less than or equal to 8
    if(taskName.value.length <= 8) {
        taskNameInvalidFeedback.style.display = "inline";
        taskName.classList.add("is-invalid")
    } else {
        taskNameInvalidFeedback.style.display = "none";
        taskName.classList.remove("is-invalid")
    };

    // If input length for description is less than or equal to 15
    if(descname.value.length <= 15) {
       descnameInvalidFeedback.style.display = "inline";
        descname.classList.add("is-invalid")
    } else {
        descnameInvalidFeedback.style.display = "none";
        descname.classList.remove("is-invalid")
    };

    // If input length for assignee first name is less than or equal to 8
    if(assigneename.value.length <= 8) {
        assigneenameInvalidFeedback.style.display = "inline";
         assigneename.classList.add("is-invalid")
    } else {
         assigneenameInvalidFeedback.style.display = "none";
         assigneename.classList.remove("is-invalid")
    };

    if(new Date(dueDate.value).getTime() <= todayDatePrimitive) {
        dueDateError.style.display = "inline";
        dueDate.classList.add("is-invalid")
    } else {
        dueDateError.style.display = "none";
        dueDate.classList.remove("is-invalid")
    };
};


createTaskButton.addEventListener("click", () => {
    formValidation();
});