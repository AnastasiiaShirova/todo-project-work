import { TestBed } from '@angular/core/testing';

import { StorageInterceptor } from './storage.interceptor';

describe('StorageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StorageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StorageInterceptor = TestBed.inject(StorageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
