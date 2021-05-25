/* eslint-disable no-unused-vars */
import TodoModel from './model/todoModel';
import ListModel from './model/listModel';
import ToDoView from './ui/todoView';
import ListView from './ui/listView';
import Controller from './controller';

const app = new Controller(new ListView(), new ListModel(), new ToDoView(), new TodoModel());

// console.log(app.model.todos[0]);