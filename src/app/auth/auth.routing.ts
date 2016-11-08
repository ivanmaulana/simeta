import { Routes, RouterModule }  from '@angular/router';
import { Auth } from './auth.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', loadChildren: () => System.import('./signin/signin.module') },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
