import { Routes, RouterModule }  from '@angular/router';

import { seminarAdmin } from './seminar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: seminarAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
