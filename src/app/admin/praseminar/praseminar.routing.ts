import { Routes, RouterModule }  from '@angular/router';

import { praseminarAdmin } from './praseminar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: praseminarAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
