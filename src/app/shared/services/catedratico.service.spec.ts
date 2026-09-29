import { TestBed } from '@angular/core/testing';

import { CatedraticoService } from './catedratico.service';

describe('CatedraticoService', () => {
  let service: CatedraticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatedraticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
