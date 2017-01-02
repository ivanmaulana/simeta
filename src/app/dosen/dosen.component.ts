import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {JwtHelper} from 'angular2-jwt';
@Component({
  selector: 'dosen',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar-dosen></ba-sidebar-dosen>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Departemen Ilmu Komputer IPB</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://agri.web.id">Ivan Maulana</a> 2016</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
  `
})
export class Dosen {
  jwtHelper: JwtHelper = new JwtHelper()

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('id_token')) {
      let decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
      let role = decode.role;

      if (role === 3) {
        this.router.navigate(['/mahasiswa']);
      }

    }
    // else {
    //   this.router.navigate(['/auth']);
    // }
  }
}
