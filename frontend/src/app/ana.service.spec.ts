import { TestBed } from '@angular/core/testing';

import { AnaService } from './ana.service';

describe('AnaService', () => {
  let service: AnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
