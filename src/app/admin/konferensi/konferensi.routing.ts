import { Routes, RouterModule }  from '@angular/router';

import { konferensiAdmin } from './konferensi.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: konferensiAdmin,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
