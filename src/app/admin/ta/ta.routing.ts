import { Routes, RouterModule }  from '@angular/router';

import { TaAdmin } from './ta.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TaAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
