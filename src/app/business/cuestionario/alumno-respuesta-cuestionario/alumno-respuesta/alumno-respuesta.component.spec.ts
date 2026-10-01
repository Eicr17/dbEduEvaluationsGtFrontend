import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoRespuestaComponent } from './alumno-respuesta.component';

describe('AlumnoRespuestaComponent', () => {
  let component: AlumnoRespuestaComponent;
  let fixture: ComponentFixture<AlumnoRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
