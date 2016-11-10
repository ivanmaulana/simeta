import { Routes, RouterModule }  from '@angular/router';

import { Praseminar } from './praseminar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Praseminar,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
