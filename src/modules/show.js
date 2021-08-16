import { ToDoTask, Project, projectArray } from "./constructor";

const ProjectList = document.getElementById("project-list");
const appendProjectToList = document.getElementById("project-home");
const projectFormContainer = document.getElementById("project-form-container");
const projectForm = document.getElementById("project-form");
// const projectInput = document.getElementsByClassName("project-input");
const projectSubmit = document.getElementById("project-submit");
// const taskFormContainer = document.getElementById("task-form-container");

const newProject = new Project();

export default class Show {
  static addProject() {
    const projectInput = document.getElementById("project-input");
    const projectValue = projectInput.value; 
    if (projectValue == "") {
      alert("Fill in a Project Name");     
      return;
    } 

//     if (projectArray.isPresent(projectValue)) {
//       projectInput.value = "";
//       alert("choose a different project name");
//     }
     //    const newProject = new Project(projectValue);
        newProject.addProject(projectValue); 
        Show.newProjectTemplate(projectValue);
        Show.newTaskForm(projectValue)

  }

  static newProjectTemplate(title) {
    appendProjectToList.innerHTML += `
     <li class="left-container d-flex align-items-baseline justify-content-between">
       <span>${title}</span>
       <i class="far fa-trash-alt p-2 delete"></i>
     </li>`;
     Show.deleteProjectEvent()
  }

  static newTaskForm(projectTitle){
     const taskFormContainer = document.getElementById("task-form-container");
       taskFormContainer.innerHTML += `
       <div>
           <h4>${projectTitle}</h4>
           <form action="/action_page.php" class="d-flex justify-content-center align-items-center task-form id="usrform">
                 <label for="task-name" class="p-2">Name</label><br>
                 <input type="text" id="task-name" name="task-name" value="" placeholder="name"><br>

                 <label for="priority" class="p-2">Priority</label>
                 <select id="priority" name="priority">
                   <option value="High">High</option>
                   <option value="Medium">Medium</option>
                   <option value="Low">Low</option>
                 </select>

                 <label for="due-date" class="p-2">Date</label>
                 <input type="datetime-local" id="due-date" name="due-date">
                 
                 <input type="submit" id="task-submit">
               </form> 
       </div>`;
       Show.taskEvent()
  }

  static taskEvent(){
     const taskSubmit = document.getElementById('task-submit')
     taskSubmit.addEventListener("click",
     (e) => {e.preventDefault(),
      Show.addTask()
     }
    ) 
  }
  
  static addTask(){
       const taskName = document.getElementById("task-name")   
       const taskNameInput = taskName.value
     //   const description = document.getElementById('description')
     //   const descInput = description.value
       const priority = document.getElementById('priority')
       const priorityInput = priority.value
       const dueDate = document.getElementById("due-date");
       const dueDateinput = dueDate.value
      
       newProject.addTask(new ToDoTask(taskNameInput,priorityInput, dueDateinput))
       Show.newTaskCard(taskNameInput,priorityInput, dueDateinput);
  }

  static newTaskCard(name,priority,dueDate){
       const taskFormContainer = document.getElementById("task-form-container");
       taskFormContainer.innerHTML += `
      <div class="row">
       <div class="col-sm-6">
         <div class="card">
           <div class="card-body">
             <h5 class="card-title" id="card-task-name">${name}</h5>

             <p class="card-text" id="card-priority">${priority}</p>
             <p class="card-text" id="card-duedate">${dueDate}</p>
             <i class="far fa-trash-alt p-2"></i>
           </div>
         </div>
       </div>
     </div>`;
  }

  static projectEvent(){
    projectSubmit.addEventListener(
      "click",
      (e) => {
        e.preventDefault(),
       Show.addProject()
      },
    );
  }

  static deleteProjectEvent(){
       appendProjectToList.addEventListener('click', (e) => {
          if(e.target.classList.contains('delete')){
               e.target.parentElement.remove()
          }
       })
  }

//   static deleteProjectEvent(){
    
//   }
}

// (e) => {
//   if (e.target.classList.contains("delete")) {
//     e.target.parentElement.remove();
//   }
// };