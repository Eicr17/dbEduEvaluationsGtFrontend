import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdAlumno, MdAlumnoInsert, MdAlumnoUpdate } from '../../../shared/models/MdlAlumno';
import { AlumnoService } from '../../../shared/services/alumno.service';
import { MdlGrado } from '../../../shared/models/MdlGrado';
import { GradoService } from '../../../shared/services/grado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  FormularioAlumno!: FormGroup;

  lstAlumno: MdAlumno[] = [];
  lstAlumnoInsert: MdAlumnoInsert[] = [];
  lstAlumnoUpdate: MdAlumnoUpdate[] = [];

  modoEditar: boolean = false;
  indiceEditar: number = -1;
  intentenGuardar: boolean = true;

  lstGrado = [
    { idGrado: 1, nombreGrado: 'Primero Básico' },
    { idGrado: 2, nombreGrado: 'Segundo Básico' },
    { idGrado: 3, nombreGrado: 'Tercero Básico' }
  ];



  constructor(private srv_Alumno: AlumnoService,
    private srv_grado: GradoService,
    private fb: FormBuilder
  ) {

  }


  ngOnInit() {

    this.FormularioAlumno = this.fb.group({
      idAlumno: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      idGrado: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      nombreAlumno: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      apellidoAlumno: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(150), Validators.minLength(1)]]

    })

  }

  AgregarAlumno() {

    if (this.FormularioAlumno.invalid) {
           this.MostrarFormularioInvalido('ModalAlumno');
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

    Swal.fire({
      title: "Registro Insertado Exitosamente!",
      icon: "success",
      draggable: true
    });

  }

  NuevoAlumno() {
    this.modoEditar = false;
    this.indiceEditar = -1

    this.FormularioAlumno.reset();
    this.FormularioAlumno.markAsPristine();
    this.FormularioAlumno.markAsUntouched();

    const modal =
      document.getElementById('ModalAlumno') as HTMLDialogElement;

    modal.showModal();
  }


  GuardarEdicionAlumno() {

    if (this.FormularioAlumno.invalid) {
     this.MostrarFormularioInvalido('ModalEditarAlumno');
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

    Swal.fire({
      title: "Registro Actualizado Exitosamente!",
      icon: "success",
      draggable: true
    });

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

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lstAlumnoInsert =
          this.lstAlumnoInsert.filter(
            x => x.idAlumno !== idAlumno
          );
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
      }
    })


  }

  ObtenerNombreGrado(idGrado: number): string {
    const grado = this.lstGrado.find(
      x => x.idGrado == idGrado
    );
    return grado?.nombreGrado ?? '';
  }


  CerrarModal() {
    this.FormularioAlumno.reset();
    this.indiceEditar = -1;
    this.modoEditar = false;

    const modal = document.getElementById('ModalEditarAlumno') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  async MostrarFormularioInvalido(idModal: string) {

    this.intentenGuardar = true;
    this.FormularioAlumno.markAllAsTouched();

    const modal = document.getElementById(idModal) as HTMLDialogElement;

    if (modal?.open) {
      modal.close();
    }

    await Swal.fire({
      title: "Formulario Inválido",
      text: "Error, completa todos los campos correctamente",
      icon: "warning",
      confirmButtonText: "Aceptar"
    });

  }

}
