/* eslint-disable class-methods-use-this */
const LOCAL_STORAGE_LISTS = 'task.lists';
const LOCAL_STORAGE_LISTS_ID_KEY = 'task.selectdListIdKey';

class ListModel {
  constructor() {
    this.list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS)) || [
      {
        id: 1,
        text: 'myList',
        todos: [],
      },
    ];
    this.selectedList = localStorage.getItem(LOCAL_STORAGE_LISTS_ID_KEY);
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
    localStorage.setItem(LOCAL_STORAGE_LISTS_ID_KEY, item.id);
    this.onListChanged(this.list);
  }

  deleteList(id) {
    this.list = this.list.filter((item) => item.id !== id);
    const newId = this.list.length ? this.list[0].id : 0;
    this.commit(this.list);
    localStorage.setItem(LOCAL_STORAGE_LISTS_ID_KEY, newId);
    this.onListChanged(this.list);
  }

  selectedLists(id) {
    localStorage.setItem(LOCAL_STORAGE_LISTS_ID_KEY, id);
    this.onListChanged(this.list);
  }

  bindListChanged(callback) {
    this.onListChanged = callback;
  }
}

export { ListModel as default };
