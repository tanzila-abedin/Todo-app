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
      projectInput.value = ''
      return;
    }
    if (_constructor__WEBPACK_IMPORTED_MODULE_0__.Project.isPresent(projectValue)) {
      projectInput.value = '';
    } else {
      const newProject = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project(projectValue);
      _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(newProject);
      Show.newProjectTemplate(projectValue);
      taskFormContainer.innerHTML = '';
      Show.newTaskForm(projectValue);
      const taskAddContainer = document.getElementById('add-task-container');
      taskAddContainer.innerHTML = '';
    }
  }


  static disStoredProject() {
    _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray.forEach((element) => {
      const { title } = element;
      Show.newProjectTemplate(title);
    });
  }

  static defaultProject() {
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project('Default');
    _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project);
    Show.disStoredProject();
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
        console.log(index, 'index');
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
      console.log(todoIdx, 'todo');

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
        e.target.parentElement.parentElement.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGtFQUF3QjtBQUN6RDtBQUNBOztBQUVBLHlCQUF5Qix5REFBVTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSx5REFBVTs7QUFFbEI7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVSZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDakJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDLDhDQUE4QywrREFBaUIsRUFBRSxpRUFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc2hvdy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UHJvamVjdCwgc2V0UHJvamVjdCB9IGZyb20gJy4vbG9jYWxTdG9yYWdlJztcblxuZXhwb3J0IGNvbnN0IHByb2plY3RBcnJheSA9IGdldFByb2plY3QoKSAmJiBnZXRQcm9qZWN0KCkubGVuZ3RoID8gZ2V0UHJvamVjdCgpIDogW107XG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMudGFza0FycmF5ID0gW107XG4gIH1cblxuICBzdGF0aWMgdGFza0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLnRhc2tBcnJheTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdEluZGV4KHRpdGxlKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5maW5kSW5kZXgoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUHJvamVjdCh0aXRsZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGUpO1xuICB9XG5cbiAgc3RhdGljIGlzUHJlc2VudChwcm9qZWN0TmFtZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuc29tZShcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZSxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tGcm9tUHJvamVjdChlYWNoVGFzaykge1xuICAgIHRoaXMudGFza0FycmF5ID0gdGhpcy50YXNrQXJyYXkuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSBlYWNoVGFzay50aXRsZSk7XG4gICAgcmV0dXJuIHRoaXMudGFza2FycmF5O1xuICB9XG5cbiAgc3RhdGljIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgIGlmICghcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IG5ld1Byb2plY3QudGl0bGUpKSB7XG4gICAgICBwcm9qZWN0QXJyYXkucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgIHNldFByb2plY3QocHJvamVjdEFycmF5KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBwcm9qZWN0QXJyYXkuZmluZEluZGV4KFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lLFxuICAgICk7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG4gICAgcHJvamVjdHMuc3BsaWNlKGRlbGV0ZVByb2plY3QsIDEpO1xuICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICB9XG59XG4iLCIvLyBzYXZlIHByb2plY3RzXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvamVjdChhcnJheSkge1xuICBjb25zdCBhcnJheVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGFycmF5KTtcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBhcnJheVN0cmluZyk7XG59XG5cbi8vIHJlYWQgcHJvamVjdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0KCkge1xuICBjb25zdCBhcnJheVN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpO1xuICBpZiAoYXJyYXlTdHJpbmcpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShhcnJheVN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHsgUHJvamVjdCwgcHJvamVjdEFycmF5IH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQgVG9Eb1Rhc2sgZnJvbSAnLi90b2RvVGFzayc7XG5pbXBvcnQgeyBzZXRQcm9qZWN0LCBnZXRQcm9qZWN0IH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuXG5jb25zdCBhcHBlbmRQcm9qZWN0VG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaG9tZScpO1xuY29uc3QgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXN1Ym1pdCcpO1xuY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLWNvbnRhaW5lcicpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93IHtcbiAgc3RhdGljIGFkZFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaW5wdXQnKTtcbiAgICBjb25zdCBwcm9qZWN0VmFsdWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgaWYgKHByb2plY3RWYWx1ZSA9PT0gJycpIHtcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChQcm9qZWN0LmlzUHJlc2VudChwcm9qZWN0VmFsdWUpKSB7XG4gICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RWYWx1ZSk7XG4gICAgICBQcm9qZWN0LmFkZFByb2plY3QobmV3UHJvamVjdCk7XG4gICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZShwcm9qZWN0VmFsdWUpO1xuICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RWYWx1ZSk7XG4gICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpO1xuICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuXG4gIHN0YXRpYyBkaXNTdG9yZWRQcm9qZWN0KCkge1xuICAgIHByb2plY3RBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRpdGxlIH0gPSBlbGVtZW50O1xuICAgICAgU2hvdy5uZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCgnRGVmYXVsdCcpO1xuICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTaG93LmRpc1N0b3JlZFByb2plY3QoKTtcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBTaG93Lm5ld1Rhc2tGb3JtKCdEZWZhdWx0Jyk7XG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcbiAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChwcm9qZWN0QnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICAndGFzay1mb3JtLWNvbnRhaW5lcicsXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY29udGFpbmVyJyk7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50KTtcbiAgICAgICAgcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgICAgdGFzay5kdWVEYXRlLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICBTaG93LmVkaXRUYXNrRXZlbnQoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKSB7XG4gICAgYXBwZW5kUHJvamVjdFRvTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICA8bGkgY2xhc3M9XCJsZWZ0LWNvbnRhaW5lciBkLWZsZXggYWxpZ24taXRlbXMtYmFzZWxpbmUganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC1idG5cIj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGVcIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yXCI+PC9pPjwvYnV0dG9uPlxuICAgICA8L2xpPmA7XG5cbiAgICBTaG93LnByb2plY3RCdXR0b25zKHRpdGxlKTtcbiAgICBTaG93LmRlbGV0ZVByb2plY3RFdmVudCgpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tGb3JtKHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS1jb250YWluZXInKTtcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICA8aDQgaWQ9XCJwcm9qZWN0LXRpdGxlXCI+JHtwcm9qZWN0VGl0bGV9PC9oND5cbiAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybVwiIGlkPVwidXNyZm9ybVwiPlxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCIgY2xhc3M9XCJwLTJcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiBuYW1lPVwidGFzay1uYW1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJwLTJcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNjcmlwdGlvblwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiPlxuXG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaW9yaXR5XCIgY2xhc3M9XCJwLTJcIj5Qcmlvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJwcmlvcml0eVwiIG5hbWU9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiIGNsYXNzPVwicC0yXCI+RGF0ZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBpZD1cImR1ZS1kYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCI+PGJyPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInRhc2stc3VibWl0XCI+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJkLW5vbmVcIiBpZD1cInRhc2stdXBkYXRlXCIgbmFtZT1cInVwZGF0ZVwiIHZhbHVlPVwidXBkYXRlXCI+XG4gICAgICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgIDwvZGl2PmA7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KHByb2plY3RUaXRsZSk7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RBcnJheVtwcm9qZWN0SW5kZXhdO1xuICAgIFNob3cudGFza0V2ZW50KHByb2plY3QsIHByb2plY3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgdGFza0V2ZW50KHByb2plY3QsIGluZGV4KSB7XG4gICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c3Jmb3JtJyk7XG4gICAgdGFza1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRUYXNrKHByb2plY3QsIGluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3QsIGluZGV4KSB7XG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1uYW1lJyk7XG4gICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZGVzY0lucHV0ID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKTtcbiAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWUtZGF0ZScpO1xuICAgIGNvbnN0IGR1ZURhdGVpbnB1dCA9IGR1ZURhdGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRvRG9UYXNrKFxuICAgICAgdGFza05hbWVJbnB1dCxcbiAgICAgIGRlc2NJbnB1dCxcbiAgICAgIHByaW9yaXR5SW5wdXQsXG4gICAgICBkdWVEYXRlaW5wdXQsXG4gICAgKTtcblxuICAgIGlmICghcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IG5ld1Rhc2submFtZSkpIHtcbiAgICAgIHByb2plY3RzW2luZGV4XS50YXNrQXJyYXkucHVzaChuZXdUYXNrKTtcbiAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgU2hvdy5uZXdUYXNrQ2FyZCh0YXNrTmFtZUlucHV0LCBkZXNjSW5wdXQsIHByaW9yaXR5SW5wdXQsIGR1ZURhdGVpbnB1dCk7XG4gICAgICBTaG93LmVkaXRUYXNrRXZlbnQoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZXdUYXNrQ2FyZChuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICBjb25zdCBhZGRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpO1xuICAgIGFkZFRhc2tDb250YWluZXIuaW5uZXJIVE1MICs9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInRhc2stY2FyZC1jb250YWluZXJcIj5cbiAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgPGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiIGlkPVwiY2FyZC10YXNrLW5hbWVcIj4ke25hbWV9PC9oNT5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLXByaW9yaXR5XCI+JHtwcmlvcml0eX08L3A+PGJyPlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWR1ZWRhdGVcIj4ke2R1ZURhdGV9PC9wPlxuICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmVcIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yIHRyYXNoXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0XCI+PGkgY2xhc3M9XCJmYXIgZmEtZWRpdFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+YDtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRpdGxlJykudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KHRpdGxlKTtcbiAgICBTaG93LnJlbW92ZVRhc2tFdmVudCgpO1xuICAgIFNob3cuZWRpdFRhc2tFdmVudChwcm9qZWN0SW5kZXgpO1xuICB9XG5cbiAgc3RhdGljIGVkaXRUYXNrRXZlbnQoaW5kZXgpIHtcbiAgICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0Jyk7XG4gICAgZWRpdEJ1dHRvbnMuZm9yRWFjaCgoZWRpdGJ0bikgPT4ge1xuICAgICAgZWRpdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdCcpO1xuICAgICAgICB0YXNrU3VibWl0LmNsYXNzTmFtZSA9ICdkLW5vbmUnO1xuICAgICAgICBjb25zdCB0YXNrVXBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdXBkYXRlJyk7XG4gICAgICAgIHRhc2tVcGRhdGUuY2xhc3NOYW1lID0gJ2QtYmxvY2snO1xuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50O1xuXG4gICAgICAgIFNob3cudXBkYXRlVGFzayh0aXRsZSwgaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleCwgJ2luZGV4Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrKHRpdGxlLCBpbmRleCkge1xuICAgIGNvbnN0IHVwZGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXVwZGF0ZScpO1xuICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgY29uc3QgdG9kb0lkeCA9IHByb2plY3RzW2luZGV4XS50YXNrQXJyYXkuZmluZEluZGV4KCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IHRpdGxlKTtcbiAgICBjb25zdCBwcm9qZWN0SWR4ID0gaW5kZXg7XG5cbiAgICB1cGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc29sZS5sb2codG9kb0lkeCwgJ3RvZG8nKTtcblxuICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1uYW1lJyk7XG4gICAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgY29uc3QgZGVzY0lucHV0ID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpO1xuICAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWUtZGF0ZScpO1xuICAgICAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZHVlRGF0ZS52YWx1ZTtcblxuICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5W3RvZG9JZHhdLm5hbWUgPSB0YXNrTmFtZUlucHV0O1xuICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5W3RvZG9JZHhdLmRlc2NyaXB0aW9uID0gZGVzY0lucHV0O1xuICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5W3RvZG9JZHhdLnByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dDtcbiAgICAgIHByb2plY3RzW3Byb2plY3RJZHhdLnRhc2tBcnJheVt0b2RvSWR4XS5kdWVEYXRlID0gZHVlRGF0ZUlucHV0O1xuXG4gICAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY29udGFpbmVyJyk7XG4gICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICB0YXNrLm5hbWUsXG4gICAgICAgICAgdGFzay5kZXNjcmlwdGlvbixcbiAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0Jyk7XG4gICAgICB0YXNrU3VibWl0LmNsYXNzTmFtZSA9ICdkLWJsb2NrJztcbiAgICAgIGNvbnN0IHRhc2tVcGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay11cGRhdGUnKTtcbiAgICAgIHRhc2tVcGRhdGUuY2xhc3NOYW1lID0gJ2Qtbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcHJvamVjdEV2ZW50KCkge1xuICAgIHByb2plY3RTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRQcm9qZWN0KCk7XG4gICAgICBjb25zdCByZXNldEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktZm9ybScpO1xuICAgICAgcmVzZXRGb3JtLnJlc2V0KCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdEV2ZW50KCkge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlJyk7XG4gICAgZGVsZXRlQnV0dG9ucy5mb3JFYWNoKChkZWxldGVCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBQcm9qZWN0LmRlbGV0ZVByb2plY3QoaW5kZXgpO1xuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKCdEZWZhdWx0Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrRXZlbnQoKSB7XG4gICAgY29uc3QgcmVtb3ZlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUnKTtcbiAgICByZW1vdmVCdXR0b25zLmZvckVhY2goKHJlbW92ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZmluZFByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleChcbiAgICAgICAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKTtcblxuICAgICAgICBjb25zdCBmaW5kVGFzayA9IHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheS5maW5kKFxuICAgICAgICAgICh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IGluZGV4LFxuICAgICAgICApO1xuICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuc3BsaWNlKFxuICAgICAgICAgIHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheS5pbmRleE9mKGZpbmRUYXNrKSxcbiAgICAgICAgICAxLFxuICAgICAgICApO1xuXG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9UYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gIH1cblxuICB1cGRhdGVUYXNrKG5ld1Rhc2spIHtcbiAgICB0aGlzLm5hbWUgPSBuZXdUYXNrO1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXREdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFNob3cgZnJvbSAnLi9tb2R1bGVzL3Nob3cnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgU2hvdy5wcm9qZWN0RXZlbnQsIFNob3cuZGVmYXVsdFByb2plY3QoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=