import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable()
export class TodoApiService {

  private readonly JSON_URL = 'https://jsonplaceholder.typicode.com/';
  mockUserId: number = 1;

  constructor(public http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.JSON_URL}/todos?userId=${this.mockUserId}`);
  }

  postTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.JSON_URL}/todos`, todo);
  }

  deleteTodoFromBack(id: number) {
    return this.http.delete(`${this.JSON_URL}/todos/${id}`);
  }

  editTodoBack(todo: Todo) {
    return this.http.patch<Todo>(`${this.JSON_URL}/todos/${todo.id}`, todo);
  }
}
