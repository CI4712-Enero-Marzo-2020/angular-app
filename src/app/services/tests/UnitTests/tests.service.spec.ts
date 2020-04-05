import { TestBed } from '@angular/core/testing';

import { UnitTestsService } from './tests.service';

describe('TestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitTestsService = TestBed.get(UnitTestsService);
    expect(service).toBeTruthy();
  });
});
