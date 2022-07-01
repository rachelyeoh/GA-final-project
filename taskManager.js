/****************   Task Class/Object   ****************/
export let newTask = [];
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
                return "No Object Found"
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

    deleteTask(task) {
        console.log(newTask)
        // NEED TO FIX THIS ARRAY NOT WORKING
        const taskBefore = [...newTask.slice(task - 1, task)]
        console.log(taskBefore)
        const taskAfter = [...newTask.slice(task + 1, task + 2)]
        console.log(taskAfter)
        newTask = [...taskBefore, ...taskAfter]
        console.log(newTask)
    }
};
