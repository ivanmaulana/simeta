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
      { path: 'pengajuan', loadChildren: () => System.import('./pengajuan/pengajuan.module') },
      { path: 'ta', loadChildren: () => System.import('./ta/ta.module') },
      { path: 'kolokium', loadChildren: () => System.import('./kolokium/kolokium.module') },
      { path: 'praseminar', loadChildren: () => System.import('./praseminar/praseminar.module') },
      { path: 'seminar', loadChildren: () => System.import('./seminar/seminar.module') },
      { path: 'skl', loadChildren: () => System.import('./skl/skl.module') },
      { path: 'sidang', loadChildren: () => System.import('./sidang/sidang.module') },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
