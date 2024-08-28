import { TestBed } from '@angular/core/testing';
import { TodoApiService } from './todo-api.service';


TodoApiService
describe('TodoApiService', () => {
  let service: TodoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
