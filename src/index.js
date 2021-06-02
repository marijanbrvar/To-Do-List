import Screen from './ui/screen';

const LOCAL_STORAGE_JOB_LIST_KEY = 'jobs.lists';

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_JOB_LIST_KEY)) || [
  {
    id: 1,
    name: 'MyList',
    active: true,
    jobtasks: [],
  },
];

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
  if (lists.length === 0 || lists[currentlyActive()].jobtasks.length === 0) {
    app.buildBlankSlate(
      'This is a blank slate',
      'Use it to provide information when no dynamic content exists.',
    );
  }
  if (lists.length !== 0 && lists[currentlyActive()].jobtasks.length !== 0) {
    app.buildJobItemsList(lists[currentlyActive()].name, lists[currentlyActive()].jobtasks);
  }
};
render();

const newListForm = document.querySelector('#job-form');
const jobList = document.querySelector('nav');
const deleteJobListButton = document.querySelector('#delete');
const newTaskButton = document.querySelector('#new');
const tasksList = document.querySelector('.tasks');

const saveAndRefresh = (lists) => {
  localStorage.setItem(LOCAL_STORAGE_JOB_LIST_KEY, JSON.stringify(lists));
  window.location.reload();
};

const submitNewTask = () => {
  const newTaskForm = document.querySelector('#newtask');
  newTaskForm.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = newTaskForm.title.value;
    const description = newTaskForm.desc.value;
    const weigth = newTaskForm.weigth.value;
    const due = newTaskForm.due.value;
    if (title === '' || title === null || weigth === '' || weigth === null || due === '' || due === null) return;

    lists[currentlyActive()].jobtasks.push({
      id: lists[currentlyActive()].jobtasks.length + 1,
      title,
      description,
      weigth,
      due,
      completed: false,
    });
    saveAndRefresh(lists);
  });
};

const editTask = (id) => {
  const newTaskForm = document.querySelector('#newtask');
  const idx = lists[currentlyActive()].jobtasks.findIndex((x) => x.id === parseInt(id, 10));
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const update = {
      id: parseInt(id, 10),
      title: newTaskForm.title.value,
      description: newTaskForm.desc.value,
      weigth: newTaskForm.weigth.value,
      due: newTaskForm.due.value,
      // completed: newTaskForm.completed.value,
    };

    lists[currentlyActive()].jobtasks[idx] = update;
    // console.log(update);
    saveAndRefresh(lists);
  });
};

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
    if (lists.length === 0) lists = '';
    saveAndRefresh(lists);
  });
  newTaskButton.addEventListener('click', () => {
    app.buildNewJobForm('New task');
    submitNewTask();
    const form = document.querySelector('#newtask');
    form.style.display = 'block';
  });
} else {
  deleteJobListButton.setAttribute('aria-disabled', 'true');
  newTaskButton.setAttribute('aria-disabled', 'true');
}

if (lists[currentlyActive()].jobtasks.length !== 0) {
  tasksList.addEventListener('click', (e) => {
    const taskId = e.target.parentElement.id;
    const currentItem = parseInt(e.target.closest('.Box-row').id, 10);
    const idx = lists[currentlyActive()].jobtasks.findIndex((x) => x.id === parseInt(taskId, 10));
    if (lists[currentlyActive()].jobtasks.length === 0 || e.target.hasAttribute('data-status-button')) {
      const completed = lists[currentlyActive()].jobtasks[idx];
      completed.completed = !completed.completed;
      saveAndRefresh(lists);
    }
    if (lists[currentlyActive()].jobtasks.length === 0 || e.target.parentElement.hasAttribute('data-delete-task')) {
      const tasks = lists[currentlyActive()].jobtasks.filter((x) => x.id !== currentItem);
      lists[currentlyActive()].jobtasks = tasks;
      saveAndRefresh(lists);
    }
    if (lists[currentlyActive()].jobtasks.length === 0 || e.target.parentElement.hasAttribute('data-edit-task')) {
      const ct = e.target.parentElement.closest('.Box-row').id;
      const tidx = lists[currentlyActive()].jobtasks.findIndex((x) => x.id === parseInt(ct, 10));
      const task = lists[currentlyActive()].jobtasks[tidx];
      app.buildNewJobForm(`Upadate ${task.title}`);
      const form = document.querySelector('#newtask');
      form.style.display = '';
      form.title.setAttribute('value', task.title);
      form.desc.value = task.description;
      form.weigth.value = task.weigth;
      form.due.value = task.due;
      editTask(ct);
    }
  });
}
