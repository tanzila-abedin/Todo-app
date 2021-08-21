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
// import {projectArray } from "./show"
// import {getProject, setProject} from "./localStorage"
// import Show from "./show";


let projectArray = [];

// export function localStorage(){
// if (getProject() && getProject().length) {
//   projectArray = getProject();
//   projectArray.forEach(element => {
//     const title = element.title
//   });
// } else {
//   projectArray = [];
// }
// }


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


   static removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask.title);
    return this.taskarray
  }

  static addProject(newProject) {
    if (!projectArray.find((project) => project.title === newProject.title)){
     projectArray.push(newProject);
     console.log(projectArray)
    //  setProject(projectArray)
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

// import {setProject, getProject } from "./localStorage"





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
        projectArray[index].taskArray.forEach((task) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNvQztBQUNwQyxZQUFZLGNBQWM7O0FBRTFCLDhDQUE4QywrREFBaUIsRUFBRSxpRUFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQge3Byb2plY3RBcnJheSB9IGZyb20gXCIuL3Nob3dcIlxuLy8gaW1wb3J0IHtnZXRQcm9qZWN0LCBzZXRQcm9qZWN0fSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuLy8gaW1wb3J0IFNob3cgZnJvbSBcIi4vc2hvd1wiO1xuXG5cbmV4cG9ydCBsZXQgcHJvamVjdEFycmF5ID0gW107XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBsb2NhbFN0b3JhZ2UoKXtcbi8vIGlmIChnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCkge1xuLy8gICBwcm9qZWN0QXJyYXkgPSBnZXRQcm9qZWN0KCk7XG4vLyAgIHByb2plY3RBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuLy8gICAgIGNvbnN0IHRpdGxlID0gZWxlbWVudC50aXRsZVxuLy8gICB9KTtcbi8vIH0gZWxzZSB7XG4vLyAgIHByb2plY3RBcnJheSA9IFtdO1xuLy8gfVxuLy8gfVxuXG5cbmV4cG9ydCBjbGFzcyBUb0RvVGFza3tcbiAgICAgY29uc3RydWN0b3IobmFtZSxkZXNjcmlwdGlvbixwcmlvcml0eSxkdWVEYXRlKXtcbiAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgfSBcblxuICAgICB1cGRhdGVUYXNrKG5ld1Rhc2spe1xuICAgICAgIHRoaXMubmFtZSA9IG5ld1Rhc2tcbiAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgIH1cblxuICAgICBnZXREdWVEYXRlKGRhdGUpe1xuICAgICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XG4gICAgICAgcmV0dXJuIHRoaXMuZHVlRGF0ZVxuICAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLnRhc2tBcnJheSA9IFtdO1xuIH1cblxuIHN0YXRpYyB0YXNrQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgLy8gcHJvamVjdFRpdGxlKCkge1xuICAvLyAgIHJldHVybiB0aGlzLnRpdGxlO1xuICAvLyB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0KHRpdGxlKXtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHtcbiAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHRpdGxlXG4gICAgfSlcbiAgfVxuXG4gICBhZGROZXdUYXNrKG5ld1Rhc2spIHtcbiAgICBpZiAoIXRoaXMudGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSl7XG4gICAgICByZXR1cm4gdGhpcy50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFza0FycmF5KVxuICAgfVxuICB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiB7XG4gICAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gIFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG4gICBzdGF0aWMgcmVtb3ZlVGFza0Zyb21Qcm9qZWN0KGVhY2hUYXNrKSB7XG4gICAgdGhpcy50YXNrQXJyYXkgPSB0aGlzLnRhc2tBcnJheS5maWx0ZXIoKHRhc2spID0+IHRhc2sudGl0bGUgIT09IGVhY2hUYXNrLnRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy50YXNrYXJyYXlcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAoIXByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBuZXdQcm9qZWN0LnRpdGxlKSl7XG4gICAgIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgICBjb25zb2xlLmxvZyhwcm9qZWN0QXJyYXkpXG4gICAgLy8gIHNldFByb2plY3QocHJvamVjdEFycmF5KVxuICAgIH1cbiAgfVxuXG4gICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBwcm9qZWN0QXJyYXkuZmluZChcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZVxuICAgICk7XG4gICAgcHJvamVjdEFycmF5LnNwbGljZShwcm9qZWN0QXJyYXkuaW5kZXhPZihkZWxldGVQcm9qZWN0KSwgMSk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgVG9Eb1Rhc2ssIFByb2plY3R9IGZyb20gXCIuL2NvbnN0cnVjdG9yXCI7XG4vLyBpbXBvcnQge3NldFByb2plY3QsIGdldFByb2plY3QgfSBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VcIlxuXG5cblxuXG5cbmNvbnN0IFByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWxpc3RcIik7XG5jb25zdCBhcHBlbmRQcm9qZWN0VG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWhvbWVcIik7XG5jb25zdCBwcm9qZWN0Rm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtLWNvbnRhaW5lclwiKTtcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIik7XG5jb25zdCBwcm9qZWN0U3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXN1Ym1pdFwiKTtcbmNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuXG5jb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvdyB7XG4gIFxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1pbnB1dFwiKTtcbiAgICBjb25zdCBwcm9qZWN0VmFsdWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgaWYgKHByb2plY3RWYWx1ZSA9PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkZpbGwgaW4gYSBQcm9qZWN0IE5hbWVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChQcm9qZWN0LmlzUHJlc2VudChwcm9qZWN0VmFsdWUpKSB7XG4gICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgYWxlcnQoXCJjaG9vc2UgYSBkaWZmZXJlbnQgcHJvamVjdCBuYW1lXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdFZhbHVlKTtcbiAgICAgIFByb2plY3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHByb2plY3RWYWx1ZSk7XG4gICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xuICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShcIkRlZmF1bHRcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBTaG93Lm5ld1Rhc2tGb3JtKFwiRGVmYXVsdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1idG5cIik7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICBcInRhc2stZm9ybS1jb250YWluZXJcIlxuICAgICAgICApO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RCdXR0b24udGV4dENvbnRlbnQpO1xuICAgICAgICBwcm9qZWN0QXJyYXlbaW5kZXhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgICAgdGFzay5kdWVEYXRlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpIHtcbiAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmlubmVySFRNTCArPSBgXG4gICAgIDxsaSBjbGFzcz1cImxlZnQtY29udGFpbmVyIGQtZmxleCBhbGlnbi1pdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWNvbnRlbnQtZXZlbmx5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtYnRuXCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT48L2J1dHRvbj5cbiAgICAgPC9saT5gO1xuICAgIFxuICAgIFNob3cucHJvamVjdEJ1dHRvbnModGl0bGUpO1xuICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0Zvcm0ocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybS1jb250YWluZXJcIik7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICA8ZGl2PlxuICAgICAgICAgICA8aDQgaWQ9XCJwcm9qZWN0LXRpdGxlXCI+JHtwcm9qZWN0VGl0bGV9PC9oND5cbiAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybVwiIGlkPVwidXNyZm9ybVwiPlxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCIgY2xhc3M9XCJwLTJcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiBuYW1lPVwidGFzay1uYW1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJwLTJcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNjcmlwdGlvblwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiPlxuXG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaW9yaXR5XCIgY2xhc3M9XCJwLTJcIj5Qcmlvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJwcmlvcml0eVwiIG5hbWU9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiIGNsYXNzPVwicC0yXCI+RGF0ZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBpZD1cImR1ZS1kYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCI+PGJyPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInRhc2stc3VibWl0XCI+XG4gICAgICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgIDwvZGl2PmA7XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QuZmluZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBTaG93LnRhc2tFdmVudChwcm9qZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyB0YXNrRXZlbnQocHJvamVjdCkge1xuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzcmZvcm1cIik7XG4gICAgdGFza1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBTaG93LmFkZFRhc2socHJvamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0KSB7XG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKTtcbiAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKTtcbiAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIik7XG4gICAgY29uc3QgZHVlRGF0ZWlucHV0ID0gZHVlRGF0ZS52YWx1ZTtcblxuICAgIHByb2plY3QuYWRkTmV3VGFzayhcbiAgICAgIG5ldyBUb0RvVGFzayh0YXNrTmFtZUlucHV0LCBkZXNjSW5wdXQsIHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dClcbiAgICApO1xuICAgIFNob3cubmV3VGFza0NhcmQodGFza05hbWVJbnB1dCwgZGVzY0lucHV0LCBwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tDYXJkKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICBhZGRUYXNrQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJ0YXNrLWNhcmQtY29udGFpbmVyXCI+XG4gICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQgZC1mbGV4IGZsZXgtY29sdW1uXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCIgaWQ9XCJjYXJkLXRhc2stbmFtZVwiPiR7bmFtZX08L2g1PlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtcHJpb3JpdHlcIj4ke3ByaW9yaXR5fTwvcD48YnI+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZHVlZGF0ZVwiPiR7ZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgdHJhc2hcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPC9kaXY+XG4gICAgICAgPC9kaXY+XG4gICAgIDwvZGl2PmA7XG4gICAgU2hvdy5yZW1vdmVUYXNrRXZlbnQoKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0RXZlbnQoKSB7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKSxcbiAgICAgICBTaG93LmFkZFByb2plY3QoKTtcbiAgICAgIGNvbnN0IHJlc2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1mb3JtJylcbiAgICAgIHJlc2V0Rm9ybS5yZXNldCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3RFdmVudCgpIHtcbiAgICBjb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZWxldGVcIik7XG4gICAgZGVsZXRlQnV0dG9ucy5mb3JFYWNoKChkZWxldGVCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIFByb2plY3QuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0oXCJEZWZhdWx0XCIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVGFza0V2ZW50KCkge1xuICAgIGNvbnN0IHJlbW92ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlbW92ZVwiKTtcbiAgICByZW1vdmVCdXR0b25zLmZvckVhY2goKHJlbW92ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlJylcbiAgICAgICAgY29uc3QgZmluZFByb2plY3QgPSBQcm9qZWN0LmZpbmRQcm9qZWN0KHByb2plY3ROYW1lLnRleHRDb250ZW50KVxuXG4gICAgICAgIGNvbnN0IGZpbmRUYXNrID0gZmluZFByb2plY3QudGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gaW5kZXgpO1xuICAgICAgICBmaW5kUHJvamVjdC50YXNrQXJyYXkuc3BsaWNlKGZpbmRQcm9qZWN0LnRhc2tBcnJheS5pbmRleE9mKGZpbmRUYXNrKSwgMSk7XG4gICAgICAgIFxuICAgICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcblxuLy8gaW1wb3J0IFNob3cgZnJvbSBcIi4vbW9kdWxlcy9zaG93XCJcbi8vIGltcG9ydCBjb25zdHJ1Y3RvciBmcm9tIFwiLi9tb2R1bGVzL2NvbnN0cnVjdG9yXCI7XG5cblxuLy8gLy8gc3RhdGljY3Rpb24gY29tcG9uZW50KCkge1xuLy8gLy8gICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuLy8gLy8gICAvLyBMb2Rhc2gsIGN1cnJlbnRseSBpbmNsdWRlZCB2aWEgYSBzY3JpcHQsIGlzIHJlcXVpcmVkIGZvciB0aGlzIGxpbmUgdG8gd29ya1xuLy8gLy8gICBlbGVtZW50LmlubmVySFRNTCA9IF8uam9pbihbXCJIZWxsb1wiLCBcIndlYnBhY2tcIl0sIFwiIFwiKTtcblxuLy8gLy8gICByZXR1cm4gZWxlbWVudDtcbi8vIC8vIH1cblxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQoKSk7XG5cbi8vIGltcG9ydCBTdG9yYWdlIGZyb20gXCIuLyxsb2NhbFN0b3JhZ2VcIjtcbmltcG9ydCAgU2hvdyAgZnJvbSBcIi4vbW9kdWxlcy9zaG93XCI7XG4vLyBpbXBvcnQgIHtsb2NhbFN0b3JhZ2V9IGZyb20gXCIuL21vZHVsZXMvY29uc3RydWN0b3JcIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBTaG93LnByb2plY3RFdmVudCwgU2hvdy5kZWZhdWx0UHJvamVjdCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==