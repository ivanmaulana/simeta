import { Routes, RouterModule }  from '@angular/router';

import { nasional } from './nasional.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: nasional,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
