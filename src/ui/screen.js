import './styles/app.scss';

class Screen {
  constructor() {
    this.container = document.querySelector('.container');
    this.container.classList.add('d-flex', 'p-6');
    this.jobs = document.createElement('div');
    this.list = document.createElement('div');
    this.list.setAttribute('id', 'list');
    this.list.classList.add('mx-md-6');
    this.jobs.classList.add('flex-1', 'mx-md-6');
    this.jobs.setAttribute('id', 'jobs');
    this.container.append(this.list, this.jobs);
  }

  static addToList(selector, tagName, text) {
    const targetElement = document.querySelector(selector);
    const element = document.createElement(tagName);
    element.innerText = text;
    element.classList.add('list-item');
    targetElement.appendChild(element);
    return element;
  }

  static removeFromList(selector, id) {
    const targetElement = document.querySelector(selector);
    const items = Array.from(targetElement.childNodes);
    const item = items.find((i) => i.id === id);
    return item;
  }

  static buildForm(selector, placeholder, inputName, btnText) {
    const targetEl = document.querySelector(selector);
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.classList.add('form-control', 'input-sm');
    input.type = 'text';
    input.name = inputName;
    input.placeholder = placeholder;
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline', 'btn-sm');
    button.innerText = btnText;
    form.append(input, button);
    targetEl.appendChild(form);
    return form;
  }
}

export { Screen as default };