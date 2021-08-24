import { Project, projectArray } from './constructor';
import ToDoTask from './todoTask';
import { setProject, getProject } from './localStorage';

const appendProjectToList = document.getElementById('project-home');
const projectSubmit = document.getElementById('project-submit');
const taskFormContainer = document.getElementById('task-form-container');

export default class Show {
  static addProject() {
    const projectInput = document.getElementById('project-input');
    const projectValue = projectInput.value;
    if (projectValue === '') {
      alert("Fill in a project name");
      return;
    }
    if (Project.isPresent(projectValue)) {
      alert("choose a diffrent name")
      projectInput.value = '';
    } else {
      const newProject = new Project(projectValue);
      Project.addProject(newProject);
      // setProject(projects)
      // Show.disStoredProject();
      Show.newProjectTemplate(projectValue);
      
      taskFormContainer.innerHTML = '';
      Show.newTaskForm(projectValue);
      const taskAddContainer = document.getElementById('add-task-container');
      taskAddContainer.innerHTML = '';
    }
  }

  static disStoredProject() {
    const projects = getProject()
    projects.forEach((element) => {
      const { title } = element;
      setProject(projects)
      Show.newProjectTemplate(title);
    });
  }

  static defaultProject() {
    const project = new Project('Default');
    Project.addProject(project);
    Show.disStoredProject();
    Show.projectButtons();     
    taskFormContainer.innerHTML = '';
    Show.newTaskForm('Default');
  }

  static projectButtons() {
    const projectButtons = document.querySelectorAll('.project-btn');
    projectButtons.forEach((projectButton, index) => {
      projectButton.addEventListener('click', (e) => {
        e.preventDefault();
        const taskFormContainer = document.getElementById(
          'task-form-container',
        );
        taskFormContainer.innerHTML = '';

        const taskAddContainer = document.getElementById('add-task-container');
        taskAddContainer.innerHTML = '';

        const projects = getProject();

        Show.newTaskForm(projectButton.textContent);
        projects[index].taskArray.forEach((task) => {
          setProject(projects);
          Show.newTaskCard(
            task.name,
            task.description,
            task.priority,
            task.dueDate,
          );
        });
        // setProject(projects);
        Show.editTaskEvent(index);
      });
    });
  }

  static newProjectTemplate(title) {
    appendProjectToList.innerHTML += `
     <li class="left-container d-flex align-items-baseline justify-content-between">
      <span class="project-btn">${title}</span>
      <button class="delete"><i class="far fa-trash-alt p-2"></i></button>
     </li>`;

    Show.projectButtons(title);
    Show.deleteProjectEvent();
  }

  static newTaskForm(projectTitle) {
    const taskFormContainer = document.getElementById('task-form-container');
    taskFormContainer.innerHTML += `
       <div class="text-center">
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
                 <input type="submit" class="d-none" id="task-update" name="update" value="update">
               </form> 
       </div>`;
    const projectIndex = Project.findProjectIndex(projectTitle);
    const project = projectArray[projectIndex];
    Show.taskEvent(project, projectIndex);
  }

  static taskEvent(project, index) {
    const taskSubmit = document.getElementById('usrform');
    taskSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      Show.addTask(project, index);
    });
  }

  static addTask(project, index) {
    const taskName = document.getElementById('task-name');
    const taskNameInput = taskName.value;
    const description = document.getElementById('description');
    const descInput = description.value;
    const priority = document.getElementById('priority');
    const priorityInput = priority.value;
    const dueDate = document.getElementById('due-date');
    const dueDateinput = dueDate.value;
    const projects = getProject();

    const newTask = new ToDoTask(
      taskNameInput,
      descInput,
      priorityInput,
      dueDateinput,
    );

    if (!projects[index].taskArray.find((task) => task.name === newTask.name)) {
      projects[index].taskArray.push(newTask);
      setProject(projects);
      Show.newTaskCard(taskNameInput, descInput, priorityInput, dueDateinput);
      Show.editTaskEvent(index);
    }
  }

  static newTaskCard(name, description, priority, dueDate) {
    const addTaskContainer = document.getElementById('add-task-container');
    addTaskContainer.innerHTML += `
      <div class="row" id="task-card-container">
       <div class="col-sm-12">
         <div class="card">
           <div class="card-body">
             <h5 class="card-title" id="card-task-name">${name}</h5>
             <p class="card-text" id="card-description">${description}</p>
             <p class="card-text" id="card-priority">${priority}</p><br>
             <p class="card-text" id="card-duedate">${dueDate}</p>
             <button class="remove"><i class="far fa-trash-alt p-2 trash"></i></button>
             <button class="edit"><i class="far fa-edit"></i></button>
           </div>
         </div>
       </div>
     </div>`;
    const title = document.getElementById('project-title').textContent;
    const projectIndex = Project.findProjectIndex(title);
    Show.removeTaskEvent();
    Show.editTaskEvent(projectIndex);
  }

  static editTaskEvent(index) {
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editbtn) => {
      editbtn.addEventListener('click', (e) => {
        e.preventDefault();
        const taskSubmit = document.getElementById('task-submit');
        taskSubmit.className = 'd-none';
        const taskUpdate = document.getElementById('task-update');
        taskUpdate.className = 'd-block';
        const title = e.target.parentNode.parentNode.childNodes[1].textContent;

        Show.updateTask(title, index);
      });
    });
  }

  static updateTask(title, index) {
    const updateBtn = document.getElementById('task-update');
    const projects = getProject();

    const todoIdx = projects[index].taskArray.findIndex((task) => task.name === title);
    const projectIdx = index;

    updateBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const taskName = document.getElementById('task-name');
      const taskNameInput = taskName.value;
      const description = document.getElementById('description');
      const descInput = description.value;
      const priority = document.getElementById('priority');
      const priorityInput = priority.value;
      const dueDate = document.getElementById('due-date');
      const dueDateInput = dueDate.value;

      projects[projectIdx].taskArray[todoIdx].name = taskNameInput;
      projects[projectIdx].taskArray[todoIdx].description = descInput;
      projects[projectIdx].taskArray[todoIdx].priority = priorityInput;
      projects[projectIdx].taskArray[todoIdx].dueDate = dueDateInput;

      setProject(projects);
      const taskAddContainer = document.getElementById('add-task-container');
      taskAddContainer.innerHTML = '';
      projects[projectIdx].taskArray.forEach((task) => {
        Show.newTaskCard(
          task.name,
          task.description,
          task.priority,
          task.dueDate,
        );
      });

      const taskSubmit = document.getElementById('task-submit');
      taskSubmit.className = 'd-block';
      const taskUpdate = document.getElementById('task-update');
      taskUpdate.className = 'd-none';
    });
  }

  static projectEvent() {
    projectSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      Show.addProject();
      const resetForm = document.getElementById('my-form');
      resetForm.reset();
    });
  }

  static deleteProjectEvent() {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', (e) => {
        Project.deleteProject(index);
        e.target.parentNode.parentNode.remove();
        taskFormContainer.innerHTML = '';
        const taskAddContainer = document.getElementById('add-task-container');
        taskAddContainer.innerHTML = '';
        Show.newTaskForm('Default');
      });
    });
  }

  static removeTaskEvent() {
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener('click', (e) => {
        const projectName = document.getElementById('project-title');
        const findProjectIndex = Project.findProjectIndex(
          projectName.textContent,
        );

        const projects = getProject();

        const findTask = projects[findProjectIndex].taskArray.find(
          (task) => task.name === index,
        );
        projects[findProjectIndex].taskArray.splice(
          projects[findProjectIndex].taskArray.indexOf(findTask),
          1,
        );

        setProject(projects);

        e.target.parentElement.parentElement.parentElement.remove();
      });
    });
  }
}
