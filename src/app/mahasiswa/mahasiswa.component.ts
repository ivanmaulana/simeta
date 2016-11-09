import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'mahasiswa',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
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
        <div class="al-copy">&copy; <a href="http://akveo.com">Ivan Maulana</a> 2016</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Mahasiswa {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('id_token')) {
      let decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
      let role = decode.role;

      if (role === 2) {
        this.router.navigate(['/dosen']);
      }
      else if (role === 4) {
        this.router.navigate(['/admin']);
      }
      else if (role === 1) {
        this.router.navigate(['/admin'])
      }
    }

  }
}
