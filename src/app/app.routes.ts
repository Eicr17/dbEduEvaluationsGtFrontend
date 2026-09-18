import { Routes } from '@angular/router';
import { CreacionCuestionarioComponent } from './business/cuestionario/creacion-cuestionario/creacion-cuestionario.component';
import { CuestionariosComponent } from './business/cuestionario/cuestionarios/cuestionarios/cuestionarios.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component')
            },
            {
                path: 'tables',
                loadComponent: () => import('./business/tables/tables.component')
            },

            {
                path:'cuestionarios', component: CuestionariosComponent
            },

            {
                path:'creacion-cuestionarios', component: CreacionCuestionarioComponent
            },
            
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
