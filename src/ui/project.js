/* eslint-disable class-methods-use-this */
const LOCAL_STORAGE_KEYS = 'projects.lists';
const LOCAL_STORAGE_SELECTED_ID_KEYS = 'projects.selectedProjectId';
const projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS)) || [
  { id: new Date().getTime().toString(), text: 'My tasks', tasks: [] },
];

let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_ID_KEYS);

class Project {
  constructor() {
    this.container = document.querySelector('.container');
    this.project = document.createElement('div');
    this.projectList = document.createElement('ul');
    this.projectForm = document.createElement('form');
    this.projectFormInput = document.createElement('input');
    this.newProjButton = document.createElement('button');
  }

  renderList() {
    this.clearElement(this.projectList);
    projects.forEach((item) => {
      const list = document.querySelector('.projects');
      const projectListItem = document.createElement('li');
      projectListItem.innerText = item.text;
      projectListItem.id = item.id;
      projectListItem.classList.add('project-item');
      list.appendChild(projectListItem);

      if (projectListItem.id === selectedProjectId) {
        projectListItem.classList.add('active-project');
      }

      this.projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = this.projectForm.projName.value.trim();
        if (projectName == null || projectName === '') return;
        const name = this.createProjList(projectName);
        projects.push(name);
        this.saveAndRender();
        this.projectForm.reset();
      });
    });
  }

  saveAndRender() {
    this.save();
    this.renderList();
  }

  save() {
    localStorage.setItem(LOCAL_STORAGE_KEYS, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_ID_KEYS, selectedProjectId);
  }

  createProjList(name) {
    return { id: new Date().getTime().toString(), text: name, tasks: [] };
  }

  clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  init() {
    this.project.append(this.projectList);
    this.projectList.classList.add('projects');
    this.projectForm.classList.add('new-project-form');
    this.projectForm.append(this.projectFormInput);
    this.projectFormInput.type = 'text';
    this.projectFormInput.id = 'projName';
    this.projectFormInput.placeholder = 'New project name';
    this.newProjButton.innerText = 'Add';
    this.newProjButton.classList.add('btn');
    this.projectForm.append(this.newProjButton);
    this.project.append(this.projectForm);
    this.container.append(this.project);

    this.project.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.id;
        this.saveAndRender();
      }
    });

    this.renderList();
  }
}

export { Project as default };