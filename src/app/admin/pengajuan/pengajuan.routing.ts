import { Routes, RouterModule }  from '@angular/router';

import { PengajuanAdmin } from './pengajuan.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PengajuanAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
