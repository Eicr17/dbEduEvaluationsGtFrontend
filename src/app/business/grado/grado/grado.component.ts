import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GradoService } from '../../../shared/services/grado.service';
import { max } from 'rxjs';
import { CatedraticoService } from '../../../shared/services/catedratico.service';
import { MdlGrado, MdlGradoInsert, MdlGradoUpdate } from '../../../shared/models/MdlGrado';
import { MdlCatedraticoInsert } from '../../../shared/models/MdlCatedratico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './grado.component.html',
  styleUrl: './grado.component.css'
})
export class GradoComponent {


  lstGrado: MdlGrado[] = [];
  lstGradoInsert: MdlGradoInsert[] = [];
  lstGradoUpdate: MdlGradoUpdate[] = [];

  modoEditar: boolean = false;
  indiceEditar: number = -1;
  intentenGuardar: boolean = true;


  FormGrado!: FormGroup;


  lstCatedratico = [
    { idCatedratico: 1, nombreCatedratico: 'Juan Pérez' },
    { idCatedratico: 2, nombreCatedratico: 'María García' },
    { idCatedratico: 3, nombreCatedratico: 'Carlos López' }
  ];


  constructor(private fb: FormBuilder,
    srv_Grado: GradoService,
  ) {

  }

  ngOnInit() {
    this.FormGrado = this.fb.group({
      idGrado: ['', [Validators.required, Validators.maxLength(1)]],
      nombreGrado: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(4)]],
      seccion: ['', [Validators.required, Validators.maxLength(1)]],
      anioLectivo: ['', [Validators.required, Validators.max(2100), Validators.min(2000)]],
      idCatedratico: ['', [Validators.required]]
    })
  }

  AgregarGrado() {

    if (this.FormGrado.invalid) {
           this.MostrarFormularioInvalido('ModalGrado');
      return;
    }

    const grado: MdlGradoInsert = {

      idGrado:
        Number(this.FormGrado.value.idGrado),

      nombreGrado:
        this.FormGrado.value.nombreGrado,

      seccion:
        this.FormGrado.value.seccion,

      anioLectivo:
        this.FormGrado.value.anioLectivo,

      idCatedratico:
        this.FormGrado.value.idCatedratico
    };

    this.lstGradoInsert.push(grado);
    this.FormGrado.reset();

    const modal =
      document.getElementById('ModalGrado') as HTMLDialogElement;

    modal.close();

    Swal.fire({
      title: "Registro Insertado Exitosamente!",
      icon: "success",
      draggable: true
    });

  }

  NuevoGrado() {
    this.modoEditar = false;
    this.indiceEditar = -1

    this.FormGrado.reset();

    const modal =
      document.getElementById('ModalGrado') as HTMLDialogElement;

    modal.showModal();
  }

  GuardarEdicionGrado() {

    if (this.FormGrado.invalid) {
           this.MostrarFormularioInvalido('ModalEditarGrado');
      return;
    }

    if (this.indiceEditar === -1) {
      return;
    }

    const grado: MdlGradoInsert = {

      idGrado:
        Number(this.FormGrado.value.idGrado),
      nombreGrado:
        this.FormGrado.value.nombreGrado,
      seccion:
        this.FormGrado.value.seccion,
      anioLectivo:
        this.FormGrado.value.anioLectivo,
      idCatedratico:
        this.FormGrado.value.idCatedratico
    };

    this.lstGradoInsert[this.indiceEditar] =
      grado;

    this.indiceEditar = -1;
    Swal.fire({
      title: "Registro Actualizado Exitosamente!",
      icon: "success",
      draggable: true
    });

    this.FormGrado.reset();

    const modal =
      document.getElementById(
        'ModalEditarGrado'
      ) as HTMLDialogElement;

    modal.close();
  }

  EditarGrado(
    item: MdlGradoInsert,
    indice: number
  ) {

    this.indiceEditar = indice;

    this.FormGrado.patchValue({
      idGrado: item.idGrado,
      nombreGrado: item.nombreGrado,
      seccion: item.seccion,
      anioLectivo: item.anioLectivo,
      idCatedratico: item.idCatedratico
    });

    const modal =
      document.getElementById(
        'ModalEditarGrado'
      ) as HTMLDialogElement;

    modal.showModal();
  }


  EliminarGrado(idGrado: number) {
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
        this.lstGradoInsert =
          this.lstGradoInsert.filter(
            x => x.idGrado !== idGrado
          );
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido borrado.',
          'success'
        )
      }
    })

  }

  CerrarModal() {
    this.FormGrado.reset();
    this.indiceEditar = -1;
    this.modoEditar = false;

    const modal = document.getElementById('ModalEditarGrado') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  async MostrarFormularioInvalido(idModal: string) {

    this.intentenGuardar = true;
    this.FormGrado.markAllAsTouched();

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
