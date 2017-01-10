import { Routes, RouterModule }  from '@angular/router';

import { sklAdmin } from './skl.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: sklAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
