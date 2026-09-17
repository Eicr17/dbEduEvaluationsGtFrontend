import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

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
