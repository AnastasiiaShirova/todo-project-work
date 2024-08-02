import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  isTodosCompleted: boolean = false;
  isFilterActive: boolean = false;
  whichFilterActive: boolean | null = null;

  todoList: Todo[] = [];
  activeTodoList: Todo[] = [];
  completedTodoList: Todo[] = [];

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
    this.todoService.todoList$.subscribe((todos) => (this.todoList = todos));
    this.todoService.activeTodoList.subscribe(
      (todos) => (this.activeTodoList = todos)
    );
    this.todoService.completedTodoList.subscribe(
      (todos) => (this.completedTodoList = todos)
    );
  }

}
