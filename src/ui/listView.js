/* eslint-disable class-methods-use-this */
import './styles/app.scss';

class ListView {
  constructor() {
    this.app = this.getElement('.container');

    this.listTitle = this.createElement('h2', 'list-title');
    this.lists = this.createElement('div', 'lists');
    this.list = this.createElement('ul', 'list');
    this.lists.append(this.listTitle, this.list);

    this.listForm = this.createElement('form', 'list-form');
    this.listTitle.innerText = 'Lists';
    this.listInput = this.createElement('input');
    this.listInput.type = 'text';
    this.listInput.placeholder = 'Add new list';
    this.listInput.name = 'listName';

    this.listSubmitButton = this.createElement('button', 'btn');
    this.listSubmitButton.innerText = 'Add';

    this.listForm.append(this.listInput, this.listSubmitButton);

    this.lists.prepend();
    this.lists.append(this.listForm);

    this.app.append(this.lists);
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

  get listText() {
    return this.listInput.value;
  }

  resetInput() {
    this.listInput.value = '';
  }

  renderList(projList) {
    // while (this.todo.firstChild) {
    //   this.todo.removeChild(this.todos.firstChild);
    // }

    if (projList.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a task?';
      this.todos.append(p);
    } else {
      projList.forEach((todo) => {
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
          // Otherwise just display the text
          span.textContent = todo.text;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, span, deleteButton);

        this.todo.append(li);
      });
    }
  }

  bindAddList(handler) {
    this.todoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.todoText) {
        handler(this.todoText);
        this.resetInput();
      }
    });
  }

  bindDeleteList(handler) {
    this.todos.addEventListener('click', (e) => {
      if (e.target.className === 'delete') {
        const id = parseInt(e.target.parentElement.id, 10);

        handler(id);
      }
    });
  }
}

export { ListView as default };
