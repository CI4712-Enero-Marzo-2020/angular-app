import { TestBed } from '@angular/core/testing';

import { SprintDailyService } from './sprint-daily.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SprintDailyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SprintDailyService]


  }));

  it('should be created', () => {
    const service: SprintDailyService = TestBed.get(SprintDailyService);
    expect(service).toBeTruthy();
  });
});
