import { Routes, RouterModule }  from '@angular/router';

import { PengujiAdmin } from './penguji.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PengujiAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
