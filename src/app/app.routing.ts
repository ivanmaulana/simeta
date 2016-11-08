import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'mahasiswa'},
  // { path: '**', redirectTo: 'mahasiswa' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
