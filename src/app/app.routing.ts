import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  // { path: 'auth', redirectTo: 'auth/signin'},
  { path: 'mahasiswa', redirectTo: 'mahasiswa/dashboard'},
  { path: 'dosen', redirectTo: 'dosen/dashboard'},
  { path: 'admin', redirectTo: 'admin/dashboard'},
  // { path: '**', redirectTo: 'mahasiswa' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
