import { Routes, RouterModule }  from '@angular/router';

import { DashboardDosen } from './dashboard.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DashboardDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
