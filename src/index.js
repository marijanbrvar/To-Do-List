import Screen from './ui/screen';

const app = new Screen();

const add = function add() {
  app.buildHeader('Things need to be done!');
  app.buildSideList('Job list', [
    { id: 1, name: 'Job 1', active: true },
    { id: 2, name: 'Job 2', active: false },
  ]);
  // app.buildBlankSlate(
  //   'This is a blank slate',
  //   'Use it to provide information when no dynamic content exists.',
  // );
  app.buildNewJobButton();
  app.buildJobItemsList('Job 1 list', [
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
  ]);
  app.buildNewJobForm();
};
add();
console.log(app);
