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
  private role;
  private token;

  private decode;
  jwtHelper: JwtHelper = new JwtHelper();

  private noConn;
  private status;

  private urlLogin = 'http://simeta.apps.cs.ipb.ac.id/login/';

  constructor(private authHttp: AuthHttp, private http: Http, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('id_token')) {
      this.decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
      this.role = this.decode.role;

      this.navigation();
    }
  }

  auth() {

    let creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post(this.urlLogin, creds)
      .map(res => res.json())
      .subscribe(data => {

        if (!data.status) {
          this.showError(data.message);
        }
        else {
          this.showSuccess();
          this.token = data.token;

          localStorage.setItem('id_token', data.token);
          this.decode = this.jwtHelper.decodeToken(data.token);
          this.role = this.decode.role;

          this.navigation();
        }

      })
  }

  getConnection() {
    this.noConn = 0;

    this.authHttp.get('http://simeta-api.apps.cs.ipb.ac.id/test/')
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
      })

    setTimeout(() => {
      if (!this.status) {
        this.status = 0;
        this.noConn = 1;
      }
    }, 5000)
  }

  showError(message) {
    this.toastr.error(message, 'Error!');
  }

  showSuccess() {
    this.toastr.success("Selamat datang di SIMETA Ilkom", 'Berhasil!');
  }

  navigation() {

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
