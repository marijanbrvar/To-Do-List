export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindJobsChanged(this.bindJobsChanged);
    this.model.bindListsChanged(this.bindListsChanged);
    this.view.bindList(this.handleList);

    this.bindJobsChanged(this.model.jobs);
    this.bindListsChanged(this.model.lists);
  }

  bindJobsChanged = (jobs) => {
    this.view.displayJobs(jobs);
  }

  bindListsChanged = (lists) => {
    this.view.displayLists(lists);
  }

  handleList = (listText) => {
    this.model.addList(listText);
  }
}
