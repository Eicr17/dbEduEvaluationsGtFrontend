import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importante para usar [(ngModel)]
import { AlumnoComponent } from '../Alumno/alumno/alumno.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

  gradoSeleccionado = '';

 lstAlumno = [
    { nombreAlumno: 'Juan Pérez', cuestionario: 'Literatura', fecharealizacion: '12/08/2024', nota: '85', estado: 'Aprobado', grado:'Primero Primaria' },
    { nombreAlumno: 'Maria López', cuestionario: 'Naturales', fecharealizacion: '15/08/2024', nota: '92', estado: 'Aprobado', grado:'Segundo Primaria' },
    { nombreAlumno: 'Carlos Rodríguez', cuestionario: 'Matematicas', fecharealizacion: '18/08/2024', nota: '50', estado: 'Reprobado', grado:'Tercero Primaria' },
    { nombreAlumno: 'Ana Martínez', cuestionario: 'Historia', fecharealizacion: '20/08/2024', nota: '88', estado: 'Aprobado', grado:'Primero Secundaria' },
    { nombreAlumno: 'Luis González', cuestionario: 'Precalculo', fecharealizacion: '22/08/2024', nota: '95', estado: 'Aprobado', grado:'Segundo Secundaria' }
  ];

 // Copia plana de los datos para renderizar y filtrar en la vista
  alumnosFiltrados = [...this.lstAlumno];

  buscarAlumno(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    const termino = valor.toLowerCase().trim();

    if (!termino) {
      this.alumnosFiltrados = [...this.lstAlumno];
      return;
    }

    // El filtro funciona exactamente igual accediendo a las propiedades del objeto directo
    this.alumnosFiltrados = this.lstAlumno.filter(alumno =>
      alumno.nombreAlumno.toLowerCase().includes(termino) ||
      alumno.cuestionario.toLowerCase().includes(termino) ||
      alumno.estado.toLowerCase().includes(termino) ||
      alumno.nota.includes(termino)
    );
  }

  filtroporGrado(event: Event): void {
      const valor = (event.target as HTMLSelectElement).value;

      if(!valor){
        this.alumnosFiltrados = [...this.lstAlumno];
        return;
      }

      this.alumnosFiltrados = this.lstAlumno.filter
      (alumno => alumno.grado === valor);
  }


    ngOnInit(){
    }

  
  

  // Valores estáticos
  cuestionariosActivos: number = 12;
  alumnosEvaluados: string = '2,300';
  promedioGeneral: string = '84.5 pts';
  pendientesCalificar: number = 18;

  // Tendencias estáticas
  tendenciaCuestionarios: string = '+2 esta semana';
  tendenciaAlumnos: string = '88% de participación';
  tendenciaPromedio: string = '+3.2 pts vs anterior';
  tendenciaPendientes: string = 'Preguntas de texto libre';



}
