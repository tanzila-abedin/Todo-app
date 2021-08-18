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

  static defaultProject(){
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project('Default')
     _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project); 
     Show.newProjectTemplate('Default')
     Show.newTaskForm('Default');
    }


  static newProjectTemplate(title) {
    appendProjectToList.innerHTML += `
     <li class="left-container d-flex align-items-baseline justify-content-evenly">
      <button class="project-btn border-0"><i class="far fa-folder-open "></i></button>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRWdFOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsaURBQU87O0FBRWY7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkRBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxNQUFNO0FBQ04sNkJBQTZCLGlEQUFPO0FBQ3BDLFFBQVEsNERBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGlEQUFPO0FBQy9CLEtBQUssNERBQWtCO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2REFBbUI7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtEQUFRO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxLQUFLOztBQUUvRCx1REFBdUQsU0FBUztBQUNoRSxzREFBc0QsUUFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwrREFBcUI7QUFDMUM7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7Ozs7Ozs7VUNqSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDb0M7O0FBRXBDLDhDQUE4QywrREFBaUIsRUFBRSxpRUFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVG9Eb1Rhc2t7XG4gICAgIGNvbnN0cnVjdG9yKG5hbWUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSl7XG4gICAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxuICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXG4gICAgIH0gXG5cbiAgICAgdXBkYXRlVGFzayhuZXdUYXNrKXtcbiAgICAgICB0aGlzLm5hbWUgPSBuZXdUYXNrXG4gICAgICAgcmV0dXJuIHRoaXMubmFtZVxuICAgICB9XG5cbiAgICAgZ2V0RHVlRGF0ZShkYXRlKXtcbiAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGVcbiAgICAgfVxufVxuXG5leHBvcnQgbGV0IHByb2plY3RBcnJheSA9IFtdXG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrQXJyYXkgPSBbXTtcbiAgfVxuXG4gIHRhc2tBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrQXJyYXk7XG4gIH1cblxuICAvLyBwcm9qZWN0VGl0bGUoKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMudGl0bGU7XG4gIC8vIH1cblxuICBzdGF0aWMgZmluZFByb2plY3QodGl0bGUpe1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4ge1xuICAgICByZXR1cm4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGVcbiAgICB9KVxuICB9XG5cbiAgIGFkZFRhc2sobmV3VGFzaykge1xuICAgIGlmICh0aGlzLnRhc2tBcnJheS5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IG5ld1Rhc2submFtZSkpXG4gICAgICByZXR1cm4gdGhpcy50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBpc1ByZXNlbnQocHJvamVjdE5hbWUpIHtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LnNvbWUoXG4gICAgICAocHJvamVjdCkgPT4ge1xuICAgICAgIHJldHVybiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZVxuICBcbiAgICAgIH1cbiAgICApO1xuICB9XG5cblxuICByZW1vdmVUYXNrRnJvbVByb2plY3QoZWFjaFRhc2spIHtcbiAgICB0aGlzLnRhc2tBcnJheSA9IHRoaXMudGFza0FycmF5LmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gZWFjaFRhc2spO1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAoIXByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBuZXdQcm9qZWN0LnRpdGxlKSl7XG4gICAgIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpXG4gICAgfVxuICB9XG5cbiAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IHByb2plY3RBcnJheS5maW5kKFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gICAgKTtcbiAgICBwcm9qZWN0QXJyYXkuc3BsaWNlKHByb2plY3RBcnJheS5pbmRleE9mKGRlbGV0ZVByb2plY3QpLCAxKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBUb0RvVGFzaywgUHJvamVjdCwgcHJvamVjdEFycmF5IH0gZnJvbSBcIi4vY29uc3RydWN0b3JcIjtcblxuY29uc3QgUHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbGlzdFwiKTtcbmNvbnN0IGFwcGVuZFByb2plY3RUb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaG9tZVwiKTtcbmNvbnN0IHByb2plY3RGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm0tY29udGFpbmVyXCIpO1xuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKTtcbi8vIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0LWlucHV0XCIpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG4vLyBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcblxuY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3cge1xuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaW5wdXRcIik7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlOyBcbiAgICBpZiAocHJvamVjdFZhbHVlID09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiRmlsbCBpbiBhIFByb2plY3QgTmFtZVwiKTsgICAgIFxuICAgICAgcmV0dXJuO1xuICAgIH0gXG4gICAgaWYgKFByb2plY3QuaXNQcmVzZW50KHByb2plY3RWYWx1ZSkpIHtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICBhbGVydChcImNob29zZSBhIGRpZmZlcmVudCBwcm9qZWN0IG5hbWVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VmFsdWUpO1xuICAgICAgICBQcm9qZWN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7IFxuICAgICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShwcm9qZWN0VmFsdWUpO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RWYWx1ZSlcbiAgICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpe1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCcpXG4gICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTsgXG4gICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKCdEZWZhdWx0JylcbiAgICAgU2hvdy5uZXdUYXNrRm9ybSgnRGVmYXVsdCcpO1xuICAgIH1cblxuXG4gIHN0YXRpYyBuZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpIHtcbiAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmlubmVySFRNTCArPSBgXG4gICAgIDxsaSBjbGFzcz1cImxlZnQtY29udGFpbmVyIGQtZmxleCBhbGlnbi1pdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWNvbnRlbnQtZXZlbmx5XCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwicHJvamVjdC1idG4gYm9yZGVyLTBcIj48aSBjbGFzcz1cImZhciBmYS1mb2xkZXItb3BlbiBcIj48L2k+PC9idXR0b24+XG4gICAgICA8c3Bhbj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgZGVsZXRlXCI+PC9pPlxuICAgICA8L2xpPmA7XG4gICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KHRpdGxlKVxuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tGb3JtKHByb2plY3RUaXRsZSl7XG4gICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgPGRpdj5cbiAgICAgICAgICAgPGg0PiR7cHJvamVjdFRpdGxlfTwvaDQ+XG4gICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybVwiIGlkPVwidXNyZm9ybVwiPlxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCIgY2xhc3M9XCJwLTJcIj5OYW1lPC9sYWJlbD48YnI+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay1uYW1lXCIgbmFtZT1cInRhc2stbmFtZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJuYW1lXCI+PGJyPlxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiIGNsYXNzPVwicC0yXCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwicHJpb3JpdHlcIiBuYW1lPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWVkaXVtXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIiBjbGFzcz1cInAtMlwiPkRhdGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgaWQ9XCJkdWUtZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInRhc2stc3VibWl0XCI+XG4gICAgICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgIDwvZGl2PmA7XG4gICAgICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QuZmluZFByb2plY3QocHJvamVjdFRpdGxlKVxuICAgICAgIFNob3cudGFza0V2ZW50KHByb2plY3QpXG4gIH1cblxuICBzdGF0aWMgdGFza0V2ZW50KHByb2plY3Qpe1xuICAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzcmZvcm0nKVxuICAgICB0YXNrU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIixcbiAgICAgKGUpID0+IHtlLnByZXZlbnREZWZhdWx0KCksXG4gICAgICBTaG93LmFkZFRhc2socHJvamVjdClcbiAgICAgfVxuICAgICkgXG4gIH1cbiAgXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3Qpe1xuICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikgICBcbiAgICAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWVcbiAgICAgLy8gICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpXG4gICAgIC8vICAgY29uc3QgZGVzY0lucHV0ID0gZGVzY3JpcHRpb24udmFsdWVcbiAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpXG4gICAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlXG4gICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIik7XG4gICAgICAgY29uc3QgZHVlRGF0ZWlucHV0ID0gZHVlRGF0ZS52YWx1ZVxuICAgICAgXG4gICAgICAgcHJvamVjdC5hZGRUYXNrKG5ldyBUb0RvVGFzayh0YXNrTmFtZUlucHV0LHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCkpXG4gICAgICAgU2hvdy5uZXdUYXNrQ2FyZCh0YXNrTmFtZUlucHV0LHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCk7XG4gICAgICAgU2hvdy50YXNrRXZlbnQocHJvamVjdCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0NhcmQobmFtZSxwcmlvcml0eSxkdWVEYXRlKXtcbiAgICAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwidGFzay1jYXJkLWNvbnRhaW5lclwiPlxuICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNlwiPlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIiBpZD1cImNhcmQtdGFzay1uYW1lXCI+JHtuYW1lfTwvaDU+XG5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9wPlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWR1ZWRhdGVcIj4ke2R1ZURhdGV9PC9wPlxuICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgZGVsZXRlXCI+PC9pPlxuICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5gO1xuICAgICBTaG93LnJlbW92ZVRhc2tFdmVudCgpXG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEV2ZW50KCl7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgIFNob3cuYWRkUHJvamVjdCgpXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdEV2ZW50KHByb2plY3ROYW1lKXtcbiAgICAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZScpKXtcbiAgICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICByZXR1cm4gUHJvamVjdC5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKVxuICAgICAgICAgIH1cbiAgICAgICB9KVxuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tFdmVudCgpe1xuICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKSA9PiB7XG4gICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUnKSl7XG4gICAgICAgICAgICAgIHJldHVybiBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpXG4gICAgICAgICAgfVxuICAgICB9KVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG4vLyBpbXBvcnQgU2hvdyBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIlxuLy8gaW1wb3J0IGNvbnN0cnVjdG9yIGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIjtcblxuXG4vLyAvLyBzdGF0aWNjdGlvbiBjb21wb25lbnQoKSB7XG4vLyAvLyAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4vLyAvLyAgIC8vIExvZGFzaCwgY3VycmVudGx5IGluY2x1ZGVkIHZpYSBhIHNjcmlwdCwgaXMgcmVxdWlyZWQgZm9yIHRoaXMgbGluZSB0byB3b3JrXG4vLyAvLyAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXy5qb2luKFtcIkhlbGxvXCIsIFwid2VicGFja1wiXSwgXCIgXCIpO1xuXG4vLyAvLyAgIHJldHVybiBlbGVtZW50O1xuLy8gLy8gfVxuXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vLGxvY2FsU3RvcmFnZVwiO1xuaW1wb3J0ICBTaG93ICBmcm9tIFwiLi9tb2R1bGVzL3Nob3dcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgU2hvdy5wcm9qZWN0RXZlbnQsIFNob3cuZGVmYXVsdFByb2plY3QoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=