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
  
  taskArray(){
    return this.taskArray
  }

  addTask(newTask) {
    if (this.taskArray.find((task) => task.name === newTask.name)) 
    return this.taskArray.push(newTask);
  }

  isPresent(projectName){
     return this.projectArray.some((project) => project.projectTitle() === projectName);
  }

  removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask);
    return this.taskArray;
  }

  projectTitle(){
    return this.title
  }

  addProject(newProject) {
    if (projectArray.find((project) => project.title === newProject.title))
      return projectArray.push(newProject);
  }

  // deleteProject(projectName) {
  //   const deleteProject = projectArray.find(
  //     (project) => project.title === projectName
  //   );
  //   projectArray.splice(projectArray.indexOf(deleteProject), 1);
  // }
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
      
       newProject.addTask(new _constructor__WEBPACK_IMPORTED_MODULE_0__.ToDoTask(taskNameInput,priorityInput, dueDateinput))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdEZ0U7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixpREFBTzs7QUFFZjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0RBQVE7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxLQUFLOztBQUUvRCx1REFBdUQsU0FBUztBQUNoRSxzREFBc0QsUUFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUN0SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDb0M7OztBQUdwQyw4Q0FBOEMsK0RBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc2hvdy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRvRG9UYXNre1xuICAgICBjb25zdHJ1Y3RvcihuYW1lLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHkpe1xuICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICB9IFxuXG4gICAgIHVwZGF0ZVRhc2sobmV3VGFzayl7XG4gICAgICAgdGhpcy5uYW1lID0gbmV3VGFza1xuICAgICAgIHJldHVybiB0aGlzLm5hbWVcbiAgICAgfVxuXG4gICAgIGdldER1ZURhdGUoZGF0ZSl7XG4gICAgICAgdGhpcy5kdWVEYXRlID0gZGF0ZTtcbiAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlXG4gICAgIH1cbn1cblxuZXhwb3J0IGxldCBwcm9qZWN0QXJyYXkgPSBbXVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza0FycmF5ID0gW107XG4gICAgLy8gdGhpcy50YXNrQXJyYXkucHVzaChuZXcgVG9Eb1Rhc2soJ0RlZmF1bHQnKSlcbiAgfVxuICBcbiAgdGFza0FycmF5KCl7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5XG4gIH1cblxuICBhZGRUYXNrKG5ld1Rhc2spIHtcbiAgICBpZiAodGhpcy50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBuZXdUYXNrLm5hbWUpKSBcbiAgICByZXR1cm4gdGhpcy50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgfVxuXG4gIGlzUHJlc2VudChwcm9qZWN0TmFtZSl7XG4gICAgIHJldHVybiB0aGlzLnByb2plY3RBcnJheS5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSgpID09PSBwcm9qZWN0TmFtZSk7XG4gIH1cblxuICByZW1vdmVUYXNrRnJvbVByb2plY3QoZWFjaFRhc2spIHtcbiAgICB0aGlzLnRhc2tBcnJheSA9IHRoaXMudGFza0FycmF5LmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gZWFjaFRhc2spO1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIHByb2plY3RUaXRsZSgpe1xuICAgIHJldHVybiB0aGlzLnRpdGxlXG4gIH1cblxuICBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAocHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKVxuICAgICAgcmV0dXJuIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICB9XG5cbiAgLy8gZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAvLyAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBwcm9qZWN0QXJyYXkuZmluZChcbiAgLy8gICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZVxuICAvLyAgICk7XG4gIC8vICAgcHJvamVjdEFycmF5LnNwbGljZShwcm9qZWN0QXJyYXkuaW5kZXhPZihkZWxldGVQcm9qZWN0KSwgMSk7XG4gIC8vIH1cbn1cblxuIiwiaW1wb3J0IHsgVG9Eb1Rhc2ssIFByb2plY3QsIHByb2plY3RBcnJheSB9IGZyb20gXCIuL2NvbnN0cnVjdG9yXCI7XG5cbmNvbnN0IFByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWxpc3RcIik7XG5jb25zdCBhcHBlbmRQcm9qZWN0VG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWhvbWVcIik7XG5jb25zdCBwcm9qZWN0Rm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKTtcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIik7XG4vLyBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdC1pbnB1dFwiKTtcbmNvbnN0IHByb2plY3RTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc3VibWl0XCIpO1xuLy8gY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG5cbmNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93IHtcbiAgc3RhdGljIGFkZFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWlucHV0XCIpO1xuICAgIGNvbnN0IHByb2plY3RWYWx1ZSA9IHByb2plY3RJbnB1dC52YWx1ZTsgXG4gICAgaWYgKHByb2plY3RWYWx1ZSA9PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkZpbGwgaW4gYSBQcm9qZWN0IE5hbWVcIik7ICAgICBcbiAgICAgIHJldHVybjtcbiAgICB9IFxuXG4vLyAgICAgaWYgKHByb2plY3RBcnJheS5pc1ByZXNlbnQocHJvamVjdFZhbHVlKSkge1xuLy8gICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbi8vICAgICAgIGFsZXJ0KFwiY2hvb3NlIGEgZGlmZmVyZW50IHByb2plY3QgbmFtZVwiKTtcbi8vICAgICB9XG4gICAgIC8vICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VmFsdWUpO1xuICAgICAgICBuZXdQcm9qZWN0LmFkZFByb2plY3QocHJvamVjdFZhbHVlKTsgXG4gICAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHByb2plY3RWYWx1ZSk7XG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdFZhbHVlKVxuXG4gIH1cblxuICBzdGF0aWMgbmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKSB7XG4gICAgYXBwZW5kUHJvamVjdFRvTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICA8bGkgY2xhc3M9XCJsZWZ0LWNvbnRhaW5lciBkLWZsZXggYWxpZ24taXRlbXMtYmFzZWxpbmUganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICA8c3Bhbj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgICA8aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yIGRlbGV0ZVwiPjwvaT5cbiAgICAgPC9saT5gO1xuICAgICBTaG93LmRlbGV0ZVByb2plY3RFdmVudCgpXG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0Zvcm0ocHJvamVjdFRpdGxlKXtcbiAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICA8ZGl2PlxuICAgICAgICAgICA8aDQ+JHtwcm9qZWN0VGl0bGV9PC9oND5cbiAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiL2FjdGlvbl9wYWdlLnBocFwiIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybSBpZD1cInVzcmZvcm1cIj5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiIGNsYXNzPVwicC0yXCI+TmFtZTwvbGFiZWw+PGJyPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIG5hbWU9XCJ0YXNrLW5hbWVcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwibmFtZVwiPjxicj5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJpb3JpdHlcIiBjbGFzcz1cInAtMlwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInByaW9yaXR5XCIgbmFtZT1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCIgY2xhc3M9XCJwLTJcIj5EYXRlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIGlkPVwiZHVlLWRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJ0YXNrLXN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgPC9mb3JtPiBcbiAgICAgICA8L2Rpdj5gO1xuICAgICAgIFNob3cudGFza0V2ZW50KClcbiAgfVxuXG4gIHN0YXRpYyB0YXNrRXZlbnQoKXtcbiAgICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdCcpXG4gICAgIHRhc2tTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsXG4gICAgIChlKSA9PiB7ZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgU2hvdy5hZGRUYXNrKClcbiAgICAgfVxuICAgICkgXG4gIH1cbiAgXG4gIHN0YXRpYyBhZGRUYXNrKCl7XG4gICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKSAgIFxuICAgICAgIGNvbnN0IHRhc2tOYW1lSW5wdXQgPSB0YXNrTmFtZS52YWx1ZVxuICAgICAvLyAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJylcbiAgICAgLy8gICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZVxuICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5JylcbiAgICAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWVcbiAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKTtcbiAgICAgICBjb25zdCBkdWVEYXRlaW5wdXQgPSBkdWVEYXRlLnZhbHVlXG4gICAgICBcbiAgICAgICBuZXdQcm9qZWN0LmFkZFRhc2sobmV3IFRvRG9UYXNrKHRhc2tOYW1lSW5wdXQscHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KSlcbiAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKHRhc2tOYW1lSW5wdXQscHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdUYXNrQ2FyZChuYW1lLHByaW9yaXR5LGR1ZURhdGUpe1xuICAgICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS02XCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgPGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiIGlkPVwiY2FyZC10YXNrLW5hbWVcIj4ke25hbWV9PC9oNT5cblxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLXByaW9yaXR5XCI+JHtwcmlvcml0eX08L3A+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZHVlZGF0ZVwiPiR7ZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+YDtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0RXZlbnQoKXtcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCksXG4gICAgICAgU2hvdy5hZGRQcm9qZWN0KClcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RXZlbnQoKXtcbiAgICAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZScpKXtcbiAgICAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICB9XG4gICAgICAgfSlcbiAgfVxuXG4vLyAgIHN0YXRpYyBkZWxldGVQcm9qZWN0RXZlbnQoKXtcbiAgICBcbi8vICAgfVxufVxuXG4vLyAoZSkgPT4ge1xuLy8gICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlXCIpKSB7XG4vLyAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbi8vICAgfVxuLy8gfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBpbXBvcnQgU2hvdyBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIlxuLy8gaW1wb3J0IGNvbnN0cnVjdG9yIGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIjtcblxuXG4vLyAvLyBzdGF0aWNjdGlvbiBjb21wb25lbnQoKSB7XG4vLyAvLyAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vLyAvLyAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4vLyAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFtcIkhlbGxvXCIsIFwid2VicGFja1wiXSwgXCIgXCIpO1xuXG4vLyAvLyAgIHJldHVybiBlbGVtZW50O1xuLy8gLy8gfVxuXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vLGxvY2FsU3RvcmFnZVwiO1xuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIjtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBTaG93LnByb2plY3RFdmVudCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=