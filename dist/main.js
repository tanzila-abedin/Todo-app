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
/* harmony export */   "ToDoTask": () => (/* binding */ ToDoTask),
/* harmony export */   "projectArray": () => (/* binding */ projectArray),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
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

let projectArray = []

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


  //  static removeTaskFromProject(eachTask) {
  //   this.taskArray = this.taskArray.filter((task) => task.title !== eachTask.title);
  //   return this.taskarray
  // }

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
      // Show.projectButtons(projectValue)
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
    const project = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProject(projectTitle);
    Show.taskEvent(project);
  }

  static taskEvent(project) {
    const taskSubmit = document.getElementById("usrform");
    taskSubmit.addEventListener("submit", (e) => {
      e.preventDefault();
      Show.addTask(project);
    });
  }

  static addTask(project) {
    const taskName = document.getElementById("task-name");
    const taskNameInput = taskName.value;
    const description = document.getElementById("description");
    const descInput = description.value;
    const priority = document.getElementById("priority");
    const priorityInput = priority.value;
    const dueDate = document.getElementById("due-date");
    const dueDateinput = dueDate.value;

    project.addNewTask(
      new _constructor__WEBPACK_IMPORTED_MODULE_0__.ToDoTask(taskNameInput, descInput, priorityInput, dueDateinput)
    );
    Show.newTaskCard(taskNameInput, descInput, priorityInput, dueDateinput);
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
        console.log(projectName)
        const findProject = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProject(projectName.textContent)
        console.log(findProject)

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


document.addEventListener("DOMContentLoaded", _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.projectEvent, _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.defaultProject());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ29DOztBQUVwQyw4Q0FBOEMsK0RBQWlCLEVBQUUsaUVBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc2hvdy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRvRG9UYXNre1xuICAgICBjb25zdHJ1Y3RvcihuYW1lLGRlc2NyaXB0aW9uLHByaW9yaXR5LGR1ZURhdGUpe1xuICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICB9IFxuXG4gICAgIHVwZGF0ZVRhc2sobmV3VGFzayl7XG4gICAgICAgdGhpcy5uYW1lID0gbmV3VGFza1xuICAgICAgIHJldHVybiB0aGlzLm5hbWVcbiAgICAgfVxuXG4gICAgIGdldER1ZURhdGUoZGF0ZSl7XG4gICAgICAgdGhpcy5kdWVEYXRlID0gZGF0ZTtcbiAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlXG4gICAgIH1cbn1cblxuZXhwb3J0IGxldCBwcm9qZWN0QXJyYXkgPSBbXVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza0FycmF5ID0gW107XG4gfVxuXG4gc3RhdGljIHRhc2tBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrQXJyYXk7XG4gIH1cblxuICAvLyBwcm9qZWN0VGl0bGUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gIC8vIH1cblxuICBzdGF0aWMgZmluZFByb2plY3QodGl0bGUpe1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4ge1xuICAgICByZXR1cm4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGVcbiAgICB9KVxuICB9XG5cbiAgIGFkZE5ld1Rhc2sobmV3VGFzaykge1xuICAgIGlmICghdGhpcy50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBuZXdUYXNrLm5hbWUpKXtcbiAgICAgIHJldHVybiB0aGlzLnRhc2tBcnJheS5wdXNoKG5ld1Rhc2spO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy50YXNrQXJyYXkpXG4gICB9XG4gIH1cblxuICBzdGF0aWMgaXNQcmVzZW50KHByb2plY3ROYW1lKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5zb21lKFxuICAgICAgKHByb2plY3QpID0+IHtcbiAgICAgICByZXR1cm4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWVcbiAgXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG5cbiAgLy8gIHN0YXRpYyByZW1vdmVUYXNrRnJvbVByb2plY3QoZWFjaFRhc2spIHtcbiAgLy8gICB0aGlzLnRhc2tBcnJheSA9IHRoaXMudGFza0FycmF5LmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gZWFjaFRhc2sudGl0bGUpO1xuICAvLyAgIHJldHVybiB0aGlzLnRhc2thcnJheVxuICAvLyB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICghcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKXtcbiAgICAgcHJvamVjdEFycmF5LnB1c2gobmV3UHJvamVjdCk7XG4gICAgIGNvbnNvbGUubG9nKHByb2plY3RBcnJheSlcbiAgICB9XG4gIH1cblxuICAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gcHJvamVjdEFycmF5LmZpbmQoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWVcbiAgICApO1xuICAgIHByb2plY3RBcnJheS5zcGxpY2UocHJvamVjdEFycmF5LmluZGV4T2YoZGVsZXRlUHJvamVjdCksIDEpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IFRvRG9UYXNrLCBQcm9qZWN0LCBwcm9qZWN0QXJyYXkgfSBmcm9tIFwiLi9jb25zdHJ1Y3RvclwiO1xuXG5jb25zdCBQcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1saXN0XCIpO1xuY29uc3QgYXBwZW5kUHJvamVjdFRvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1ob21lXCIpO1xuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG5jb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcblxuY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3cge1xuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaW5wdXRcIik7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VmFsdWUgPT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJGaWxsIGluIGEgUHJvamVjdCBOYW1lXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoUHJvamVjdC5pc1ByZXNlbnQocHJvamVjdFZhbHVlKSkge1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIGFsZXJ0KFwiY2hvb3NlIGEgZGlmZmVyZW50IHByb2plY3QgbmFtZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RWYWx1ZSk7XG4gICAgICBQcm9qZWN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShwcm9qZWN0VmFsdWUpO1xuICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdFZhbHVlKTtcbiAgICAgIC8vIFNob3cucHJvamVjdEJ1dHRvbnMocHJvamVjdFZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xuICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShcIkRlZmF1bHRcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBTaG93Lm5ld1Rhc2tGb3JtKFwiRGVmYXVsdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1idG5cIik7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICBcInRhc2stZm9ybS1jb250YWluZXJcIlxuICAgICAgICApO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RCdXR0b24udGV4dENvbnRlbnQpO1xuICAgICAgICBwcm9qZWN0QXJyYXlbaW5kZXhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgICAgdGFzay5kdWVEYXRlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpIHtcbiAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmlubmVySFRNTCArPSBgXG4gICAgIDxsaSBjbGFzcz1cImxlZnQtY29udGFpbmVyIGQtZmxleCBhbGlnbi1pdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWNvbnRlbnQtZXZlbmx5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtYnRuXCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT48L2J1dHRvbj5cbiAgICAgPC9saT5gO1xuICAgIFNob3cucHJvamVjdEJ1dHRvbnModGl0bGUpO1xuICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0Zvcm0ocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICA8ZGl2PlxuICAgICAgICAgICA8aDQgaWQ9XCJwcm9qZWN0LXRpdGxlXCI+JHtwcm9qZWN0VGl0bGV9PC9oND5cbiAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybVwiIGlkPVwidXNyZm9ybVwiPlxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCIgY2xhc3M9XCJwLTJcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiBuYW1lPVwidGFzay1uYW1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJwLTJcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNjcmlwdGlvblwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiPlxuXG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaW9yaXR5XCIgY2xhc3M9XCJwLTJcIj5Qcmlvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJwcmlvcml0eVwiIG5hbWU9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiIGNsYXNzPVwicC0yXCI+RGF0ZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBpZD1cImR1ZS1kYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCI+PGJyPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInRhc2stc3VibWl0XCI+XG4gICAgICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgIDwvZGl2PmA7XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QuZmluZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBTaG93LnRhc2tFdmVudChwcm9qZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyB0YXNrRXZlbnQocHJvamVjdCkge1xuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzcmZvcm1cIik7XG4gICAgdGFza1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBTaG93LmFkZFRhc2socHJvamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0KSB7XG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKTtcbiAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKTtcbiAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIik7XG4gICAgY29uc3QgZHVlRGF0ZWlucHV0ID0gZHVlRGF0ZS52YWx1ZTtcblxuICAgIHByb2plY3QuYWRkTmV3VGFzayhcbiAgICAgIG5ldyBUb0RvVGFzayh0YXNrTmFtZUlucHV0LCBkZXNjSW5wdXQsIHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dClcbiAgICApO1xuICAgIFNob3cubmV3VGFza0NhcmQodGFza05hbWVJbnB1dCwgZGVzY0lucHV0LCBwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tDYXJkKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICBhZGRUYXNrQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJ0YXNrLWNhcmQtY29udGFpbmVyXCI+XG4gICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQgZC1mbGV4IGZsZXgtY29sdW1uXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCIgaWQ9XCJjYXJkLXRhc2stbmFtZVwiPiR7bmFtZX08L2g1PlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtcHJpb3JpdHlcIj4ke3ByaW9yaXR5fTwvcD48YnI+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZHVlZGF0ZVwiPiR7ZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgdHJhc2hcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPC9kaXY+XG4gICAgICAgPC9kaXY+XG4gICAgIDwvZGl2PmA7XG4gICAgU2hvdy5yZW1vdmVUYXNrRXZlbnQoKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0RXZlbnQoKSB7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKSxcbiAgICAgICBTaG93LmFkZFByb2plY3QoKTtcbiAgICAgIGNvbnN0IHJlc2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1mb3JtJylcbiAgICAgIHJlc2V0Rm9ybS5yZXNldCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3RFdmVudCgpIHtcbiAgICBjb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZWxldGVcIik7XG4gICAgZGVsZXRlQnV0dG9ucy5mb3JFYWNoKChkZWxldGVCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIFByb2plY3QuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0oXCJEZWZhdWx0XCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVGFza0V2ZW50KCkge1xuICAgIGNvbnN0IHJlbW92ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlbW92ZVwiKTtcbiAgICByZW1vdmVCdXR0b25zLmZvckVhY2goKHJlbW92ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlJylcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdE5hbWUpXG4gICAgICAgIGNvbnN0IGZpbmRQcm9qZWN0ID0gUHJvamVjdC5maW5kUHJvamVjdChwcm9qZWN0TmFtZS50ZXh0Q29udGVudClcbiAgICAgICAgY29uc29sZS5sb2coZmluZFByb2plY3QpXG5cbiAgICAgICAgY29uc3QgZmluZFRhc2sgPSBmaW5kUHJvamVjdC50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBpbmRleCk7XG4gICAgICAgIGZpbmRQcm9qZWN0LnRhc2tBcnJheS5zcGxpY2UoZmluZFByb2plY3QudGFza0FycmF5LmluZGV4T2YoZmluZFRhc2spLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG5cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBpbXBvcnQgU2hvdyBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIlxuLy8gaW1wb3J0IGNvbnN0cnVjdG9yIGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIjtcblxuXG4vLyAvLyBzdGF0aWNjdGlvbiBjb21wb25lbnQoKSB7XG4vLyAvLyAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vLyAvLyAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4vLyAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFtcIkhlbGxvXCIsIFwid2VicGFja1wiXSwgXCIgXCIpO1xuXG4vLyAvLyAgIHJldHVybiBlbGVtZW50O1xuLy8gLy8gfVxuXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vLGxvY2FsU3RvcmFnZVwiO1xuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgU2hvdy5wcm9qZWN0RXZlbnQsIFNob3cuZGVmYXVsdFByb2plY3QoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=