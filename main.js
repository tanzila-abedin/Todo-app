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

  static defaultProject() {
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project("Default");
    _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project);
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

        e.target.parentNode.parentNode.parentNode.parentNode.remove();
        const taskAddContainer = document.getElementById("add-task-container");
        taskAddContainer.innerHTML = "";


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBOztBQUVBO0FBQ29DO0FBQ3BDLFlBQVksY0FBYzs7QUFFMUIsOENBQThDLCtEQUFpQixFQUFFLGlFQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQge3Byb2plY3RBcnJheSB9IGZyb20gXCIuL3Nob3dcIlxuaW1wb3J0IHtnZXRQcm9qZWN0LCBzZXRQcm9qZWN0fSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuLy8gaW1wb3J0IFNob3cgZnJvbSBcIi4vc2hvd1wiO1xuXG5cbmV4cG9ydCBsZXQgcHJvamVjdEFycmF5O1xuXG5cbmlmIChnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCkge1xuICBwcm9qZWN0QXJyYXkgPSBnZXRQcm9qZWN0KCk7XG59IGVsc2Uge1xuICBwcm9qZWN0QXJyYXkgPSBbXTtcbn1cblxuXG5leHBvcnQgY2xhc3MgVG9Eb1Rhc2t7XG4gICAgIGNvbnN0cnVjdG9yKG5hbWUsZGVzY3JpcHRpb24scHJpb3JpdHksZHVlRGF0ZSl7XG4gICAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgIH0gXG5cbiAgICAgdXBkYXRlVGFzayhuZXdUYXNrKXtcbiAgICAgICB0aGlzLm5hbWUgPSBuZXdUYXNrXG4gICAgICAgcmV0dXJuIHRoaXMubmFtZVxuICAgICB9XG5cbiAgICAgZ2V0RHVlRGF0ZShkYXRlKXtcbiAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGVcbiAgICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrQXJyYXkgPSBbXTtcbiB9XG5cbiBzdGF0aWMgdGFza0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIC8vIHByb2plY3RUaXRsZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy50aXRsZTtcbiAgLy8gfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdEluZGV4KHRpdGxlKXtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuICAgICByZXR1cm4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGVcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0KHRpdGxlKXtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHtcbiAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHRpdGxlXG4gICAgfSlcbiAgfVxuXG4gIC8vICBhZGROZXdUYXNrKG5ld1Rhc2spIHtcbiAgLy8gICBpZiAoIXRoaXMudGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSl7XG4gIC8vICAgICByZXR1cm4gdGhpcy50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFza0FycmF5KVxuICAvLyAgfVxuICAvLyB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiB7XG4gICAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gIFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG4gICBzdGF0aWMgcmVtb3ZlVGFza0Zyb21Qcm9qZWN0KGVhY2hUYXNrKSB7XG4gICAgdGhpcy50YXNrQXJyYXkgPSB0aGlzLnRhc2tBcnJheS5maWx0ZXIoKHRhc2spID0+IHRhc2sudGl0bGUgIT09IGVhY2hUYXNrLnRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy50YXNrYXJyYXlcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAoIXByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBuZXdQcm9qZWN0LnRpdGxlKSl7XG4gICAgIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpXG4gICAgIHNldFByb2plY3QocHJvamVjdEFycmF5KVxuICAgIH1cbiAgfVxuXG4gICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBwcm9qZWN0QXJyYXkuZmluZEluZGV4KFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKVxuICAgIHByb2plY3RzLnNwbGljZShkZWxldGVQcm9qZWN0LDEpO1xuICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICB9XG59XG5cbiIsIlxuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9zaG93XCI7XG5cblxuXG4vLyBicm93c2VyXG4vLyBjb29rZXNcbi8vIHtcbi8vICAgXCJuYW1lXCIgOiBcIlt7XG4vLyAgIHRvZG9zOiBbIHt9ICwge30gXVxuLy8gfSx7fSx7fV1cIlxuLy8gfVxuXG4vLyAvLyBjb2RlXG4vLyBwcm9qZWN0c0FycmF5ICA9IFt7XG4vLyAgIHRvZG9zOiBbIHt9ICwge30se3RvZG86W119IF1cbi8vIH0se30se31dXG5cbi8vIG5hbWU9IFwic2Ftcm9vZFwiXG5cbi8vIGNvbnN0IHByb2plY3RzQXJyYXlBc0pzb24gID0gSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSlcbi8vIEpTT04ucGFyc2UoKVxuXG4vLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIscHJvamVjdHNBcnJheUFzSnNvbilcbi8vIGNvbnN0IHByb2plY3RzSW5Kc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKVxuLy8gSlNPTi5wYXJzZShwcm9qZWN0c0luSnNvbikgPT4gW3t9XVxuXG4vLyBzdHJpbmdpZnkgaXQgPT4gW109PiAnJ1xuLy8gc2V0IGl0ZW0gICBcIlwiIDogXCJcIlxuLy8gZ2V0IGl0ZW0gICBcIlwiIFxuLy8gcGFyc2UgaXQgICBcIlwiID0+IFtdXG5cblxuLy8gW1xuLy8gICBkZWZhdWx0XG4vLyAgIHByb2plY3QxXG4vLyBdXG5cbi8vIGNvZGUgc3RhcnRzIGhlcmVcblxuLy8gZXhwb3J0IGxldCBwcm9qZWN0QXJyYXk7XG4vLyBzYXZlIHByb2plY3RzXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvamVjdChhcnJheSl7XG5cbiAgY29uc3QgYXJyYXlTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheSlcbi8vICAgY29uc29sZS5sb2cocHJvamVjdEFycmF5KVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsYXJyYXlTdHJpbmcpXG59XG5cbi8vIHJlYWQgcHJvamVjdHMgIFxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3QoKXtcbiAgY29uc3QgYXJyYXlTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpXG4gIGlmKGFycmF5U3RyaW5nKXtcbiAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXJyYXlTdHJpbmcpO1xuICB9XG59XG5cblxuXG4vLyBpZiAoZ2V0UHJvamVjdCgpICYmIGdldFByb2plY3QoKS5sZW5ndGgpIHtcbi8vICAgcHJvamVjdEFycmF5ID0gZ2V0UHJvamVjdCgpXG4vLyAgIGNvbnN0IHRpdGxlID0gcHJvamVjdEFycmF5LnRpdGxlO1xuLy8gICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZSh0aXRsZSlcbi8vIH0gZWxzZSB7XG4vLyAgIHByb2plY3RBcnJheSA9IFtdO1xuLy8gfVxuLy8gY29uc29sZS5sb2cocHJvamVjdEFycmF5KTtcblxuXG5cbi8vIGlmICggZ2V0UHJvamVjdCgpICYmIGdldFByb2plY3QoKS5sZW5ndGgpe1xuLy8gICBjb25zdCBwcm9qZWN0c0FycmF5ID0gW1wiZGVhZnVsdFwiXVxuLy8gICBzZXRQcm9qZWN0KHByb2plY3RzQXJyYXkpXG4vLyB9IGVsc2V7XG4vLyAgIGNvbnN0IHByb2plY3RBcnJheSA9IFtdXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHNhdmVQcm9qZWN0KCl7XG4vLyAgIGxvY2FsU3RvcmFnZS5jbGVhcigpXG4vLyAgIGNvbnN0IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHByb2plY3RzQXJyYXkpXG4vLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIixzdHJpbmcpXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHJlYWRQcm9qZWN0cygpe1xuLy8gICBjb25zdCBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKVxuLy8gICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmcpXG4vLyB9XG5cblxuLy8gY3JlYXRlIHByb2plY3Rcbi8vIHNhdmVQcm9qZWN0cygpXG5cbi8vIGNyZWF0ZSB0b2RvXG5cbi8vIHNhdmVQcm9qZWN0KCkiLCJpbXBvcnQgeyBUb0RvVGFzaywgUHJvamVjdCwgcHJvamVjdEFycmF5fSBmcm9tIFwiLi9jb25zdHJ1Y3RvclwiO1xuaW1wb3J0IHtzZXRQcm9qZWN0LCBnZXRQcm9qZWN0IH0gZnJvbSBcIi4vbG9jYWxTdG9yYWdlXCJcblxuXG5cblxuXG5jb25zdCBQcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1saXN0XCIpO1xuY29uc3QgYXBwZW5kUHJvamVjdFRvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1ob21lXCIpO1xuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG5jb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcblxuY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3cge1xuICBcblxuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaW5wdXRcIik7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VmFsdWUgPT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJGaWxsIGluIGEgUHJvamVjdCBOYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoUHJvamVjdC5pc1ByZXNlbnQocHJvamVjdFZhbHVlKSkge1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIGFsZXJ0KFwiY2hvb3NlIGEgZGlmZmVyZW50IHByb2plY3QgbmFtZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RWYWx1ZSk7XG4gICAgICBQcm9qZWN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShwcm9qZWN0VmFsdWUpO1xuICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KFwiRGVmYXVsdFwiKTtcbiAgICBQcm9qZWN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgU2hvdy5uZXdQcm9qZWN0VGVtcGxhdGUoXCJEZWZhdWx0XCIpO1xuICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgU2hvdy5uZXdUYXNrRm9ybShcIkRlZmF1bHRcIik7XG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtYnRuXCIpO1xuICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKHByb2plY3RCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgXCJ0YXNrLWZvcm0tY29udGFpbmVyXCJcbiAgICAgICAgKTtcbiAgICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50KTtcbiAgICAgICAgcHJvamVjdEFycmF5W2luZGV4XS50YXNrQXJyYXkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgIFNob3cubmV3VGFza0NhcmQoXG4gICAgICAgICAgICB0YXNrLm5hbWUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgICAgIHRhc2suZHVlRGF0ZVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKSB7XG4gICAgYXBwZW5kUHJvamVjdFRvTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICA8bGkgY2xhc3M9XCJsZWZ0LWNvbnRhaW5lciBkLWZsZXggYWxpZ24taXRlbXMtYmFzZWxpbmUganVzdGlmeS1jb250ZW50LWV2ZW5seVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJwcm9qZWN0LWJ0blwiPiR7dGl0bGV9PC9zcGFuPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZVwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTJcIj48L2k+PC9idXR0b24+XG4gICAgIDwvbGk+YDtcbiAgICBcbiAgICBTaG93LnByb2plY3RCdXR0b25zKHRpdGxlKTtcbiAgICBTaG93LmRlbGV0ZVByb2plY3RFdmVudCgpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tGb3JtKHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgPGRpdj5cbiAgICAgICAgICAgPGg0IGlkPVwicHJvamVjdC10aXRsZVwiPiR7cHJvamVjdFRpdGxlfTwvaDQ+XG4gICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciB0YXNrLWZvcm1cIiBpZD1cInVzcmZvcm1cIj5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiIGNsYXNzPVwicC0yXCI+TmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay1uYW1lXCIgbmFtZT1cInRhc2stbmFtZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwicC0yXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzY3JpcHRpb25cIiBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIj5cblxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiIGNsYXNzPVwicC0yXCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwicHJpb3JpdHlcIiBuYW1lPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWVkaXVtXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIiBjbGFzcz1cInAtMlwiPkRhdGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgaWQ9XCJkdWUtZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiPjxicj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJ0YXNrLXN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgPC9mb3JtPiBcbiAgICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleChwcm9qZWN0VGl0bGUpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XVxuICAgIFNob3cudGFza0V2ZW50KHByb2plY3QsIHByb2plY3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgdGFza0V2ZW50KHByb2plY3QsaW5kZXgpIHtcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c3Jmb3JtXCIpO1xuICAgIHRhc2tTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRUYXNrKHByb2plY3QsaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2socHJvamVjdCxpbmRleCkge1xuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XG4gICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IGR1ZURhdGVpbnB1dCA9IGR1ZURhdGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KClcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVG9Eb1Rhc2soXG4gICAgICAgdGFza05hbWVJbnB1dCxcbiAgICAgICBkZXNjSW5wdXQsXG4gICAgICAgcHJpb3JpdHlJbnB1dCxcbiAgICAgICBkdWVEYXRlaW5wdXRcbiAgICAgKTtcblxuICAgIGlmICghcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IG5ld1Rhc2submFtZSkpe1xuICAgICAgICBwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LnB1c2gobmV3VGFzayk7XG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KTtcbiAgICAgICAgcmV0dXJuIFxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy50YXNrQXJyYXkpXG4gICB9XG4gICAgLy8gc2V0UHJvamVjdChwcm9qZWN0KVxuIFxuICAgIC8vIHByb2plY3RzW2luZGV4XS5hZGROZXdUYXNrKFxuICAgIC8vICAgbmV3IFRvRG9UYXNrKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KVxuICAgIC8vICk7XG4gICAgLy8gU2hvdy5uZXdUYXNrQ2FyZCh0YXNrTmFtZUlucHV0LCBkZXNjSW5wdXQsIHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0NhcmQobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgY29uc3QgYWRkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgIGFkZFRhc2tDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInRhc2stY2FyZC1jb250YWluZXJcIj5cbiAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBkLWZsZXggZmxleC1jb2x1bW5cIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIiBpZD1cImNhcmQtdGFzay1uYW1lXCI+JHtuYW1lfTwvaDU+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9wPjxicj5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kdWVkYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMiB0cmFzaFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+YDtcbiAgICBTaG93LnJlbW92ZVRhc2tFdmVudCgpO1xuICB9XG5cbiAgc3RhdGljIHByb2plY3RFdmVudCgpIHtcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgIFNob3cuYWRkUHJvamVjdCgpO1xuICAgICAgY29uc3QgcmVzZXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWZvcm0nKVxuICAgICAgcmVzZXRGb3JtLnJlc2V0KCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdEV2ZW50KCkge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRlbGV0ZVwiKTtcbiAgICBkZWxldGVCdXR0b25zLmZvckVhY2goKGRlbGV0ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgUHJvamVjdC5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShcIkRlZmF1bHRcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrRXZlbnQoKSB7XG4gICAgY29uc3QgcmVtb3ZlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVtb3ZlXCIpO1xuICAgIHJlbW92ZUJ1dHRvbnMuZm9yRWFjaCgocmVtb3ZlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUnKVxuICAgICAgICBjb25zdCBmaW5kUHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KHByb2plY3ROYW1lLnRleHRDb250ZW50KVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KClcbiAgICAgIFxuICAgICAgICBjb25zdCBmaW5kVGFzayA9IHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheS5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IGluZGV4KTtcbiAgICAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LnNwbGljZShwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuaW5kZXhPZihmaW5kVGFzayksIDEpO1xuXG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG5cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBpbXBvcnQgU2hvdyBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIlxuLy8gaW1wb3J0IGNvbnN0cnVjdG9yIGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIjtcblxuXG4vLyAvLyBzdGF0aWNjdGlvbiBjb21wb25lbnQoKSB7XG4vLyAvLyAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vLyAvLyAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4vLyAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFtcIkhlbGxvXCIsIFwid2VicGFja1wiXSwgXCIgXCIpO1xuXG4vLyAvLyAgIHJldHVybiBlbGVtZW50O1xuLy8gLy8gfVxuXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vLGxvY2FsU3RvcmFnZVwiO1xuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIjtcbi8vIGltcG9ydCAge2xvY2FsU3RvcmFnZX0gZnJvbSBcIi4vbW9kdWxlcy9jb25zdHJ1Y3RvclwiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIFNob3cucHJvamVjdEV2ZW50LCBTaG93LmRlZmF1bHRQcm9qZWN0KCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9