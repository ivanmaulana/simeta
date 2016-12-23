import { Routes, RouterModule }  from '@angular/router';

import { Pengajuan } from './pengajuan.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Pengajuan,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
