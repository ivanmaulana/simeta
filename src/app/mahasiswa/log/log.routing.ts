import { Routes, RouterModule }  from '@angular/router';

import { Log } from './log.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Log,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
