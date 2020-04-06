import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IntroService } from './intro.service';

describe('IntroService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	imports: [HttpClientTestingModule],
    providers: [IntroService]
  	}));

  it('should be created', () => {
    const service: IntroService = TestBed.get(IntroService);
    expect(service).toBeTruthy();
  });
});
