import { Routes, RouterModule }  from '@angular/router';

import { Mandiri } from './mandiri.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Mandiri,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
