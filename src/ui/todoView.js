/* eslint-disable class-methods-use-this */
import './styles/app.scss';

class ToDoView {
  constructor() {
    this.app = this.getElement('.container');

    this.todoTitle = this.createElement('h2', 'todo-title');
    this.todos = this.createElement('div', 'todos');
    this.todo = this.createElement('ul', 'todo');
    this.todos.append(this.todoTitle, this.todo);

    this.todoForm = this.createElement('form', 'list-form');
    this.todoTitle.innerText = 'Todo';
    this.todoInput = this.createElement('input');
    this.todoInput.type = 'text';
    this.todoInput.placeholder = 'Add new task';
    this.todoInput.name = 'todoName';

    this.todoSubmitButton = this.createElement('button', 'btn');
    this.todoSubmitButton.innerText = 'new';

    this.todoForm.append(this.todoInput, this.todoSubmitButton);

    this.todos.append(this.todoForm);

    this.app.append(this.todos);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  get todoText() {
    return this.todoInput.value;
  }

  resetInput() {
    this.todoInput.value = '';
  }

  renderToDos(todosList, selected) {
    console.log(selected);
    while (this.todo.firstChild) {
      this.todo.removeChild(this.todo.firstChild);
    }

    if (todosList.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a task?';
      this.todos.append(p);
    } else {
      todosList.forEach((todo) => {
        const li = this.createElement('li', 'todo-item');
        li.id = todo.id;

        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;

        const span = this.createElement('span');
        span.contentEditable = true;
        span.classList.add('editable');

        if (todo.complete) {
          const strike = this.createElement('s');
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, span, deleteButton);

        this.todo.append(li);
      });
    }
  }

  bindAddTodo(handler) {
    this.todoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.todoText) {
        handler(this.todoText);
        this.resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todos.addEventListener('click', (e) => {
      if (e.target.className === 'delete') {
        const id = parseInt(e.target.parentElement.id, 10);
        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todos.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = parseInt(e.target.parentElement.id, 10);

        handler(id);
      }
    });
  }
}

export { ToDoView as default };
