import { TestBed, async, inject } from '@angular/core/testing';

import { TodoGuard } from './todo.guard';

describe('TodoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoGuard]
    });
  });

  it('should ...', inject([TodoGuard], (guard: TodoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
