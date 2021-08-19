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
     constructor(name,priority,dueDate){
          this.name = name

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
        taskFormContainer.innerHTML = ''
        Show.newTaskForm(projectValue)
        // Show.projectButtons(projectValue)
      }
  }

  static defaultProject(){
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project('Default')
     _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project); 
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
          const taskFormContainer = document.getElementById(
            "task-form-container"
          );
          taskFormContainer.innerHTML = ''
          Show.newTaskForm(projectButton.textContent);
          Show.taskEvent(_constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray[index])
           _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray[index].taskArray.forEach((task) => {
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
       const project = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProject(projectTitle)
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
      
       project.addNewTask(new _constructor__WEBPACK_IMPORTED_MODULE_0__.ToDoTask(taskNameInput,priorityInput, dueDateinput))
      // const userForm = document.getElementById('usrform')
      //   userForm.reset()
       Show.newTaskCard(taskNameInput,priorityInput, dueDateinput);
       Show.taskEvent(project);
  }

  static newTaskCard(name,priority,dueDate){
       const taskFormContainer = document.getElementById("add-task-container");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNvQzs7QUFFcEMsOENBQThDLCtEQUFpQixFQUFFLGlFQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUb0RvVGFza3tcbiAgICAgY29uc3RydWN0b3IobmFtZSxwcmlvcml0eSxkdWVEYXRlKXtcbiAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG5cbiAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICB9IFxuXG4gICAgIHVwZGF0ZVRhc2sobmV3VGFzayl7XG4gICAgICAgdGhpcy5uYW1lID0gbmV3VGFza1xuICAgICAgIHJldHVybiB0aGlzLm5hbWVcbiAgICAgfVxuXG4gICAgIGdldER1ZURhdGUoZGF0ZSl7XG4gICAgICAgdGhpcy5kdWVEYXRlID0gZGF0ZTtcbiAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlXG4gICAgIH1cbn1cblxuZXhwb3J0IGxldCBwcm9qZWN0QXJyYXkgPSBbXVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza0FycmF5ID0gW107XG4gIH1cblxuICB0YXNrQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgLy8gcHJvamVjdFRpdGxlKCkge1xuICAvLyAgIHJldHVybiB0aGlzLnRpdGxlO1xuICAvLyB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0KHRpdGxlKXtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHtcbiAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHRpdGxlXG4gICAgfSlcbiAgfVxuXG4gICBhZGROZXdUYXNrKG5ld1Rhc2spIHtcbiAgICBpZiAoIXRoaXMudGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSl7XG4gICAgICByZXR1cm4gdGhpcy50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFza0FycmF5KVxuICAgfVxuICB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiB7XG4gICAgICAgcmV0dXJuIHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lXG4gIFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG4gIHJlbW92ZVRhc2tGcm9tUHJvamVjdChlYWNoVGFzaykge1xuICAgIHRoaXMudGFza0FycmF5ID0gdGhpcy50YXNrQXJyYXkuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSBlYWNoVGFzayk7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICghcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKXtcbiAgICAgcHJvamVjdEFycmF5LnB1c2gobmV3UHJvamVjdCk7XG4gICAgIGNvbnNvbGUubG9nKHByb2plY3RBcnJheSlcbiAgICB9XG4gIH1cblxuICAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gcHJvamVjdEFycmF5LmZpbmQoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWVcbiAgICApO1xuICAgIHByb2plY3RBcnJheS5zcGxpY2UocHJvamVjdEFycmF5LmluZGV4T2YoZGVsZXRlUHJvamVjdCksIDEpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IFRvRG9UYXNrLCBQcm9qZWN0LCBwcm9qZWN0QXJyYXkgfSBmcm9tIFwiLi9jb25zdHJ1Y3RvclwiO1xuXG5jb25zdCBQcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1saXN0XCIpO1xuY29uc3QgYXBwZW5kUHJvamVjdFRvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1ob21lXCIpO1xuY29uc3QgcHJvamVjdEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybS1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xuLy8gY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3QtaW5wdXRcIik7XG5jb25zdCBwcm9qZWN0U3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXN1Ym1pdFwiKTtcbmNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuXG5jb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvdyB7XG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1pbnB1dFwiKTtcbiAgICBjb25zdCBwcm9qZWN0VmFsdWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7IFxuICAgIGlmIChwcm9qZWN0VmFsdWUgPT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJGaWxsIGluIGEgUHJvamVjdCBOYW1lXCIpOyAgICAgXG4gICAgICByZXR1cm47XG4gICAgfSBcbiAgICBpZiAoUHJvamVjdC5pc1ByZXNlbnQocHJvamVjdFZhbHVlKSkge1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIGFsZXJ0KFwiY2hvb3NlIGEgZGlmZmVyZW50IHByb2plY3QgbmFtZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RWYWx1ZSk7XG4gICAgICAgIFByb2plY3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTsgXG4gICAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHByb2plY3RWYWx1ZSk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdFZhbHVlKVxuICAgICAgICAvLyBTaG93LnByb2plY3RCdXR0b25zKHByb2plY3RWYWx1ZSlcbiAgICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpe1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCcpXG4gICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTsgXG4gICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKCdEZWZhdWx0JylcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgICBTaG93Lm5ld1Rhc2tGb3JtKCdEZWZhdWx0Jyk7XG4gICAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0QnV0dG9ucygpe1xuICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJylcbiAgICAgIHByb2plY3RCdXR0b25zLmZvckVhY2goKHByb2plY3RCdXR0b24saW5kZXgpID0+IHtcbiAgICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAvLyBhbGVydChcImNsaWNrZWRcIik7XG4gICAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAgIFwidGFzay1mb3JtLWNvbnRhaW5lclwiXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCk7XG4gICAgICAgICAgU2hvdy50YXNrRXZlbnQocHJvamVjdEFycmF5W2luZGV4XSlcbiAgICAgICAgICAgcHJvamVjdEFycmF5W2luZGV4XS50YXNrQXJyYXkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgICAgIFNob3cubmV3VGFza0NhcmQodGFzay5uYW1lLCB0YXNrLnByaW9yaXR5LCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgLy8gIFNob3cudGFza0V2ZW50KCk7ICAgICAgXG4gICAgICAgIH0pXG4gIFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIG5ld1Byb2plY3RUZW1wbGF0ZSh0aXRsZSkge1xuICAgIGFwcGVuZFByb2plY3RUb0xpc3QuaW5uZXJIVE1MICs9IGBcbiAgICAgPGxpIGNsYXNzPVwibGVmdC1jb250YWluZXIgZC1mbGV4IGFsaWduLWl0ZW1zLWJhc2VsaW5lIGp1c3RpZnktY29udGVudC1ldmVubHlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC1idG5cIj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgZGVsZXRlXCI+PC9pPlxuICAgICA8L2xpPmA7XG4gICAgIFNob3cucHJvamVjdEJ1dHRvbnModGl0bGUpXG4gICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KHRpdGxlKVxuICB9XG5cblxuLy8gICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9ICgpID0+IHtcbi8vICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcbi8vICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbiwgaW5kZXgpID0+IHtcbi8vICAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuLy8gICAgICAgY29uc3QgdG9kb0l0ZW1zTGlzdCA9IGRvbS5teVF1ZXJ5KCcudG9kby1pdGVtcy1saXN0Jyk7XG4vLyAgICAgICB0b2RvSXRlbXNMaXN0LmlubmVySFRNTCA9ICcnO1xuLy8gICAgICAgcHJvamVjdHNbaW5kZXhdLnRvZG9MaXN0LmZvckVhY2goKHRvZG9MaXN0KSA9PiB7XG4vLyAgICAgICAgIHRvZG9JdGVtc0xpc3QuYXBwZW5kKGNyZWF0ZVRvZG9MaXN0KHByb2plY3RzLCB0b2RvTGlzdCkpO1xuLy8gICAgICAgfSk7XG4vLyAgICAgICBjb25zdCBidXR0b25zRGl2ID0gZG9tLm15UXVlcnkoJy5idXR0b25zJyk7XG4vLyAgICAgICBidXR0b25zRGl2LmlubmVySFRNTCA9ICcnO1xuLy8gICAgICAgY2xlYXJCdXR0b24ocHJvamVjdHMsIHByb2plY3RCdXR0b24pO1xuLy8gICAgICAgZGVsZXRlQnV0dG9uKHByb2plY3RzLCBwcm9qZWN0QnV0dG9uKTtcbi8vICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuXG4gIHN0YXRpYyBuZXdUYXNrRm9ybShwcm9qZWN0VGl0bGUpe1xuICAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgIDxkaXY+XG4gICAgICAgICAgIDxoND4ke3Byb2plY3RUaXRsZX08L2g0PlxuICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciB0YXNrLWZvcm1cIiBpZD1cInVzcmZvcm1cIj5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiIGNsYXNzPVwicC0yXCI+TmFtZTwvbGFiZWw+PGJyPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIG5hbWU9XCJ0YXNrLW5hbWVcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwibmFtZVwiPjxicj5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJpb3JpdHlcIiBjbGFzcz1cInAtMlwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInByaW9yaXR5XCIgbmFtZT1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCIgY2xhc3M9XCJwLTJcIj5EYXRlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIGlkPVwiZHVlLWRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJ0YXNrLXN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgPC9mb3JtPiBcbiAgICAgICA8L2Rpdj5gO1xuICAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0LmZpbmRQcm9qZWN0KHByb2plY3RUaXRsZSlcbiAgICAgICBTaG93LnRhc2tFdmVudChwcm9qZWN0KVxuICB9XG5cbiAgc3RhdGljIHRhc2tFdmVudChwcm9qZWN0KXtcbiAgICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c3Jmb3JtJylcbiAgICAgdGFza1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsKGUpID0+IHtcbiAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBTaG93LmFkZFRhc2socHJvamVjdClcbiAgICAgfVxuICAgICkgXG4gIH1cbiAgXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3Qpe1xuICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikgICBcbiAgICAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWVcbiAgICAgLy8gICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpXG4gICAgIC8vICAgY29uc3QgZGVzY0lucHV0ID0gZGVzY3JpcHRpb24udmFsdWVcbiAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpXG4gICAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlXG4gICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIik7XG4gICAgICAgY29uc3QgZHVlRGF0ZWlucHV0ID0gZHVlRGF0ZS52YWx1ZVxuICAgICAgXG4gICAgICAgcHJvamVjdC5hZGROZXdUYXNrKG5ldyBUb0RvVGFzayh0YXNrTmFtZUlucHV0LHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCkpXG4gICAgICAvLyBjb25zdCB1c2VyRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c3Jmb3JtJylcbiAgICAgIC8vICAgdXNlckZvcm0ucmVzZXQoKVxuICAgICAgIFNob3cubmV3VGFza0NhcmQodGFza05hbWVJbnB1dCxwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpO1xuICAgICAgIFNob3cudGFza0V2ZW50KHByb2plY3QpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tDYXJkKG5hbWUscHJpb3JpdHksZHVlRGF0ZSl7XG4gICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwidGFzay1jYXJkLWNvbnRhaW5lclwiPlxuICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tNlwiPlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIiBpZD1cImNhcmQtdGFzay1uYW1lXCI+JHtuYW1lfTwvaDU+XG5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9wPlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWR1ZWRhdGVcIj4ke2R1ZURhdGV9PC9wPlxuICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgZGVsZXRlXCI+PC9pPlxuICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5gO1xuICAgICBTaG93LnJlbW92ZVRhc2tFdmVudCgpXG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEV2ZW50KCl7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgIFNob3cuYWRkUHJvamVjdCgpXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdEV2ZW50KHByb2plY3ROYW1lKXtcbiAgICAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZScpKXtcbiAgICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICAvLyByZXR1cm4gUHJvamVjdC5kZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKVxuICAgICAgICAgIH1cbiAgICAgICB9KVxuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tFdmVudCgpe1xuICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHtcbiAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZScpKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKClcbiAgICAgICAgICB9XG4gICAgIH0pXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5cbi8vIGltcG9ydCBTaG93IGZyb20gXCIuL21vZHVsZXMvc2hvd1wiXG4vLyBpbXBvcnQgY29uc3RydWN0b3IgZnJvbSBcIi4vbW9kdWxlcy9jb25zdHJ1Y3RvclwiO1xuXG5cbi8vIC8vIHN0YXRpY2N0aW9uIGNvbXBvbmVudCgpIHtcbi8vIC8vICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbi8vIC8vICAgLy8gTG9kYXNoLCBjdXJyZW50bHkgaW5jbHVkZWQgdmlhIGEgc2NyaXB0LCBpcyByZXF1aXJlZCBmb3IgdGhpcyBsaW5lIHRvIHdvcmtcbi8vIC8vICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oW1wiSGVsbG9cIiwgXCJ3ZWJwYWNrXCJdLCBcIiBcIik7XG5cbi8vIC8vICAgcmV0dXJuIGVsZW1lbnQ7XG4vLyAvLyB9XG5cbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29tcG9uZW50KCkpO1xuXG4vLyBpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi8sbG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQgIFNob3cgIGZyb20gXCIuL21vZHVsZXMvc2hvd1wiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBTaG93LnByb2plY3RFdmVudCwgU2hvdy5kZWZhdWx0UHJvamVjdCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==