import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RevisionsService } from './revisions.service';

describe('RevisionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	imports: [HttpClientTestingModule],
    providers: [RevisionsService]
  	}));

  it('should be created', () => {
    const service: RevisionsService = TestBed.get(RevisionsService);
    expect(service).toBeTruthy();
  });
});
