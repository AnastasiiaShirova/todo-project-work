import { TestBed } from '@angular/core/testing';

import { TodoApiInterceptor } from './todo-api.interceptor';

describe('TodoApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TodoApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TodoApiInterceptor = TestBed.inject(TodoApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
