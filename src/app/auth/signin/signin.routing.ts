import { Routes, RouterModule }  from '@angular/router';

import { Signin } from './signin.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Signin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
