import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Filter, Todo } from '../../types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  readonly filter = Filter;
  isTodosCompleted: boolean = false;
  todoList$?: Observable<Todo[]>;
  activeTodosCounter$?: Observable<number>;
  checkedCompleted$?: Observable<Todo[]>;

  ngOnInit(): void {
    this.todoList$ = this.todoService.todoList$;
    this.activeTodosCounter$ = this.todoList$?.pipe(
      map((todos) => todos.filter((todo) => todo.completed === false).length)
    );
    this.checkedCompleted$ = this.todoList$?.pipe(
      map((todos) => todos.filter((todo) => todo.completed))
    );
  }

  trackByItems(_: number, item: Todo) {
    return item.id;
  }

  makeFilterTodos(mode: Filter): void {
    this.todoService.isNeedFetch$.next(mode);
  }

  changeAllTodos() {
    this.todoService
      .completeOrActiveAllTodos$(this.isTodosCompleted)
      .subscribe();
    this.isTodosCompleted = !this.isTodosCompleted;
  }

  deleteCompleted() {
    this.todoService.deleteCompleted$().subscribe();
  }
}
