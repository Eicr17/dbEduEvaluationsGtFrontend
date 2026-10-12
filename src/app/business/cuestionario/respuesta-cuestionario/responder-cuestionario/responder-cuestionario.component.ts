import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlCuestionario } from '../../../../shared/models/MdlCuestionario';
import { MdlPregunta } from '../../../../shared/models/MdlPregunta';
import { MdlPreguntaDetalle } from '../../../../shared/models/MdlPreguntaDetalle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-responder-cuestionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './responder-cuestionario.component.html',
  styleUrl: './responder-cuestionario.component.css'
})
export class ResponderCuestionarioComponent {

  MdlPregunta: MdlPregunta[] = []

  MdlPreguntaDetalle: MdlPreguntaDetalle[] = []

  FormRespuesta!: FormGroup;
  indicePregunta: number = 0;

  cuestionarioFinalizado: boolean = false;
  notaFinal: number = 0;

  respuestasAlumno: { [key: number]: number[] | number | null } = {};

  //Simulacion de la pregunta
  pregunta: MdlPregunta[] = [
    {
      idPregunta: 1,
      idTipoPregunta: 1,
      idCuestionario: 100,
      descripcion: '¿Cuáles de los siguientes números son pares?',
      ponderacion: 50
    },

    {
      idPregunta: 2,
      idTipoPregunta: 2,
      idCuestionario: 100,
      descripcion: '¿Cuánto es 2 + 2?',
      ponderacion: 50
    },

    {
      idPregunta: 3,
      idTipoPregunta: 2,
      idCuestionario: 100,
      descripcion: '¿Cuánto es 10 * 10?',
      ponderacion: 100
    },


    {
      idPregunta: 4,
      idTipoPregunta: 2,
      idCuestionario: 100,
      descripcion: '¿Cuánto es 10 / 2?',
      ponderacion: 100
    },

    {
      idPregunta: 5,
      idTipoPregunta: 1,
      idCuestionario: 100,
      descripcion: '¿Cuáles de los siguientes números son múltiplos de 25?',
      ponderacion: 100
    }


  ];


  //Simulacion de la pregunta detalle
  detalles: MdlPreguntaDetalle[] = [
    //Pregunta 1
    {
      idPreguntaDetalle: 1,
      idPregunta: 1,
      descripcion: '2',
      ponderacion: 25
    },
    {
      idPreguntaDetalle: 2,
      idPregunta: 1,
      descripcion: '4',
      ponderacion: 25
    },
    {
      idPreguntaDetalle: 3,
      idPregunta: 1,
      descripcion: '5',
      ponderacion: 0
    },
    {
      idPreguntaDetalle: 4,
      idPregunta: 1,
      descripcion: '8',
      ponderacion: 0
    },

    // Pregunta 2
    {
      idPreguntaDetalle: 5,
      idPregunta: 2,
      descripcion: '2',
      ponderacion: 0
    },
    {
      idPreguntaDetalle: 6,
      idPregunta: 2,
      descripcion: '3',
      ponderacion: 0
    },
    {
      idPreguntaDetalle: 7,
      idPregunta: 2,
      descripcion: '4',
      ponderacion: 50
    },
    {
      idPreguntaDetalle: 8,
      idPregunta: 2,
      descripcion: '5',
      ponderacion: 0
    },

    //Pregunta 3
    {
      idPreguntaDetalle: 9,
      idPregunta: 3,
      descripcion: '100',
      ponderacion: 100
    },

    {
      idPreguntaDetalle: 10,
      idPregunta: 3,
      descripcion: '80',
      ponderacion: 0
    },

    {
      idPreguntaDetalle: 11,
      idPregunta: 3,
      descripcion: '50',
      ponderacion: 0
    },

    {
      idPreguntaDetalle: 12,
      idPregunta: 3,
      descripcion: '25',
      ponderacion: 0
    },

    {
      idPreguntaDetalle: 13,
      idPregunta: 3,
      descripcion: '900',
      ponderacion: 0
    },


    //Pregunta 4
    {

      idPreguntaDetalle: 14,
      idPregunta: 4,
      descripcion: '5',
      ponderacion: 100

    },

    {

      idPreguntaDetalle: 15,
      idPregunta: 4,
      descripcion: '6',
      ponderacion: 0

    },

    {
      idPreguntaDetalle: 16,
      idPregunta: 4,
      descripcion: '2',
      ponderacion: 0
    },

    {
      idPreguntaDetalle: 17,
      idPregunta: 4,
      descripcion: '1',
      ponderacion: 0
    },

    {
      idPreguntaDetalle: 18,
      idPregunta: 4,
      descripcion: '1',
      ponderacion: 0
    },

    //Pregunta 5
    {
      idPreguntaDetalle: 19,
      idPregunta: 5,
      descripcion: '3',
      ponderacion: 50
    },


    {
      idPreguntaDetalle: 20,
      idPregunta: 5,
      descripcion: '4',
      ponderacion: 0
    },


    {
      idPreguntaDetalle: 21,
      idPregunta: 5,
      descripcion: '5',
      ponderacion: 50
    },

    {
      idPreguntaDetalle: 22,
      idPregunta: 5,
      descripcion: '7',
      ponderacion: 0
    },

    {
      idPreguntaDetalle: 23,
      idPregunta: 5,
      descripcion: '0',
      ponderacion: 0
    },

  ]



  constructor(private fb: FormBuilder) {

  }


  ngOnInit() {
    this.FormRespuesta = this.fb.group({
      respuestaMultiple: [[]],
      respuestaUnica: [null],
    })
  }

  //Obtener la pregunta acutal
  get preguntaActual(): MdlPregunta {
    return this.pregunta[this.indicePregunta];
  }


  ///Obtener los opciones de la pregunta
  get detallesPreguntaActual(): MdlPreguntaDetalle[] {
    return this.detalles.filter(detalle => detalle.idPregunta === this.preguntaActual.idPregunta);
  }


  estaSeleccionado(idDetalle: number): boolean {
    const seleccionadas = this.FormRespuesta.get('respuestaMultiple')?.value || [];
    return seleccionadas.map(Number).includes(Number(idDetalle));
  }

  ///checkbox

  seleccionarMultiple(
    idPreguntaDetalle: number,
    event: Event
  ): void {

    const checkbox = event.target as HTMLInputElement;

    let seleccionadas: number[] =
      this.FormRespuesta.get('respuestaMultiple')?.value || [];

    if (checkbox.checked) {
      seleccionadas = [
        ...seleccionadas, idPreguntaDetalle];
    } else {
      seleccionadas = seleccionadas.filter(id => id !== idPreguntaDetalle);
    }

    this.FormRespuesta.patchValue({ respuestaMultiple: seleccionadas })
  }


  siguientePregunta(): void {
        this.guardarRespuestaActual();
    if (this.indicePregunta < this.pregunta.length - 1) {
      this.indicePregunta++;

      this.FormRespuesta.reset({
          respuestaMultiple: [[]],
          respuestaUnica: [null],
      })

      this.cargarRespuestaActual();

    }
  }

  guardarRespuestaActual(): void {
    const id = this.preguntaActual.idPregunta;
   if (this.preguntaActual.idTipoPregunta === 1) {
      const mult = this.FormRespuesta.get('respuestaMultiple')?.value || [];
      // Guardamos un array limpio y único de números
      this.respuestasAlumno[id] = Array.from(new Set(mult.map(Number)));
    } else {
      const unica = this.FormRespuesta.get('respuestaUnica')?.value;
      this.respuestasAlumno[id] = (unica !== null && unica !== undefined && unica !== '') ? Number(unica) : null;
    }
  }

  cargarRespuestaActual() {
    const id = this.preguntaActual.idPregunta;
    const respuestaGuardada = this.respuestasAlumno[id];

    if (this.preguntaActual.idTipoPregunta == 1) {
      const valoresArray = Array.isArray(respuestaGuardada) ? [...respuestaGuardada] : [];
      this.FormRespuesta.patchValue({ respuestaMultiple: valoresArray });
    } else {
      this.FormRespuesta.patchValue({ respuestaUnica: respuestaGuardada !== undefined ? respuestaGuardada : null });
    }
  }



  enviarCuestionario(): void {
    this.guardarRespuestaActual();

    let puntajeObtenido = 0;
    let puntajeMaximo = 0;

    this.pregunta.forEach(preg => {
      puntajeMaximo += preg.ponderacion;
    });

  Object.keys(this.respuestasAlumno).forEach(idPreguntaStr => {
      const idPregunta = Number(idPreguntaStr);
      const resp = this.respuestasAlumno[idPregunta];

      if (resp !== undefined && resp !== null) {
        if (Array.isArray(resp)) {
          // Selección múltiple
          resp.forEach(idDetalle => {
            const detalleEncontrado = this.detalles.find(d => d.idPreguntaDetalle === Number(idDetalle));
            if (detalleEncontrado) {
              puntajeObtenido += detalleEncontrado.ponderacion;
            }
          });
        } else {
          // Selección única
          const detalleEncontrado = this.detalles.find(d => d.idPreguntaDetalle === Number(resp));
          if (detalleEncontrado) {
            puntajeObtenido += detalleEncontrado.ponderacion;
          }
        }
      }
    });

    if (puntajeMaximo > 0) {
      this.notaFinal = Math.round((puntajeObtenido / puntajeMaximo) * 100);
    } else {
      this.notaFinal = 0;
    }
    this.cuestionarioFinalizado = true;
  }


}




