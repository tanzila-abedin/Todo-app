// save projects
import "jest-localstorage-mock";

export function setProject(array) {
  const arrayString = JSON.stringify(array);

  localStorage.setItem('projects', arrayString);
}

// read projects
export function getProject() {
  const arrayString = localStorage.getItem('projects');
  if (arrayString) {
    return JSON.parse(arrayString);
  }
  return false;
}
