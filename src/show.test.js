import Show from "./modules/show"
import { Project, projectArray } from "./modules/constructor";
import ToDoTask from './modules/todoTask';
import document from './document'

test('append a new project title when created', () => {
     Show.newProjectTemplate('title')
     const actual = document.querySelector('.project-btn').innerHTML
     expect(actual).toMatch(`title`);
})

test('checks for a new task form with the project name', () => {
     Show.newTaskForm("title");
     const actual = document.getElementById("project-title").innerHTML;
     expect(actual).toMatch(`title`);
})

test('geneate a new task card with info', () => {
     Show.newTaskCard('name','description','low','05/08/21')
     const taskName = document.getElementById("card-task-name").innerHTML;
     const taskDesc = document.getElementById("card-description").innerHTML;
     const taskPriority = document.getElementById("card-priority").innerHTML;
     const taskDate = document.getElementById("card-duedate").innerHTML;
     expect(taskName).toMatch('name')
          expect(taskDesc).toMatch("description");
               expect(taskPriority).toMatch("low");
                    expect(taskDate).toMatch("05/08/21");
})

test ('adds a new task to the task array of a project', () => {
     const newTask = new ToDoTask('name','description','low','05/08/21');
     const newProject = new Project('snow flake')
     projectArray.push(newProject)
     projectArray[0].taskArray.push(newTask)
     const project = projectArray[0]
     const actual = Show.addTask(project,0)
     expect(actual.taskArray).toContain(newTask)     
})

