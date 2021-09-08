/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/jest-localstorage-mock/src/localstorage.js":
/*!*****************************************************************!*\
  !*** ./node_modules/jest-localstorage-mock/src/localstorage.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorage": () => (/* binding */ LocalStorage)
/* harmony export */ });
class LocalStorage {
  constructor(jest) {
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: jest.fn((key) => (this[key] !== undefined ? this[key] : null)),
    });
    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      // not mentioned in the spec, but we must always coerce to a string
      value: jest.fn((key, val = '') => {
        this[key] = val + '';
      }),
    });
    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: jest.fn((key) => {
        delete this[key];
      }),
    });
    Object.defineProperty(this, 'clear', {
      enumerable: false,
      value: jest.fn(() => {
        Object.keys(this).map((key) => delete this[key]);
      }),
    });
    Object.defineProperty(this, 'toString', {
      enumerable: false,
      value: jest.fn(() => {
        return '[object Storage]';
      }),
    });
    Object.defineProperty(this, 'key', {
      enumerable: false,
      value: jest.fn((idx) => Object.keys(this)[idx] || null),
    });
  } // end constructor

  get length() {
    return Object.keys(this).length;
  }
  // for backwards compatibility
  get __STORE__() {
    return this;
  }
}


/***/ }),

/***/ "./node_modules/jest-localstorage-mock/src/setup.js":
/*!**********************************************************!*\
  !*** ./node_modules/jest-localstorage-mock/src/setup.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _localstorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localstorage */ "./node_modules/jest-localstorage-mock/src/localstorage.js");


if (typeof __webpack_require__.g._localStorage !== 'undefined') {
  Object.defineProperty(__webpack_require__.g, '_localStorage', {
    value: new _localstorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorage(jest),
    writable: false,
  });
} else {
  __webpack_require__.g.localStorage = new _localstorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorage(jest);
}

if (typeof __webpack_require__.g._sessionStorage !== 'undefined') {
  Object.defineProperty(__webpack_require__.g, '_sessionStorage', {
    value: new _localstorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorage(jest),
    writable: false,
  });
} else {
  __webpack_require__.g.sessionStorage = new _localstorage__WEBPACK_IMPORTED_MODULE_0__.LocalStorage(jest);
}


/***/ }),

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
/* harmony import */ var jest_localstorage_mock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jest-localstorage-mock */ "./node_modules/jest-localstorage-mock/src/setup.js");



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
    console.log(projects)
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
/* harmony import */ var jest_localstorage_mock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jest-localstorage-mock */ "./node_modules/jest-localstorage-mock/src/setup.js");
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
/* harmony import */ var jest_localstorage_mock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jest-localstorage-mock */ "./node_modules/jest-localstorage-mock/src/setup.js");





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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEseURBQVU7O0FBRWxCO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsU2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDOztBQUVsQyw4Q0FBOEMsK0RBQWlCLEVBQUUsaUVBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2plc3QtbG9jYWxzdG9yYWdlLW1vY2svc3JjL2xvY2Fsc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvamVzdC1sb2NhbHN0b3JhZ2UtbW9jay9zcmMvc2V0dXAuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kb1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2Uge1xuICBjb25zdHJ1Y3RvcihqZXN0KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdnZXRJdGVtJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogamVzdC5mbigoa2V5KSA9PiAodGhpc1trZXldICE9PSB1bmRlZmluZWQgPyB0aGlzW2tleV0gOiBudWxsKSksXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzZXRJdGVtJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAvLyBub3QgbWVudGlvbmVkIGluIHRoZSBzcGVjLCBidXQgd2UgbXVzdCBhbHdheXMgY29lcmNlIHRvIGEgc3RyaW5nXG4gICAgICB2YWx1ZTogamVzdC5mbigoa2V5LCB2YWwgPSAnJykgPT4ge1xuICAgICAgICB0aGlzW2tleV0gPSB2YWwgKyAnJztcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVtb3ZlSXRlbScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IGplc3QuZm4oKGtleSkgPT4ge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgfSksXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGVhcicsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IGplc3QuZm4oKCkgPT4ge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoKGtleSkgPT4gZGVsZXRlIHRoaXNba2V5XSk7XG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3RvU3RyaW5nJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogamVzdC5mbigoKSA9PiB7XG4gICAgICAgIHJldHVybiAnW29iamVjdCBTdG9yYWdlXSc7XG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2tleScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IGplc3QuZm4oKGlkeCkgPT4gT2JqZWN0LmtleXModGhpcylbaWR4XSB8fCBudWxsKSxcbiAgICB9KTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5sZW5ndGg7XG4gIH1cbiAgLy8gZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIGdldCBfX1NUT1JFX18oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4vbG9jYWxzdG9yYWdlJztcblxuaWYgKHR5cGVvZiBnbG9iYWwuX2xvY2FsU3RvcmFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbCwgJ19sb2NhbFN0b3JhZ2UnLCB7XG4gICAgdmFsdWU6IG5ldyBMb2NhbFN0b3JhZ2UoamVzdCksXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KTtcbn0gZWxzZSB7XG4gIGdsb2JhbC5sb2NhbFN0b3JhZ2UgPSBuZXcgTG9jYWxTdG9yYWdlKGplc3QpO1xufVxuXG5pZiAodHlwZW9mIGdsb2JhbC5fc2Vzc2lvblN0b3JhZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWwsICdfc2Vzc2lvblN0b3JhZ2UnLCB7XG4gICAgdmFsdWU6IG5ldyBMb2NhbFN0b3JhZ2UoamVzdCksXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KTtcbn0gZWxzZSB7XG4gIGdsb2JhbC5zZXNzaW9uU3RvcmFnZSA9IG5ldyBMb2NhbFN0b3JhZ2UoamVzdCk7XG59XG4iLCJpbXBvcnQgeyBnZXRQcm9qZWN0LCBzZXRQcm9qZWN0IH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuaW1wb3J0IFwiamVzdC1sb2NhbHN0b3JhZ2UtbW9ja1wiO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdEFycmF5ID0gZ2V0UHJvamVjdCgpICYmIGdldFByb2plY3QoKS5sZW5ndGggPyBnZXRQcm9qZWN0KCkgOiBbXTtcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrQXJyYXkgPSBbXTtcbiAgfVxuXG4gIHN0YXRpYyB0YXNrQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0SW5kZXgodGl0bGUpIHtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmRJbmRleCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGUpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0KHRpdGxlKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSB0aXRsZSk7XG4gIH1cblxuICBzdGF0aWMgaXNQcmVzZW50KHByb2plY3ROYW1lKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5zb21lKFxuKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVGFza0Zyb21Qcm9qZWN0KGVhY2hUYXNrKSB7XG4gICAgdGhpcy50YXNrQXJyYXkgPSB0aGlzLnRhc2tBcnJheS5maWx0ZXIoKHRhc2spID0+IHRhc2sudGl0bGUgIT09IGVhY2hUYXNrLnRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy50YXNrYXJyYXk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgaWYgKCFwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gbmV3UHJvamVjdC50aXRsZSkpIHtcbiAgICAgIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgc2V0UHJvamVjdChwcm9qZWN0QXJyYXkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IHByb2plY3RBcnJheS5maW5kSW5kZXgoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWUsXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cylcbiAgICBwcm9qZWN0cy5zcGxpY2UoZGVsZXRlUHJvamVjdCwgMSk7XG4gICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gIH1cbn1cbiIsIi8vIHNhdmUgcHJvamVjdHNcbmltcG9ydCBcImplc3QtbG9jYWxzdG9yYWdlLW1vY2tcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFByb2plY3QoYXJyYXkpIHtcbiAgY29uc3QgYXJyYXlTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheSk7XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgYXJyYXlTdHJpbmcpO1xufVxuXG4vLyByZWFkIHByb2plY3RzXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdCgpIHtcbiAgY29uc3QgYXJyYXlTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKTtcbiAgaWYgKGFycmF5U3RyaW5nKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoYXJyYXlTdHJpbmcpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsImltcG9ydCB7IFByb2plY3QsIHByb2plY3RBcnJheSB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuaW1wb3J0IFRvRG9UYXNrIGZyb20gJy4vdG9kb1Rhc2snO1xuaW1wb3J0IHsgc2V0UHJvamVjdCwgZ2V0UHJvamVjdCB9IGZyb20gJy4vbG9jYWxTdG9yYWdlJztcbmltcG9ydCBcImplc3QtbG9jYWxzdG9yYWdlLW1vY2tcIjtcblxuY29uc3QgYXBwZW5kUHJvamVjdFRvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWhvbWUnKTtcbmNvbnN0IHByb2plY3RTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQnKTtcbmNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS1jb250YWluZXInKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvdyB7XG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWlucHV0Jyk7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VmFsdWUgPT09ICcnKSB7XG4gICAgICBhbGVydChcIkZpbGwgaW4gYSBwcm9qZWN0IG5hbWVcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChQcm9qZWN0LmlzUHJlc2VudChwcm9qZWN0VmFsdWUpKSB7XG4gICAgICBhbGVydChcImNob29zZSBhIGRpZmZyZW50IG5hbWVcIilcbiAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdFZhbHVlKTtcbiAgICAgIFByb2plY3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICAgIC8vIHNldFByb2plY3QocHJvamVjdHMpXG4gICAgICAvLyBTaG93LmRpc1N0b3JlZFByb2plY3QoKTtcbiAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHByb2plY3RWYWx1ZSk7XG4gICAgICBcbiAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0VmFsdWUpO1xuICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1jb250YWluZXInKTtcbiAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRpc1N0b3JlZFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KClcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRpdGxlIH0gPSBlbGVtZW50O1xuICAgICAgc2V0UHJvamVjdChwcm9qZWN0cylcbiAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQnKTtcbiAgICBQcm9qZWN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgU2hvdy5kaXNTdG9yZWRQcm9qZWN0KCk7XG4gICAgU2hvdy5wcm9qZWN0QnV0dG9ucygpOyAgICAgXG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgU2hvdy5uZXdUYXNrRm9ybSgnRGVmYXVsdCcpO1xuICB9XG5cbiAgc3RhdGljIHByb2plY3RCdXR0b25zKCkge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgJ3Rhc2stZm9ybS1jb250YWluZXInLFxuICAgICAgICApO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWNvbnRhaW5lcicpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCk7XG4gICAgICAgIHByb2plY3RzW2luZGV4XS50YXNrQXJyYXkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgICAgIFNob3cubmV3VGFza0NhcmQoXG4gICAgICAgICAgICB0YXNrLm5hbWUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICAgIFNob3cuZWRpdFRhc2tFdmVudChpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdQcm9qZWN0VGVtcGxhdGUodGl0bGUpIHtcbiAgICBhcHBlbmRQcm9qZWN0VG9MaXN0LmlubmVySFRNTCArPSBgXG4gICAgIDxsaSBjbGFzcz1cImxlZnQtY29udGFpbmVyIGQtZmxleCBhbGlnbi1pdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJwcm9qZWN0LWJ0blwiPiR7dGl0bGV9PC9zcGFuPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZVwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTJcIj48L2k+PC9idXR0b24+XG4gICAgIDwvbGk+YDtcblxuICAgIFNob3cucHJvamVjdEJ1dHRvbnModGl0bGUpO1xuICAgIFNob3cuZGVsZXRlUHJvamVjdEV2ZW50KCk7XG4gIH1cblxuICBzdGF0aWMgbmV3VGFza0Zvcm0ocHJvamVjdFRpdGxlKSB7XG4gICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLWNvbnRhaW5lcicpO1xuICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgIDxoNCBpZD1cInByb2plY3QtdGl0bGVcIj4ke3Byb2plY3RUaXRsZX08L2g0PlxuICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIgdGFzay1mb3JtXCIgaWQ9XCJ1c3Jmb3JtXCI+XG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLW5hbWVcIiBjbGFzcz1cInAtMlwiPk5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIG5hbWU9XCJ0YXNrLW5hbWVcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwibmFtZVwiPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cInAtMlwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc2NyaXB0aW9uXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uXCI+XG5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJpb3JpdHlcIiBjbGFzcz1cInAtMlwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInByaW9yaXR5XCIgbmFtZT1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCIgY2xhc3M9XCJwLTJcIj5EYXRlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIGlkPVwiZHVlLWRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIj48YnI+XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGlkPVwidGFzay1zdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImQtbm9uZVwiIGlkPVwidGFzay11cGRhdGVcIiBuYW1lPVwidXBkYXRlXCIgdmFsdWU9XCJ1cGRhdGVcIj5cbiAgICAgICAgICAgICAgIDwvZm9ybT4gXG4gICAgICAgPC9kaXY+YDtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBQcm9qZWN0LmZpbmRQcm9qZWN0SW5kZXgocHJvamVjdFRpdGxlKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEFycmF5W3Byb2plY3RJbmRleF07XG4gICAgU2hvdy50YXNrRXZlbnQocHJvamVjdCwgcHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIHN0YXRpYyB0YXNrRXZlbnQocHJvamVjdCwgaW5kZXgpIHtcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzcmZvcm0nKTtcbiAgICB0YXNrU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBTaG93LmFkZFRhc2socHJvamVjdCwgaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFRhc2socHJvamVjdCwgaW5kZXgpIHtcbiAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW5hbWUnKTtcbiAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpO1xuICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBwcmlvcml0eS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZS1kYXRlJyk7XG4gICAgY29uc3QgZHVlRGF0ZWlucHV0ID0gZHVlRGF0ZS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKTtcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVG9Eb1Rhc2soXG4gICAgICB0YXNrTmFtZUlucHV0LFxuICAgICAgZGVzY0lucHV0LFxuICAgICAgcHJpb3JpdHlJbnB1dCxcbiAgICAgIGR1ZURhdGVpbnB1dCxcbiAgICApO1xuXG4gICAgaWYgKCFwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSkge1xuICAgICAgcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5wdXNoKG5ld1Rhc2spO1xuICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICBTaG93Lm5ld1Rhc2tDYXJkKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KTtcbiAgICAgIFNob3cuZWRpdFRhc2tFdmVudChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tDYXJkKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY29udGFpbmVyJyk7XG4gICAgYWRkVGFza0NvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwidGFzay1jYXJkLWNvbnRhaW5lclwiPlxuICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCIgaWQ9XCJjYXJkLXRhc2stbmFtZVwiPiR7bmFtZX08L2g1PlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtcHJpb3JpdHlcIj4ke3ByaW9yaXR5fTwvcD48YnI+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZHVlZGF0ZVwiPiR7ZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgdHJhc2hcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIj48aSBjbGFzcz1cImZhciBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBQcm9qZWN0LmZpbmRQcm9qZWN0SW5kZXgodGl0bGUpO1xuICAgIFNob3cucmVtb3ZlVGFza0V2ZW50KCk7XG4gICAgU2hvdy5lZGl0VGFza0V2ZW50KHByb2plY3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgZWRpdFRhc2tFdmVudChpbmRleCkge1xuICAgIGNvbnN0IGVkaXRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQnKTtcbiAgICBlZGl0QnV0dG9ucy5mb3JFYWNoKChlZGl0YnRuKSA9PiB7XG4gICAgICBlZGl0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0Jyk7XG4gICAgICAgIHRhc2tTdWJtaXQuY2xhc3NOYW1lID0gJ2Qtbm9uZSc7XG4gICAgICAgIGNvbnN0IHRhc2tVcGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay11cGRhdGUnKTtcbiAgICAgICAgdGFza1VwZGF0ZS5jbGFzc05hbWUgPSAnZC1ibG9jayc7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQ7XG5cbiAgICAgICAgU2hvdy51cGRhdGVUYXNrKHRpdGxlLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUYXNrKHRpdGxlLCBpbmRleCkge1xuICAgIGNvbnN0IHVwZGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXVwZGF0ZScpO1xuICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgY29uc3QgdG9kb0lkeCA9IHByb2plY3RzW2luZGV4XS50YXNrQXJyYXkuZmluZEluZGV4KCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IHRpdGxlKTtcbiAgICBjb25zdCBwcm9qZWN0SWR4ID0gaW5kZXg7XG5cbiAgICB1cGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW5hbWUnKTtcbiAgICAgIGNvbnN0IHRhc2tOYW1lSW5wdXQgPSB0YXNrTmFtZS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5Jyk7XG4gICAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWU7XG4gICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZS1kYXRlJyk7XG4gICAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkdWVEYXRlLnZhbHVlO1xuXG4gICAgICBwcm9qZWN0c1twcm9qZWN0SWR4XS50YXNrQXJyYXlbdG9kb0lkeF0ubmFtZSA9IHRhc2tOYW1lSW5wdXQ7XG4gICAgICBwcm9qZWN0c1twcm9qZWN0SWR4XS50YXNrQXJyYXlbdG9kb0lkeF0uZGVzY3JpcHRpb24gPSBkZXNjSW5wdXQ7XG4gICAgICBwcm9qZWN0c1twcm9qZWN0SWR4XS50YXNrQXJyYXlbdG9kb0lkeF0ucHJpb3JpdHkgPSBwcmlvcml0eUlucHV0O1xuICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5W3RvZG9JZHhdLmR1ZURhdGUgPSBkdWVEYXRlSW5wdXQ7XG5cbiAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1jb250YWluZXInKTtcbiAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICBwcm9qZWN0c1twcm9qZWN0SWR4XS50YXNrQXJyYXkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKFxuICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgdGFzay5kdWVEYXRlLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1zdWJtaXQnKTtcbiAgICAgIHRhc2tTdWJtaXQuY2xhc3NOYW1lID0gJ2QtYmxvY2snO1xuICAgICAgY29uc3QgdGFza1VwZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXVwZGF0ZScpO1xuICAgICAgdGFza1VwZGF0ZS5jbGFzc05hbWUgPSAnZC1ub25lJztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0RXZlbnQoKSB7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBTaG93LmFkZFByb2plY3QoKTtcbiAgICAgIGNvbnN0IHJlc2V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1mb3JtJyk7XG4gICAgICByZXNldEZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RXZlbnQoKSB7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUnKTtcbiAgICBkZWxldGVCdXR0b25zLmZvckVhY2goKGRlbGV0ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIFByb2plY3QuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY29udGFpbmVyJyk7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0oJ0RlZmF1bHQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tFdmVudCgpIHtcbiAgICBjb25zdCByZW1vdmVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZScpO1xuICAgIHJlbW92ZUJ1dHRvbnMuZm9yRWFjaCgocmVtb3ZlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZScpO1xuICAgICAgICBjb25zdCBmaW5kUHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KFxuICAgICAgICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50LFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGZpbmRUYXNrID0gcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LmZpbmQoXG4gICAgICAgICAgKHRhc2spID0+IHRhc2submFtZSA9PT0gaW5kZXgsXG4gICAgICAgICk7XG4gICAgICAgIHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheS5zcGxpY2UoXG4gICAgICAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LmluZGV4T2YoZmluZFRhc2spLFxuICAgICAgICAgIDEsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG5cbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb1Rhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgfVxuXG4gIHVwZGF0ZVRhc2sobmV3VGFzaykge1xuICAgIHRoaXMubmFtZSA9IG5ld1Rhc2s7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldER1ZURhdGUoZGF0ZSkge1xuICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBTaG93IGZyb20gJy4vbW9kdWxlcy9zaG93JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFNob3cucHJvamVjdEV2ZW50LCBTaG93LmRlZmF1bHRQcm9qZWN0KCkpO1xuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9