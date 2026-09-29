import { TestBed } from '@angular/core/testing';

import { CuestionarioRespuestaService } from './cuestionario-respuesta.service';

describe('CuestionarioRespuestaService', () => {
  let service: CuestionarioRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuestionarioRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
