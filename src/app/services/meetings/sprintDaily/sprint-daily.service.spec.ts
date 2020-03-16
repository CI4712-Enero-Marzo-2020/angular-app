import { TestBed } from '@angular/core/testing';

import { SprintDailyService } from './sprint-daily.service';

describe('SprintDailyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintDailyService = TestBed.get(SprintDailyService);
    expect(service).toBeTruthy();
  });
});
