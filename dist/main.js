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

  static findProject(title){
    return projectArray.findIndex((project) => {
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
    const deleteProject = projectArray.find(
      (project) => project.title === projectName
    );
    projectArray.splice(projectArray.indexOf(deleteProject), 1);
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
    const projectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProject(projectTitle);
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
        const findProject = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProject(projectName.textContent)

        const findTask = findProject.taskArray.find((task) => task.name === index);
        findProject.taskArray.splice(findProject.taskArray.indexOf(findTask), 1);
        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bGVzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQge3Byb2plY3RBcnJheSB9IGZyb20gXCIuL3Nob3dcIlxuaW1wb3J0IHtnZXRQcm9qZWN0LCBzZXRQcm9qZWN0fSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuLy8gaW1wb3J0IFNob3cgZnJvbSBcIi4vc2hvd1wiO1xuXG5cbmV4cG9ydCBsZXQgcHJvamVjdEFycmF5O1xuXG5cbmlmIChnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCkge1xuICBwcm9qZWN0QXJyYXkgPSBnZXRQcm9qZWN0KCk7XG59IGVsc2Uge1xuICBwcm9qZWN0QXJyYXkgPSBbXTtcbn1cblxuXG5leHBvcnQgY2xhc3MgVG9Eb1Rhc2t7XG4gICAgIGNvbnN0cnVjdG9yKG5hbWUsZGVzY3JpcHRpb24scHJpb3JpdHksZHVlRGF0ZSl7XG4gICAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgIH0gXG5cbiAgICAgdXBkYXRlVGFzayhuZXdUYXNrKXtcbiAgICAgICB0aGlzLm5hbWUgPSBuZXdUYXNrXG4gICAgICAgcmV0dXJuIHRoaXMubmFtZVxuICAgICB9XG5cbiAgICAgZ2V0RHVlRGF0ZShkYXRlKXtcbiAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGVcbiAgICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrQXJyYXkgPSBbXTtcbiB9XG5cbiBzdGF0aWMgdGFza0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIC8vIHByb2plY3RUaXRsZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy50aXRsZTtcbiAgLy8gfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdCh0aXRsZSl7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5maW5kSW5kZXgoKHByb2plY3QpID0+IHtcbiAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHRpdGxlXG4gICAgfSlcbiAgfVxuXG4gIC8vICBhZGROZXdUYXNrKG5ld1Rhc2spIHtcbiAgLy8gICBpZiAoIXRoaXMudGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSl7XG4gIC8vICAgICByZXR1cm4gdGhpcy50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFza0FycmF5KVxuICAvLyAgfVxuICAvLyB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiB7XG4gICAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gIFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG4gICBzdGF0aWMgcmVtb3ZlVGFza0Zyb21Qcm9qZWN0KGVhY2hUYXNrKSB7XG4gICAgdGhpcy50YXNrQXJyYXkgPSB0aGlzLnRhc2tBcnJheS5maWx0ZXIoKHRhc2spID0+IHRhc2sudGl0bGUgIT09IGVhY2hUYXNrLnRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy50YXNrYXJyYXlcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAoIXByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBuZXdQcm9qZWN0LnRpdGxlKSl7XG4gICAgIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpXG4gICAgIHNldFByb2plY3QocHJvamVjdEFycmF5KVxuICAgIH1cbiAgfVxuXG4gICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBwcm9qZWN0QXJyYXkuZmluZChcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZVxuICAgICk7XG4gICAgcHJvamVjdEFycmF5LnNwbGljZShwcm9qZWN0QXJyYXkuaW5kZXhPZihkZWxldGVQcm9qZWN0KSwgMSk7XG4gIH1cbn1cblxuIiwiXG5pbXBvcnQgIFNob3cgIGZyb20gXCIuL3Nob3dcIjtcblxuXG5cbi8vIGJyb3dzZXJcbi8vIGNvb2tlc1xuLy8ge1xuLy8gICBcIm5hbWVcIiA6IFwiW3tcbi8vICAgdG9kb3M6IFsge30gLCB7fSBdXG4vLyB9LHt9LHt9XVwiXG4vLyB9XG5cbi8vIC8vIGNvZGVcbi8vIHByb2plY3RzQXJyYXkgID0gW3tcbi8vICAgdG9kb3M6IFsge30gLCB7fSx7dG9kbzpbXX0gXVxuLy8gfSx7fSx7fV1cblxuLy8gbmFtZT0gXCJzYW1yb29kXCJcblxuLy8gY29uc3QgcHJvamVjdHNBcnJheUFzSnNvbiAgPSBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0FycmF5KVxuLy8gSlNPTi5wYXJzZSgpXG5cbi8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIixwcm9qZWN0c0FycmF5QXNKc29uKVxuLy8gY29uc3QgcHJvamVjdHNJbkpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpXG4vLyBKU09OLnBhcnNlKHByb2plY3RzSW5Kc29uKSA9PiBbe31dXG5cbi8vIHN0cmluZ2lmeSBpdCA9PiBbXT0+ICcnXG4vLyBzZXQgaXRlbSAgIFwiXCIgOiBcIlwiXG4vLyBnZXQgaXRlbSAgIFwiXCIgXG4vLyBwYXJzZSBpdCAgIFwiXCIgPT4gW11cblxuXG4vLyBbXG4vLyAgIGRlZmF1bHRcbi8vICAgcHJvamVjdDFcbi8vIF1cblxuLy8gY29kZSBzdGFydHMgaGVyZVxuXG4vLyBleHBvcnQgbGV0IHByb2plY3RBcnJheTtcbi8vIHNhdmUgcHJvamVjdHNcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9qZWN0KGFycmF5KXtcblxuICBjb25zdCBhcnJheVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5KVxuLy8gICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIixhcnJheVN0cmluZylcbn1cblxuLy8gcmVhZCBwcm9qZWN0cyAgXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdCgpe1xuICBjb25zdCBhcnJheVN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIilcbiAgaWYoYXJyYXlTdHJpbmcpe1xuICAgICByZXR1cm4gSlNPTi5wYXJzZShhcnJheVN0cmluZyk7XG4gIH1cbn1cblxuXG5cbi8vIGlmIChnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCkge1xuLy8gICBwcm9qZWN0QXJyYXkgPSBnZXRQcm9qZWN0KClcbi8vICAgY29uc3QgdGl0bGUgPSBwcm9qZWN0QXJyYXkudGl0bGU7XG4vLyAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKVxuLy8gfSBlbHNlIHtcbi8vICAgcHJvamVjdEFycmF5ID0gW107XG4vLyB9XG4vLyBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpO1xuXG5cblxuLy8gaWYgKCBnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCl7XG4vLyAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBbXCJkZWFmdWx0XCJdXG4vLyAgIHNldFByb2plY3QocHJvamVjdHNBcnJheSlcbi8vIH0gZWxzZXtcbi8vICAgY29uc3QgcHJvamVjdEFycmF5ID0gW11cbi8vIH1cblxuLy8gZnVuY3Rpb24gc2F2ZVByb2plY3QoKXtcbi8vICAgbG9jYWxTdG9yYWdlLmNsZWFyKClcbi8vICAgY29uc3Qgc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocHJvamVjdHNBcnJheSlcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLHN0cmluZylcbi8vIH1cblxuLy8gZnVuY3Rpb24gcmVhZFByb2plY3RzKCl7XG4vLyAgIGNvbnN0IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpXG4vLyAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZylcbi8vIH1cblxuXG4vLyBjcmVhdGUgcHJvamVjdFxuLy8gc2F2ZVByb2plY3RzKClcblxuLy8gY3JlYXRlIHRvZG9cblxuLy8gc2F2ZVByb2plY3QoKSIsImltcG9ydCB7IFRvRG9UYXNrLCBQcm9qZWN0LCBwcm9qZWN0QXJyYXl9IGZyb20gXCIuL2NvbnN0cnVjdG9yXCI7XG5pbXBvcnQge3NldFByb2plY3QsIGdldFByb2plY3QgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuXG5cblxuXG5cbmNvbnN0IFByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWxpc3RcIik7XG5jb25zdCBhcHBlbmRQcm9qZWN0VG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWhvbWVcIik7XG5jb25zdCBwcm9qZWN0Rm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKTtcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIik7XG5jb25zdCBwcm9qZWN0U3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXN1Ym1pdFwiKTtcbmNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuXG5jb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvdyB7XG4gIFxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1pbnB1dFwiKTtcbiAgICBjb25zdCBwcm9qZWN0VmFsdWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgaWYgKHByb2plY3RWYWx1ZSA9PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkZpbGwgaW4gYSBQcm9qZWN0IE5hbWVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChQcm9qZWN0LmlzUHJlc2VudChwcm9qZWN0VmFsdWUpKSB7XG4gICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgYWxlcnQoXCJjaG9vc2UgYSBkaWZmZXJlbnQgcHJvamVjdCBuYW1lXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdFZhbHVlKTtcbiAgICAgIFByb2plY3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHByb2plY3RWYWx1ZSk7XG4gICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xuICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShcIkRlZmF1bHRcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBTaG93Lm5ld1Rhc2tGb3JtKFwiRGVmYXVsdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1idG5cIik7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICBcInRhc2stZm9ybS1jb250YWluZXJcIlxuICAgICAgICApO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RCdXR0b24udGV4dENvbnRlbnQpO1xuICAgICAgICBwcm9qZWN0QXJyYXlbaW5kZXhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgICAgdGFzay5kdWVEYXRlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpIHtcbiAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmlubmVySFRNTCArPSBgXG4gICAgIDxsaSBjbGFzcz1cImxlZnQtY29udGFpbmVyIGQtZmxleCBhbGlnbi1pdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWNvbnRlbnQtZXZlbmx5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtYnRuXCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT48L2J1dHRvbj5cbiAgICAgPC9saT5gO1xuICAgIFxuICAgIFNob3cucHJvamVjdEJ1dHRvbnModGl0bGUpO1xuICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0Zvcm0ocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICA8ZGl2PlxuICAgICAgICAgICA8aDQgaWQ9XCJwcm9qZWN0LXRpdGxlXCI+JHtwcm9qZWN0VGl0bGV9PC9oND5cbiAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybVwiIGlkPVwidXNyZm9ybVwiPlxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCIgY2xhc3M9XCJwLTJcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiBuYW1lPVwidGFzay1uYW1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJwLTJcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNjcmlwdGlvblwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiPlxuXG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaW9yaXR5XCIgY2xhc3M9XCJwLTJcIj5Qcmlvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJwcmlvcml0eVwiIG5hbWU9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiIGNsYXNzPVwicC0yXCI+RGF0ZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBpZD1cImR1ZS1kYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCI+PGJyPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInRhc2stc3VibWl0XCI+XG4gICAgICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgIDwvZGl2PmA7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdChwcm9qZWN0VGl0bGUpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XVxuICAgIFNob3cudGFza0V2ZW50KHByb2plY3QsIHByb2plY3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgdGFza0V2ZW50KHByb2plY3QsaW5kZXgpIHtcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c3Jmb3JtXCIpO1xuICAgIHRhc2tTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRUYXNrKHByb2plY3QsaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2socHJvamVjdCxpbmRleCkge1xuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XG4gICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IGR1ZURhdGVpbnB1dCA9IGR1ZURhdGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KClcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVG9Eb1Rhc2soXG4gICAgICAgdGFza05hbWVJbnB1dCxcbiAgICAgICBkZXNjSW5wdXQsXG4gICAgICAgcHJpb3JpdHlJbnB1dCxcbiAgICAgICBkdWVEYXRlaW5wdXRcbiAgICAgKTtcblxuICAgIGlmICghcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IG5ld1Rhc2submFtZSkpe1xuICAgICAgICBwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LnB1c2gobmV3VGFzayk7XG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KTtcbiAgICAgICAgcmV0dXJuIFxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy50YXNrQXJyYXkpXG4gICB9XG4gICAgLy8gc2V0UHJvamVjdChwcm9qZWN0KVxuIFxuICAgIC8vIHByb2plY3RzW2luZGV4XS5hZGROZXdUYXNrKFxuICAgIC8vICAgbmV3IFRvRG9UYXNrKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KVxuICAgIC8vICk7XG4gICAgLy8gU2hvdy5uZXdUYXNrQ2FyZCh0YXNrTmFtZUlucHV0LCBkZXNjSW5wdXQsIHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0NhcmQobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgY29uc3QgYWRkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgIGFkZFRhc2tDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInRhc2stY2FyZC1jb250YWluZXJcIj5cbiAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZCBkLWZsZXggZmxleC1jb2x1bW5cIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIiBpZD1cImNhcmQtdGFzay1uYW1lXCI+JHtuYW1lfTwvaDU+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9wPjxicj5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kdWVkYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMiB0cmFzaFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+YDtcbiAgICBTaG93LnJlbW92ZVRhc2tFdmVudCgpO1xuICB9XG5cbiAgc3RhdGljIHByb2plY3RFdmVudCgpIHtcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgIFNob3cuYWRkUHJvamVjdCgpO1xuICAgICAgY29uc3QgcmVzZXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWZvcm0nKVxuICAgICAgcmVzZXRGb3JtLnJlc2V0KCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdEV2ZW50KCkge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRlbGV0ZVwiKTtcbiAgICBkZWxldGVCdXR0b25zLmZvckVhY2goKGRlbGV0ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgUHJvamVjdC5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShcIkRlZmF1bHRcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrRXZlbnQoKSB7XG4gICAgY29uc3QgcmVtb3ZlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVtb3ZlXCIpO1xuICAgIHJlbW92ZUJ1dHRvbnMuZm9yRWFjaCgocmVtb3ZlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUnKVxuICAgICAgICBjb25zdCBmaW5kUHJvamVjdCA9IFByb2plY3QuZmluZFByb2plY3QocHJvamVjdE5hbWUudGV4dENvbnRlbnQpXG5cbiAgICAgICAgY29uc3QgZmluZFRhc2sgPSBmaW5kUHJvamVjdC50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBpbmRleCk7XG4gICAgICAgIGZpbmRQcm9qZWN0LnRhc2tBcnJheS5zcGxpY2UoZmluZFByb2plY3QudGFza0FycmF5LmluZGV4T2YoZmluZFRhc2spLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG5cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBpbXBvcnQgU2hvdyBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIlxuLy8gaW1wb3J0IGNvbnN0cnVjdG9yIGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIjtcblxuXG4vLyAvLyBzdGF0aWNjdGlvbiBjb21wb25lbnQoKSB7XG4vLyAvLyAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vLyAvLyAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4vLyAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFtcIkhlbGxvXCIsIFwid2VicGFja1wiXSwgXCIgXCIpO1xuXG4vLyAvLyAgIHJldHVybiBlbGVtZW50O1xuLy8gLy8gfVxuXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vLGxvY2FsU3RvcmFnZVwiO1xuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIjtcbi8vIGltcG9ydCAge2xvY2FsU3RvcmFnZX0gZnJvbSBcIi4vbW9kdWxlcy9jb25zdHJ1Y3RvclwiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIFNob3cucHJvamVjdEV2ZW50LCBTaG93LmRlZmF1bHRQcm9qZWN0KCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9