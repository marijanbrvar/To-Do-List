import Screen from './ui/screen';

const app = new Screen();

const add = function add() {
  Screen.buildHeader('Things need to be done!');
  Screen.buildSideList('Job list', [{ id: 1, name: 'Job 1', active: true }, { id: 2, name: 'Job 2', active: false }]);
  app.buildBlankSlate('This is a blank slate', 'Use it to provide information when no dynamic content exists.');
};
add();
console.log(app);
