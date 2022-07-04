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
        // this.parsedTasksObject = JSON.parse(localStorage.getItem("Tasks"))
        // this.newTask = []
    }

    getAllTasks() {
        localStorage.getItem("Tasks")
    }

    static getTasksWithStatus(status) {
        // const parsedTasksObject = JSON.parse(localStorage.getItem("Tasks"))
        console.log(localStorage.getItem("Tasks"))
        console.log(JSON.parse(localStorage.getItem("Tasks")))
        JSON.parse(localStorage.getItem("Tasks")).forEach(eachTaskObject => {
            console.log(eachTaskObject)
            console.log(status)
            if((eachTaskObject.status === status)) {
                console.log("It's the same")
                return eachTaskObject
            } else {
                return "No Task Found"
            }
        })
    }

    // This method not working properly, need to check set Item to local storage. Sometimes there's delay
    getTaskWithId(id) {
        console.log(this.parsedTasksObject)
        JSON.parse(localStorage.getItem("Tasks")).forEach(eachTaskObject => {
            console.log(eachTaskObject)
            if((eachTaskObject.id == id)) {
                return eachTaskObject
            } else {
                console.log("No Task Found")
            }
        })
    }

    getIndexOfTask(taskId) {
        return newTask.findIndex(task => task.id == taskId)
    }

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }

    setDoneStatus(task) {
        task.status = "Done"
        console.log(newTask)
    }

    deleteTask(taskId) {
        newTask.splice(this.getIndexOfTask(taskId), 1)
        console.log(newTask)
    }
};
