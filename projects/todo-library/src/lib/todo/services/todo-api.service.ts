import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, Todo } from '../types/todo';

@Injectable()
export class TodoApiService {
  private readonly JSON_URL = 'https://jsonplaceholder.typicode.com/';

  mockUserId: number = 1;

  constructor(public http: HttpClient) {}

  getTodos$(list: Filter): Observable<Todo[]> {
    let params = {
      userId: `${this.mockUserId}`,
    };
    let body = new HttpParams({ fromObject: params });
    if (list !== Filter.All) {
      let filterMode: boolean;

      if (list === Filter.Completed) {
        filterMode = true;
      } else {
        filterMode = false;
      }

      body = body.append('completed', filterMode);
    }

    return this.http.get<Todo[]>(`${this.JSON_URL}/todos`, { params: body });
  }

  postTodo$(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.JSON_URL}/todos`, todo);
  }

  deleteTodoFromBack$(id: number) {
    return this.http.delete(`${this.JSON_URL}/todos/${id}`);
  }

  editTodoBack$(todo: Todo) {
    return this.http.patch<Todo>(`${this.JSON_URL}/todos/${todo.id}`, todo);
  }
}
