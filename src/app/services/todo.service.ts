import { Injectable } from '@angular/core';
import { TodoInterface } from '../shared/todo/interfaces/todo-interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  todoArr: TodoInterface[] = [];
  activeTodosArr: TodoInterface[] = [];
  completedTodosArr: TodoInterface[] = [];

  addTodo(title: string): Observable<TodoInterface> {
    let newTodo: TodoInterface = {
      id: this.todoArr.length,
      title,
      isCompleted: false,
    };
    this.todoArr.push(newTodo);
    return of(newTodo);
  }

  getTodos(): Observable<TodoInterface[]> {
    return of([...this.todoArr]);
  }

  deleteTodo(id: number): Observable<TodoInterface> {
    let index = this.todoArr.findIndex((todo) => todo.id === id);
    let deletedTodo = this.todoArr[index];
    if (index !== -1) {
      this.todoArr.splice(index, 1);
    }
    return of(deletedTodo);
  }

  editTodo(editedTodo: TodoInterface): Observable<TodoInterface> {
    let oldTodo = this.todoArr.find((t) => editedTodo.id === t.id);
    let newTodo: TodoInterface = oldTodo!;

    if (oldTodo) {
      newTodo = {
        ...oldTodo,
        title: editedTodo.title || oldTodo.title,
        isCompleted: editedTodo.isCompleted,
      };
      this.todoArr.splice(newTodo.id, 1, newTodo);
    }
    return of(newTodo);
  }

  getActiveTodos() {
    this.activeTodosArr = this.todoArr.filter(
      (todo) => todo.isCompleted === false
    );
    return of(this.activeTodosArr);
  }

  getCompletedTodos() {
    this.completedTodosArr = this.todoArr.filter(
      (todo) => todo.isCompleted === true
    );
    return of(this.completedTodosArr);
  }

  completeAllTodos() {
    this.todoArr = this.todoArr.map(
      (todo) => (todo = { ...todo, isCompleted: true })
    );
    return of([...this.todoArr]);
  }

  activeAllTodos() {
    this.todoArr = this.todoArr.map(
      (todo) => (todo = { ...todo, isCompleted: false })
    );
    return of([...this.todoArr]);
  }

  deleteCompleted() {
    for (let i = 0; i < this.todoArr.length; i++) {
      if (this.todoArr[i].isCompleted === true) {
        this.todoArr.splice(i, 1);
      }
    }
    return of([...this.todoArr]);
  }
}
