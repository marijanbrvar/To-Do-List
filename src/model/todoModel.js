/* eslint-disable max-len */
const LOCAL_STORAGE_TODOS = 'task.todos';
class TodoModel {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS)) || [];
  }

  commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length + 1,
      text: todoText,
      complete: false,
      due: new Date().getDate().toString(),
      group: '',
    };
    this.todos.push(todo);
    this.commit(this.todos);
    this.onTodoListChanged(this.todos);
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((item) => (item.id === id
      ? {
        id: item.id,
        text: updatedText,
        complete: item.complete,
        due: item.due,
        group: item.group,
      }
      : item));
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this.commit(this.todos);
    this.onTodoListChanged(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) => (todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo));

    this.onTodoListChanged(this.todos);
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
}

export { TodoModel as default };
