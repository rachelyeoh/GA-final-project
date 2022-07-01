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
        this.parsedTasksObject = JSON.parse(localStorage.getItem("Tasks"))
        // this.newTask = []
    }

    getAllTasks() {
        localStorage.getItem("Tasks")
    }

    getTasksWithStatus(status) {
        // const parsedTasksObject = JSON.parse(localStorage.getItem("Tasks"))
        this.parsedTasksObject.forEach(eachTaskObject => {
            if((eachTaskObject.status === status)) {
                return eachTaskObject
            } else {
                return "No Task Found"
            }
        })
    }

    getTaskWithId(id) {
        this.parsedTasksObject.forEach(eachTaskObject => {
            if((eachTaskObject.id == id)) {
                console.log(eachTaskObject)
                return eachTaskObject
            } else {
                return "No Task Found"
            }
        })
    }

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }

    setDoneStatus(task) {
        task.status = "Done"
    }

    deleteTask(taskId) {
        // NOT WORKING, NEED TO FIX THIS
        this.getTaskWithId(taskId)
        newTask.splice(taskId, 1)
        console.log(newTask)
    }
};
