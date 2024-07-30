import { Injectable } from '@angular/core';
import { Todo } from '../shared/types/interfaces';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  todoList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  todoList$ = this.todoList.asObservable();

  activeTodoList: Observable<Todo[]> = this.todoList$.pipe(
    map((todos: Todo[]) => todos.filter((todo: Todo) => !todo.isCompleted)
  ));

  activeTodosCounter: Observable<number> = this.activeTodoList.pipe(
    map((todos) => todos.length)
  );

  completedTodoList: Observable<Todo[]> = this.todoList$.pipe(
    map((todos: Todo[]) => todos.filter((todo: Todo) => todo.isCompleted)
  ));

  addTodo(title: string): void {
    let currentTodoList = this.todoList.getValue();
    let newTodo: Todo;
    if(currentTodoList.length > 0) {
      newTodo = {
        id: currentTodoList[currentTodoList.length - 1].id + 1,
        title,
        isCompleted: false,
      };
    } else {
      newTodo = {
        id: 1,
        title,
        isCompleted: false,
      };
    }
    currentTodoList.push(newTodo);
    this.todoList.next(currentTodoList);
  }

  deleteTodo(id: number): void {
    let currentTodoList = this.todoList.getValue();
    let index = currentTodoList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      currentTodoList.splice(index, 1);
    }
    this.todoList.next(currentTodoList);
  }

  editTodo(editedTodo: Todo): void {
    let currentTodoList = this.todoList.getValue();
    let oldTodoIndex = currentTodoList.findIndex((t) => editedTodo.id === t.id);
    let oldTodo = currentTodoList[oldTodoIndex];
    let newTodo: Todo = oldTodo!;

    if (oldTodo) {
      newTodo = {
        ...oldTodo,
        title: editedTodo.title || oldTodo.title,
        isCompleted: editedTodo.isCompleted,
      };

      currentTodoList.splice(oldTodoIndex, 1, newTodo);
    }
    this.todoList.next(currentTodoList);
  }

  completeAllTodos() {
    let currentTodoList = this.todoList.getValue();
    currentTodoList = currentTodoList.map(
      (todo) => todo = { ...todo, isCompleted: true }
    );
    this.todoList.next(currentTodoList);
  }

  activeAllTodos() {
    let currentTodoList = this.todoList.getValue();
    currentTodoList = currentTodoList.map(
      (todo) => todo = { ...todo, isCompleted: false }
    );
    this.todoList.next(currentTodoList);
  }

  deleteCompleted() {
    let currentTodoList = this.todoList.getValue();
    this.todoList.next(currentTodoList.filter((todo) => todo.isCompleted === false));
  }
}
