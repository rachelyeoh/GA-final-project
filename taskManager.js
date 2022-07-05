/****************   Task Class/Object   ****************/
import { createTaskHTML } from './script.js'
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

    static getAllTasks() {
        return localStorage.getItem("Tasks")
    }

    static getTasksWithStatus(status) {
        JSON.parse(localStorage.getItem("Tasks")).forEach(eachTaskObject => {
            console.log(eachTaskObject)
            if((eachTaskObject.status === status)) {
                return eachTaskObject
            } else {
                return "No Task Found"
            }
        })
    }

    // This method not working properly, need to check set Item to local storage. Sometimes there's delay
    static displayValueOnForm(id) {
        const taskName = document.querySelector("#editTaskModal .taskname")
        const desc = document.querySelector("#editTaskModal .descname")
        const assigneedFirstName = document.querySelector("#editTaskModal .assigneename")
        const assigneeLastName = document.querySelector("#editTaskModal .assigneeLName")
        const dueDate = document.querySelector("#editTaskModal .duedate")
        const status = document.querySelector("#editTaskModal #status")
        this.idOfEditTask = id;
        console.log(this.idOfEditTask)
        newTask.forEach(eachTaskObject => {
            if((eachTaskObject.id == id)) {
                taskName.setAttribute("value", eachTaskObject.name)
                desc.innerText = eachTaskObject.description
                assigneedFirstName.setAttribute("value", eachTaskObject.assignedFName)
                assigneeLastName.setAttribute("value", eachTaskObject.assignedLName)
                dueDate.setAttribute("value", eachTaskObject.dueDate)
                switch(eachTaskObject.status) {
                    case "To do":
                      status.selectedIndex = 0
                      console.log(status.selectedIndex)
                      break;
                    case "In Progress":
                      status.selectedIndex = 1
                      console.log(status.selectedIndex)
                      break;
                    case "To review":
                      status.selectedIndex = 2
                      console.log(status.selectedIndex)
                      break;
                    case "Done":
                      status.selectedIndex = 3
                      console.log(status.selectedIndex)
                      break;
                }
            }
        })
    }

    static updateTask() {
        const taskName = document.querySelector("#editTaskModal .taskname")
        const desc = document.querySelector("#editTaskModal .descname")
        const assigneedFirstName = document.querySelector("#editTaskModal .assigneename")
        const assigneeLastName = document.querySelector("#editTaskModal .assigneeLName")
        const dueDate = document.querySelector("#editTaskModal .duedate")
        const status = document.querySelector("#editTaskModal #status")
        const thisTask = newTask[this.idOfEditTask]
    
        thisTask.name = taskName.value
        thisTask.description = desc.textContent
        thisTask.assignedFName = assigneedFirstName.value
        thisTask.assignedLName = assigneeLastName.value
        thisTask.dueDate = dueDate.value
        thisTask.status = status.value
        // Create task card
        createTaskHTML(thisTask)
    }

    static getIndexOfTask(taskId) {
        return newTask.findIndex(task => task.id == taskId)
    }

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }

    // static render(status) {
    //     let todoContainer = document.querySelector('#to-do');
    //     let inProgressContainer = document.querySelector('#in-progress');
    //     let toReviewContainer = document.querySelector('#to-review');
    //     let completedContainer = document.querySelector('#completed');
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

    static setitems() {
        localStorage.clear()
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }

    static setDoneStatus(task) {
        console.log(task)
        task.status = "Done"
        this.setitems()
    }

    static deleteTask(taskId) {
        newTask.splice(this.getIndexOfTask(taskId), 1)
        this.setitems()
    }
};
