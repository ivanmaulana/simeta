import { Routes, RouterModule }  from '@angular/router';

import { DataAdmin } from './data.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DataAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
