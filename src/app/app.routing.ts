import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'auth/signin'},
  { path: 'mahasiswa', redirectTo: 'mahasiswa/dashboard'},
  { path: 'dosen', redirectTo: 'dosen/dashboard'},
  // { path: '**', redirectTo: 'mahasiswa' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
