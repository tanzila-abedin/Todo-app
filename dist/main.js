/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/constructor.js":
/*!************************************!*\
  !*** ./src/modules/constructor.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectArray": () => (/* binding */ projectArray),
/* harmony export */   "ToDoTask": () => (/* binding */ ToDoTask),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/modules/localStorage.js");
// import {projectArray } from "./show"

// import Show from "./show";


let projectArray;
if ((0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)() && (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)().length) {
  projectArray = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)();
} else {
  projectArray = [];
}


class ToDoTask{
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


class Project {
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
     ;(0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setProject)(projectArray)
    }
  }

   static deleteProject(projectName) {
    const deleteProject = projectArray.findIndex(
      (project) => project.title === projectName
    );
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)()
    projects.splice(deleteProject,1);
    (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setProject)(projects);
  }
}



/***/ }),

/***/ "./src/modules/localStorage.js":
/*!*************************************!*\
  !*** ./src/modules/localStorage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setProject": () => (/* binding */ setProject),
/* harmony export */   "getProject": () => (/* binding */ getProject)
/* harmony export */ });
/* harmony import */ var _show__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show */ "./src/modules/show.js");





// browser
// cookes
// {
//   "name" : "[{
//   todos: [ {} , {} ]
// },{},{}]"
// }

// // code
// projectsArray  = [{
//   todos: [ {} , {},{todo:[]} ]
// },{},{}]

// name= "samrood"

// const projectsArrayAsJson  = JSON.stringify(projectsArray)
// JSON.parse()

// localStorage.setItem("projects",projectsArrayAsJson)
// const projectsInJson = localStorage.getItem("projects")
// JSON.parse(projectsInJson) => [{}]

// stringify it => []=> ''
// set item   "" : ""
// get item   "" 
// parse it   "" => []


// [
//   default
//   project1
// ]

// code starts here

// export let projectArray;
// save projects
function setProject(array){

  const arrayString = JSON.stringify(array)
//   console.log(projectArray)
  localStorage.setItem("projects",arrayString)
}

// read projects  
function getProject(){
  const arrayString = localStorage.getItem("projects")
  if(arrayString){
     return JSON.parse(arrayString);
  }
}



// if (getProject() && getProject().length) {
//   projectArray = getProject()
//   const title = projectArray.title;
//   Show.newProjectTemplate(title)
// } else {
//   projectArray = [];
// }
// console.log(projectArray);



// if ( getProject() && getProject().length){
//   const projectsArray = ["deafult"]
//   setProject(projectsArray)
// } else{
//   const projectArray = []
// }

// function saveProject(){
//   localStorage.clear()
//   const string = JSON.stringify(projectsArray)
//   localStorage.setItem("projects",string)
// }

// function readProjects(){
//   const string = localStorage.getItem('projects')
//   return JSON.parse(string)
// }


// create project
// saveProjects()

// create todo

// saveProject()

/***/ }),

/***/ "./src/modules/show.js":
/*!*****************************!*\
  !*** ./src/modules/show.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Show)
/* harmony export */ });
/* harmony import */ var _constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructor */ "./src/modules/constructor.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/modules/localStorage.js");



const ProjectList = document.getElementById("project-list");
const appendProjectToList = document.getElementById("project-home");
const projectFormContainer = document.getElementById("project-form-container");
const projectForm = document.getElementById("project-form");
const projectSubmit = document.getElementById("project-submit");
const taskFormContainer = document.getElementById("task-form-container");

const newProject = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project();

class Show {
  

  static addProject() {
    const projectInput = document.getElementById("project-input");
    const projectValue = projectInput.value;
    if (projectValue == "") {
      alert("Fill in a Project Name");
      return;
    }
    if (_constructor__WEBPACK_IMPORTED_MODULE_0__.Project.isPresent(projectValue)) {
      projectInput.value = "";
      alert("choose a different project name");
    } else {
      const newProject = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project(projectValue);
      _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(newProject);
      Show.newProjectTemplate(projectValue);
      taskFormContainer.innerHTML = "";
      Show.newTaskForm(projectValue);
    }
  }

  static disStoredProject(){
    _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray.forEach((element)=> {
      const title = element.title
      Show.newProjectTemplate(title)
    })
  }


  static defaultProject() {
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project("Default");
    _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project);
    // Show.newProjectTemplate("Default");
    Show.disStoredProject();
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
        _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray[index].taskArray.forEach((task) => {
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
     <li class="left-container d-flex align-items-baseline justify-content-between">
      <span class="project-btn">${title}</span>
      <button class="delete"><i class="far fa-trash-alt p-2"></i></button>
     </li>`;
    
    Show.projectButtons(title);
    Show.deleteProjectEvent();
  }

  static newTaskForm(projectTitle) {
    const taskFormContainer = document.getElementById("task-form-container");
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
               </form> 
       </div>`;
    const projectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(projectTitle);
    const project = _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray[projectIndex]
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
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.getProject)()

    const newTask = new _constructor__WEBPACK_IMPORTED_MODULE_0__.ToDoTask(
       taskNameInput,
       descInput,
       priorityInput,
       dueDateinput
     );

    if (!projects[index].taskArray.find((task) => task.name === newTask.name)){
        projects[index].taskArray.push(newTask);
        (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.setProject)(projects);
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
         <div class="card">
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
        _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.deleteProject(index);
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
        const findProjectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(projectName.textContent)
        
        const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.getProject)()
      
        const findTask = projects[findProjectIndex].taskArray.find((task) => task.name === index);
        projects[findProjectIndex].taskArray.splice(projects[findProjectIndex].taskArray.indexOf(findTask), 1);

        (0,_localStorage__WEBPACK_IMPORTED_MODULE_1__.setProject)(projects);

        e.target.parentElement.parentElement.parentElement.remove();


      });
    });
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_show__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/show */ "./src/modules/show.js");


// import Show from "./modules/show"
// import constructor from "./modules/constructor";


// // staticction component() {
// //   const element = document.createElement("div");

// //   // Lodash, currently included via a script, is required for this line to work
// //   element.innerHTML = _.join(["Hello", "webpack"], " ");

// //   return element;
// // }

// document.body.appendChild(component());

// import Storage from "./,localStorage";

// import  {localStorage} from "./modules/constructor"

document.addEventListener("DOMContentLoaded", _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.projectEvent, _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.defaultProject());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ29DO0FBQ3BDLFlBQVksY0FBYzs7QUFFMUIsOENBQThDLCtEQUFpQixFQUFFLGlFQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQge3Byb2plY3RBcnJheSB9IGZyb20gXCIuL3Nob3dcIlxuaW1wb3J0IHtnZXRQcm9qZWN0LCBzZXRQcm9qZWN0fSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuLy8gaW1wb3J0IFNob3cgZnJvbSBcIi4vc2hvd1wiO1xuXG5cbmV4cG9ydCBsZXQgcHJvamVjdEFycmF5O1xuaWYgKGdldFByb2plY3QoKSAmJiBnZXRQcm9qZWN0KCkubGVuZ3RoKSB7XG4gIHByb2plY3RBcnJheSA9IGdldFByb2plY3QoKTtcbn0gZWxzZSB7XG4gIHByb2plY3RBcnJheSA9IFtdO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBUb0RvVGFza3tcbiAgICAgY29uc3RydWN0b3IobmFtZSxkZXNjcmlwdGlvbixwcmlvcml0eSxkdWVEYXRlKXtcbiAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgfSBcblxuICAgICB1cGRhdGVUYXNrKG5ld1Rhc2spe1xuICAgICAgIHRoaXMubmFtZSA9IG5ld1Rhc2tcbiAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgIH1cblxuICAgICBnZXREdWVEYXRlKGRhdGUpe1xuICAgICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XG4gICAgICAgcmV0dXJuIHRoaXMuZHVlRGF0ZVxuICAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLnRhc2tBcnJheSA9IFtdO1xuIH1cblxuIHN0YXRpYyB0YXNrQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgLy8gcHJvamVjdFRpdGxlKCkge1xuICAvLyAgIHJldHVybiB0aGlzLnRpdGxlO1xuICAvLyB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0SW5kZXgodGl0bGUpe1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG4gICAgIHJldHVybiBwcm9qZWN0LnRpdGxlID09PSB0aXRsZVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgZmluZFByb2plY3QodGl0bGUpe1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4ge1xuICAgICByZXR1cm4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGVcbiAgICB9KVxuICB9XG5cbiAgLy8gIGFkZE5ld1Rhc2sobmV3VGFzaykge1xuICAvLyAgIGlmICghdGhpcy50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBuZXdUYXNrLm5hbWUpKXtcbiAgLy8gICAgIHJldHVybiB0aGlzLnRhc2tBcnJheS5wdXNoKG5ld1Rhc2spO1xuICAvLyAgICAgLy8gY29uc29sZS5sb2codGhpcy50YXNrQXJyYXkpXG4gIC8vICB9XG4gIC8vIH1cblxuICBzdGF0aWMgaXNQcmVzZW50KHByb2plY3ROYW1lKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5zb21lKFxuICAgICAgKHByb2plY3QpID0+IHtcbiAgICAgICByZXR1cm4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWVcbiAgXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG5cbiAgIHN0YXRpYyByZW1vdmVUYXNrRnJvbVByb2plY3QoZWFjaFRhc2spIHtcbiAgICB0aGlzLnRhc2tBcnJheSA9IHRoaXMudGFza0FycmF5LmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gZWFjaFRhc2sudGl0bGUpO1xuICAgIHJldHVybiB0aGlzLnRhc2thcnJheVxuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICghcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKXtcbiAgICAgcHJvamVjdEFycmF5LnB1c2gobmV3UHJvamVjdCk7XG4gICAgIGNvbnNvbGUubG9nKHByb2plY3RBcnJheSlcbiAgICAgc2V0UHJvamVjdChwcm9qZWN0QXJyYXkpXG4gICAgfVxuICB9XG5cbiAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IHByb2plY3RBcnJheS5maW5kSW5kZXgoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWVcbiAgICApO1xuICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpXG4gICAgcHJvamVjdHMuc3BsaWNlKGRlbGV0ZVByb2plY3QsMSk7XG4gICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gIH1cbn1cblxuIiwiXG5pbXBvcnQgIFNob3cgIGZyb20gXCIuL3Nob3dcIjtcblxuXG5cbi8vIGJyb3dzZXJcbi8vIGNvb2tlc1xuLy8ge1xuLy8gICBcIm5hbWVcIiA6IFwiW3tcbi8vICAgdG9kb3M6IFsge30gLCB7fSBdXG4vLyB9LHt9LHt9XVwiXG4vLyB9XG5cbi8vIC8vIGNvZGVcbi8vIHByb2plY3RzQXJyYXkgID0gW3tcbi8vICAgdG9kb3M6IFsge30gLCB7fSx7dG9kbzpbXX0gXVxuLy8gfSx7fSx7fV1cblxuLy8gbmFtZT0gXCJzYW1yb29kXCJcblxuLy8gY29uc3QgcHJvamVjdHNBcnJheUFzSnNvbiAgPSBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0FycmF5KVxuLy8gSlNPTi5wYXJzZSgpXG5cbi8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIixwcm9qZWN0c0FycmF5QXNKc29uKVxuLy8gY29uc3QgcHJvamVjdHNJbkpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpXG4vLyBKU09OLnBhcnNlKHByb2plY3RzSW5Kc29uKSA9PiBbe31dXG5cbi8vIHN0cmluZ2lmeSBpdCA9PiBbXT0+ICcnXG4vLyBzZXQgaXRlbSAgIFwiXCIgOiBcIlwiXG4vLyBnZXQgaXRlbSAgIFwiXCIgXG4vLyBwYXJzZSBpdCAgIFwiXCIgPT4gW11cblxuXG4vLyBbXG4vLyAgIGRlZmF1bHRcbi8vICAgcHJvamVjdDFcbi8vIF1cblxuLy8gY29kZSBzdGFydHMgaGVyZVxuXG4vLyBleHBvcnQgbGV0IHByb2plY3RBcnJheTtcbi8vIHNhdmUgcHJvamVjdHNcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9qZWN0KGFycmF5KXtcblxuICBjb25zdCBhcnJheVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5KVxuLy8gICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIixhcnJheVN0cmluZylcbn1cblxuLy8gcmVhZCBwcm9qZWN0cyAgXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdCgpe1xuICBjb25zdCBhcnJheVN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIilcbiAgaWYoYXJyYXlTdHJpbmcpe1xuICAgICByZXR1cm4gSlNPTi5wYXJzZShhcnJheVN0cmluZyk7XG4gIH1cbn1cblxuXG5cbi8vIGlmIChnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCkge1xuLy8gICBwcm9qZWN0QXJyYXkgPSBnZXRQcm9qZWN0KClcbi8vICAgY29uc3QgdGl0bGUgPSBwcm9qZWN0QXJyYXkudGl0bGU7XG4vLyAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKVxuLy8gfSBlbHNlIHtcbi8vICAgcHJvamVjdEFycmF5ID0gW107XG4vLyB9XG4vLyBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpO1xuXG5cblxuLy8gaWYgKCBnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCl7XG4vLyAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbXCJkZWFmdWx0XCJdXG4vLyAgIHNldFByb2plY3QocHJvamVjdHNBcnJheSlcbi8vIH0gZWxzZXtcbi8vICAgY29uc3QgcHJvamVjdEFycmF5ID0gW11cbi8vIH1cblxuLy8gZnVuY3Rpb24gc2F2ZVByb2plY3QoKXtcbi8vICAgbG9jYWxTdG9yYWdlLmNsZWFyKClcbi8vICAgY29uc3Qgc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSlcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLHN0cmluZylcbi8vIH1cblxuLy8gZnVuY3Rpb24gcmVhZFByb2plY3RzKCl7XG4vLyAgIGNvbnN0IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpXG4vLyAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcbi8vIH1cblxuXG4vLyBjcmVhdGUgcHJvamVjdFxuLy8gc2F2ZVByb2plY3RzKClcblxuLy8gY3JlYXRlIHRvZG9cblxuLy8gc2F2ZVByb2plY3QoKSIsImltcG9ydCB7IFRvRG9UYXNrLCBQcm9qZWN0LCBwcm9qZWN0QXJyYXl9IGZyb20gXCIuL2NvbnN0cnVjdG9yXCI7XG5pbXBvcnQge3NldFByb2plY3QsIGdldFByb2plY3QgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuXG5jb25zdCBQcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1saXN0XCIpO1xuY29uc3QgYXBwZW5kUHJvamVjdFRvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1ob21lXCIpO1xuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG5jb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcblxuY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3cge1xuICBcblxuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaW5wdXRcIik7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VmFsdWUgPT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJGaWxsIGluIGEgUHJvamVjdCBOYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoUHJvamVjdC5pc1ByZXNlbnQocHJvamVjdFZhbHVlKSkge1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIGFsZXJ0KFwiY2hvb3NlIGEgZGlmZmVyZW50IHByb2plY3QgbmFtZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RWYWx1ZSk7XG4gICAgICBQcm9qZWN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShwcm9qZWN0VmFsdWUpO1xuICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzU3RvcmVkUHJvamVjdCgpe1xuICAgIHByb2plY3RBcnJheS5mb3JFYWNoKChlbGVtZW50KT0+IHtcbiAgICAgIGNvbnN0IHRpdGxlID0gZWxlbWVudC50aXRsZVxuICAgICAgU2hvdy5uZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpXG4gICAgfSlcbiAgfVxuXG5cbiAgc3RhdGljIGRlZmF1bHRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChcIkRlZmF1bHRcIik7XG4gICAgUHJvamVjdC5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgIC8vIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKFwiRGVmYXVsdFwiKTtcbiAgICBTaG93LmRpc1N0b3JlZFByb2plY3QoKTtcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFNob3cubmV3VGFza0Zvcm0oXCJEZWZhdWx0XCIpO1xuICB9XG5cbiAgc3RhdGljIHByb2plY3RCdXR0b25zKCkge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LWJ0blwiKTtcbiAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChwcm9qZWN0QnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgIFwidGFzay1mb3JtLWNvbnRhaW5lclwiXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCk7XG4gICAgICAgIHByb2plY3RBcnJheVtpbmRleF0udGFza0FycmF5LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKFxuICAgICAgICAgICAgdGFzay5uYW1lLFxuICAgICAgICAgICAgdGFzay5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgICB0YXNrLmR1ZURhdGVcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG5ld1Byb2plY3RUZW1wbGF0ZSh0aXRsZSkge1xuICAgIGFwcGVuZFByb2plY3RUb0xpc3QuaW5uZXJIVE1MICs9IGBcbiAgICAgPGxpIGNsYXNzPVwibGVmdC1jb250YWluZXIgZC1mbGV4IGFsaWduLWl0ZW1zLWJhc2VsaW5lIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtYnRuXCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT48L2J1dHRvbj5cbiAgICAgPC9saT5gO1xuICAgIFxuICAgIFNob3cucHJvamVjdEJ1dHRvbnModGl0bGUpO1xuICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0Zvcm0ocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgPGg0IGlkPVwicHJvamVjdC10aXRsZVwiPiR7cHJvamVjdFRpdGxlfTwvaDQ+XG4gICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciB0YXNrLWZvcm1cIiBpZD1cInVzcmZvcm1cIj5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiIGNsYXNzPVwicC0yXCI+TmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay1uYW1lXCIgbmFtZT1cInRhc2stbmFtZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwicC0yXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzY3JpcHRpb25cIiBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIj5cblxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiIGNsYXNzPVwicC0yXCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwicHJpb3JpdHlcIiBuYW1lPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWVkaXVtXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIiBjbGFzcz1cInAtMlwiPkRhdGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgaWQ9XCJkdWUtZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiPjxicj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJ0YXNrLXN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgPC9mb3JtPiBcbiAgICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleChwcm9qZWN0VGl0bGUpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XVxuICAgIFNob3cudGFza0V2ZW50KHByb2plY3QsIHByb2plY3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgdGFza0V2ZW50KHByb2plY3QsaW5kZXgpIHtcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c3Jmb3JtXCIpO1xuICAgIHRhc2tTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRUYXNrKHByb2plY3QsaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2socHJvamVjdCxpbmRleCkge1xuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XG4gICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IGR1ZURhdGVpbnB1dCA9IGR1ZURhdGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KClcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVG9Eb1Rhc2soXG4gICAgICAgdGFza05hbWVJbnB1dCxcbiAgICAgICBkZXNjSW5wdXQsXG4gICAgICAgcHJpb3JpdHlJbnB1dCxcbiAgICAgICBkdWVEYXRlaW5wdXRcbiAgICAgKTtcblxuICAgIGlmICghcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IG5ld1Rhc2submFtZSkpe1xuICAgICAgICBwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LnB1c2gobmV3VGFzayk7XG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KTtcbiAgICAgICAgcmV0dXJuIFxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy50YXNrQXJyYXkpXG4gICB9XG4gICAgLy8gc2V0UHJvamVjdChwcm9qZWN0KVxuIFxuICAgIC8vIHByb2plY3RzW2luZGV4XS5hZGROZXdUYXNrKFxuICAgIC8vICAgbmV3IFRvRG9UYXNrKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KVxuICAgIC8vICk7XG4gICAgLy8gU2hvdy5uZXdUYXNrQ2FyZCh0YXNrTmFtZUlucHV0LCBkZXNjSW5wdXQsIHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0NhcmQobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgY29uc3QgYWRkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgIGFkZFRhc2tDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInRhc2stY2FyZC1jb250YWluZXJcIj5cbiAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgPGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiIGlkPVwiY2FyZC10YXNrLW5hbWVcIj4ke25hbWV9PC9oNT5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLXByaW9yaXR5XCI+JHtwcmlvcml0eX08L3A+PGJyPlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWR1ZWRhdGVcIj4ke2R1ZURhdGV9PC9wPlxuICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmVcIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yIHRyYXNoXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5gO1xuICAgIFNob3cucmVtb3ZlVGFza0V2ZW50KCk7XG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEV2ZW50KCkge1xuICAgIHByb2plY3RTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCksXG4gICAgICAgU2hvdy5hZGRQcm9qZWN0KCk7XG4gICAgICBjb25zdCByZXNldEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktZm9ybScpXG4gICAgICByZXNldEZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RXZlbnQoKSB7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGVsZXRlXCIpO1xuICAgIGRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBQcm9qZWN0LmRlbGV0ZVByb2plY3QoaW5kZXgpO1xuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKFwiRGVmYXVsdFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tFdmVudCgpIHtcbiAgICBjb25zdCByZW1vdmVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZW1vdmVcIik7XG4gICAgcmVtb3ZlQnV0dG9ucy5mb3JFYWNoKChyZW1vdmVCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZScpXG4gICAgICAgIGNvbnN0IGZpbmRQcm9qZWN0SW5kZXggPSBQcm9qZWN0LmZpbmRQcm9qZWN0SW5kZXgocHJvamVjdE5hbWUudGV4dENvbnRlbnQpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKVxuICAgICAgXG4gICAgICAgIGNvbnN0IGZpbmRUYXNrID0gcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gaW5kZXgpO1xuICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuc3BsaWNlKHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheS5pbmRleE9mKGZpbmRUYXNrKSwgMSk7XG5cbiAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG5cbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG5cblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5cbi8vIGltcG9ydCBTaG93IGZyb20gXCIuL21vZHVsZXMvc2hvd1wiXG4vLyBpbXBvcnQgY29uc3RydWN0b3IgZnJvbSBcIi4vbW9kdWxlcy9jb25zdHJ1Y3RvclwiO1xuXG5cbi8vIC8vIHN0YXRpY2N0aW9uIGNvbXBvbmVudCgpIHtcbi8vIC8vICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbi8vIC8vICAgLy8gTG9kYXNoLCBjdXJyZW50bHkgaW5jbHVkZWQgdmlhIGEgc2NyaXB0LCBpcyByZXF1aXJlZCBmb3IgdGhpcyBsaW5lIHRvIHdvcmtcbi8vIC8vICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oW1wiSGVsbG9cIiwgXCJ3ZWJwYWNrXCJdLCBcIiBcIik7XG5cbi8vIC8vICAgcmV0dXJuIGVsZW1lbnQ7XG4vLyAvLyB9XG5cbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xuXG4vLyBpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi8sbG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQgIFNob3cgIGZyb20gXCIuL21vZHVsZXMvc2hvd1wiO1xuLy8gaW1wb3J0ICB7bG9jYWxTdG9yYWdlfSBmcm9tIFwiLi9tb2R1bGVzL2NvbnN0cnVjdG9yXCJcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgU2hvdy5wcm9qZWN0RXZlbnQsIFNob3cuZGVmYXVsdFByb2plY3QoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=