// import {projectArray } from "./show"
import {getProject, setProject} from "./localStorage"
// import Show from "./show";


export let projectArray;
if (getProject() && getProject().length) {
  projectArray = getProject();
} else {
  projectArray = [];
}


export class ToDoTask{
     constructor(name,description,priority,dueDate){
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


export class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];
 }

 static taskArray() {
    return this.taskArray;
  }

  // projectTitle() {
  //   return this.title;
  // }

  static findProjectIndex(title){
    return projectArray.findIndex((project) => {
     return project.title === title
    })
  }

  static findProject(title){
    return projectArray.find((project) => {
     return project.title === title
    })
  }

  //  addNewTask(newTask) {
  //   if (!this.taskArray.find((task) => task.name === newTask.name)){
  //     return this.taskArray.push(newTask);
  //     // console.log(this.taskArray)
  //  }
  // }

  static isPresent(projectName) {
    return projectArray.some(
      (project) => {
       return project.title === projectName
  
      }
    );
  }


   static removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask.title);
    return this.taskarray
  }

  static addProject(newProject) {
    if (!projectArray.find((project) => project.title === newProject.title)){
     projectArray.push(newProject);
     console.log(projectArray)
     setProject(projectArray)
    }
  }

   static deleteProject(projectName) {
    const deleteProject = projectArray.findIndex(
      (project) => project.title === projectName
    );
    const projects = getProject()
    projects.splice(deleteProject,1);
    setProject(projects);
  }
}

