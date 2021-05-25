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
  }

  onTodoListChanged = (todos) => {
    this.todoview.renderToDos(todos);
  };

  handleAddTodo = (todoText) => {
    this.todomodel.addTodo(todoText);
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
}

export { Controller as default };
