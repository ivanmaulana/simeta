import { Routes, RouterModule }  from '@angular/router';

import { Sidang } from './sidang.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Sidang,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
