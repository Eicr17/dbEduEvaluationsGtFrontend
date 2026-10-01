import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GradoService } from '../../../shared/services/grado.service';
import { max } from 'rxjs';
import { CatedraticoService } from '../../../shared/services/catedratico.service';
import { MdlGrado, MdlGradoInsert, MdlGradoUpdate } from '../../../shared/models/MdlGrado';
import { MdlCatedraticoInsert } from '../../../shared/models/MdlCatedratico';

@Component({
  selector: 'app-grado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './grado.component.html',
  styleUrl: './grado.component.css'
})
export class GradoComponent {


  lstGrado : MdlGrado [] = [];
  lstGradoInsert:  MdlGradoInsert [] = [];
  lstGradoUpdate: MdlGradoUpdate  [] = [];
  
  modoEditar: boolean = false;
  indiceEditar: number = -1;

 FormGrado!: FormGroup;


 lstCatedratico = [
    { idCatedratico: 1, nombreCatedratico: 'Juan Pérez' },
    { idCatedratico: 2, nombreCatedratico: 'María García' },
    { idCatedratico: 3, nombreCatedratico: 'Carlos López' }
  ];


  constructor(private fb: FormBuilder, 
     srv_Grado: GradoService,
  ){

  }

  ngOnInit(){
    this.FormGrado = this.fb.group({
      idGrado: ['', [Validators.required, Validators.maxLength(1) ]],
      nombreGrado:['', [Validators.required, Validators.maxLength(150), Validators.minLength(4)]],
      seccion:['', [Validators.required, Validators.maxLength( 1)]],
      anioLectivo:['', [Validators.required, Validators.max(2100),  Validators.min(2000) ]],
      idCatedratico:['', [Validators.required]]
    })
  }

  AgregarGrado() {
  
    if (this.FormGrado.invalid) {
      this.FormGrado.markAllAsTouched();
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
      this.FormGrado.markAllAsTouched();
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
      this.lstGradoInsert =
        this.lstGradoInsert.filter(
          x => x.idGrado !== idGrado
        );
    }
  

}
