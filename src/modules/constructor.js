import { getProject, setProject } from './localStorage';
import "jest-localstorage-mock";
import { isArray } from 'lodash';

export const projectArray = getProject() && getProject().length ? getProject() : [];
export class Project {
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

  static addProject(newProject) {
    if (!projectArray.find((project) => project.title === newProject.title)) {
      projectArray.push(newProject);
      setProject(projectArray);
    }
    return projectArray;
  }

  static deleteProject(projectName) {
    const deleteProject = projectArray.findIndex(
      (project) => project.title === projectName,
    );
    const projects = getProject() || projectArray;
    if(Array.isArray(projects)){
    projects.splice(deleteProject, 1);
    setProject(projects);
    }
    return projects
  }
}
