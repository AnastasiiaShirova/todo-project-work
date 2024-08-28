import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { BehaviorSubject, forkJoin, map, Observable, tap } from 'rxjs';
import { TodoApiService } from './todo-api.service';

@Injectable()
export class TodoService {
  constructor(private apiService: TodoApiService) {}

  todoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  activeTodoList: Observable<Todo[]> = this.todoList$.pipe(
    map((todos: Todo[]) => todos.filter((todo: Todo) => !todo.completed))
  );

  activeTodosCounter: Observable<number> = this.activeTodoList.pipe(
    map((todos) => todos.length)
  );

  completedTodoList: Observable<Todo[]> = this.todoList$.pipe(
    map((todos: Todo[]) => todos.filter((todo: Todo) => todo.completed))
  );

  fetchTodos(): Observable<Todo[]> {
    return this.apiService
      .getTodos()
      .pipe(tap((todos) => this.todoList$.next(todos)));
  }

  addTodo(title: string): Observable<Todo> {
    let currentTodoList = this.todoList$.getValue();
    let newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    return this.apiService.postTodo(newTodo).pipe(
      tap((todo) => {
        currentTodoList.push(todo);
        this.todoList$.next(currentTodoList);
      })
    );
  }

  deleteTodo(id: number) {
    let currentTodoList = this.todoList$.getValue();
    let index = currentTodoList.findIndex((todo) => todo.id === id);
    let todo = currentTodoList[index];
    return this.apiService.deleteTodoFromBack(todo.id).pipe(
      tap(() => {
        currentTodoList.splice(index, 1);
        this.todoList$.next(currentTodoList);
      })
    );
  }

  editTodo(editedTodo: Todo): Observable<Todo> {
    let currentTodoList = this.todoList$.getValue();
    let oldTodoIndex = currentTodoList.findIndex((t) => editedTodo.id === t.id);

    if (oldTodoIndex !== -1) {
      let oldTodo = currentTodoList[oldTodoIndex];
      let newTodo = {
        ...oldTodo,
        ...editedTodo,
      };

      return this.apiService.editTodoBack(newTodo).pipe(
        tap((todo: Todo) => {
          currentTodoList.splice(oldTodoIndex, 1, todo);
          this.todoList$.next(currentTodoList);
        })
      );
    }
    return this.apiService.editTodoBack(currentTodoList[oldTodoIndex]);
  }

  completeOrActiveAllTodos(currentTodosMode: boolean): Observable<Todo[]> {
    let currentTodoList = this.todoList$.getValue();

    let list: Observable<Todo>[] = currentTodoList
      .filter((todo: Todo) => todo.completed === currentTodosMode)
      .map((todo: Todo) => {
        todo.completed = !currentTodosMode;
        return this.apiService.editTodoBack(todo);
      });

    return forkJoin(list).pipe(
      tap(() => {
        this.todoList$.next(
          currentTodoList.map((todo) => ({
            ...todo,
            completed: !currentTodosMode,
          }))
        );
      })
    );
  }

  deleteCompleted() {
    let currentTodoList = this.todoList$.getValue();
    let list = currentTodoList
      .filter((todo) => todo.completed)
      .map((todo) => this.apiService.deleteTodoFromBack(todo.id));

    return forkJoin(list).pipe(
      tap(() =>
        this.todoList$.next(currentTodoList.filter((todo) => !todo.completed))
      )
    );
  }
}
