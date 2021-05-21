import './ui/styles/main.scss';
import View from './ui/view';
import Model from './ui/model';
import Controller from './ui/controller';

const app = new Controller(new Model(), new View());
