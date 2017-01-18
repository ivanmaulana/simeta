import { Routes, RouterModule }  from '@angular/router';

import { sklDosen } from './skl.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: sklDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
