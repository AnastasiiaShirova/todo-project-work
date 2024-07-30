import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './shared/types/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-project';

  constructor(public todoService: TodoService) {}

  isTodosCompleted: boolean = false;
  isFilterActive: boolean = false;
  whichFilterActive: boolean | null = null;

  todoList: Todo[] = [];
  activeTodoList: Todo[] =[];
  completedTodoList: Todo[] =[];

  getFilter() {
    if (this.whichFilterActive === null) {
      return this.todoList;
    } else if (this.whichFilterActive === true) {
      return this.activeTodoList;
    } else {
      return this.completedTodoList;
    }
  }

  ngOnInit(): void {
    this.todoService.todoList$.subscribe((todos) => this.todoList = todos);
    this.todoService.activeTodoList.subscribe((todos) => this.activeTodoList = todos);
    this.todoService.completedTodoList.subscribe((todos) => this.completedTodoList = todos);
  }

  completeOrActiveTodos() {
    if(!this.isTodosCompleted) {
      this.todoService.completeAllTodos();
    } else {
      this.todoService.activeAllTodos();
    }
  }
}
