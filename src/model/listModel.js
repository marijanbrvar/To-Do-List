class ListModel {
  constructor() {
    this.list = [
      {
        id: 1,
        text: 'myList',
        todos: [],
      },
      {
        id: 2,
        text: 'Run a Ruby ',
        todos: [],
      },
    ];
  }

  addList(listText) {
    const item = {
      id: this.list.length + 1,
      text: listText,
      todos: [],
    };

    this.list.push(item);
    this.onListChanged(this.list);
  }

  deleteList(id) {
    this.list = this.list.filter((item) => item.id !== id);

    this.onListChanged(this.list);
  }

  bindListChanged(callback) {
    this.onListChanged = callback;
  }
}

export { ListModel as default };
