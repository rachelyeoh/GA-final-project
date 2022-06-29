const taskName = document.querySelector("#taskname");
const taskNameInvalidFeedback = document.querySelector("#taskNameInvalidFeedback");
const createTaskButton = document.querySelector("#create-task")

createTaskButton.addEventListener("click", () => {
    // If input length for name is less than or equal to 8
    if(taskName.value.length <= 8) {
        taskNameInvalidFeedback.style.display = "inline";
        taskName.classList.add("is-invalid")
    } else {
        taskNameInvalidFeedback.style.display = "none";
        taskName.classList.remove("is-invalid")
    }
})