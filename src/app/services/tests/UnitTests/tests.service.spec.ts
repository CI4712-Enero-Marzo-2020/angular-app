import { TestBed } from '@angular/core/testing';

import { UnitTestsService } from './tests.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UnitTestsService]
  }));

  it('should be created', () => {
    const service: UnitTestsService = TestBed.get(UnitTestsService);
    expect(service).toBeTruthy();
  });
});
