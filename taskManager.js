/****************   Task Class/Object   ****************/
export const newTask = [];
export const parsedTasksObject = JSON.parse(localStorage.getItem("Tasks")) 
export default class TaskManager {
    constructor(name, description, assignedFName, assignedLName, dueDate, status) {
        this.id = newTask.length;
        this.name = name;
        this.description = description;
        this.assignedFName = assignedFName;
        this.assignedLName = assignedLName;
        this.dueDate = dueDate;
        this.status = status;
        // this.newTask = []
    }

    getAllTasks() {
        localStorage.getItem("Tasks")
    }

    getTasksWithStatus(status) {
        console.log(parsedTasksObject)
        parsedTasksObject.forEach(eachTaskObject => {
            if((eachTaskObject.status === status)) {
                return eachTaskObject
            } else {
                return "No Object Found"
            }
        })
    }

    getTaskWithId(id) {

    }

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }
};
