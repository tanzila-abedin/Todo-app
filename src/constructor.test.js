import {Project, projectArray} from './modules/constructor'

  test('create a new project',() => {
    const titleInput = "projectTitle"
    const project = new Project(titleInput)
     expect(project).toBeTruthy();
  });

    test("project title is same as the input title", () => {
      const expected = "project";
      const actual = new Project("project");
      expect(actual.title).toBe(expected);
    });
  

    test('find project index', () => {
      const expected = new Project('project');
      projectArray.push(expected)
      const actual = Project.findProjectIndex('project');
      expect(actual).toEqual(0);
    });

            test("find project title", () => {
              const expected = new Project("project");
              projectArray.push(expected);
              const actual = Project.findProject("project");
              expect(actual.title).toBe('project');
            });


        test("presence of a project to be true", () => {
          const expected = new Project("project");
          projectArray.push(expected);
          const actual = Project.isPresent("project");
          expect(actual).toBeTruthy();
        });

test('adding new project to the array', () => {
 const newProject = new Project("jellybeans");
 const actual = Project.addProject(newProject)
 console.log(actual)
 expect(actual).toContain(newProject)
})