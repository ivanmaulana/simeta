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
      { path: 'praseminar', loadChildren: () => System.import('./praseminar/praseminar.module') },
      { path: 'kolokium', loadChildren: () => System.import('./kolokium/kolokium.module') },
      { path: 'seminar', loadChildren: () => System.import('./seminar/seminar.module') },
      { path: 'sidang', loadChildren: () => System.import('./sidang/sidang.module') },
      { path: 'skl', loadChildren: () => System.import('./skl/skl.module') },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
