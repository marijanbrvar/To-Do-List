/* eslint-disable no-nested-ternary */
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

  addToList(selector, tagName, text) {
    const targetElement = document.querySelector(selector);
    const element = document.createElement(tagName);
    element.innerText = text.name;
    element.classList.add('menu-item');
    element.setAttribute('aria-current', 'page');
    element.id = text.id;
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

  buildHeader(title) {
    const target = document.querySelector('BODY');
    const header = document.createElement('div');
    const headerItem = document.createElement('div');
    const headerLink = document.createElement('a');
    headerLink.href = '/';
    headerLink.classList.add('Header-link');
    header.classList.add('Header', 'mb-3');
    headerItem.classList.add('Header-item');
    headerLink.innerText = title;
    header.appendChild(headerItem);
    headerItem.appendChild(headerLink);
    target.prepend(header);

    return header;
  }

  buildSideList(title, jobs) {
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
    jobInput.name = 'jobInput';
    jobForm.append(jobInput, jobButton);
    jobForm.setAttribute('id', 'job-form');
    menuTitle.classList.add('menu-heading', 'color-bg-info');
    menuTitle.setAttribute('id', 'menu-heading');
    menuTitle.innerText = title;
    nav.appendChild(menuTitle);
    nav.classList.add('menu', 'mt-6');
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

  buildBlankSlate(title, text) {
    const blankSlate = document.createElement('div');
    const blankSlateTitle = document.createElement('h3');
    const blankSlateText = document.createElement('p');
    blankSlate.classList.add('blankslate');
    blankSlateTitle.classList.add('mb-1');
    blankSlateTitle.innerText = title;
    blankSlateText.innerText = text;
    blankSlate.append(blankSlateTitle, blankSlateText);
    this.jobs.append(blankSlate);
    return blankSlate;
  }

  buildJobItemsList(listName, jobsList) {
    const target = document.querySelector('#jobs');
    const jobsBox = document.createElement('div');
    const jobsHeader = document.createElement('div');
    const jobsTitle = document.createElement('h3');
    const counter = document.createElement('span');
    counter.classList.add('Counter', 'Counter--gray-dark', 'ml-2');
    counter.innerText = jobsList.length;
    jobsBox.classList.add('Box', 'mb-4');
    jobsHeader.classList.add('Box-header', 'Box-header--blue');
    jobsTitle.classList.add('Box-title');
    jobsTitle.innerText = listName;
    jobsTitle.appendChild(counter);
    jobsHeader.appendChild(jobsTitle);
    jobsBox.appendChild(jobsHeader);
    jobsList.forEach((item) => {
      const boxRow = document.createElement('div');
      const boxContent = document.createElement('div');
      const boxTitle = document.createElement('strong');
      const description = document.createElement('div');
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-sm');
      button.innerText = item.completed ? 'Finished' : 'In progress...';
      boxRow.classList.add('Box-row', 'd-flex', 'flex-items-center');
      boxContent.classList.add('flex-auto');
      description.classList.add('text-small', 'text-gray-light');
      boxTitle.innerText = item.title;
      description.innerHTML = `
      <div><strong>Due:</strong> ${item.due}</div>
      <strong>Desc:</strong> ${item.description}
      <div class="text-bold ${item.weigth === 'Heigh' ? 'color-text-danger' : item.weigth === 'Medium' ? 'color-text-warning' : 'color-text-success'}"><strong>Priority:</strong> ${item.weigth}</div> 
      `;
      boxContent.append(boxTitle, description);
      boxRow.append(boxContent, button);

      jobsBox.append(boxRow);
    });
    target.appendChild(jobsBox);

    return jobsBox;
  }

  buildNewJobButton() {
    const target = document.querySelector('#jobs');
    const actionBar = document.createElement('div');
    const button = document.createElement('button');
    actionBar.classList.add('mb-2', 'text-right');
    button.classList.add('btn', 'btn-outline');
    button.innerText = 'New Job';
    actionBar.append(button);
    target.appendChild(actionBar);

    return button;
  }

  buildNewJobForm() {
    const target = document.querySelector('#jobs');
    const formBox = document.createElement('div');
    const formHeader = document.createElement('div');
    const formTitle = document.createElement('h3');
    const formBody = document.createElement('div');
    const formFooter = document.createElement('div');
    formBody.classList.add('Box-body');
    formFooter.classList.add('Box-footer', 'text-right');
    formTitle.classList.add('Box-title');
    formTitle.innerText = 'New Job Form';
    formHeader.classList.add('Box-header', 'Box-header--blue');
    formBox.classList.add('Box');
    formBody.classList.add('Box-body');
    formBody.innerHTML = `
    <div class="form-group">
      <div class="form-group-header">
        <label>Title</label>
      </div>
      <div class="form-group-body">
        <input class="form-control input-block" type="text">
      </div>
    </div>
    <div class="form-group">
      <div class="form-group-header">
        <label>Description</label>
      </div>
      <div class="form-group-body">
        <input class="form-control input-block" type="text">
      </div>
    </div>
    <div class="form-group">
      <div class="form-group-header">
        <label>Priority</label>
      </div>
      <div class="radio-group">
      <input class="radio-input" id="normal" type="radio" name="options">
      <label class="radio-label" for="normal">Normal</label>
      <input class="radio-input" id="medium" type="radio" name="options">
      <label class="radio-label" for="medium">Medium</label>
      <input class="radio-input" id="height" type="radio" name="options">
      <label class="radio-label" for="height">Heigh</label>
    </div>
    </div>
    
    <div class="form-group">
      <div class="form-group-header">
        <label>Due date:</label>
      </div>
      <div class="form-group-body">
        <input class="form-control input-block" type="date">
      </div>
    </div>
    `;
    formFooter.innerHTML = `
    <button class="btn btn-secondary mr-1">Cancel</button>
    <button class="btn btn-primary">Submit</button>
    `;
    formHeader.append(formTitle);
    formBox.append(formHeader, formBody, formFooter);
    target.appendChild(formBox);

    return formBox;
  }
}

export { Screen as default };
