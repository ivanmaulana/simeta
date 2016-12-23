import { Routes, RouterModule }  from '@angular/router';

import { DashboardAdmin } from './dashboard.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DashboardAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
