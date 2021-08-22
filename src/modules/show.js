import { ToDoTask, Project, projectArray} from "./constructor";
import {setProject, getProject } from "./localStorage"





const ProjectList = document.getElementById("project-list");
const appendProjectToList = document.getElementById("project-home");
const projectFormContainer = document.getElementById("project-form-container");
const projectForm = document.getElementById("project-form");
const projectSubmit = document.getElementById("project-submit");
const taskFormContainer = document.getElementById("task-form-container");

const newProject = new Project();

export default class Show {
  

  static addProject() {
    const projectInput = document.getElementById("project-input");
    const projectValue = projectInput.value;
    if (projectValue == "") {
      alert("Fill in a Project Name");
      return;
    }
    if (Project.isPresent(projectValue)) {
      projectInput.value = "";
      alert("choose a different project name");
    } else {
      const newProject = new Project(projectValue);
      Project.addProject(newProject);
      Show.newProjectTemplate(projectValue);
      taskFormContainer.innerHTML = "";
      Show.newTaskForm(projectValue);
    }
  }

  static defaultProject() {
    const project = new Project("Default");
    Project.addProject(project);
    Show.newProjectTemplate("Default");
    taskFormContainer.innerHTML = "";
    Show.newTaskForm("Default");
  }

  static projectButtons() {
    const projectButtons = document.querySelectorAll(".project-btn");
    projectButtons.forEach((projectButton, index) => {
      projectButton.addEventListener("click", (e) => {
        e.preventDefault();
        const taskFormContainer = document.getElementById(
          "task-form-container"
        );
        taskFormContainer.innerHTML = "";

        const taskAddContainer = document.getElementById("add-task-container");
        taskAddContainer.innerHTML = "";
        Show.newTaskForm(projectButton.textContent);
        projectArray[index].taskArray.forEach((task) => {
          Show.newTaskCard(
            task.name,
            task.description,
            task.priority,
            task.dueDate
          );
        });
      });
    });
  }

  static newProjectTemplate(title) {
    appendProjectToList.innerHTML += `
     <li class="left-container d-flex align-items-baseline justify-content-evenly">
      <span class="project-btn">${title}</span>
      <button class="delete"><i class="far fa-trash-alt p-2"></i></button>
     </li>`;
    
    Show.projectButtons(title);
    Show.deleteProjectEvent();
  }

  static newTaskForm(projectTitle) {
    const taskFormContainer = document.getElementById("task-form-container");
    taskFormContainer.innerHTML += `
       <div>
           <h4 id="project-title">${projectTitle}</h4>
           <form class="d-flex flex-column align-items-center task-form" id="usrform">
                 <label for="task-name" class="p-2">Name</label>
                 <input type="text" id="task-name" name="task-name" value="" placeholder="name">
                 
                <label for="description" class="p-2">Description</label>
                <input type="text" id="description" name="description" value="" placeholder="description">


                 <label for="priority" class="p-2">Priority</label>
                 <select id="priority" name="priority">
                   <option value="High">High</option>
                   <option value="Medium">Medium</option>
                   <option value="Low">Low</option>
                 </select>

                 <label for="due-date" class="p-2">Date</label>
                 <input type="datetime-local" id="due-date" name="due-date"><br>
                 
                 <input type="submit" id="task-submit">
               </form> 
       </div>`;
    const projectIndex = Project.findProject(projectTitle);
    const project = projectArray[projectIndex]
    Show.taskEvent(project, projectIndex);
  }

  static taskEvent(project,index) {
    const taskSubmit = document.getElementById("usrform");
    taskSubmit.addEventListener("submit", (e) => {
      e.preventDefault();
      Show.addTask(project,index);
    });
  }

  static addTask(project,index) {
    const taskName = document.getElementById("task-name");
    const taskNameInput = taskName.value;
    const description = document.getElementById("description");
    const descInput = description.value;
    const priority = document.getElementById("priority");
    const priorityInput = priority.value;
    const dueDate = document.getElementById("due-date");
    const dueDateinput = dueDate.value;
    const projects = getProject()

    const newTask = new ToDoTask(
       taskNameInput,
       descInput,
       priorityInput,
       dueDateinput
     );

    if (!projects[index].taskArray.find((task) => task.name === newTask.name)){
        projects[index].taskArray.push(newTask);
        setProject(projects);
        Show.newTaskCard(taskNameInput, descInput, priorityInput, dueDateinput);
        return 
      // console.log(this.taskArray)
   }
    // setProject(project)
 
    // projects[index].addNewTask(
    //   new ToDoTask(taskNameInput, descInput, priorityInput, dueDateinput)
    // );
    // Show.newTaskCard(taskNameInput, descInput, priorityInput, dueDateinput);
  }

  static newTaskCard(name, description, priority, dueDate) {
    const addTaskContainer = document.getElementById("add-task-container");
    addTaskContainer.innerHTML += `
      <div class="row" id="task-card-container">
       <div class="col-sm-12">
         <div class="card d-flex flex-column">
           <div class="card-body">
             <h5 class="card-title" id="card-task-name">${name}</h5>
             <p class="card-text" id="card-description">${description}</p>
             <p class="card-text" id="card-priority">${priority}</p><br>
             <p class="card-text" id="card-duedate">${dueDate}</p>
             <button class="remove"><i class="far fa-trash-alt p-2 trash"></i></button>
           </div>
         </div>
       </div>
     </div>`;
    Show.removeTaskEvent();
  }

  static projectEvent() {
    projectSubmit.addEventListener("click", (e) => {
      e.preventDefault(),
       Show.addProject();
      const resetForm = document.getElementById('my-form')
      resetForm.reset();
    });
  }

  static deleteProjectEvent() {
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", (e) => {
        Project.deleteProject(index);
        e.target.parentElement.parentElement.remove();
        taskFormContainer.innerHTML = "";
        const taskAddContainer = document.getElementById("add-task-container");
        taskAddContainer.innerHTML = "";
        Show.newTaskForm("Default");
      });
    });
  }

  static removeTaskEvent() {
    const removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", (e) => {

        const projectName = document.getElementById('project-title')
        const findProject = Project.findProject(projectName.textContent)

        const findTask = findProject.taskArray.find((task) => task.name === index);
        findProject.taskArray.splice(findProject.taskArray.indexOf(findTask), 1);
        
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
        const taskAddContainer = document.getElementById("add-task-container");
        taskAddContainer.innerHTML = "";


      });
    });
  }
}
