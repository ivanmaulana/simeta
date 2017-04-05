import { Routes, RouterModule }  from '@angular/router';

import { StaffAdmin } from './staff.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: StaffAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
