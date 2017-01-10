import { Routes, RouterModule }  from '@angular/router';

import { kolokiumAdmin } from './kolokium.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: kolokiumAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
