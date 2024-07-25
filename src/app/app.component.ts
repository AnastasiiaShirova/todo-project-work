import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoInterface } from './shared/todo/interfaces/todo-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-project';

  constructor(public todoService: TodoService) {}

  todosArr: TodoInterface[] = [];
  isTodosCompleted: boolean = false;
  isSortActive: boolean = false;

  activeTodosCounter() {
    let res = 0;
    for (let i = 0; i < this.todosArr.length; i++) {
      if (this.todosArr[i].isCompleted === false) {
        res = res + 1;
      }
    }
    return res;
  }

  addTodo(todo: TodoInterface) {
    this.todosArr.push(todo);
  }

  readTodos() {
    this.todoService.getTodos().subscribe((data) => (this.todosArr = data));
  }

  deleteTodo(index: number) {
    this.todosArr.splice(index, 1);
  }

  editTodo(oldTodo: TodoInterface, newTodo: TodoInterface) {
    oldTodo.title = newTodo.title;
    oldTodo.isCompleted = newTodo.isCompleted;
  }

  getActiveTodos() {
    this.todoService
      .getActiveTodos()
      .subscribe((data) => (this.todosArr = data));
  }

  getCompletedTodos() {
    this.todoService
      .getCompletedTodos()
      .subscribe((data) => (this.todosArr = data));
  }

  completeOrActiveTodos() {
    if (this.isTodosCompleted === false) {
      this.completeAllTodos();
    } else {
      this.activeAllTodos();
    }
  }

  completeAllTodos() {
    this.todoService
      .completeAllTodos()
      .subscribe((data) => (this.todosArr = data));
  }

  activeAllTodos() {
    this.todoService
      .activeAllTodos()
      .subscribe((data) => (this.todosArr = data));
  }

  deleteComplited() {
    this.todoService
      .deleteCompleted()
      .subscribe((data) => (this.todosArr = data));
  }
}
