let newTask = [];
export class TaskManager {
    constructor(name, description, assignedFName, assignedLName, dueDate, status) {
      this.id = newTask.length;
      this.name = name;
      this.description = description;
      this.assignedFName = assignedFName;
      this.assignedLName = assignedLName;
      this.dueDate = dueDate;
      this.status = status;
    //   this.addTask();
    }

    getAllTasks() {
        console.log(localStorage.getItem("Tasks"))
    }

    getTasksWithStatus(status) {
        let parsedTasksObject = JSON.parse(localStorage.getItem("Tasks"))
        console.log(parsedTasksObject) //assign variable + check if variable.status is status; return variable. 
        parsedTasksObject.forEach(eachTaskObject => {
            console.log((eachTaskObject.status === status))
            if((eachTaskObject.status === status)) {
                return console.log(eachTaskObject)
            } else {
                return console.log("No Object Found")
            }
            

            
            // if(status === "To do") {
            //     console.log(eachTaskObject.status === "To do")
            //     return eachTaskObject.status === "To do"
            // } else if(status === "In Progress") {
            //     console.log(eachTaskObject.status === status)
            //     return eachTaskObject.status === "In Progress"
            // } else if(status === "To review") {
            //     return eachTaskObject.status === "To review"
            // } else if(status === "Done") {
            //     return eachTaskObject.status === "Done"
            // };
        });
    };

    addTask() {
        newTask.push(this)
        localStorage.setItem("Tasks", JSON.stringify(newTask))
    }
};
