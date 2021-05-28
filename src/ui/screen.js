/* eslint-disable class-methods-use-this */
class Screen {
  constructor() {
    this.container = document.querySelector('.container');
    this.container.classList.add('container-md', 'clearfix');
    this.jobs = document.createElement('div');
    this.list = document.createElement('div');
    this.list.setAttribute('id', 'list');
    this.list.classList.add('col-sm-12', 'col-md-4', 'float-left', 'p-2');
    this.jobs.classList.add('col-sm-12', 'col-md-8', 'float-left', 'p-2');
    this.jobs.setAttribute('id', 'jobs');
    this.container.append(this.list, this.jobs);
  }

  static addToList(selector, tagName, text) {
    const targetElement = document.querySelector(selector);
    const element = document.createElement(tagName);
    element.innerText = text;
    element.classList.add('menu-item');
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

  static buildHeader(title) {
    const target = document.querySelector('BODY');
    const header = document.createElement('div');
    const headerItem = document.createElement('div');
    const headerLink = document.createElement('a');
    headerLink.href = '/';
    headerLink.classList.add('Header-link');
    header.classList.add('Header', 'mb-5');
    headerItem.classList.add('Header-item');
    headerLink.innerText = title;
    header.appendChild(headerItem);
    headerItem.appendChild(headerLink);
    target.prepend(header);

    return header;
  }

  static buildSideList(title, jobs) {
    const target = document.querySelector('#list');
    const nav = document.createElement('nav');
    const menuTitle = document.createElement('span');
    const jobForm = document.createElement('form');
    const jobInput = document.createElement('input');
    const jobButton = document.createElement('button');
    jobButton.classList.add('btn', 'ml-1', 'btn-outline');
    jobButton.type = 'submit';
    jobButton.innerText = 'Add';
    jobInput.classList.add('form-control', 'input-md');
    jobForm.append(jobInput, jobButton);
    jobForm.setAttribute('id', 'job-form');
    menuTitle.classList.add('menu-heading');
    menuTitle.setAttribute('id', 'menu-heading');
    menuTitle.innerText = title;
    nav.appendChild(menuTitle);
    nav.classList.add('menu');
    nav.setAttribute('aria-label', 'Person settings');
    jobs.forEach((item) => {
      const link = document.createElement('a');
      link.classList.add('menu-item');
      if (item.active) {
        link.setAttribute('aria-current', 'page');
      }
      link.innerText = item.name;
      link.setAttribute('id', item.id);
      nav.appendChild(link);
    });
    target.append(nav, jobForm);
    return nav;
  }
}

export { Screen as default };
