class ListModel {
  constructor() {
    this.list = [
      {
        id: new Date().getTime().toString() + 1,
        text: 'Run a JS Marathon',
        todos: [],
      },
      {
        id: new Date().getTime().toString(),
        text: 'Run a Ruby ',
        todos: [],
      },
    ];
  }

  addList(listText) {
    const todo = {
      id: new Date().getTime().toString(),
      text: listText,
      todos: [],
    };

    this.todos.push(todo);
  }

  editList(id, updatedText) {
    this.list = this.list.map((item) => (item.id === id
      ? {
        id: item.id,
        text: updatedText,
        todos: [],
      }
      : item));
  }

  deleteList(id) {
    this.list = this.list.filter((list) => list.id !== id);

    this.onListChanged(this.todos);
  }

  bindListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}

export { ListModel as default };
