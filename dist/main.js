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
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage */ "./src/modules/localStorage.js");


const projectArray = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)() && (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)().length ? (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)() : [];
class Project {
  constructor(title) {
    this.title = title;
    this.taskArray = [];
  }

  static taskArray() {
    return this.taskArray;
  }

  static findProjectIndex(title) {
    return projectArray.findIndex((project) => project.title === title);
  }

  static findProject(title) {
    return projectArray.find((project) => project.title === title);
  }

  static isPresent(projectName) {
    return projectArray.some(
      (project) => project.title === projectName,
    );
  }

  static removeTaskFromProject(eachTask) {
    this.taskArray = this.taskArray.filter((task) => task.title !== eachTask.title);
    return this.taskarray;
  }

  static addProject(newProject) {
    if (!projectArray.find((project) => project.title === newProject.title)) {
      projectArray.push(newProject);
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.setProject)(projectArray);
    }
  }

  static deleteProject(projectName) {
    const deleteProject = projectArray.findIndex(
      (project) => project.title === projectName,
    );
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_0__.getProject)();
    projects.splice(deleteProject, 1);
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
// save projects
function setProject(array) {
  const arrayString = JSON.stringify(array);

  localStorage.setItem('projects', arrayString);
}

// read projects
function getProject() {
  const arrayString = localStorage.getItem('projects');
  if (arrayString) {
    return JSON.parse(arrayString);
  }
  return false;
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
/* harmony import */ var _todoTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoTask */ "./src/modules/todoTask.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage */ "./src/modules/localStorage.js");




const appendProjectToList = document.getElementById('project-home');
const projectSubmit = document.getElementById('project-submit');
const taskFormContainer = document.getElementById('task-form-container');

class Show {
  static addProject() {
    const projectInput = document.getElementById('project-input');
    const projectValue = projectInput.value;
    if (projectValue === '') {
      alert("Fill in a project name");
      return;
    }
    if (_constructor__WEBPACK_IMPORTED_MODULE_0__.Project.isPresent(projectValue)) {
      alert("choose a diffrent name")
      projectInput.value = '';
    } else {
      const newProject = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project(projectValue);
      _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(newProject);
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
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)()
    projects.forEach((element) => {
      const { title } = element;
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects)
      Show.newProjectTemplate(title);
    });
  }

  static defaultProject() {
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project('Default');
    _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project);
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

        const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

        Show.newTaskForm(projectButton.textContent);
        projects[index].taskArray.forEach((task) => {
          (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);
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
    const projectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(projectTitle);
    const project = _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray[projectIndex];
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
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

    const newTask = new _todoTask__WEBPACK_IMPORTED_MODULE_1__.default(
      taskNameInput,
      descInput,
      priorityInput,
      dueDateinput,
    );

    if (!projects[index].taskArray.find((task) => task.name === newTask.name)) {
      projects[index].taskArray.push(newTask);
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);
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
    const projectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(title);
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
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

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

      (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);
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
        _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.deleteProject(index);
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
        const findProjectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(
          projectName.textContent,
        );

        const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

        const findTask = projects[findProjectIndex].taskArray.find(
          (task) => task.name === index,
        );
        projects[findProjectIndex].taskArray.splice(
          projects[findProjectIndex].taskArray.indexOf(findTask),
          1,
        );

        (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);

        e.target.parentElement.parentElement.parentElement.remove();
      });
    });
  }
}


/***/ }),

/***/ "./src/modules/todoTask.js":
/*!*********************************!*\
  !*** ./src/modules/todoTask.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoTask)
/* harmony export */ });
class ToDoTask {
  constructor(name, description, priority, dueDate) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  updateTask(newTask) {
    this.name = newTask;
    return this.name;
  }

  getDueDate(date) {
    this.dueDate = date;
    return this.dueDate;
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


document.addEventListener('DOMContentLoaded', _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.projectEvent, _modules_show__WEBPACK_IMPORTED_MODULE_0__.default.defaultProject());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0seURBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGtFQUF3QjtBQUN6RDtBQUNBOztBQUVBLHlCQUF5Qix5REFBVTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSx5REFBVTs7QUFFbEI7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pTZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDakJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDLDhDQUE4QywrREFBaUIsRUFBRSxpRUFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc2hvdy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UHJvamVjdCwgc2V0UHJvamVjdCB9IGZyb20gJy4vbG9jYWxTdG9yYWdlJztcblxuZXhwb3J0IGNvbnN0IHByb2plY3RBcnJheSA9IGdldFByb2plY3QoKSAmJiBnZXRQcm9qZWN0KCkubGVuZ3RoID8gZ2V0UHJvamVjdCgpIDogW107XG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza0FycmF5ID0gW107XG4gIH1cblxuICBzdGF0aWMgdGFza0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdEluZGV4KHRpdGxlKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5maW5kSW5kZXgoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdCh0aXRsZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGUpO1xuICB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZSxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tGcm9tUHJvamVjdChlYWNoVGFzaykge1xuICAgIHRoaXMudGFza0FycmF5ID0gdGhpcy50YXNrQXJyYXkuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSBlYWNoVGFzay50aXRsZSk7XG4gICAgcmV0dXJuIHRoaXMudGFza2FycmF5O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICghcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKSB7XG4gICAgICBwcm9qZWN0QXJyYXkucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgIHNldFByb2plY3QocHJvamVjdEFycmF5KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBwcm9qZWN0QXJyYXkuZmluZEluZGV4KFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lLFxuICAgICk7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG4gICAgcHJvamVjdHMuc3BsaWNlKGRlbGV0ZVByb2plY3QsIDEpO1xuICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICB9XG59XG4iLCIvLyBzYXZlIHByb2plY3RzXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvamVjdChhcnJheSkge1xuICBjb25zdCBhcnJheVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5KTtcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBhcnJheVN0cmluZyk7XG59XG5cbi8vIHJlYWQgcHJvamVjdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0KCkge1xuICBjb25zdCBhcnJheVN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpO1xuICBpZiAoYXJyYXlTdHJpbmcpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShhcnJheVN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHsgUHJvamVjdCwgcHJvamVjdEFycmF5IH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQgVG9Eb1Rhc2sgZnJvbSAnLi90b2RvVGFzayc7XG5pbXBvcnQgeyBzZXRQcm9qZWN0LCBnZXRQcm9qZWN0IH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuXG5jb25zdCBhcHBlbmRQcm9qZWN0VG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaG9tZScpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXN1Ym1pdCcpO1xuY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLWNvbnRhaW5lcicpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93IHtcbiAgc3RhdGljIGFkZFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaW5wdXQnKTtcbiAgICBjb25zdCBwcm9qZWN0VmFsdWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgaWYgKHByb2plY3RWYWx1ZSA9PT0gJycpIHtcbiAgICAgIGFsZXJ0KFwiRmlsbCBpbiBhIHByb2plY3QgbmFtZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFByb2plY3QuaXNQcmVzZW50KHByb2plY3RWYWx1ZSkpIHtcbiAgICAgIGFsZXJ0KFwiY2hvb3NlIGEgZGlmZnJlbnQgbmFtZVwiKVxuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VmFsdWUpO1xuICAgICAgUHJvamVjdC5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xuICAgICAgLy8gc2V0UHJvamVjdChwcm9qZWN0cylcbiAgICAgIC8vIFNob3cuZGlzU3RvcmVkUHJvamVjdCgpO1xuICAgICAgU2hvdy5uZXdQcm9qZWN0VGVtcGxhdGUocHJvamVjdFZhbHVlKTtcbiAgICAgIFxuICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RWYWx1ZSk7XG4gICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpO1xuICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzU3RvcmVkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKVxuICAgIHByb2plY3RzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IGVsZW1lbnQ7XG4gICAgICBzZXRQcm9qZWN0KHByb2plY3RzKVxuICAgICAgU2hvdy5uZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTaG93LmRpc1N0b3JlZFByb2plY3QoKTtcbiAgICBTaG93LnByb2plY3RCdXR0b25zKCk7ICAgICBcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBTaG93Lm5ld1Rhc2tGb3JtKCdEZWZhdWx0Jyk7XG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcbiAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChwcm9qZWN0QnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAndGFzay1mb3JtLWNvbnRhaW5lcicsXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY29udGFpbmVyJyk7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50KTtcbiAgICAgICAgcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgICAgdGFzay5kdWVEYXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzZXRQcm9qZWN0KHByb2plY3RzKTtcbiAgICAgICAgU2hvdy5lZGl0VGFza0V2ZW50KGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG5ld1Byb2plY3RUZW1wbGF0ZSh0aXRsZSkge1xuICAgIGFwcGVuZFByb2plY3RUb0xpc3QuaW5uZXJIVE1MICs9IGBcbiAgICAgPGxpIGNsYXNzPVwibGVmdC1jb250YWluZXIgZC1mbGV4IGFsaWduLWl0ZW1zLWJhc2VsaW5lIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtYnRuXCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT48L2J1dHRvbj5cbiAgICAgPC9saT5gO1xuXG4gICAgU2hvdy5wcm9qZWN0QnV0dG9ucyh0aXRsZSk7XG4gICAgU2hvdy5kZWxldGVQcm9qZWN0RXZlbnQoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdUYXNrRm9ybShwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0tY29udGFpbmVyJyk7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgPGg0IGlkPVwicHJvamVjdC10aXRsZVwiPiR7cHJvamVjdFRpdGxlfTwvaDQ+XG4gICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciB0YXNrLWZvcm1cIiBpZD1cInVzcmZvcm1cIj5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiIGNsYXNzPVwicC0yXCI+TmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay1uYW1lXCIgbmFtZT1cInRhc2stbmFtZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwicC0yXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzY3JpcHRpb25cIiBuYW1lPVwiZGVzY3JpcHRpb25cIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIj5cblxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiIGNsYXNzPVwicC0yXCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwicHJpb3JpdHlcIiBuYW1lPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWVkaXVtXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIiBjbGFzcz1cInAtMlwiPkRhdGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgaWQ9XCJkdWUtZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiPjxicj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJ0YXNrLXN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiZC1ub25lXCIgaWQ9XCJ0YXNrLXVwZGF0ZVwiIG5hbWU9XCJ1cGRhdGVcIiB2YWx1ZT1cInVwZGF0ZVwiPlxuICAgICAgICAgICAgICAgPC9mb3JtPiBcbiAgICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleChwcm9qZWN0VGl0bGUpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XTtcbiAgICBTaG93LnRhc2tFdmVudChwcm9qZWN0LCBwcm9qZWN0SW5kZXgpO1xuICB9XG5cbiAgc3RhdGljIHRhc2tFdmVudChwcm9qZWN0LCBpbmRleCkge1xuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNyZm9ybScpO1xuICAgIHRhc2tTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFNob3cuYWRkVGFzayhwcm9qZWN0LCBpbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0LCBpbmRleCkge1xuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbmFtZScpO1xuICAgIGNvbnN0IHRhc2tOYW1lSW5wdXQgPSB0YXNrTmFtZS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5Jyk7XG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlLWRhdGUnKTtcbiAgICBjb25zdCBkdWVEYXRlaW5wdXQgPSBkdWVEYXRlLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUb0RvVGFzayhcbiAgICAgIHRhc2tOYW1lSW5wdXQsXG4gICAgICBkZXNjSW5wdXQsXG4gICAgICBwcmlvcml0eUlucHV0LFxuICAgICAgZHVlRGF0ZWlucHV0LFxuICAgICk7XG5cbiAgICBpZiAoIXByb2plY3RzW2luZGV4XS50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBuZXdUYXNrLm5hbWUpKSB7XG4gICAgICBwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LnB1c2gobmV3VGFzayk7XG4gICAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcbiAgICAgIFNob3cubmV3VGFza0NhcmQodGFza05hbWVJbnB1dCwgZGVzY0lucHV0LCBwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpO1xuICAgICAgU2hvdy5lZGl0VGFza0V2ZW50KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0NhcmQobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgY29uc3QgYWRkVGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1jb250YWluZXInKTtcbiAgICBhZGRUYXNrQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJ0YXNrLWNhcmQtY29udGFpbmVyXCI+XG4gICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIiBpZD1cImNhcmQtdGFzay1uYW1lXCI+JHtuYW1lfTwvaDU+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9wPjxicj5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kdWVkYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMiB0cmFzaFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdFwiPjxpIGNsYXNzPVwiZmFyIGZhLWVkaXRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPC9kaXY+XG4gICAgICAgPC9kaXY+XG4gICAgIDwvZGl2PmA7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZScpLnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleCh0aXRsZSk7XG4gICAgU2hvdy5yZW1vdmVUYXNrRXZlbnQoKTtcbiAgICBTaG93LmVkaXRUYXNrRXZlbnQocHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIHN0YXRpYyBlZGl0VGFza0V2ZW50KGluZGV4KSB7XG4gICAgY29uc3QgZWRpdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdCcpO1xuICAgIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRidG4pID0+IHtcbiAgICAgIGVkaXRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1zdWJtaXQnKTtcbiAgICAgICAgdGFza1N1Ym1pdC5jbGFzc05hbWUgPSAnZC1ub25lJztcbiAgICAgICAgY29uc3QgdGFza1VwZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXVwZGF0ZScpO1xuICAgICAgICB0YXNrVXBkYXRlLmNsYXNzTmFtZSA9ICdkLWJsb2NrJztcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcblxuICAgICAgICBTaG93LnVwZGF0ZVRhc2sodGl0bGUsIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2sodGl0bGUsIGluZGV4KSB7XG4gICAgY29uc3QgdXBkYXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdXBkYXRlJyk7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICBjb25zdCB0b2RvSWR4ID0gcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5maW5kSW5kZXgoKHRhc2spID0+IHRhc2submFtZSA9PT0gdGl0bGUpO1xuICAgIGNvbnN0IHByb2plY3RJZHggPSBpbmRleDtcblxuICAgIHVwZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbmFtZScpO1xuICAgICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbiAgICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKTtcbiAgICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBwcmlvcml0eS52YWx1ZTtcbiAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlLWRhdGUnKTtcbiAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGR1ZURhdGUudmFsdWU7XG5cbiAgICAgIHByb2plY3RzW3Byb2plY3RJZHhdLnRhc2tBcnJheVt0b2RvSWR4XS5uYW1lID0gdGFza05hbWVJbnB1dDtcbiAgICAgIHByb2plY3RzW3Byb2plY3RJZHhdLnRhc2tBcnJheVt0b2RvSWR4XS5kZXNjcmlwdGlvbiA9IGRlc2NJbnB1dDtcbiAgICAgIHByb2plY3RzW3Byb2plY3RJZHhdLnRhc2tBcnJheVt0b2RvSWR4XS5wcmlvcml0eSA9IHByaW9yaXR5SW5wdXQ7XG4gICAgICBwcm9qZWN0c1twcm9qZWN0SWR4XS50YXNrQXJyYXlbdG9kb0lkeF0uZHVlRGF0ZSA9IGR1ZURhdGVJbnB1dDtcblxuICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpO1xuICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgIHByb2plY3RzW3Byb2plY3RJZHhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgIFNob3cubmV3VGFza0NhcmQoXG4gICAgICAgICAgdGFzay5uYW1lLFxuICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgICB0YXNrLmR1ZURhdGUsXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdCcpO1xuICAgICAgdGFza1N1Ym1pdC5jbGFzc05hbWUgPSAnZC1ibG9jayc7XG4gICAgICBjb25zdCB0YXNrVXBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdXBkYXRlJyk7XG4gICAgICB0YXNrVXBkYXRlLmNsYXNzTmFtZSA9ICdkLW5vbmUnO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHByb2plY3RFdmVudCgpIHtcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFNob3cuYWRkUHJvamVjdCgpO1xuICAgICAgY29uc3QgcmVzZXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWZvcm0nKTtcbiAgICAgIHJlc2V0Rm9ybS5yZXNldCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3RFdmVudCgpIHtcbiAgICBjb25zdCBkZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZScpO1xuICAgIGRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgUHJvamVjdC5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1jb250YWluZXInKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybSgnRGVmYXVsdCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVGFza0V2ZW50KCkge1xuICAgIGNvbnN0IHJlbW92ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlJyk7XG4gICAgcmVtb3ZlQnV0dG9ucy5mb3JFYWNoKChyZW1vdmVCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlJyk7XG4gICAgICAgIGNvbnN0IGZpbmRQcm9qZWN0SW5kZXggPSBQcm9qZWN0LmZpbmRQcm9qZWN0SW5kZXgoXG4gICAgICAgICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgY29uc3QgZmluZFRhc2sgPSBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuZmluZChcbiAgICAgICAgICAodGFzaykgPT4gdGFzay5uYW1lID09PSBpbmRleCxcbiAgICAgICAgKTtcbiAgICAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LnNwbGljZShcbiAgICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuaW5kZXhPZihmaW5kVGFzayksXG4gICAgICAgICAgMSxcbiAgICAgICAgKTtcblxuICAgICAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcblxuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICB9XG5cbiAgdXBkYXRlVGFzayhuZXdUYXNrKSB7XG4gICAgdGhpcy5uYW1lID0gbmV3VGFzaztcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0RHVlRGF0ZShkYXRlKSB7XG4gICAgdGhpcy5kdWVEYXRlID0gZGF0ZTtcbiAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBTaG93IGZyb20gJy4vbW9kdWxlcy9zaG93JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFNob3cucHJvamVjdEV2ZW50LCBTaG93LmRlZmF1bHRQcm9qZWN0KCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9