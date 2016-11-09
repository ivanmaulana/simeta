import {Component, ViewEncapsulation} from '@angular/core';

import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'signin',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./signin.scss'),require('./style.css'),require('./responsive.css')],
  template: require('./signin.html')
})
export class Signin {
  private username;
  private password;

  private urlLogin = 'http://simak.apps.cs.ipb.ac.id/login/';

  constructor(private authHttp: AuthHttp, private http: Http) {

  }

  submit() {
     console.log(this.username + " " + this.password);

    let creds = JSON.stringify({username: this.username, password: this.password});

    this.http.post(this.urlLogin, creds)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      })
  }

}
