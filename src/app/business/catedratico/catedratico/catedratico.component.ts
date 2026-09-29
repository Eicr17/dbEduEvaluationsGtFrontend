import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatedraticoService } from '../../../shared/services/catedratico.service';
import { MdlCatedratico, MdlCatedraticoInsert, MdlCatedraticoUpdate } from '../../../shared/models/MdlCatedratico';

@Component({
  selector: 'app-catedratico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './catedratico.component.html',
  styleUrl: './catedratico.component.css'
})
export class CatedraticoComponent {

  FormularioCatedratico! : FormGroup
  lstCatedratico: MdlCatedratico[] = [];
  lstCatedraticoInsert: MdlCatedraticoInsert [] = [];
  lstCatedraticoUpdate : MdlCatedraticoUpdate [] =[];

  constructor(private srv_Catedratico: CatedraticoService,
      private fb: FormBuilder
  ){
  }

  ngOnInit(){

    this.FormularioCatedratico = this.fb.group({
       idCatedratico: ['',[Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
       idGrado: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
       nombreCatedratico : ['',[Validators.required, Validators.maxLength(150), Validators.minLength(1)]],
      correo: ['',[Validators.required,  Validators.email, Validators.maxLength(150), Validators.minLength(1)]],
      telefono: ['', [Validators.required, Validators.pattern('^[+0-9 ]{8,15}\$')]]  
      })
  }

}
