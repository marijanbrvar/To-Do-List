import Screen from './ui/screen';

const LOCAL_STORAGE_JOB_LIST_KEY = 'jobs.lists';

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_JOB_LIST_KEY)) || [];

const app = new Screen();

const currentlyActive = () => {
  const current = lists.findIndex((obj) => obj.active === true);
  return current;
};

const render = function render() {
  app.buildHeader('Things need to be done!');
  app.buildSideList('Job list', lists);
  app.buildNewJobButton();
  app.buildDeleteJobButton();
  if (lists[currentlyActive()].jobtasks.length === 0) {
    app.buildBlankSlate(
      'This is a blank slate',
      'Use it to provide information when no dynamic content exists.',
    );
  }
  if (lists[currentlyActive()].jobtasks.length !== 0) {
    app.buildJobItemsList(lists[currentlyActive()].name, lists[currentlyActive()].jobtasks);
  }
  app.buildNewJobForm();
};
render();

const newListForm = document.querySelector('#job-form');
const jobList = document.querySelector('nav');
const deleteJobListButton = document.querySelector('#delete');
const newTaskButton = document.querySelector('#new');
const hideNewTaskButton = document.querySelector('#cancle');
const newTaskForm = document.querySelector('#newtask');

function resetActivJobList() {
  if (lists.length !== 0) {
    const currentActive = lists.findIndex((obj) => obj.active === true);
    lists[currentActive].active = false;
  }
}

function createJobList(name) {
  resetActivJobList();
  return {
    id: lists.length + 1,
    name,
    active: true,
    jobtasks: [],
  };
}

const saveAndRefresh = (lists) => {
  localStorage.setItem(LOCAL_STORAGE_JOB_LIST_KEY, JSON.stringify(lists));
  window.location.reload();
};

newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const jobName = newListForm.jobInput.value.trim();
  if (jobName === null || jobName === '') return;
  const jobList = createJobList(jobName);
  newListForm.jobInput.value = null;
  lists.push(jobList);
  saveAndRefresh(lists);
  app.addToList('nav', 'a', jobList);
});

jobList.addEventListener('click', (e) => {
  const currentId = e.target.id;
  resetActivJobList();
  const job = lists.findIndex((obj) => obj.id === parseInt(currentId, 10));
  lists[job].active = true;
  saveAndRefresh(lists);
});

if (lists.length !== 0) {
  deleteJobListButton.setAttribute('aria-disabled', 'false');
  deleteJobListButton.addEventListener('click', () => {
    lists = lists.filter((x) => x.id !== lists[currentlyActive()].id);
    if (lists.length !== 0) lists[0].active = true;
    if (lists.length === 0) lists = [];
    saveAndRefresh(lists);
  });
  newTaskButton.addEventListener('click', () => {
    const form = document.querySelector('#newtask');
    form.style.display = 'block';
  });

  hideNewTaskButton.addEventListener('click', () => {
    const form = document.querySelector('#newtask');
    form.style.display = 'none';
  });
} else {
  deleteJobListButton.setAttribute('aria-disabled', 'true');
  newTaskButton.setAttribute('aria-disabled', 'true');
}

newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const description = e.target.desc.value;
  const weigth = document.querySelector('input[name = "weigth"]:checked').value;
  const due = e.target.due.value;

  lists[currentlyActive()].jobtasks.push({
    id: lists[currentlyActive()].jobtasks.length + 1,
    title,
    description,
    weigth,
    due,
  });
  saveAndRefresh(lists);
});