import { TestBed } from '@angular/core/testing';

import { UITestsService } from './uitests.service';

describe('UITestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UITestsService = TestBed.get(UITestsService);
    expect(service).toBeTruthy();
  });
});
