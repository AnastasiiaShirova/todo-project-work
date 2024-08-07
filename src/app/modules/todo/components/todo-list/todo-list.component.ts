import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  isTodosCompleted: boolean = false;
  whichFilterActive: boolean | null = null;

  todoList$?: Observable<Todo[]>;
  activeTodoList$?: Observable<Todo[]>;
  completedTodoList$?: Observable<Todo[]>;

  ngOnInit(): void {
    this.todoList$ = this.todoService.todoList$;
    this.activeTodoList$ = this.todoService.activeTodoList;
    this.completedTodoList$ = this.todoService.completedTodoList;
  }

  trackByItems(index: number, item: Todo) {
    return item.id;
  }

  makeFilterTodos(filterMode: null | boolean): void {
    this.whichFilterActive = filterMode;
  }

  changeAllTodos() {
    this.todoService.completeOrActiveAllTodos(this.isTodosCompleted);
    this.isTodosCompleted = !this.isTodosCompleted;
  }
}
