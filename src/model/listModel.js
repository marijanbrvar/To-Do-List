const LOCAL_STORAGE_LISTS = 'task.lists';
const LOCAL_STORAGE_LISTS_ID_KEY = 'task.selectdListIdKey';

class ListModel {
  constructor() {
    this.list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS)) || [
      // {
      //   id: 1,
      //   text: 'myList',
      //   todos: [],
      // },
      // {
      //   id: 2,
      //   text: 'Run a Ruby ',
      //   todos: [],
      // },
    ];
    this.selectedList = localStorage.getItem(LOCAL_STORAGE_LISTS_ID_KEY);
  }

  selectedList(element) {
    if (this.list.id === this.selectedList) element.classList.add('active-list');
  }

  commit(list) {
    this.onListChanged(list);
    localStorage.setItem(LOCAL_STORAGE_LISTS, JSON.stringify(list));
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
