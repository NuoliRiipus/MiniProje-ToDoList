import { TestBed } from '@angular/core/testing';

import { WebistekService } from './webistek.service';

describe('WebistekService', () => {
  let service: WebistekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebistekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
