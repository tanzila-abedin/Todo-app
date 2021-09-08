import {Project} from './modules/constructor'

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
      const actual = Project.findProjectIndex('project');
      expect(actual).toEqual(0);
    });


        // test("find project index", () => {
        //   const projectArray = new Project('project')
        //   const actual = Project.findProject("project");
        //   expect(actual).toEqual({ taskArray: [], title: "project" });
        // });
