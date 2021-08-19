import { ToDoTask, Project, projectArray } from "./constructor";

const ProjectList = document.getElementById("project-list");
const appendProjectToList = document.getElementById("project-home");
const projectFormContainer = document.getElementById("project-form-container");
const projectForm = document.getElementById("project-form");
// const projectInput = document.getElementsByClassName("project-input");
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
        taskFormContainer.innerHTML = ''
        Show.newTaskForm(projectValue)
        // Show.projectButtons(projectValue)
      }
  }

  static defaultProject(){
    const project = new Project('Default')
     Project.addProject(project); 
     Show.newProjectTemplate('Default')
    taskFormContainer.innerHTML = ''
     Show.newTaskForm('Default');
    }

  static projectButtons(){
    const projectButtons = document.querySelectorAll('.project-btn')
      projectButtons.forEach((projectButton,index) => {
        projectButton.addEventListener('click',(e) => {
          e.preventDefault()
          // alert("clicked");
          const taskFormContainer = document.getElementById("task-form-container");
          taskFormContainer.innerHTML = ''

          const taskAddContainer = document.getElementById("add-task-container")
          taskAddContainer.innerHTML = ''
          Show.newTaskForm(projectButton.textContent);
          // Show.taskEvent(projectArray[index])
           projectArray[index].taskArray.forEach((task) => {
             Show.newTaskCard(task.name, task.priority, task.dueDate);
            //  Show.taskEvent();      
        })
  
      })
    })
  }

  static newProjectTemplate(title) {
    appendProjectToList.innerHTML += `
     <li class="left-container d-flex align-items-baseline justify-content-evenly">
      <span class="project-btn">${title}</span>
      <i class="far fa-trash-alt p-2 delete"></i>
     </li>`;
     Show.projectButtons(title)
     Show.deleteProjectEvent(title)
  }


//   const projectButtons = () => {
//   const projectButtons = document.querySelectorAll('.project-btn');
//   projectButtons.forEach((projectButton, index) => {
//     projectButton.addEventListener('click', () => {
//       const todoItemsList = dom.myQuery('.todo-items-list');
//       todoItemsList.innerHTML = '';
//       projects[index].todoList.forEach((todoList) => {
//         todoItemsList.append(createTodoList(projects, todoList));
//       });
//       const buttonsDiv = dom.myQuery('.buttons');
//       buttonsDiv.innerHTML = '';
//       clearButton(projects, projectButton);
//       deleteButton(projects, projectButton);
//     });
//   });
// };

  static newTaskForm(projectTitle){
     const taskFormContainer = document.getElementById("task-form-container");
       taskFormContainer.innerHTML += `
       <div>
           <h4>${projectTitle}</h4>
           <form class="d-flex justify-content-center align-items-center task-form" id="usrform">
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
       const project = Project.findProject(projectTitle)
       Show.taskEvent(project)
  }

  static taskEvent(project){
     const taskSubmit = document.getElementById('usrform')
     taskSubmit.addEventListener("submit",(e) => {
       e.preventDefault();
      Show.addTask(project)
     }
    ) 
  }
  
  static addTask(project){
       const taskName = document.getElementById("task-name")   
       const taskNameInput = taskName.value
     //   const description = document.getElementById('description')
     //   const descInput = description.value
       const priority = document.getElementById('priority')
       const priorityInput = priority.value
       const dueDate = document.getElementById("due-date");
       const dueDateinput = dueDate.value
      
       project.addNewTask(new ToDoTask(taskNameInput,priorityInput, dueDateinput))
      // const userForm = document.getElementById('usrform')
      //   userForm.reset()
       Show.newTaskCard(taskNameInput,priorityInput, dueDateinput);
  }

  static newTaskCard(name,priority,dueDate){
       const addTaskContainer = document.getElementById("add-task-container");
       addTaskContainer.innerHTML += `
      <div class="row" id="task-card-container">
       <div class="col-sm-6">
         <div class="card">
           <div class="card-body">
             <h5 class="card-title" id="card-task-name">${name}</h5>

             <p class="card-text" id="card-priority">${priority}</p>
             <p class="card-text" id="card-duedate">${dueDate}</p>
             <i class="far fa-trash-alt p-2 delete"></i>
           </div>
         </div>
       </div>
     </div>`;
     Show.removeTaskEvent()
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

  static deleteProjectEvent(projectName){
       appendProjectToList.addEventListener('click', (e) => {
          if(e.target.classList.contains('delete')){
              e.target.parentElement.remove()
              // return Project.deleteProject(projectName)
          }
       })
  }

  static removeTaskEvent(){
     const taskForm = document.getElementById("add-task-container");
     taskForm.addEventListener('click',(e) => {
          if(e.target.classList.contains('delete')){
              return e.target.parentNode.parentNode.parentNode.parentNode.remove()
          }
     })
  }
}
