import { Routes, RouterModule }  from '@angular/router';

import { sidangDosen } from './sidang.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: sidangDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
