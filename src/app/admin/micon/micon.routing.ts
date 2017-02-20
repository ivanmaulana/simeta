import { Routes, RouterModule }  from '@angular/router';

import { miconAdmin } from './micon.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: miconAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
