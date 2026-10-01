import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdAlumno, MdAlumnoInsert, MdAlumnoUpdate } from '../../../shared/models/MdlAlumno';
import { AlumnoService } from '../../../shared/services/alumno.service';
import { MdlGrado } from '../../../shared/models/MdlGrado';
import { GradoService } from '../../../shared/services/grado.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  FormularioAlumno!: FormGroup;

  lstAlumno: MdAlumno [] = [];
  lstAlumnoInsert: MdAlumnoInsert [] = [];
  lstAlumnoUpdate: MdAlumnoUpdate [] = [];

  modoEditar: boolean = false;
  indiceEditar: number = -1;

  lstGrado = [
    { idGrado: 1, nombreGrado: 'Primero Básico' },
    { idGrado: 2, nombreGrado: 'Segundo Básico' },
    { idGrado: 3, nombreGrado: 'Tercero Básico' }
  ];



  constructor( private srv_Alumno: AlumnoService,
      private srv_grado:GradoService,
    private fb:FormBuilder
  ){

  }


  ngOnInit(){

    this.FormularioAlumno = this.fb.group({
      idAlumno: ['',[Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      idGrado: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      nombreAlumno:['',[Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      apellidoAlumno:['',[Validators.required, Validators.maxLength(150),Validators.minLength(1)]],
      correo: ['',[Validators.required,  Validators.email, Validators.maxLength(150), Validators.minLength(1)]]

    })

  }

AgregarAlumno() {

  if (this.FormularioAlumno.invalid) {
    this.FormularioAlumno.markAllAsTouched();
    return;
  }

  const alumno: MdAlumnoInsert = {

    idAlumno:
      this.FormularioAlumno.value.idAlumno,

    idGrado:
      this.FormularioAlumno.value.idGrado,

    nombreAlumno:
      this.FormularioAlumno.value.nombreAlumno,

    apellidoAlumno:
      this.FormularioAlumno.value.apellidoAlumno,

    correo:
      this.FormularioAlumno.value.correo
  };

  this.lstAlumnoInsert.push(alumno);
  this.FormularioAlumno.reset();

  const modal =
    document.getElementById('ModalAlumno') as HTMLDialogElement;

  modal.close();
}

  NuevoAlumno() {
  this.modoEditar = false;
  this.indiceEditar = -1

  this.FormularioAlumno.reset();

  const modal =
    document.getElementById('ModalAlumno') as HTMLDialogElement;

  modal.showModal();
}


GuardarEdicionAlumno() {

  if (this.FormularioAlumno.invalid) {
    this.FormularioAlumno.markAllAsTouched();
    return;
  }

  if (this.indiceEditar === -1) {
    return;
  }

  const alumno: MdAlumnoInsert = {

    idAlumno:
      this.FormularioAlumno.value.idAlumno,
    idGrado:
      Number(this.FormularioAlumno.value.idGrado),
    nombreAlumno:
      this.FormularioAlumno.value.nombreAlumno,

      apellidoAlumno:
      this.FormularioAlumno.value.apellidoAlumno,

    correo:
      this.FormularioAlumno.value.correo,
  };

  this.lstAlumnoInsert[this.indiceEditar] =
    alumno;

  this.indiceEditar = -1;
  this.FormularioAlumno.reset();

  const modal =
    document.getElementById(
      'ModalEditarAlumno'
    ) as HTMLDialogElement;

  modal.close();
}


EditarAlumno(
  item: MdAlumnoInsert,
  indice: number
) {

  this.indiceEditar = indice;

  this.FormularioAlumno.patchValue({
    idAlumno: item.idAlumno,
    idGrado: item.idGrado,
    nombreAlumno: item.nombreAlumno,
    apellidoAlumno: item.apellidoAlumno,
    correo: item.correo,
  });

  const modal =
    document.getElementById(
      'ModalEditarAlumno'
    ) as HTMLDialogElement;

  modal.showModal();
}


 EliminarAlumno(idAlumno: string) {
    this.lstAlumnoInsert =
      this.lstAlumnoInsert.filter(
        x => x.idAlumno !== idAlumno
      );
  }

  ObtenerNombreGrado(idGrado: number): string {
    const grado = this.lstGrado.find(
      x => x.idGrado == idGrado
    );
    return grado?.nombreGrado ?? '';
  }


  

}
