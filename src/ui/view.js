/* eslint-disable class-methods-use-this */

export default class View {
  constructor() {
    this.app = this.getElement('.container');

    this.title = this.createElement('h1', 'title');
    this.title.innerText = 'Jobs need to be done!';

    this.myList = this.createElement('div', 'my-lists');
    this.myListTitle = this.createElement('h2', '', 'My Lists');
    this.myJobList = this.createElement('ul', 'job-list');

    this.jobListForm = this.createElement('form');
    this.jobListForm.setAttribute('data-new-list-form', '');
    this.input = this.createElement('input', 'new');
    this.input.classList.add('list');
    this.input.setAttribute('data-new-list-input', '');
    this.input.type = 'text';
    this.input.placeholder = 'New List Name';
    this.input.name = 'listName';

    this.newListBtn = this.createElement('button', 'btn');
    this.newListBtn.classList.add('link');
    this.newListBtn.innerText = 'Add';

    this.jobList = this.createElement('div', 'jobs-list');
    this.jobListHeader = this.createElement('div', 'jobs-list-header');
    this.jobListTitle = this.createElement('h2', '', 'Java Script');
    this.jobListCount = this.createElement('p', '', 'Jobs count');

    this.jobListBody = this.createElement('div', 'jobs-list-body');
    this.jobListJobs = this.createElement('div', 'jobs');

    this.jobList.append(this.jobListHeader, this.jobListBody);
    this.jobListHeader.append(this.jobListTitle, this.jobListCount);
    this.jobListBody.append(this.jobListJobs);
    this.jobListForm.append(this.input, this.newListBtn);
    this.myList.append(this.myListTitle, this.myJobList, this.jobListForm);
    this.app.append(this.title, this.myList, this.jobList);
  }

  createElement(tag, className, innerText) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (innerText) element.innerText = innerText;

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  displayJobs(jobs) {
    if (jobs.length === 0) {
      const jobs = document.querySelector('.jobs');
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a new Job?';
      jobs.append(p);
    } else {
      jobs.forEach((item) => {
        this.job = this.createElement('div', 'job');

        this.checkContainer = this.createElement('div', 'check');
        this.check = this.createElement('label', 'checkbox');
        this.checkInput = this.createElement('input');
        this.checkInput.type = 'checkbox';
        if (item.completed) {
          this.checkInput.setAttribute('checked', '');
        }
        this.checkmark = this.createElement('span', 'checkmark');

        this.jobContent = this.createElement('div');
        this.jobTitle = this.createElement('h2', 'job-title', item.title);
        this.jobDesc = this.createElement('p', 'job-desc', item.description);
        this.jobDue = this.createElement('p', 'job-due', `In ${item.due} days`);
        this.jobContent.append(this.jobTitle, this.jobDesc, this.jobDue);

        this.weigth = this.createElement('div', 'weigth');
        this.priorityLabel = this.createElement('p', '', 'Priority:');
        this.priorityStatus = this.createElement('p', '', item.weigth);
        this.weigth.append(this.priorityLabel, this.priorityStatus);

        this.check.append(this.checkInput, this.checkmark);
        this.checkContainer.append(this.check);
        this.job.append(this.checkContainer, this.jobContent, this.weigth);
        this.jobListJobs.appendChild(this.job);
      });
    }
  }

  displayLists(lists) {
    console.log(lists)
    lists.forEach((item) => {
      console.log(item)
      this.jobListItem = this.createElement('li', 'job-list-item', item.text);
      this.jobListItem.dataset.listId = item.id;
      this.myJobList.appendChild(this.jobListItem);
      console.log(this.myJobList)
    });
  }

  get listText() {
    return this.input.value;
  }

  resetInput() {
    this.input.value = '';
  }

  bindList(handler) {
    this.jobListForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.listText) {
        handler(this.listText);
        this.resetInput();
      }
    });
  }
}
