import { TestBed } from '@angular/core/testing';

import { PreguntaDetalleService } from './pregunta-detalle.service';

describe('PreguntaDetalleService', () => {
  let service: PreguntaDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntaDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
