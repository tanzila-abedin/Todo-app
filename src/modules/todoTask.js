export default class ToDoTask {
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
