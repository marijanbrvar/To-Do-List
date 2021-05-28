import Screen from './ui/screen';

const app = new Screen();

const add = function add() {
  Screen.addToList('#list', 'li', 'test');
  Screen.buildForm('#list', 'New List', 'list', 'Add');
  Screen.buildForm('#jobs', 'New Job', 'job', 'Add');

};
add();
console.log(app);


