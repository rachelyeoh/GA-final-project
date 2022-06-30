/****************   Task Class/Object   ****************/
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
    }

    getAllTasks() {
        localStorage.getItem("Tasks")
    }

    getTasksWithStatus(status) {
        let parsedTasksObject = JSON.parse(localStorage.getItem("Tasks")) 
        parsedTasksObject.forEach(eachTaskObject => {
            console.log((eachTaskObject.status === status))
            if((eachTaskObject.status === status)) {
                return eachTaskObject
            } else {
                return "No Object Found"
            }
        })
    }

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }
};
