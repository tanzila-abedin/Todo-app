export class ToDoTask{
     constructor(name,priority,dueDate){
          this.name = name

          this.priority = priority;
          this.dueDate = dueDate
     } 

     updateTask(newTask){
       this.name = newTask
       return this.name
     }

     getDueDate(date){
       this.dueDate = date;
       return this.dueDate
     }
}

export let projectArray = []

export class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];
  }

  taskArray() {
    return this.taskArray;
  }

  // projectTitle() {
  //   return this.title;
  // }

  static findProject(title){
    return projectArray.find((project) => {
     return project.title === title
    })
  }

   addNewTask(newTask) {
    if (!this.taskArray.find((task) => task.name === newTask.name)){
      return this.taskArray.push(newTask);
      // console.log(this.taskArray)
   }
  }

  static isPresent(projectName) {
    return projectArray.some(
      (project) => {
       return project.title === projectName
  
      }
    );
  }


  removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask);
    return this.taskArray;
  }

  static addProject(newProject) {
    if (!projectArray.find((project) => project.title === newProject.title)){
     projectArray.push(newProject);
     console.log(projectArray)
    }
  }

   static deleteProject(projectName) {
    const deleteProject = projectArray.find(
      (project) => project.title === projectName
    );
    projectArray.splice(projectArray.indexOf(deleteProject), 1);
  }
}

