import { Routes, RouterModule }  from '@angular/router';
import { Dosen } from './dosen.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'dosen',
    component: Dosen,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'log', loadChildren: () => System.import('./log/log.module') },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
