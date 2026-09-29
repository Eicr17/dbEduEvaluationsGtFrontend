import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdAlumno, MdAlumnoInsert, MdAlumnoUpdate } from '../../../shared/models/MdlAlumno';
import { AlumnoService } from '../../../shared/services/alumno.service';

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


  constructor( private srv_Alumno: AlumnoService,
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

}
