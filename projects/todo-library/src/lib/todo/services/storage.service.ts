import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';

@Injectable()
export class StorageService {

  constructor() { }

  readonly key = 'todos';

  getData(): Todo[] {
    let data = localStorage.getItem(this.key);
    if(data) {
      return JSON.parse(data) as Todo[];
    }
    return [];
  }

  addData(todos: Todo[]) {
    localStorage.setItem(this.key, JSON.stringify(todos));
  }
}
