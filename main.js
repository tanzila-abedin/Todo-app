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

let projectArray = []

class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];
    // this.taskArray.push(new ToDoTask('Default'))
  }

  taskArray() {
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

   addTask(newTask) {
    if (this.taskArray.find((task) => task.name === newTask.name))
      return this.taskArray.push(newTask);
  }

  static isPresent(projectName) {
    return projectArray.some(
      (project) => {
       return project.title === projectName
  
      }
    );
  }


  removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask);
    return this.taskArray;
  }

  static addProject(newProject) {
    if (!projectArray.find((project) => project.title === newProject.title)){
     projectArray.push(newProject);
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
// const projectInput = document.getElementsByClassName("project-input");
const projectSubmit = document.getElementById("project-submit");
// const taskFormContainer = document.getElementById("task-form-container");

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
        Show.newTaskForm(projectValue)
  }

  }

  static newProjectTemplate(title) {
    appendProjectToList.innerHTML += `
     <li class="left-container d-flex align-items-baseline justify-content-between">
       <span>${title}</span>
       <i class="far fa-trash-alt p-2 delete"></i>
     </li>`;
     Show.deleteProjectEvent(title)
  }

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
       const project = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProject(projectTitle)
       Show.taskEvent(project)
  }

  static taskEvent(project){
     const taskSubmit = document.getElementById('usrform')
     taskSubmit.addEventListener("submit",
     (e) => {e.preventDefault(),
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
      
       project.addTask(new _constructor__WEBPACK_IMPORTED_MODULE_0__.ToDoTask(taskNameInput,priorityInput, dueDateinput))
       Show.newTaskCard(taskNameInput,priorityInput, dueDateinput);
       Show.taskEvent(project);
  }

  static newTaskCard(name,priority,dueDate){
       const taskFormContainer = document.getElementById("task-form-container");
       taskFormContainer.innerHTML += `
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
              return _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.deleteProject(projectName)
          }
       })
  }

  static removeTaskEvent(){
     const taskForm = document.getElementById("task-form-container");
     taskForm.addEventListener('click',(e) => {
          if(e.target.classList.contains('delete')){
              return e.target.parentNode.parentNode.parentNode.parentNode.remove()
          }
     })
  }

  // static removeTask(projectName,taskName){
  //   .findProject(projectName).removeTaskFromProject(taskName)
  // }
}

// (e) => {
//   if (e.target.classList.contains("delete")) {
//     e.target.parentElement.remove();
//   }
// };

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



document.addEventListener("DOMContentLoaded", _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.projectEvent);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRWdFOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsaURBQU87O0FBRWY7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkRBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxNQUFNO0FBQ04sNkJBQTZCLGlEQUFPO0FBQ3BDLFFBQVEsNERBQWtCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2REFBbUI7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtEQUFRO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxLQUFLOztBQUUvRCx1REFBdUQsU0FBUztBQUNoRSxzREFBc0QsUUFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwrREFBcUI7QUFDMUM7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ25KQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNvQzs7O0FBR3BDLDhDQUE4QywrREFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVG9Eb1Rhc2t7XG4gICAgIGNvbnN0cnVjdG9yKG5hbWUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSl7XG4gICAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgIH0gXG5cbiAgICAgdXBkYXRlVGFzayhuZXdUYXNrKXtcbiAgICAgICB0aGlzLm5hbWUgPSBuZXdUYXNrXG4gICAgICAgcmV0dXJuIHRoaXMubmFtZVxuICAgICB9XG5cbiAgICAgZ2V0RHVlRGF0ZShkYXRlKXtcbiAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGVcbiAgICAgfVxufVxuXG5leHBvcnQgbGV0IHByb2plY3RBcnJheSA9IFtdXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrQXJyYXkgPSBbXTtcbiAgICAvLyB0aGlzLnRhc2tBcnJheS5wdXNoKG5ldyBUb0RvVGFzaygnRGVmYXVsdCcpKVxuICB9XG5cbiAgdGFza0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIC8vIHByb2plY3RUaXRsZSgpIHtcbiAgLy8gICByZXR1cm4gdGhpcy50aXRsZTtcbiAgLy8gfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdCh0aXRsZSl7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiB7XG4gICAgIHJldHVybiBwcm9qZWN0LnRpdGxlID09PSB0aXRsZVxuICAgIH0pXG4gIH1cblxuICAgYWRkVGFzayhuZXdUYXNrKSB7XG4gICAgaWYgKHRoaXMudGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSlcbiAgICAgIHJldHVybiB0aGlzLnRhc2tBcnJheS5wdXNoKG5ld1Rhc2spO1xuICB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiB7XG4gICAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gIFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG4gIHJlbW92ZVRhc2tGcm9tUHJvamVjdChlYWNoVGFzaykge1xuICAgIHRoaXMudGFza0FycmF5ID0gdGhpcy50YXNrQXJyYXkuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSBlYWNoVGFzayk7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICghcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKXtcbiAgICAgcHJvamVjdEFycmF5LnB1c2gobmV3UHJvamVjdCk7XG4gICAgfVxuICB9XG5cbiAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IHByb2plY3RBcnJheS5maW5kKFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gICAgKTtcbiAgICBwcm9qZWN0QXJyYXkuc3BsaWNlKHByb2plY3RBcnJheS5pbmRleE9mKGRlbGV0ZVByb2plY3QpLCAxKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBUb0RvVGFzaywgUHJvamVjdCwgcHJvamVjdEFycmF5IH0gZnJvbSBcIi4vY29uc3RydWN0b3JcIjtcblxuY29uc3QgUHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbGlzdFwiKTtcbmNvbnN0IGFwcGVuZFByb2plY3RUb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaG9tZVwiKTtcbmNvbnN0IHByb2plY3RGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tY29udGFpbmVyXCIpO1xuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKTtcbi8vIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0LWlucHV0XCIpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG4vLyBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcblxuY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3cge1xuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaW5wdXRcIik7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlOyBcbiAgICBpZiAocHJvamVjdFZhbHVlID09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiRmlsbCBpbiBhIFByb2plY3QgTmFtZVwiKTsgICAgIFxuICAgICAgcmV0dXJuO1xuICAgIH0gXG4gICAgaWYgKFByb2plY3QuaXNQcmVzZW50KHByb2plY3RWYWx1ZSkpIHtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICBhbGVydChcImNob29zZSBhIGRpZmZlcmVudCBwcm9qZWN0IG5hbWVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VmFsdWUpO1xuICAgICAgICBQcm9qZWN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7IFxuICAgICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShwcm9qZWN0VmFsdWUpO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RWYWx1ZSlcbiAgfVxuXG4gIH1cblxuICBzdGF0aWMgbmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKSB7XG4gICAgYXBwZW5kUHJvamVjdFRvTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICA8bGkgY2xhc3M9XCJsZWZ0LWNvbnRhaW5lciBkLWZsZXggYWxpZ24taXRlbXMtYmFzZWxpbmUganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICA8c3Bhbj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgICA8aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yIGRlbGV0ZVwiPjwvaT5cbiAgICAgPC9saT5gO1xuICAgICBTaG93LmRlbGV0ZVByb2plY3RFdmVudCh0aXRsZSlcbiAgfVxuXG4gIHN0YXRpYyBuZXdUYXNrRm9ybShwcm9qZWN0VGl0bGUpe1xuICAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgIDxkaXY+XG4gICAgICAgICAgIDxoND4ke3Byb2plY3RUaXRsZX08L2g0PlxuICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciB0YXNrLWZvcm1cIiBpZD1cInVzcmZvcm1cIj5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiIGNsYXNzPVwicC0yXCI+TmFtZTwvbGFiZWw+PGJyPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIG5hbWU9XCJ0YXNrLW5hbWVcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwibmFtZVwiPjxicj5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJpb3JpdHlcIiBjbGFzcz1cInAtMlwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInByaW9yaXR5XCIgbmFtZT1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCIgY2xhc3M9XCJwLTJcIj5EYXRlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIGlkPVwiZHVlLWRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJ0YXNrLXN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgPC9mb3JtPiBcbiAgICAgICA8L2Rpdj5gO1xuICAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0LmZpbmRQcm9qZWN0KHByb2plY3RUaXRsZSlcbiAgICAgICBTaG93LnRhc2tFdmVudChwcm9qZWN0KVxuICB9XG5cbiAgc3RhdGljIHRhc2tFdmVudChwcm9qZWN0KXtcbiAgICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c3Jmb3JtJylcbiAgICAgdGFza1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsXG4gICAgIChlKSA9PiB7ZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgU2hvdy5hZGRUYXNrKHByb2plY3QpXG4gICAgIH1cbiAgICApIFxuICB9XG4gIFxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0KXtcbiAgICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpICAgXG4gICAgICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlXG4gICAgIC8vICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKVxuICAgICAvLyAgIGNvbnN0IGRlc2NJbnB1dCA9IGRlc2NyaXB0aW9uLnZhbHVlXG4gICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKVxuICAgICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBwcmlvcml0eS52YWx1ZVxuICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgICAgIGNvbnN0IGR1ZURhdGVpbnB1dCA9IGR1ZURhdGUudmFsdWVcbiAgICAgIFxuICAgICAgIHByb2plY3QuYWRkVGFzayhuZXcgVG9Eb1Rhc2sodGFza05hbWVJbnB1dCxwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpKVxuICAgICAgIFNob3cubmV3VGFza0NhcmQodGFza05hbWVJbnB1dCxwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpO1xuICAgICAgIFNob3cudGFza0V2ZW50KHByb2plY3QpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tDYXJkKG5hbWUscHJpb3JpdHksZHVlRGF0ZSl7XG4gICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInRhc2stY2FyZC1jb250YWluZXJcIj5cbiAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTZcIj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCIgaWQ9XCJjYXJkLXRhc2stbmFtZVwiPiR7bmFtZX08L2g1PlxuXG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtcHJpb3JpdHlcIj4ke3ByaW9yaXR5fTwvcD5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kdWVkYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICA8aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yIGRlbGV0ZVwiPjwvaT5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+YDtcbiAgICAgU2hvdy5yZW1vdmVUYXNrRXZlbnQoKVxuICB9XG5cbiAgc3RhdGljIHByb2plY3RFdmVudCgpe1xuICAgIHByb2plY3RTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKSxcbiAgICAgICBTaG93LmFkZFByb2plY3QoKVxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3RFdmVudChwcm9qZWN0TmFtZSl7XG4gICAgICAgYXBwZW5kUHJvamVjdFRvTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUnKSl7XG4gICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgICAgcmV0dXJuIFByb2plY3QuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSlcbiAgICAgICAgICB9XG4gICAgICAgfSlcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrRXZlbnQoKXtcbiAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xuICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlJykpe1xuICAgICAgICAgICAgICByZXR1cm4gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmUoKVxuICAgICAgICAgIH1cbiAgICAgfSlcbiAgfVxuXG4gIC8vIHN0YXRpYyByZW1vdmVUYXNrKHByb2plY3ROYW1lLHRhc2tOYW1lKXtcbiAgLy8gICAuZmluZFByb2plY3QocHJvamVjdE5hbWUpLnJlbW92ZVRhc2tGcm9tUHJvamVjdCh0YXNrTmFtZSlcbiAgLy8gfVxufVxuXG4vLyAoZSkgPT4ge1xuLy8gICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlXCIpKSB7XG4vLyAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbi8vICAgfVxuLy8gfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBpbXBvcnQgU2hvdyBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIlxuLy8gaW1wb3J0IGNvbnN0cnVjdG9yIGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIjtcblxuXG4vLyAvLyBzdGF0aWNjdGlvbiBjb21wb25lbnQoKSB7XG4vLyAvLyAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vLyAvLyAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4vLyAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFtcIkhlbGxvXCIsIFwid2VicGFja1wiXSwgXCIgXCIpO1xuXG4vLyAvLyAgIHJldHVybiBlbGVtZW50O1xuLy8gLy8gfVxuXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vLGxvY2FsU3RvcmFnZVwiO1xuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIjtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBTaG93LnByb2plY3RFdmVudCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=