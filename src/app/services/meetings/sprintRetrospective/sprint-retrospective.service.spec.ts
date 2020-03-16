import { TestBed } from '@angular/core/testing';

import { SprintRetrospectiveService } from './sprint-retrospective.service';

describe('SprintRetrospectiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintRetrospectiveService = TestBed.get(SprintRetrospectiveService);
    expect(service).toBeTruthy();
  });
});
