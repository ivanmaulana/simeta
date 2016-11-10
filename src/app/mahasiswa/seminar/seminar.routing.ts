import { Routes, RouterModule }  from '@angular/router';

import { Seminar } from './seminar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Seminar,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
