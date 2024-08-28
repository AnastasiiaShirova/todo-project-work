import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  activeTodoList$?: Observable<Todo[]>;
  completedTodoList$?: Observable<Todo[]>;

  ngOnInit(): void {
    this.todoService.fetchTodos().subscribe();
    this.todoList$ = this.todoService.todoList$;
    this.activeTodoList$ = this.todoService.activeTodoList;
    this.completedTodoList$ = this.todoService.completedTodoList;
  }

  trackByItems(index: number, item: Todo) {
    return item.id;
  }

  makeFilterTodos(mode: Filter): void {
    this.whichFilterActive = mode;
  }

  changeAllTodos() {
    this.todoService.completeOrActiveAllTodos(this.isTodosCompleted).subscribe();
    this.isTodosCompleted = !this.isTodosCompleted;
  }

  deleteCompleted() {
    this.todoService.deleteCompleted().subscribe();
  }
}
