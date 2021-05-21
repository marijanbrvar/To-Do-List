class Model {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('lists'))
    || [
      { id: 1, name: 'Java Script' },
      { id: 2, name: 'Ruby on Rails' },
    ];
    this.jobs = JSON.parse(localStorage.getItem('jobs'))
    || [
      {
        id: 1,
        title: 'Make something',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, omnis?',
        completed: false,
        due: '2021-7-13',
        weigth: 'High',
      },
      {
        id: 2,
        title: 'Make something',
        description: 'Describes what did you meand',
        completed: false,
        due: '2021-7-13',
        weigth: 'High',
      },
    ];
  }

  bindJobsChanged(callback) {
    this.onJobsChanged = callback;
  }

  bindListsChanged(callback) {
    this.onListsChanged = callback;
  }

  commitLists(lists) {
    this.bindListsChanged(lists);
    localStorage.setItem('lists', JSON.stringify(lists));
  }

  commitJobs(jobs) {
    this.bindJobsChanged(jobs);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  addToDo(todoContent) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      title: todoContent.title,
      description: todoContent.description,
      notes: todoContent.notes,
      due: todoContent.due,
      weitgh: todoContent.weigth,
      done: false,
    };

    this.todos.push(todo);
    return this;
  }
}

export { Model as default };