import { Routes, RouterModule }  from '@angular/router';
import { Admin } from './admin.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
