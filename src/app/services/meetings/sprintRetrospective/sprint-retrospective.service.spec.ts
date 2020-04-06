import { TestBed } from '@angular/core/testing';

import { SprintRetrospectiveService } from './sprint-retrospective.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SprintRetrospectiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SprintRetrospectiveService]
  }));

  it('should be created', () => {
    const service: SprintRetrospectiveService = TestBed.get(SprintRetrospectiveService);
    expect(service).toBeTruthy();
  });
});
