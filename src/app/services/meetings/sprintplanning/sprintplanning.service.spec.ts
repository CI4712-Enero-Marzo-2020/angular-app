import { TestBed } from '@angular/core/testing';

import { SprintplanningService } from './sprintplanning.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SprintplanningService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SprintplanningService]


  }));

  it('should be created', () => {
    const service: SprintplanningService = TestBed.get(SprintplanningService);
    expect(service).toBeTruthy();
  });
});
