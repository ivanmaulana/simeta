import { Routes, RouterModule }  from '@angular/router';

import { Skl } from './skl.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Skl,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
