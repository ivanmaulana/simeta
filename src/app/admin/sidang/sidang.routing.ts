import { Routes, RouterModule }  from '@angular/router';

import { sidangAdmin } from './sidang.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: sidangAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
