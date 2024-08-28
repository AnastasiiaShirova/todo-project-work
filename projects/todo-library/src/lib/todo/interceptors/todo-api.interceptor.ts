import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable()
export class TodoApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.method !== 'POST') {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      filter((event) =>(event instanceof HttpResponse)),
      map((response: any) => response.clone({ body: { ...response.body, id: Date.now() }}))
    );

  }
}
