import { Routes, RouterModule }  from '@angular/router';

import { Kolokium } from './kolokium.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Kolokium,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
