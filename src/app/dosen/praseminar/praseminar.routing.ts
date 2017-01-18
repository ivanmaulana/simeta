import { Routes, RouterModule }  from '@angular/router';

import { praseminarDosen } from './praseminar.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: praseminarDosen,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
