import { Component , inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-creacion-cuestionario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './creacion-cuestionario.component.html',
  styleUrl: './creacion-cuestionario.component.css'
})
export class CreacionCuestionarioComponent {

  private readonly fb = inject(FormBuilder);


  materias = [
    { Id_Materia: 1, Nombre: 'Matemáticas' },
    { Id_Materia: 2, Nombre: 'Ciencias Naturales' }
  ];

  grados = [
    { Id_Grado: 1, Nombre_Grado: 'Primero Básico' },
    { Id_Grado: 2, Nombre_Grado: 'Segundo Básico' }
  ];

  tiposPregunta = [
    { Id_Tipo_Pregunta: 1, Descripcion: 'Opción Múltiple' },
    { Id_Tipo_Pregunta: 2, Descripcion: 'Verdadero / Falso' }
  ];


  CuestionarioForm: FormGroup = this.fb.group({
    Nombre_Cuestionario: ['', Validators.required],
    Descripcion: ['', Validators.required],
    Fecha_Inicio: [null, Validators.required],
    Fecha_Limite: [null, Validators.required],
    TiempoLimiteMinutos: [45,[Validators.required, Validators.min(1)]],
    Id_Materia: [null, Validators.required],
    Id_Grado: [null, Validators.required],
    Preguntas: this.fb.array([])

  })


  constructor(){
  
  }

  get Preguntas(): FormArray {
    return this.CuestionarioForm.get('Preguntas') as FormArray;
  }

  ObtenerDetalles(preguntaGroup: FormGroup): FormArray {
    return preguntaGroup.get('Detalles') as FormArray;
  }

  agregarPregunta(): void{
    const nuevaPregunta = this.fb.group({
      Id_Tipo_Pregunta: [null, Validators.required],
      Descripcion: ['', Validators.required],
      Ponderacion: [1, [Validators.required]],
     Detalles: this.fb.array([
        this.fb.group({ Descripcion: [''], Ponderacion: [0] }),
        this.fb.group({ Descripcion: [''], Ponderacion: [0] })
      ])
    });
    this.Preguntas.push(nuevaPregunta);
  }

  eliminarPregunta(index: number):void{
    if(this.Preguntas.length > 0){
this.Preguntas.removeAt(index);
    }
  }

  agregarDetalle(PreguntaIndex: number):void{
    const preguntaGroup = this.Preguntas.at(PreguntaIndex) as FormGroup;
    this.ObtenerDetalles(preguntaGroup).push(
      this.fb.group({ Descripcion: [''], Ponderacion: [0] })
    );
  }

  eliminarDetalle(PreguntaIndex: number, DetalleIndex: number):void{
    const preguntaGroup = this.Preguntas.at(PreguntaIndex) as FormGroup;
    const detalles = this.ObtenerDetalles(preguntaGroup);
    if(detalles.length > 0){
      detalles.removeAt(DetalleIndex);
    }
  }

  guardarCuestionario(): void {
    console.log('Estructura enviada:', this.CuestionarioForm.value);
  }

}
