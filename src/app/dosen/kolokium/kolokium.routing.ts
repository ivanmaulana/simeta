import { Routes, RouterModule }  from '@angular/router';

import { kolokiumDosen } from './kolokium.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: kolokiumDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
