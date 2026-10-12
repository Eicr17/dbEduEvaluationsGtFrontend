import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatedraticoService } from '../../../shared/services/catedratico.service';
import { MdlCatedratico, MdlCatedraticoInsert, MdlCatedraticoUpdate } from '../../../shared/models/MdlCatedratico';
import { GradoService } from '../../../shared/services/grado.service';
import { MdlGrado } from '../../../shared/models/MdlGrado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catedratico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './catedratico.component.html',
  styleUrl: './catedratico.component.css'
})
export class CatedraticoComponent {

  FormularioCatedratico!: FormGroup
  lstCatedratico: MdlCatedratico[] = [];
  lstCatedraticoInsert: MdlCatedraticoInsert[] = [];
  lstCatedraticoUpdate: MdlCatedraticoUpdate[] = [];


  modoEditar: boolean = false;
  indiceEditar: number = -1;
  intentenGuardar: boolean = true;

  lstGrado = [
    { idGrado: 1, nombreGrado: 'Primero Básico' },
    { idGrado: 2, nombreGrado: 'Segundo Básico' },
    { idGrado: 3, nombreGrado: 'Tercero Básico' }
  ];

  constructor(private srv_Catedratico: CatedraticoService,
    srv_grado: GradoService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.FormularioCatedratico = this.fb.group({
      idCatedratico: [''],
      idGrado: ['', [Validators.required]],
      nombreCatedratico: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(150), Validators.minLength(1)]],
      telefono: ['', [Validators.required, Validators.pattern('^[+0-9 ]{8,15}\$')]]
    })
  }


  AgregarCatedratico() {

    if (this.FormularioCatedratico.invalid) {

      this.MostrarFormularioInvalido('ModalCat');

      return;
    }

    

    const catedratico: MdlCatedraticoInsert = {

      idCatedratico: Number(this.FormularioCatedratico.value.idCatedratico),
      idGrado:
        Number(this.FormularioCatedratico.value.idGrado),

      nombreCatedratico:
        this.FormularioCatedratico.value.nombreCatedratico,

      correo:
        this.FormularioCatedratico.value.correo,

      telefono:
        this.FormularioCatedratico.value.telefono
    };

    this.lstCatedraticoInsert.push(catedratico);

    const modal =
      document.getElementById('ModalCat') as HTMLDialogElement;

    if (modal) modal.close();
    this.FormularioCatedratico.reset();

    Swal.fire({
      title: "Registro Insertado Exitosamente!",
      icon: "success",
      draggable: true
    });

  }

  NuevoCatedratico() {

    this.modoEditar = false;
    this.indiceEditar = -1
    this.intentenGuardar = false;

    this.FormularioCatedratico.reset();

    this.FormularioCatedratico.markAsPristine();
    this.FormularioCatedratico.markAsUntouched();

    const modal =
      document.getElementById('ModalCat') as HTMLDialogElement;

    if (modal) {
      modal.showModal();
    }
  }

  GuardarEdicionCatedratico() {
    if (this.FormularioCatedratico.invalid) {

      this.MostrarFormularioInvalido('ModalEditarCatedratico');

      return;
    }


    if (this.indiceEditar === -1) {
      return;
    }


    const catedratico: MdlCatedraticoInsert = {

      idCatedratico:
        Number(this.FormularioCatedratico.value.idCatedratico),
      idGrado:
        Number(this.FormularioCatedratico.value.idGrado),
      nombreCatedratico:
        this.FormularioCatedratico.value.nombreCatedratico,
      correo:
        this.FormularioCatedratico.value.correo,
      telefono:
        this.FormularioCatedratico.value.telefono
    };

    this.lstCatedraticoInsert[this.indiceEditar] =
      catedratico;

    this.indiceEditar = -1;

    Swal.fire({
      title: "Registro Actualizado Exitosamente!",
      icon: "success",
      draggable: true
    });

    this.FormularioCatedratico.reset();

    const modal =
      document.getElementById(
        'ModalEditarCatedratico'
      ) as HTMLDialogElement;

    modal.close();
  }

  EditarCatedratico(
    item: MdlCatedraticoInsert,
    indice: number
  ) {

    this.indiceEditar = indice;

    this.FormularioCatedratico.patchValue({
      idCatedratico: item.idCatedratico,
      idGrado: item.idGrado,
      nombreCatedratico: item.nombreCatedratico,
      correo: item.correo,
      telefono: item.telefono
    });

    const modal =
      document.getElementById(
        'ModalEditarCatedratico'
      ) as HTMLDialogElement;

    modal.showModal();
  }


  EliminarCatedratico(idCatedratico: number) {
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
        this.lstCatedraticoInsert =
          this.lstCatedraticoInsert.filter(
            x => x.idCatedratico !== idCatedratico
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
    this.FormularioCatedratico.reset();
    this.indiceEditar = -1;
    this.modoEditar = false;

    const modal = document.getElementById('ModalEditarCatedratico') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

async MostrarFormularioInvalido(idModal: string) {

  this.intentenGuardar = true;
  this.FormularioCatedratico.markAllAsTouched();

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
