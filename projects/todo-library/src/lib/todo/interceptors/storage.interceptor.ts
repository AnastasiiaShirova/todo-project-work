import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class StorageInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      map((response: any) => {
        let storage = this.storageService.getData();
        switch (request.method) {
          case 'POST':
            storage.push(response.body);
            this.storageService.addData(storage);
            return response.clone();

          case 'GET':
            return response.clone({ body: this.storageService.getData() });

          case 'DELETE':
            let matchReg = request.url.match(/[0-9]/g);
            if (matchReg) {
              let deleteId = +matchReg.join('');
              let deletedTodoIndex = storage.findIndex(
                (todo) => todo.id === deleteId
              );
              storage.splice(deletedTodoIndex, 1);
              this.storageService.addData(storage);
            }
            return response.clone();

          case 'PATCH':
            let oldTodoIndex = storage.findIndex(
              (todo) => todo.id === response.body.id
            );
            let newTodo = response.body;
            if (oldTodoIndex !== -1) {
              storage[oldTodoIndex] = newTodo;
              this.storageService.addData(storage);
            }
            return response.clone();
          default:
            return response.clone();
        }
      })
    );
  }
}
