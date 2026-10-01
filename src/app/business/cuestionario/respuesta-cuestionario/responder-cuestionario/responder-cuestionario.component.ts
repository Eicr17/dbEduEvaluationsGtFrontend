import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdlCuestionario } from '../../../../shared/models/MdlCuestionario';
import { MdlPregunta } from '../../../../shared/models/MdlPregunta';
import { MdlPreguntaDetalle } from '../../../../shared/models/MdlPreguntaDetalle';

@Component({
  selector: 'app-responder-cuestionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './responder-cuestionario.component.html',
  styleUrl: './responder-cuestionario.component.css'
})
export class ResponderCuestionarioComponent {

    MdlPregunta: MdlPregunta[] = []

    MdlPreguntaDetalle: MdlPreguntaDetalle[] = []

  FormRespuesta!: FormGroup;
  indicePregunta: number = 0;

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
      ponderacion: 25
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
    }
    ]


    constructor(private fb: FormBuilder){

    }


    ngOnInit(){
      this.FormRespuesta = this.fb.group({
        respuestaMultiple: [[]],
        respuestaUnica: [null],
      })
    }

    //Obtener la pregunta acutal
    get preguntaActual(): MdlPregunta{
      return this.pregunta[this.indicePregunta];
    }


    ///Obtener los opciones de la pregunta
    get detallesPreguntaActual(): MdlPreguntaDetalle[] {
      return this.detalles.filter(detalle => detalle.idPregunta === this.preguntaActual.idPregunta);
    }

    ///checkbox

    seleccionarMultiple(
        idPreguntaDetalle: number,
        event: Event
    ): void{

      const checkbox = event.target as HTMLInputElement;

      let seleccionadas : number [] = 
      this.FormRespuesta.get('respuestaMultiple')?.value || [];

      if(checkbox.checked){
        seleccionadas = [
    ...seleccionadas, idPreguntaDetalle];
        }else{
          seleccionadas = seleccionadas.filter(id => id !== idPreguntaDetalle);
        }

        this.FormRespuesta.patchValue({ respuestaMultiple: seleccionadas })
      }


      siguientePregunta(): void{
          if(this.indicePregunta < this.pregunta.length - 1){
             this.indicePregunta ++;

             //Limpiamos las respuestas para la nueva pregunta
             this.FormRespuesta.reset({
                respuestaMultiple: [],
                respuestaUnica: null
             })
          }
      }

      enviarCuestionario() : void{
        console.log('Cuestionario enviado');
        console.log(this.FormRespuesta.value);
      }


    }

    


