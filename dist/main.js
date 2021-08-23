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
    const projectInput = document.getElementById("project-input");
    const projectValue = projectInput.value;
    if (projectValue === "") {
      alert("fill name")
      // Show.fillModal();
      return;
    }
    if (_constructor__WEBPACK_IMPORTED_MODULE_0__.Project.isPresent(projectValue)) {
      projectInput.value = "";
      alert("differnt name")
      // Show.diffModal()
    } else {
      const newProject = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project(projectValue);
      _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(newProject);
      Show.newProjectTemplate(projectValue);
      taskFormContainer.innerHTML = "";
      Show.newTaskForm(projectValue);
      const taskAddContainer = document.getElementById("add-task-container");
      taskAddContainer.innerHTML = "";
    }
  }

  // static fillModal() {
  //   const modalBtn = document.getElementById("project-submit");
  //   const modal = document.createElement("div");
  //   modal.className = "modal";

  //   modal.innerHTML += `
  //    <div class="modal-content">
  //      <span class="close">&times;</span>
  //      <p>Fill in a Project Name</p>
  //    </div>`;

  //   const spanClose = document.getElementsByClassName("close")[0];

  //   modalBtn.onclick = () => {
  //     modal.style.display = "block";
  //   };
  //   spanClose.onclick = () => {
  //     modal.style.display = "none";
  //   };

  //   window.onclick = (event) => {
  //     if (event.target == modal) {
  //       modal.style.display = "none";
  //     }
  //   };
  // }

  // static diffModal() {
  //   const modalBtn = document.getElementById("project-submit");
  //   const modal = document.createElement("div");
  //   modal.className = "modal";

  //   modal.innerHTML += `
  //    <div class="modal-content">
  //      <span class="close">&times;</span>
  //      <p>Choose a different proejct name</p>
  //    </div>`;

  //   const spanClose = document.getElementsByClassName("close")[0];

  //   modalBtn.onclick = () => {
  //     modal.style.display = "block";
  //   };
  //   spanClose.onclick = () => {
  //     modal.style.display = "none";
  //   };

  //   window.onclick = (event) => {
  //     if (event.target == modal) {
  //       modal.style.display = "none";
  //     }
  //   };
  // }

  static disStoredProject() {
    _constructor__WEBPACK_IMPORTED_MODULE_0__.projectArray.forEach((element) => {
      const { title } = element;
      Show.newProjectTemplate(title);
    });
  }

  static defaultProject() {
    const project = new _constructor__WEBPACK_IMPORTED_MODULE_0__.Project("Default");
    _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.addProject(project);
    Show.disStoredProject();
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

        const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

        Show.newTaskForm(projectButton.textContent);
        projects[index].taskArray.forEach((task) => {
          (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);
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
     <li class="left-container d-flex align-items-baseline justify-content-between">
      <span class="project-btn">${title}</span>
      <button class="delete"><i class="far fa-trash-alt p-2"></i></button>
     </li>`;

    Show.projectButtons(title);
    Show.deleteProjectEvent();
  }

  static newTaskForm(projectTitle) {
    const taskFormContainer = document.getElementById("task-form-container");
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
    const taskSubmit = document.getElementById("usrform");
    taskSubmit.addEventListener("submit", (e) => {
      e.preventDefault();
      Show.addTask(project, index);
    });
  }

  static addTask(project, index) {
    const taskName = document.getElementById("task-name");
    const taskNameInput = taskName.value;
    const description = document.getElementById("description");
    const descInput = description.value;
    const priority = document.getElementById("priority");
    const priorityInput = priority.value;
    const dueDate = document.getElementById("due-date");
    const dueDateinput = dueDate.value;
    const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

    const newTask = new _todoTask__WEBPACK_IMPORTED_MODULE_1__.default(
      taskNameInput,
      descInput,
      priorityInput,
      dueDateinput
    );

    if (!projects[index].taskArray.find((task) => task.name === newTask.name)) {
      projects[index].taskArray.push(newTask);
      (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);
      Show.newTaskCard(taskNameInput, descInput, priorityInput, dueDateinput);
    }
  }

  static newTaskCard(name, description, priority, dueDate) {
    const addTaskContainer = document.getElementById("add-task-container");
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
    Show.removeTaskEvent();
    Show.editTaskEvent()
  }

   static editTaskEvent(){
    const editButtons = document.querySelectorAll(".edit")
    editButtons.forEach((editbtn,index) => {
      editbtn.addEventListener("click",(e) => {
        e.preventDefault();
      const  taskSubmit = document.getElementById("task-submit")
      taskSubmit.className =  "d-none" 
      const taskUpdate = document.getElementById("task-update")
      taskUpdate.className = "d-block"       
      Show.updateTask(index)
    
    })
  })
}
  static updateTask(index){
    const  updateBtn = document.getElementById("task-update")
    updateBtn.addEventListener("click",() => {

        const taskName = document.getElementById("task-name");
        const taskNameInput = taskName.value;
        const description = document.getElementById("description");
        const descInput = description.value;
        const priority = document.getElementById("priority");
        const priorityInput = priority.value;
        const dueDate = document.getElementById("due-date");
        const dueDateInput = dueDate.value;

        const projectName = document.getElementById("project-title");
        const findProjectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(
          projectName.textContent
        );

        const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

        const findTask = index
        console.log(findTask)

        projects[findProjectIndex].taskArray[findTask].name = taskNameInput;
        projects[findProjectIndex].taskArray[findTask].description = descInput;
        projects[findProjectIndex].taskArray[findTask].priority = priorityInput;
        projects[findProjectIndex].taskArray[findTask].dueDate = dueDateInput;

        (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);

       const taskAddContainer = document.getElementById("add-task-container");
        taskAddContainer.innerHTML = "";

        projects[findProjectIndex].taskArray.forEach((task) => {
          Show.newTaskCard(
            task.name,
            task.description,
            task.priority,
            task.dueDate
          );
        });
            const taskSubmit = document.getElementById("task-submit");
            taskSubmit.className = "d-block";
            const taskUpdate = document.getElementById("task-update");
            taskUpdate.className = "d-none";    

        
    })

  }
  
  static projectEvent() {
    projectSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      Show.addProject();
      const resetForm = document.getElementById("my-form");
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
        const projectName = document.getElementById("project-title");
        const findProjectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(
          projectName.textContent
        );

        const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)();

        const findTask = projects[findProjectIndex].taskArray.find(
          (task) => task.name === index
        );
        projects[findProjectIndex].taskArray.splice(
          projects[findProjectIndex].taskArray.indexOf(findTask),
          1
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtDOztBQUVsQyw4Q0FBOEMsK0RBQWlCLEVBQUUsaUVBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9kb1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFByb2plY3QsIHNldFByb2plY3QgfSBmcm9tICcuL2xvY2FsU3RvcmFnZSc7XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0QXJyYXkgPSBnZXRQcm9qZWN0KCkgJiYgZ2V0UHJvamVjdCgpLmxlbmd0aCA/IGdldFByb2plY3QoKSA6IFtdO1xuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLnRhc2tBcnJheSA9IFtdO1xuICB9XG5cbiAgc3RhdGljIHRhc2tBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXNrQXJyYXk7XG4gIH1cblxuICBzdGF0aWMgZmluZFByb2plY3RJbmRleCh0aXRsZSkge1xuICAgIHJldHVybiBwcm9qZWN0QXJyYXkuZmluZEluZGV4KChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSB0aXRsZSk7XG4gIH1cblxuICBzdGF0aWMgZmluZFByb2plY3QodGl0bGUpIHtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHRpdGxlKTtcbiAgfVxuXG4gIHN0YXRpYyBpc1ByZXNlbnQocHJvamVjdE5hbWUpIHtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LnNvbWUoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWUsXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrRnJvbVByb2plY3QoZWFjaFRhc2spIHtcbiAgICB0aGlzLnRhc2tBcnJheSA9IHRoaXMudGFza0FycmF5LmZpbHRlcigodGFzaykgPT4gdGFzay50aXRsZSAhPT0gZWFjaFRhc2sudGl0bGUpO1xuICAgIHJldHVybiB0aGlzLnRhc2thcnJheTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICBpZiAoIXByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBuZXdQcm9qZWN0LnRpdGxlKSkge1xuICAgICAgcHJvamVjdEFycmF5LnB1c2gobmV3UHJvamVjdCk7XG4gICAgICBzZXRQcm9qZWN0KHByb2plY3RBcnJheSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gcHJvamVjdEFycmF5LmZpbmRJbmRleChcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0TmFtZSxcbiAgICApO1xuICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuICAgIHByb2plY3RzLnNwbGljZShkZWxldGVQcm9qZWN0LCAxKTtcbiAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcbiAgfVxufVxuIiwiLy8gc2F2ZSBwcm9qZWN0c1xuZXhwb3J0IGZ1bmN0aW9uIHNldFByb2plY3QoYXJyYXkpIHtcbiAgY29uc3QgYXJyYXlTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheSk7XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgYXJyYXlTdHJpbmcpO1xufVxuXG4vLyByZWFkIHByb2plY3RzXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdCgpIHtcbiAgY29uc3QgYXJyYXlTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKTtcbiAgaWYgKGFycmF5U3RyaW5nKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoYXJyYXlTdHJpbmcpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbiIsImltcG9ydCB7IFByb2plY3QsIHByb2plY3RBcnJheSB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuaW1wb3J0IFRvRG9UYXNrIGZyb20gJy4vdG9kb1Rhc2snO1xuaW1wb3J0IHsgc2V0UHJvamVjdCwgZ2V0UHJvamVjdCB9IGZyb20gJy4vbG9jYWxTdG9yYWdlJztcblxuY29uc3QgYXBwZW5kUHJvamVjdFRvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWhvbWUnKTtcbmNvbnN0IHByb2plY3RTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQnKTtcbmNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS1jb250YWluZXInKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvdyB7XG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1pbnB1dFwiKTtcbiAgICBjb25zdCBwcm9qZWN0VmFsdWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XG4gICAgaWYgKHByb2plY3RWYWx1ZSA9PT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJmaWxsIG5hbWVcIilcbiAgICAgIC8vIFNob3cuZmlsbE1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChQcm9qZWN0LmlzUHJlc2VudChwcm9qZWN0VmFsdWUpKSB7XG4gICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgYWxlcnQoXCJkaWZmZXJudCBuYW1lXCIpXG4gICAgICAvLyBTaG93LmRpZmZNb2RhbCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0VmFsdWUpO1xuICAgICAgUHJvamVjdC5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xuICAgICAgU2hvdy5uZXdQcm9qZWN0VGVtcGxhdGUocHJvamVjdFZhbHVlKTtcbiAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBTaG93Lm5ld1Rhc2tGb3JtKHByb2plY3RWYWx1ZSk7XG4gICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhdGljIGZpbGxNb2RhbCgpIHtcbiAgLy8gICBjb25zdCBtb2RhbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG4gIC8vICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAvLyAgIG1vZGFsLmNsYXNzTmFtZSA9IFwibW9kYWxcIjtcblxuICAvLyAgIG1vZGFsLmlubmVySFRNTCArPSBgXG4gIC8vICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gIC8vICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L3NwYW4+XG4gIC8vICAgICAgPHA+RmlsbCBpbiBhIFByb2plY3QgTmFtZTwvcD5cbiAgLy8gICAgPC9kaXY+YDtcblxuICAvLyAgIGNvbnN0IHNwYW5DbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKVswXTtcblxuICAvLyAgIG1vZGFsQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gIC8vICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAvLyAgIH07XG4gIC8vICAgc3BhbkNsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gIC8vICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIC8vICAgfTtcblxuICAvLyAgIHdpbmRvdy5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG4gIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gIC8vICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gICAgIH1cbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgLy8gc3RhdGljIGRpZmZNb2RhbCgpIHtcbiAgLy8gICBjb25zdCBtb2RhbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG4gIC8vICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAvLyAgIG1vZGFsLmNsYXNzTmFtZSA9IFwibW9kYWxcIjtcblxuICAvLyAgIG1vZGFsLmlubmVySFRNTCArPSBgXG4gIC8vICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gIC8vICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZVwiPiZ0aW1lczs8L3NwYW4+XG4gIC8vICAgICAgPHA+Q2hvb3NlIGEgZGlmZmVyZW50IHByb2VqY3QgbmFtZTwvcD5cbiAgLy8gICAgPC9kaXY+YDtcblxuICAvLyAgIGNvbnN0IHNwYW5DbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKVswXTtcblxuICAvLyAgIG1vZGFsQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gIC8vICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAvLyAgIH07XG4gIC8vICAgc3BhbkNsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gIC8vICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIC8vICAgfTtcblxuICAvLyAgIHdpbmRvdy5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG4gIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gIC8vICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gICAgIH1cbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgc3RhdGljIGRpc1N0b3JlZFByb2plY3QoKSB7XG4gICAgcHJvamVjdEFycmF5LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IGVsZW1lbnQ7XG4gICAgICBTaG93Lm5ld1Byb2plY3RUZW1wbGF0ZSh0aXRsZSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KFwiRGVmYXVsdFwiKTtcbiAgICBQcm9qZWN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgU2hvdy5kaXNTdG9yZWRQcm9qZWN0KCk7XG4gICAgdGFza0Zvcm1Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBTaG93Lm5ld1Rhc2tGb3JtKFwiRGVmYXVsdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1idG5cIik7XG4gICAgcHJvamVjdEJ1dHRvbnMuZm9yRWFjaCgocHJvamVjdEJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza0Zvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgICAgICBcInRhc2stZm9ybS1jb250YWluZXJcIlxuICAgICAgICApO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgICAgIFNob3cubmV3VGFza0Zvcm0ocHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCk7XG4gICAgICAgIHByb2plY3RzW2luZGV4XS50YXNrQXJyYXkuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuICAgICAgICAgIFNob3cubmV3VGFza0NhcmQoXG4gICAgICAgICAgICB0YXNrLm5hbWUsXG4gICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgICAgIHRhc2suZHVlRGF0ZVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKSB7XG4gICAgYXBwZW5kUHJvamVjdFRvTGlzdC5pbm5lckhUTUwgKz0gYFxuICAgICA8bGkgY2xhc3M9XCJsZWZ0LWNvbnRhaW5lciBkLWZsZXggYWxpZ24taXRlbXMtYmFzZWxpbmUganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC1idG5cIj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGVcIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgcC0yXCI+PC9pPjwvYnV0dG9uPlxuICAgICA8L2xpPmA7XG5cbiAgICBTaG93LnByb2plY3RCdXR0b25zKHRpdGxlKTtcbiAgICBTaG93LmRlbGV0ZVByb2plY3RFdmVudCgpO1xuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tGb3JtKHByb2plY3RUaXRsZSkge1xuICAgIGNvbnN0IHRhc2tGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm0tY29udGFpbmVyXCIpO1xuICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgIDxoNCBpZD1cInByb2plY3QtdGl0bGVcIj4ke3Byb2plY3RUaXRsZX08L2g0PlxuICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIgdGFzay1mb3JtXCIgaWQ9XCJ1c3Jmb3JtXCI+XG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLW5hbWVcIiBjbGFzcz1cInAtMlwiPk5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIG5hbWU9XCJ0YXNrLW5hbWVcIiB2YWx1ZT1cIlwiIHBsYWNlaG9sZGVyPVwibmFtZVwiPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cInAtMlwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc2NyaXB0aW9uXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uXCI+XG5cblxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJpb3JpdHlcIiBjbGFzcz1cInAtMlwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInByaW9yaXR5XCIgbmFtZT1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCIgY2xhc3M9XCJwLTJcIj5EYXRlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIGlkPVwiZHVlLWRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIj48YnI+XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGlkPVwidGFzay1zdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImQtbm9uZVwiIGlkPVwidGFzay11cGRhdGVcIiBuYW1lPVwidXBkYXRlXCIgdmFsdWU9XCJ1cGRhdGVcIj5cbiAgICAgICAgICAgICAgIDwvZm9ybT4gXG4gICAgICAgPC9kaXY+YDtcbiAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBQcm9qZWN0LmZpbmRQcm9qZWN0SW5kZXgocHJvamVjdFRpdGxlKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEFycmF5W3Byb2plY3RJbmRleF07XG4gICAgU2hvdy50YXNrRXZlbnQocHJvamVjdCwgcHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIHN0YXRpYyB0YXNrRXZlbnQocHJvamVjdCwgaW5kZXgpIHtcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c3Jmb3JtXCIpO1xuICAgIHRhc2tTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRUYXNrKHByb2plY3QsIGluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3QsIGluZGV4KSB7XG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKTtcbiAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKTtcbiAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlLWRhdGVcIik7XG4gICAgY29uc3QgZHVlRGF0ZWlucHV0ID0gZHVlRGF0ZS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKTtcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVG9Eb1Rhc2soXG4gICAgICB0YXNrTmFtZUlucHV0LFxuICAgICAgZGVzY0lucHV0LFxuICAgICAgcHJpb3JpdHlJbnB1dCxcbiAgICAgIGR1ZURhdGVpbnB1dFxuICAgICk7XG5cbiAgICBpZiAoIXByb2plY3RzW2luZGV4XS50YXNrQXJyYXkuZmluZCgodGFzaykgPT4gdGFzay5uYW1lID09PSBuZXdUYXNrLm5hbWUpKSB7XG4gICAgICBwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LnB1c2gobmV3VGFzayk7XG4gICAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcbiAgICAgIFNob3cubmV3VGFza0NhcmQodGFza05hbWVJbnB1dCwgZGVzY0lucHV0LCBwcmlvcml0eUlucHV0LCBkdWVEYXRlaW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZXdUYXNrQ2FyZChuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICBjb25zdCBhZGRUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgYWRkVGFza0NvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwidGFzay1jYXJkLWNvbnRhaW5lclwiPlxuICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCIgaWQ9XCJjYXJkLXRhc2stbmFtZVwiPiR7bmFtZX08L2g1PlxuICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCIgaWQ9XCJjYXJkLWRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtcHJpb3JpdHlcIj4ke3ByaW9yaXR5fTwvcD48YnI+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZHVlZGF0ZVwiPiR7ZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBwLTIgdHJhc2hcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIj48aSBjbGFzcz1cImZhciBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5gO1xuICAgIFNob3cucmVtb3ZlVGFza0V2ZW50KCk7XG4gICAgU2hvdy5lZGl0VGFza0V2ZW50KClcbiAgfVxuXG4gICBzdGF0aWMgZWRpdFRhc2tFdmVudCgpe1xuICAgIGNvbnN0IGVkaXRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0XCIpXG4gICAgZWRpdEJ1dHRvbnMuZm9yRWFjaCgoZWRpdGJ0bixpbmRleCkgPT4ge1xuICAgICAgZWRpdGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCAgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXRcIilcbiAgICAgIHRhc2tTdWJtaXQuY2xhc3NOYW1lID0gIFwiZC1ub25lXCIgXG4gICAgICBjb25zdCB0YXNrVXBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXVwZGF0ZVwiKVxuICAgICAgdGFza1VwZGF0ZS5jbGFzc05hbWUgPSBcImQtYmxvY2tcIiAgICAgICBcbiAgICAgIFNob3cudXBkYXRlVGFzayhpbmRleClcbiAgICBcbiAgICB9KVxuICB9KVxufVxuICBzdGF0aWMgdXBkYXRlVGFzayhpbmRleCl7XG4gICAgY29uc3QgIHVwZGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay11cGRhdGVcIilcbiAgICB1cGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XG4gICAgICAgIGNvbnN0IHRhc2tOYW1lSW5wdXQgPSB0YXNrTmFtZS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuICAgICAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpO1xuICAgICAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gcHJpb3JpdHkudmFsdWU7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgICAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkdWVEYXRlLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICAgICAgICBjb25zdCBmaW5kUHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KFxuICAgICAgICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgY29uc3QgZmluZFRhc2sgPSBpbmRleFxuICAgICAgICBjb25zb2xlLmxvZyhmaW5kVGFzaylcblxuICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXlbZmluZFRhc2tdLm5hbWUgPSB0YXNrTmFtZUlucHV0O1xuICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXlbZmluZFRhc2tdLmRlc2NyaXB0aW9uID0gZGVzY0lucHV0O1xuICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXlbZmluZFRhc2tdLnByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dDtcbiAgICAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5W2ZpbmRUYXNrXS5kdWVEYXRlID0gZHVlRGF0ZUlucHV0O1xuXG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuXG4gICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICBTaG93Lm5ld1Rhc2tDYXJkKFxuICAgICAgICAgICAgdGFzay5uYW1lLFxuICAgICAgICAgICAgdGFzay5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgICB0YXNrLmR1ZURhdGVcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stc3VibWl0XCIpO1xuICAgICAgICAgICAgdGFza1N1Ym1pdC5jbGFzc05hbWUgPSBcImQtYmxvY2tcIjtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tVcGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdXBkYXRlXCIpO1xuICAgICAgICAgICAgdGFza1VwZGF0ZS5jbGFzc05hbWUgPSBcImQtbm9uZVwiOyAgICBcblxuICAgICAgICBcbiAgICB9KVxuXG4gIH1cbiAgXG4gIHN0YXRpYyBwcm9qZWN0RXZlbnQoKSB7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFNob3cuYWRkUHJvamVjdCgpO1xuICAgICAgY29uc3QgcmVzZXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteS1mb3JtXCIpO1xuICAgICAgcmVzZXRGb3JtLnJlc2V0KCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlUHJvamVjdEV2ZW50KCkge1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRlbGV0ZVwiKTtcbiAgICBkZWxldGVCdXR0b25zLmZvckVhY2goKGRlbGV0ZUJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgUHJvamVjdC5kZWxldGVQcm9qZWN0KGluZGV4KTtcbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBjb25zdCB0YXNrQWRkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtdGFzay1jb250YWluZXJcIik7XG4gICAgICAgIHRhc2tBZGRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShcIkRlZmF1bHRcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrRXZlbnQoKSB7XG4gICAgY29uc3QgcmVtb3ZlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVtb3ZlXCIpO1xuICAgIHJlbW92ZUJ1dHRvbnMuZm9yRWFjaCgocmVtb3ZlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKTtcbiAgICAgICAgY29uc3QgZmluZFByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleChcbiAgICAgICAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuXG4gICAgICAgIGNvbnN0IGZpbmRUYXNrID0gcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LmZpbmQoXG4gICAgICAgICAgKHRhc2spID0+IHRhc2submFtZSA9PT0gaW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LnNwbGljZShcbiAgICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuaW5kZXhPZihmaW5kVGFzayksXG4gICAgICAgICAgMVxuICAgICAgICApO1xuXG4gICAgICAgIHNldFByb2plY3QocHJvamVjdHMpO1xuXG4gICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9UYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gIH1cblxuICB1cGRhdGVUYXNrKG5ld1Rhc2spIHtcbiAgICB0aGlzLm5hbWUgPSBuZXdUYXNrO1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXREdWVEYXRlKGRhdGUpIHtcbiAgICB0aGlzLmR1ZURhdGUgPSBkYXRlO1xuICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFNob3cgZnJvbSAnLi9tb2R1bGVzL3Nob3cnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgU2hvdy5wcm9qZWN0RXZlbnQsIFNob3cuZGVmYXVsdFByb2plY3QoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=