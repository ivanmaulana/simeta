import { Routes, RouterModule }  from '@angular/router';

import { mandiriAdmin } from './mandiri.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: mandiriAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
