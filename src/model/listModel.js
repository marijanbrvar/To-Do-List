class ListModel {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('list')) || [
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

  commit(list) {
    this.onListChanged(list);
    localStorage.setItem('list', JSON.stringify(list));
  }

  addList(listText) {
    const item = {
      id: this.list.length + 1,
      text: listText,
      todos: [],
    };

    this.list.push(item);
    this.commit(this.list);
    this.onListChanged(this.list);
  }

  deleteList(id) {
    this.list = this.list.filter((item) => item.id !== id);
    this.commit(this.list);
    this.onListChanged(this.list);
  }

  bindListChanged(callback) {
    this.onListChanged = callback;
  }
}

export { ListModel as default };
