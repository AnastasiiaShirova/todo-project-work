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

  isTodosCompleted: boolean = false;
  whichFilterActive: Filter = Filter.All;
  readonly filter = Filter;

  todoList$?: Observable<Todo[]>;
  activeTodosCounter$?: Observable<number>;
  checkedCompleted$?: Observable<Todo[]>;

  ngOnInit(): void {
    this.todoService.fetchTodos$(this.whichFilterActive).subscribe();
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
    this.whichFilterActive = mode;
    this.todoService.fetchTodos$(this.whichFilterActive).subscribe();
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
