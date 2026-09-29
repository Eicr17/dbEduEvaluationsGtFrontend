import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GradoService } from '../../../shared/services/grado.service';

@Component({
  selector: 'app-grado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './grado.component.html',
  styleUrl: './grado.component.css'
})
export class GradoComponent {

 FormGrado!: FormGroup;


  constructor(private fb: FormBuilder, 
     srv_Grado: GradoService
  ){

  }
}
