import { Routes, RouterModule }  from '@angular/router';
import { Mahasiswa } from './mahasiswa.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'mahasiswa',
    component: Mahasiswa,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'pengajuan', loadChildren: () => System.import('./pengajuan/pengajuan.module') },
      { path: 'log', loadChildren: () => System.import('./log/log.module') },
      { path: 'kolokium', loadChildren: () => System.import('./kolokium/kolokium.module') },
      { path: 'praseminar', loadChildren: () => System.import('./praseminar/praseminar.module') },
      { path: 'seminar', loadChildren: () => System.import('./seminar/seminar.module') },
      { path: 'sidang', loadChildren: () => System.import('./sidang/sidang.module') },
      { path: 'skl', loadChildren: () => System.import('./skl/skl.module') },
      { path: 'profile', loadChildren: () => System.import('./profile/profile.module') },
      { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
