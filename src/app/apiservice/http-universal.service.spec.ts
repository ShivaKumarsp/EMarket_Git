import { TestBed } from '@angular/core/testing';

import { HttpUniversalService } from './http-universal.service';

describe('HttpUniversalService', () => {
  let service: HttpUniversalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUniversalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
