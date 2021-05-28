class Controller {
  constructor(listview, listmodel, todoview, todomodel) {
    this.todoview = todoview;
    this.todomodel = todomodel;
    this.listview = listview;
    this.listmodel = listmodel;

    this.onTodoListChanged(this.todomodel.todos);
    this.todoview.bindAddTodo(this.handleAddTodo);
    this.todoview.bindDeleteTodo(this.handleDeleteTodo);
    this.todoview.bindToggleTodo(this.handleToggleTodo);
    this.todomodel.bindTodoListChanged(this.onTodoListChanged);

    this.onListChanged(this.listmodel.list);
    this.listview.bindAddList(this.handleAddList);
    this.listview.bindDeleteList(this.handleDeleteList);
    this.listmodel.bindListChanged(this.onListChanged);
    this.listview.bindSelectedList(this.handleSelectedList);
  }

  onTodoListChanged = (todos) => {
    this.todoview.renderToDos(todos, this.listmodel.selectedList);
  };

  handleAddTodo = (todoText) => {
    this.todomodel.addTodo(todoText, this.listmodel.selectedList);
  };

  handleEditTodo = (id, todoText) => {
    this.todomodel.editTodo(id, todoText);
  };

  handleDeleteTodo = (id) => {
    this.todomodel.deleteTodo(id);
  };

  handleToggleTodo = (id) => {
    this.todomodel.toggleTodo(id);
  };

  onListChanged = (list) => {
    this.listview.renderList(list, this.listmodel.selectedList);
  }

  handleAddList = (listText) => {
    this.listmodel.addList(listText);
  }

  handleDeleteList = (listText) => {
    this.listmodel.deleteList(listText);
  }

  handleSelectedList = (id) => {
    this.listmodel.selectedLists(id);
  }
}

export { Controller as default };
