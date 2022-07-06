/****************   Task Class/Object   ****************/
import { createTaskHTML, editTaskName, editDesc, editAssigneedFirstName, editAssigneeLastName, editDueDate, editStatus } from './script.js'
export const newTask = [];
export default class TaskManager {
    constructor(name, description, assignedFName, assignedLName, dueDate, status) {
        this.id = newTask.length;
        this.name = name;
        this.description = description;
        this.assignedFName = assignedFName;
        this.assignedLName = assignedLName;
        this.dueDate = dueDate;
        this.status = status;
        this.idOfEditTask;
    }

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }

    static getAllTasks() {
        return localStorage.getItem("Tasks")
    }

    //***NOTE: THIS IS EXTRA CODE/NOT USED AS KRUTI STEP BY STEP GUIDE SHOW TO INCLUDE THIS
    // static getTasksWithStatus(status) {
    //     JSON.parse(localStorage.getItem("Tasks")).forEach(eachTaskObject => {
    //         console.log(eachTaskObject)
    //         if((eachTaskObject.status === status)) {
    //             return eachTaskObject
    //         } else {
    //             return "No Task Found"
    //         }
    //     });
    // };

    static displayValueOnForm(id) {
        // Set id of this particular task
        this.idOfEditTask = id;
        newTask.forEach(eachTaskObject => {
            if((eachTaskObject.id == id)) {
                editTaskName.setAttribute("value", eachTaskObject.name)
                editDesc.innerText = eachTaskObject.description
                editAssigneedFirstName.setAttribute("value", eachTaskObject.assignedFName)
                editAssigneeLastName.setAttribute("value", eachTaskObject.assignedLName)
                editDueDate.setAttribute("value", eachTaskObject.dueDate)
                switch(eachTaskObject.status) {
                    case "To do":
                      editStatus.selectedIndex = 0
                      break;
                    case "In Progress":
                      editStatus.selectedIndex = 1
                      break;
                    case "To review":
                     editStatus.selectedIndex = 2
                      break;
                    case "Done":
                      editStatus.selectedIndex = 3
                      break;
                }
            }
        })
    }

    static updateTask() {
        // Get this particular task card from new task array
        const thisTask = newTask[this.idOfEditTask]
        // Change the value internally
        thisTask.name = editTaskName.value
        thisTask.description = editDesc.textContent
        thisTask.assignedFName = editAssigneedFirstName.value
        thisTask.assignedLName = editAssigneeLastName.value
        thisTask.dueDate = editDueDate.value
        thisTask.status = editStatus.value
        // Create task card
        createTaskHTML(thisTask)
    }

    static getIndexOfTask(taskId) {
        return newTask.findIndex(task => task.id == taskId)
    }

    static setitems() {
        // Clear local storage
        localStorage.clear()
        // Set items to local storage
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }

    static setDoneStatus(task) {
        // Set status to 'Done'
        task.status = "Done"
        // Update local storage
        this.setitems()
    }

    static deleteTask(taskId) {
        // Remove task internally from array
        newTask.splice(this.getIndexOfTask(taskId), 1)
        // Update local storage
        this.setitems()
    }
};
