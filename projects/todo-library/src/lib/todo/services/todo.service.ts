import { Injectable } from '@angular/core';
import { Todo } from '../shared/types/interfaces';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  todoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  activeTodoList: Observable<Todo[]> = this.todoList$.pipe(
    map((todos: Todo[]) => todos.filter((todo: Todo) => !todo.isCompleted))
  );

  activeTodosCounter: Observable<number> = this.activeTodoList.pipe(
    map((todos) => todos.length)
  );

  completedTodoList: Observable<Todo[]> = this.todoList$.pipe(
    map((todos: Todo[]) => todos.filter((todo: Todo) => todo.isCompleted))
  );

  addTodo(title: string): void {
    let currentTodoList = this.todoList$.getValue();
    let newTodo: Todo = {
      id: Date.now(),
      title,
      isCompleted: false,
    };
    currentTodoList.push(newTodo);
    this.todoList$.next(currentTodoList);
  }

  deleteTodo(id: number): void {
    let currentTodoList = this.todoList$.getValue();
    let index = currentTodoList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      currentTodoList.splice(index, 1);
    }
    this.todoList$.next(currentTodoList);
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

      currentTodoList.splice(oldTodoIndex, 1, newTodo);

      this.todoList$.next(currentTodoList);
    }
  }

  completeOrActiveAllTodos(currentTodosMode: boolean) {
    let currentTodoList = this.todoList$.getValue();
    currentTodoList = currentTodoList.map(
      (todo) => (todo = { ...todo, isCompleted: !currentTodosMode })
    );
    this.todoList$.next(currentTodoList);
  }

  deleteCompleted() {
    let currentTodoList = this.todoList$.getValue();
    this.todoList$.next(
      currentTodoList.filter((todo) => todo.isCompleted === false)
    );
  }
}
