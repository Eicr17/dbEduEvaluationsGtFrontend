import { TestBed } from '@angular/core/testing';

import { TipoPreguntaService } from './tipo-pregunta.service';

describe('TipoPreguntaService', () => {
  let service: TipoPreguntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPreguntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
