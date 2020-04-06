import { TestBed } from '@angular/core/testing';

import { UITestsService } from './uitests.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UITestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UITestsService]
  }));

  it('should be created', () => {
    const service: UITestsService = TestBed.get(UITestsService);
    expect(service).toBeTruthy();
  });
});
