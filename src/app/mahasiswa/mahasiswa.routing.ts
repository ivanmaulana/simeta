import { Routes, RouterModule }  from '@angular/router';
import { Mahasiswa } from './mahasiswa.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  // {
  //   path: 'register',
  //   loadChildren: () => System.import('./register/register.module')
  // },
  {
    path: 'mahasiswa',
    component: Mahasiswa,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
      { path: 'tables', loadChildren: () => System.import('./tables/tables.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
