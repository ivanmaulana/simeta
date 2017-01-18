import { Routes, RouterModule }  from '@angular/router';

import { seminarDosen } from './seminar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: seminarDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
