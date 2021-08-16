export class ToDoTask{
     constructor(name,description,dueDate,priority){
          this.name = name
          this.description = description
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
    // this.taskArray.push(new ToDoTask('Default'))
  }
  
  taskArray(){
    return this.taskArray
  }

  addTask(newTask) {
    if (this.taskArray.find((task) => task.name === newTask.name)) 
    return this.taskArray.push(newTask);
  }

  isPresent(projectName){
     return this.projectArray.some((project) => project.projectTitle() === projectName);
  }

  removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask);
    return this.taskArray;
  }

  projectTitle(){
    return this.title
  }

  addProject(newProject) {
    if (projectArray.find((project) => project.title === newProject.title))
      return projectArray.push(newProject);
  }

  // deleteProject(projectName) {
  //   const deleteProject = projectArray.find(
  //     (project) => project.title === projectName
  //   );
  //   projectArray.splice(projectArray.indexOf(deleteProject), 1);
  // }
}

