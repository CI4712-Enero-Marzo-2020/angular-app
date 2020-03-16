import { TestBed } from '@angular/core/testing';

import { SprintplanningService } from './sprintplanning.service';

describe('SprintplanningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintplanningService = TestBed.get(SprintplanningService);
    expect(service).toBeTruthy();
  });
});
