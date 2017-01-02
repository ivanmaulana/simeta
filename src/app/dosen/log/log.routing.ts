import { Routes, RouterModule }  from '@angular/router';

import { LogDosen } from './log.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LogDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
