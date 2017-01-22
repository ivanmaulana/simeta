import { Routes, RouterModule }  from '@angular/router';

import { micon } from './micon.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: micon,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
