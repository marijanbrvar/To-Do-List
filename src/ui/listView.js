/* eslint-disable radix */
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
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    if (projList.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Lists empty! Add some?';
      this.lists.append(p);
    } else {
      projList.forEach((list) => {
        const li = this.createElement('li', 'list-item');
        li.id = list.id;

        const span = this.createElement('span');
        span.contentEditable = true;
        span.classList.add('editable');
        span.textContent = list.text;

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(span, deleteButton);

        this.list.append(li);
      });
    }
  }

  bindAddList(handler) {
    this.listForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.listText) {
        handler(this.listText);
        this.resetInput();
      }
    });
  }

  bindDeleteList(handler) {
    this.lists.addEventListener('click', (e) => {
      if (e.target.className === 'delete') {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }
}

export { ListView as default };
