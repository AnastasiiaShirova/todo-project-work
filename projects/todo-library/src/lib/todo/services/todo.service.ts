import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
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

  fetchTodos(): void {
    this.apiService.getTodos().subscribe((todos) => this.todoList$.next(todos));
  }

  addTodo(title: string): void {
    let currentTodoList = this.todoList$.getValue();
    let newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.apiService.postTodo(newTodo).subscribe((data) => {
      currentTodoList.push(data);
      this.todoList$.next(currentTodoList);
    });
  }

  deleteTodo(id: number): void {
    let currentTodoList = this.todoList$.getValue();
    let index = currentTodoList.findIndex((todo) => todo.id === id);
    let todo = currentTodoList[index];
    if (index !== -1) {
      this.apiService.deleteTodoFromBack(todo.id).subscribe(() => {
        currentTodoList.splice(index, 1);
        this.todoList$.next(currentTodoList);
      });
    }
  }

  editTodo(editedTodo: Todo): void {
    let currentTodoList = this.todoList$.getValue();
    let oldTodoIndex = currentTodoList.findIndex((t) => editedTodo.id === t.id);

    if (oldTodoIndex !== -1) {
      let oldTodo = currentTodoList[oldTodoIndex];
      let newTodo = {
        ...oldTodo,
        ...editedTodo,
      };

      this.apiService.editTodoBack(newTodo).subscribe((todo: Todo) => {
        currentTodoList.splice(oldTodoIndex, 1, todo);
        this.todoList$.next(currentTodoList);
      });
    }
  }

  completeOrActiveAllTodos(currentTodosMode: boolean) {
    let currentTodoList = this.todoList$.getValue();

    let list: Observable<Todo>[] = currentTodoList
      .filter((todo: Todo) => todo.completed === currentTodosMode)
      .map((todo: Todo) => {
        todo.completed = !currentTodosMode;
        return this.apiService.editTodoBack(todo);
      });

    forkJoin(list).subscribe(() =>
      this.todoList$.next(currentTodoList.map(((todo) => ({...todo, completed: !currentTodosMode})))));
  }

  deleteCompleted() {
    let currentTodoList = this.todoList$.getValue();
    let list = currentTodoList
      .filter((todo) => todo.completed)
      .map((todo) => this.apiService.deleteTodoFromBack(todo.id));

    forkJoin(list).subscribe(() => this.todoList$.next(currentTodoList.filter((todo) => !todo.completed)));
  }
}
