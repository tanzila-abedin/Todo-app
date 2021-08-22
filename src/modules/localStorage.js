
import  Show  from "./show";



// browser
// cookes
// {
//   "name" : "[{
//   todos: [ {} , {} ]
// },{},{}]"
// }

// // code
// projectsArray  = [{
//   todos: [ {} , {},{todo:[]} ]
// },{},{}]

// name= "samrood"

// const projectsArrayAsJson  = JSON.stringify(projectsArray)
// JSON.parse()

// localStorage.setItem("projects",projectsArrayAsJson)
// const projectsInJson = localStorage.getItem("projects")
// JSON.parse(projectsInJson) => [{}]

// stringify it => []=> ''
// set item   "" : ""
// get item   "" 
// parse it   "" => []


// [
//   default
//   project1
// ]

// code starts here

// export let projectArray;
// save projects
export function setProject(array){

  const arrayString = JSON.stringify(array)
//   console.log(projectArray)
  localStorage.setItem("projects",arrayString)
}

// read projects  
export function getProject(){
  const arrayString = localStorage.getItem("projects")
  if(arrayString){
     return JSON.parse(arrayString);
  }
}



// if (getProject() && getProject().length) {
//   projectArray = getProject()
//   const title = projectArray.title;
//   Show.newProjectTemplate(title)
// } else {
//   projectArray = [];
// }
// console.log(projectArray);



// if ( getProject() && getProject().length){
//   const projectsArray = ["deafult"]
//   setProject(projectsArray)
// } else{
//   const projectArray = []
// }

// function saveProject(){
//   localStorage.clear()
//   const string = JSON.stringify(projectsArray)
//   localStorage.setItem("projects",string)
// }

// function readProjects(){
//   const string = localStorage.getItem('projects')
//   return JSON.parse(string)
// }


// create project
// saveProjects()

// create todo

// saveProject()