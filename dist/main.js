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
  //   // const modalBtn = document.getElementById("modal-button");
  //   const modal = document.createElement("div");
  //   modal.className = "modal";

  //   modal.innerHTML += `
  //    <div class="modal-content">
  //      <button> class="close">&times;</button>
  //      <p>Fill in a Project Name</p>
  //    </div>`;

  //   Show.modalClick()

  //   // const spanClose = document.getElementsByClassName('close')[0];

  //   // modalBtn.onclick = () => {
  //   //   modal.style.display = "block";
  //   // };
  //   // spanClose.onclick = () => {
  //   //   modal.style.display = "none";
  //   // };

  //   // window.onclick = (event) => {
  //   //   if (event.target == modal) {
  //   //     modal.style.display = "none";
  //   //   }
  //   // };
  // }

  // static modalClick(){
  //   const modalBtn = document.getElementById("project-submit");
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
        Show.editTaskEvent(index)
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
      Show.editTaskEvent(index);
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
     const title = document.getElementById('project-title').textContent
    const projectIndex = _constructor__WEBPACK_IMPORTED_MODULE_0__.Project.findProjectIndex(title);
    Show.removeTaskEvent();
    Show.editTaskEvent(projectIndex);

  }

   static editTaskEvent(index){
    const editButtons = document.querySelectorAll(".edit")
    editButtons.forEach((editbtn) => {
      editbtn.addEventListener("click",(e) => {
        e.preventDefault();
      const  taskSubmit = document.getElementById("task-submit")
      taskSubmit.className =  "d-none" 
      const taskUpdate = document.getElementById("task-update")
      taskUpdate.className = "d-block"    
       const title = e.target.parentNode.parentNode.childNodes[1].textContent


      Show.updateTask(title,index)
console.log(index, "index")
     
    })
  })
}

  static updateTask(title,index){

     
    const  updateBtn = document.getElementById("task-update");
     const projects = (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.getProject)()
 
     
   const todoIdx = projects[index].taskArray.findIndex((task) => task.name === title);
   const projectIdx = index
    
     updateBtn.addEventListener("click",(e) => {
       e.preventDefault();
       console.log(todoIdx, "todo");

       const taskName = document.getElementById("task-name");
       const taskNameInput = taskName.value;
       const description = document.getElementById("description");
       const descInput = description.value;
       const priority = document.getElementById("priority");
       const priorityInput = priority.value;
       const dueDate = document.getElementById("due-date");
       const dueDateInput = dueDate.value;

       projects[projectIdx].taskArray[todoIdx].name = taskNameInput;
       projects[projectIdx].taskArray[todoIdx].description = descInput;
       projects[projectIdx].taskArray[todoIdx].priority = priorityInput;
       projects[projectIdx].taskArray[todoIdx].dueDate = dueDateInput;

       (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__.setProject)(projects);
      const taskAddContainer = document.getElementById("add-task-container");
       taskAddContainer.innerHTML = "";
       projects[projectIdx].taskArray.forEach((task) => {
         Show.newTaskCard(
           task.name,
           task.description,
           task.priority,
           task.dueDate
         );
       });


     }) 
    
  }
  // static updateTask(index){
  //   const  updateBtn = document.getElementById("task-update")
    // updateBtn.addEventListener("click",() => {

    //     const taskName = document.getElementById("task-name");
    //     const taskNameInput = taskName.value;
    //     const description = document.getElementById("description");
    //     const descInput = description.value;
    //     const priority = document.getElementById("priority");
    //     const priorityInput = priority.value;
    //     const dueDate = document.getElementById("due-date");
    //     const dueDateInput = dueDate.value;

    //     const projectName = document.getElementById("project-title");
    //     const findProjectIndex = Project.findProjectIndex(
    //       projectName.textContent
    //     );

    //     const projects = getProject();
         
    //     if (!projects[findProjectIndex].taskArray.find((task) => task.name === index )) {

    //     const findTask = index
    //     // console.log(findTask)

    //     projects[findProjectIndex].taskArray[findTask].name = taskNameInput;
    //     projects[findProjectIndex].taskArray[findTask].description = descInput;
    //     projects[findProjectIndex].taskArray[findTask].priority = priorityInput;
    //     projects[findProjectIndex].taskArray[findTask].dueDate = dueDateInput;

    //     setProject(projects);

    //    const taskAddContainer = document.getElementById("add-task-container");
    //     taskAddContainer.innerHTML = "";


      
    //         const taskSubmit = document.getElementById("task-submit");
    //         taskSubmit.className = "d-block";
    //         const taskUpdate = document.getElementById("task-update");
    //         taskUpdate.className = "d-none";    

        
    // })

  // }
  
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDMVplO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEMsOENBQThDLCtEQUFpQixFQUFFLGlFQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zaG93LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRQcm9qZWN0LCBzZXRQcm9qZWN0IH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdEFycmF5ID0gZ2V0UHJvamVjdCgpICYmIGdldFByb2plY3QoKS5sZW5ndGggPyBnZXRQcm9qZWN0KCkgOiBbXTtcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy50YXNrQXJyYXkgPSBbXTtcbiAgfVxuXG4gIHN0YXRpYyB0YXNrQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFza0FycmF5O1xuICB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0SW5kZXgodGl0bGUpIHtcbiAgICByZXR1cm4gcHJvamVjdEFycmF5LmZpbmRJbmRleCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gdGl0bGUpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRQcm9qZWN0KHRpdGxlKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSB0aXRsZSk7XG4gIH1cblxuICBzdGF0aWMgaXNQcmVzZW50KHByb2plY3ROYW1lKSB7XG4gICAgcmV0dXJuIHByb2plY3RBcnJheS5zb21lKFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3ROYW1lLFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlVGFza0Zyb21Qcm9qZWN0KGVhY2hUYXNrKSB7XG4gICAgdGhpcy50YXNrQXJyYXkgPSB0aGlzLnRhc2tBcnJheS5maWx0ZXIoKHRhc2spID0+IHRhc2sudGl0bGUgIT09IGVhY2hUYXNrLnRpdGxlKTtcbiAgICByZXR1cm4gdGhpcy50YXNrYXJyYXk7XG4gIH1cblxuICBzdGF0aWMgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgaWYgKCFwcm9qZWN0QXJyYXkuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gbmV3UHJvamVjdC50aXRsZSkpIHtcbiAgICAgIHByb2plY3RBcnJheS5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgc2V0UHJvamVjdChwcm9qZWN0QXJyYXkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IHByb2plY3RBcnJheS5maW5kSW5kZXgoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdE5hbWUsXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKTtcbiAgICBwcm9qZWN0cy5zcGxpY2UoZGVsZXRlUHJvamVjdCwgMSk7XG4gICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gIH1cbn1cbiIsIi8vIHNhdmUgcHJvamVjdHNcbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9qZWN0KGFycmF5KSB7XG4gIGNvbnN0IGFycmF5U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYXJyYXkpO1xuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIGFycmF5U3RyaW5nKTtcbn1cblxuLy8gcmVhZCBwcm9qZWN0c1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3QoKSB7XG4gIGNvbnN0IGFycmF5U3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJyk7XG4gIGlmIChhcnJheVN0cmluZykge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGFycmF5U3RyaW5nKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBwcm9qZWN0QXJyYXkgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcbmltcG9ydCBUb0RvVGFzayBmcm9tICcuL3RvZG9UYXNrJztcbmltcG9ydCB7IHNldFByb2plY3QsIGdldFByb2plY3QgfSBmcm9tICcuL2xvY2FsU3RvcmFnZSc7XG5cbmNvbnN0IGFwcGVuZFByb2plY3RUb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1ob21lJyk7XG5jb25zdCBwcm9qZWN0U3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc3VibWl0Jyk7XG5jb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0tY29udGFpbmVyJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3cge1xuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtaW5wdXRcIik7XG4gICAgY29uc3QgcHJvamVjdFZhbHVlID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgIGlmIChwcm9qZWN0VmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiZmlsbCBuYW1lXCIpXG4gICAgICAvLyBTaG93LmZpbGxNb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoUHJvamVjdC5pc1ByZXNlbnQocHJvamVjdFZhbHVlKSkge1xuICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgIGFsZXJ0KFwiZGlmZmVybnQgbmFtZVwiKVxuICAgICAgLy8gU2hvdy5kaWZmTW9kYWwoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdFZhbHVlKTtcbiAgICAgIFByb2plY3QuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHByb2plY3RWYWx1ZSk7XG4gICAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0VmFsdWUpO1xuICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN0YXRpYyBmaWxsTW9kYWwoKSB7XG4gIC8vICAgLy8gY29uc3QgbW9kYWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLWJ1dHRvblwiKTtcbiAgLy8gICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgbW9kYWwuY2xhc3NOYW1lID0gXCJtb2RhbFwiO1xuXG4gIC8vICAgbW9kYWwuaW5uZXJIVE1MICs9IGBcbiAgLy8gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgLy8gICAgICA8YnV0dG9uPiBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAvLyAgICAgIDxwPkZpbGwgaW4gYSBQcm9qZWN0IE5hbWU8L3A+XG4gIC8vICAgIDwvZGl2PmA7XG5cbiAgLy8gICBTaG93Lm1vZGFsQ2xpY2soKVxuXG4gIC8vICAgLy8gY29uc3Qgc3BhbkNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2xvc2UnKVswXTtcblxuICAvLyAgIC8vIG1vZGFsQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gIC8vICAgLy8gICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAvLyAgIC8vIH07XG4gIC8vICAgLy8gc3BhbkNsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gIC8vICAgLy8gICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIC8vICAgLy8gfTtcblxuICAvLyAgIC8vIHdpbmRvdy5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG4gIC8vICAgLy8gICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gIC8vICAgLy8gICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gICAvLyAgIH1cbiAgLy8gICAvLyB9O1xuICAvLyB9XG5cbiAgLy8gc3RhdGljIG1vZGFsQ2xpY2soKXtcbiAgLy8gICBjb25zdCBtb2RhbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zdWJtaXRcIik7XG4gIC8vICAgY29uc3Qgc3BhbkNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpWzBdO1xuXG4gIC8vICAgbW9kYWxCdG4ub25jbGljayA9ICgpID0+IHtcbiAgLy8gICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIC8vICAgfTtcbiAgLy8gICBzcGFuQ2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgLy8gICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gICB9O1xuXG4gIC8vICAgd2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgLy8gICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAvLyAgICAgfVxuICAvLyAgIH07XG4gIC8vIH1cblxuICAvLyBzdGF0aWMgZGlmZk1vZGFsKCkge1xuICAvLyAgIGNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXN1Ym1pdFwiKTtcbiAgLy8gICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIC8vICAgbW9kYWwuY2xhc3NOYW1lID0gXCJtb2RhbFwiO1xuXG4gIC8vICAgbW9kYWwuaW5uZXJIVE1MICs9IGBcbiAgLy8gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgLy8gICAgICA8c3BhbiBjbGFzcz1cImNsb3NlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgLy8gICAgICA8cD5DaG9vc2UgYSBkaWZmZXJlbnQgcHJvZWpjdCBuYW1lPC9wPlxuICAvLyAgICA8L2Rpdj5gO1xuXG4gIC8vICAgY29uc3Qgc3BhbkNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpWzBdO1xuXG4gIC8vICAgbW9kYWxCdG4ub25jbGljayA9ICgpID0+IHtcbiAgLy8gICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIC8vICAgfTtcbiAgLy8gICBzcGFuQ2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgLy8gICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgLy8gICB9O1xuXG4gIC8vICAgd2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgLy8gICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAvLyAgICAgfVxuICAvLyAgIH07XG4gIC8vIH1cblxuICBzdGF0aWMgZGlzU3RvcmVkUHJvamVjdCgpIHtcbiAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0aXRsZSB9ID0gZWxlbWVudDtcbiAgICAgIFNob3cubmV3UHJvamVjdFRlbXBsYXRlKHRpdGxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xuICAgIFByb2plY3QuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICBTaG93LmRpc1N0b3JlZFByb2plY3QoKTtcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFNob3cubmV3VGFza0Zvcm0oXCJEZWZhdWx0XCIpO1xuICB9XG5cbiAgc3RhdGljIHByb2plY3RCdXR0b25zKCkge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LWJ0blwiKTtcbiAgICBwcm9qZWN0QnV0dG9ucy5mb3JFYWNoKChwcm9qZWN0QnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgIFwidGFzay1mb3JtLWNvbnRhaW5lclwiXG4gICAgICAgICk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgY29uc3QgdGFza0FkZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stY29udGFpbmVyXCIpO1xuICAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgU2hvdy5uZXdUYXNrRm9ybShwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50KTtcbiAgICAgICAgcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICAgICAgU2hvdy5uZXdUYXNrQ2FyZChcbiAgICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0YXNrLnByaW9yaXR5LFxuICAgICAgICAgICAgdGFzay5kdWVEYXRlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFNob3cuZWRpdFRhc2tFdmVudChpbmRleClcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG5ld1Byb2plY3RUZW1wbGF0ZSh0aXRsZSkge1xuICAgIGFwcGVuZFByb2plY3RUb0xpc3QuaW5uZXJIVE1MICs9IGBcbiAgICAgPGxpIGNsYXNzPVwibGVmdC1jb250YWluZXIgZC1mbGV4IGFsaWduLWl0ZW1zLWJhc2VsaW5lIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtYnRuXCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMlwiPjwvaT48L2J1dHRvbj5cbiAgICAgPC9saT5gO1xuXG4gICAgU2hvdy5wcm9qZWN0QnV0dG9ucyh0aXRsZSk7XG4gICAgU2hvdy5kZWxldGVQcm9qZWN0RXZlbnQoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdUYXNrRm9ybShwcm9qZWN0VGl0bGUpIHtcbiAgICBjb25zdCB0YXNrRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtLWNvbnRhaW5lclwiKTtcbiAgICB0YXNrRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgKz0gYFxuICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICA8aDQgaWQ9XCJwcm9qZWN0LXRpdGxlXCI+JHtwcm9qZWN0VGl0bGV9PC9oND5cbiAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIHRhc2stZm9ybVwiIGlkPVwidXNyZm9ybVwiPlxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCIgY2xhc3M9XCJwLTJcIj5OYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiBuYW1lPVwidGFzay1uYW1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJwLTJcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNjcmlwdGlvblwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiPlxuXG5cbiAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaW9yaXR5XCIgY2xhc3M9XCJwLTJcIj5Qcmlvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJwcmlvcml0eVwiIG5hbWU9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiIGNsYXNzPVwicC0yXCI+RGF0ZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBpZD1cImR1ZS1kYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCI+PGJyPlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInRhc2stc3VibWl0XCI+XG4gICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJkLW5vbmVcIiBpZD1cInRhc2stdXBkYXRlXCIgbmFtZT1cInVwZGF0ZVwiIHZhbHVlPVwidXBkYXRlXCI+XG4gICAgICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgIDwvZGl2PmA7XG4gICAgY29uc3QgcHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KHByb2plY3RUaXRsZSk7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RBcnJheVtwcm9qZWN0SW5kZXhdO1xuICAgIFNob3cudGFza0V2ZW50KHByb2plY3QsIHByb2plY3RJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgdGFza0V2ZW50KHByb2plY3QsIGluZGV4KSB7XG4gICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNyZm9ybVwiKTtcbiAgICB0YXNrU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIFNob3cuYWRkVGFzayhwcm9qZWN0LCBpbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzayhwcm9qZWN0LCBpbmRleCkge1xuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XG4gICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IGR1ZURhdGVpbnB1dCA9IGR1ZURhdGUudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRvRG9UYXNrKFxuICAgICAgdGFza05hbWVJbnB1dCxcbiAgICAgIGRlc2NJbnB1dCxcbiAgICAgIHByaW9yaXR5SW5wdXQsXG4gICAgICBkdWVEYXRlaW5wdXRcbiAgICApO1xuXG4gICAgaWYgKCFwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gbmV3VGFzay5uYW1lKSkge1xuICAgICAgcHJvamVjdHNbaW5kZXhdLnRhc2tBcnJheS5wdXNoKG5ld1Rhc2spO1xuICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG4gICAgICBTaG93Lm5ld1Rhc2tDYXJkKHRhc2tOYW1lSW5wdXQsIGRlc2NJbnB1dCwgcHJpb3JpdHlJbnB1dCwgZHVlRGF0ZWlucHV0KTtcbiAgICAgIFNob3cuZWRpdFRhc2tFdmVudChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5ld1Rhc2tDYXJkKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIGNvbnN0IGFkZFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICBhZGRUYXNrQ29udGFpbmVyLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJ0YXNrLWNhcmQtY29udGFpbmVyXCI+XG4gICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIiBpZD1cImNhcmQtdGFzay1uYW1lXCI+JHtuYW1lfTwvaDU+XG4gICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIiBpZD1cImNhcmQtZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1wcmlvcml0eVwiPiR7cHJpb3JpdHl9PC9wPjxicj5cbiAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiIGlkPVwiY2FyZC1kdWVkYXRlXCI+JHtkdWVEYXRlfTwvcD5cbiAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IHAtMiB0cmFzaFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdFwiPjxpIGNsYXNzPVwiZmFyIGZhLWVkaXRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPC9kaXY+XG4gICAgICAgPC9kaXY+XG4gICAgIDwvZGl2PmA7XG4gICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudFxuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleCh0aXRsZSk7XG4gICAgU2hvdy5yZW1vdmVUYXNrRXZlbnQoKTtcbiAgICBTaG93LmVkaXRUYXNrRXZlbnQocHJvamVjdEluZGV4KTtcblxuICB9XG5cbiAgIHN0YXRpYyBlZGl0VGFza0V2ZW50KGluZGV4KXtcbiAgICBjb25zdCBlZGl0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWRpdFwiKVxuICAgIGVkaXRCdXR0b25zLmZvckVhY2goKGVkaXRidG4pID0+IHtcbiAgICAgIGVkaXRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgIHRhc2tTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stc3VibWl0XCIpXG4gICAgICB0YXNrU3VibWl0LmNsYXNzTmFtZSA9ICBcImQtbm9uZVwiIFxuICAgICAgY29uc3QgdGFza1VwZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay11cGRhdGVcIilcbiAgICAgIHRhc2tVcGRhdGUuY2xhc3NOYW1lID0gXCJkLWJsb2NrXCIgICAgXG4gICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudFxuXG5cbiAgICAgIFNob3cudXBkYXRlVGFzayh0aXRsZSxpbmRleClcbmNvbnNvbGUubG9nKGluZGV4LCBcImluZGV4XCIpXG4gICAgIFxuICAgIH0pXG4gIH0pXG59XG5cbiAgc3RhdGljIHVwZGF0ZVRhc2sodGl0bGUsaW5kZXgpe1xuXG4gICAgIFxuICAgIGNvbnN0ICB1cGRhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdXBkYXRlXCIpO1xuICAgICBjb25zdCBwcm9qZWN0cyA9IGdldFByb2plY3QoKVxuIFxuICAgICBcbiAgIGNvbnN0IHRvZG9JZHggPSBwcm9qZWN0c1tpbmRleF0udGFza0FycmF5LmZpbmRJbmRleCgodGFzaykgPT4gdGFzay5uYW1lID09PSB0aXRsZSk7XG4gICBjb25zdCBwcm9qZWN0SWR4ID0gaW5kZXhcbiAgICBcbiAgICAgdXBkYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKSA9PiB7XG4gICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgIGNvbnNvbGUubG9nKHRvZG9JZHgsIFwidG9kb1wiKTtcblxuICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XG4gICAgICAgY29uc3QgdGFza05hbWVJbnB1dCA9IHRhc2tOYW1lLnZhbHVlO1xuICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICAgICBjb25zdCBkZXNjSW5wdXQgPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XG4gICAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZS1kYXRlXCIpO1xuICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGR1ZURhdGUudmFsdWU7XG5cbiAgICAgICBwcm9qZWN0c1twcm9qZWN0SWR4XS50YXNrQXJyYXlbdG9kb0lkeF0ubmFtZSA9IHRhc2tOYW1lSW5wdXQ7XG4gICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5W3RvZG9JZHhdLmRlc2NyaXB0aW9uID0gZGVzY0lucHV0O1xuICAgICAgIHByb2plY3RzW3Byb2plY3RJZHhdLnRhc2tBcnJheVt0b2RvSWR4XS5wcmlvcml0eSA9IHByaW9yaXR5SW5wdXQ7XG4gICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5W3RvZG9JZHhdLmR1ZURhdGUgPSBkdWVEYXRlSW5wdXQ7XG5cbiAgICAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICB0YXNrQWRkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgcHJvamVjdHNbcHJvamVjdElkeF0udGFza0FycmF5LmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgIFNob3cubmV3VGFza0NhcmQoXG4gICAgICAgICAgIHRhc2submFtZSxcbiAgICAgICAgICAgdGFzay5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgICAgdGFzay5kdWVEYXRlXG4gICAgICAgICApO1xuICAgICAgIH0pO1xuXG5cbiAgICAgfSkgXG4gICAgXG4gIH1cbiAgLy8gc3RhdGljIHVwZGF0ZVRhc2soaW5kZXgpe1xuICAvLyAgIGNvbnN0ICB1cGRhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdXBkYXRlXCIpXG4gICAgLy8gdXBkYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpID0+IHtcblxuICAgIC8vICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpO1xuICAgIC8vICAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gdGFza05hbWUudmFsdWU7XG4gICAgLy8gICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICAvLyAgICAgY29uc3QgZGVzY0lucHV0ID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgLy8gICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKTtcbiAgICAvLyAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IHByaW9yaXR5LnZhbHVlO1xuICAgIC8vICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWUtZGF0ZVwiKTtcbiAgICAvLyAgICAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZHVlRGF0ZS52YWx1ZTtcblxuICAgIC8vICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC10aXRsZVwiKTtcbiAgICAvLyAgICAgY29uc3QgZmluZFByb2plY3RJbmRleCA9IFByb2plY3QuZmluZFByb2plY3RJbmRleChcbiAgICAvLyAgICAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudFxuICAgIC8vICAgICApO1xuXG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RzID0gZ2V0UHJvamVjdCgpO1xuICAgICAgICAgXG4gICAgLy8gICAgIGlmICghcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5LmZpbmQoKHRhc2spID0+IHRhc2submFtZSA9PT0gaW5kZXggKSkge1xuXG4gICAgLy8gICAgIGNvbnN0IGZpbmRUYXNrID0gaW5kZXhcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZmluZFRhc2spXG5cbiAgICAvLyAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5W2ZpbmRUYXNrXS5uYW1lID0gdGFza05hbWVJbnB1dDtcbiAgICAvLyAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5W2ZpbmRUYXNrXS5kZXNjcmlwdGlvbiA9IGRlc2NJbnB1dDtcbiAgICAvLyAgICAgcHJvamVjdHNbZmluZFByb2plY3RJbmRleF0udGFza0FycmF5W2ZpbmRUYXNrXS5wcmlvcml0eSA9IHByaW9yaXR5SW5wdXQ7XG4gICAgLy8gICAgIHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheVtmaW5kVGFza10uZHVlRGF0ZSA9IGR1ZURhdGVJbnB1dDtcblxuICAgIC8vICAgICBzZXRQcm9qZWN0KHByb2plY3RzKTtcblxuICAgIC8vICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAvLyAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG5cbiAgICAgIFxuICAgIC8vICAgICAgICAgY29uc3QgdGFza1N1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1zdWJtaXRcIik7XG4gICAgLy8gICAgICAgICB0YXNrU3VibWl0LmNsYXNzTmFtZSA9IFwiZC1ibG9ja1wiO1xuICAgIC8vICAgICAgICAgY29uc3QgdGFza1VwZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay11cGRhdGVcIik7XG4gICAgLy8gICAgICAgICB0YXNrVXBkYXRlLmNsYXNzTmFtZSA9IFwiZC1ub25lXCI7ICAgIFxuXG4gICAgICAgIFxuICAgIC8vIH0pXG5cbiAgLy8gfVxuICBcbiAgc3RhdGljIHByb2plY3RFdmVudCgpIHtcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgU2hvdy5hZGRQcm9qZWN0KCk7XG4gICAgICBjb25zdCByZXNldEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15LWZvcm1cIik7XG4gICAgICByZXNldEZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQcm9qZWN0RXZlbnQoKSB7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGVsZXRlXCIpO1xuICAgIGRlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZGVsZXRlQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBQcm9qZWN0LmRlbGV0ZVByb2plY3QoaW5kZXgpO1xuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRhc2tGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGNvbnN0IHRhc2tBZGRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC10YXNrLWNvbnRhaW5lclwiKTtcbiAgICAgICAgdGFza0FkZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBTaG93Lm5ld1Rhc2tGb3JtKFwiRGVmYXVsdFwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZVRhc2tFdmVudCgpIHtcbiAgICBjb25zdCByZW1vdmVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZW1vdmVcIik7XG4gICAgcmVtb3ZlQnV0dG9ucy5mb3JFYWNoKChyZW1vdmVCdXR0b24sIGluZGV4KSA9PiB7XG4gICAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICAgICAgICBjb25zdCBmaW5kUHJvamVjdEluZGV4ID0gUHJvamVjdC5maW5kUHJvamVjdEluZGV4KFxuICAgICAgICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgY29uc3QgZmluZFRhc2sgPSBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuZmluZChcbiAgICAgICAgICAodGFzaykgPT4gdGFzay5uYW1lID09PSBpbmRleFxuICAgICAgICApO1xuICAgICAgICBwcm9qZWN0c1tmaW5kUHJvamVjdEluZGV4XS50YXNrQXJyYXkuc3BsaWNlKFxuICAgICAgICAgIHByb2plY3RzW2ZpbmRQcm9qZWN0SW5kZXhdLnRhc2tBcnJheS5pbmRleE9mKGZpbmRUYXNrKSxcbiAgICAgICAgICAxXG4gICAgICAgICk7XG5cbiAgICAgICAgc2V0UHJvamVjdChwcm9qZWN0cyk7XG5cbiAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb1Rhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGR1ZURhdGUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgfVxuXG4gIHVwZGF0ZVRhc2sobmV3VGFzaykge1xuICAgIHRoaXMubmFtZSA9IG5ld1Rhc2s7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldER1ZURhdGUoZGF0ZSkge1xuICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGU7XG4gICAgcmV0dXJuIHRoaXMuZHVlRGF0ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU2hvdyBmcm9tICcuL21vZHVsZXMvc2hvdyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBTaG93LnByb2plY3RFdmVudCwgU2hvdy5kZWZhdWx0UHJvamVjdCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==