import Screen from './ui/screen';

const LOCAL_STORAGE_JOB_LIST_KEY = 'jobs.lists';
const LOCAL_STORAGE_SELECTED_JOB_LIST_ID_KEY = 'jobs.selectedListId';

const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_JOB_LIST_KEY)) || [];
const jobs = [
  {
    id: 1,
    title: 'Title',
    description: 'Lorem ipsum dolar sit amet....',
    weigth: 'Normal',
    completed: false,
    due: '2021/4/28',
  },
  {
    id: 2,
    title: 'A bit longer title',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatem ipsa ut sit nesciunt quisquam culpa, consequatur error.',
    weigth: 'Heigh',
    completed: true,
    due: '2021/4/28',
  },
];

const app = new Screen();

const add = function add() {
  app.buildHeader('Things need to be done!');
  app.buildSideList('Job list', lists);
  // app.buildBlankSlate(
  //   'This is a blank slate',
  //   'Use it to provide information when no dynamic content exists.',
  // );
  app.buildNewJobButton();
  app.buildJobItemsList('Job 1 list', jobs);
  app.buildNewJobForm();
};
add();

const newListForm = document.querySelector('#job-form');
const jobList = document.querySelector('nav');

function resetActivJobList() {
  const currentActive = lists.findIndex((obj) => obj.active === true);
  lists[currentActive].active = false;
}

function createJobList(name) {
  resetActivJobList();
  return {
    id: lists.length + 1,
    name,
    active: true,
    lists: [],
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
