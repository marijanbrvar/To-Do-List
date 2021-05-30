import Screen from './ui/screen';

const LOCAL_STORAGE_LIST_KEY = 'task.lists';

const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
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

function createJobList(name) {
  return {
    id: lists.length + 1,
    name,
    active: false,
    lists: [],
  };
}

const save = (lists) => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
};

newListForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const jobName = newListForm.jobInput.value.trim();
  if (jobName === null || jobName === '') return;
  const jobList = createJobList(jobName);
  newListForm.jobInput.value = null;
  lists.push(jobList);
  save(lists);
  app.addToList('nav', 'a', jobList);
});
