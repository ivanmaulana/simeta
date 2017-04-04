import {Component, ViewEncapsulation} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'signin',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./signin.scss'),require('./style.css'),require('./responsive.css')],
  template: require('./signin.html')
})
export class Signin {
  // form
  private username;
  private password;

  // jwt
  private decode;
  private role;
  jwtHelper: JwtHelper = new JwtHelper();

  private urlLogin = 'http://172.18.79.15:3017/login/';

  constructor(private authHttp: AuthHttp, private http: Http, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('id_token')) {
      this.decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
      this.role = this.decode.role;

      this.checkStatus();
    }
  }

  submit() {

    let creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post(this.urlLogin, creds)
      .map(res => res.json())
      .subscribe(data => {

        if (!data.status) {
          this.showError(data.message);
        }
        else {
          this.showSuccess();

          localStorage.setItem('id_token', data.token);
          this.decode = this.jwtHelper.decodeToken(data.token);
          this.role = this.decode.role;

          this.checkStatus();
        }

      })
  }

  showError(message) {
    this.toastr.error(message, 'Error!');
  }

  showSuccess() {
    this.toastr.success("Selamat datang di SIMETA Ilkom", 'Berhasil!');
  }

  checkStatus() {

    if (this.role === 3) {
      this.router.navigate(['/mahasiswa']);
    }
    else if (this.role === 2) {
      this.router.navigate(['/dosen']);
    }
    else if (this.role === 4) {
      this.router.navigate(['/admin']);
    }
    else if (this.role === 1) {
      this.router.navigate(['/admin'])
    }
  }

}
