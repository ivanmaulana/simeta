import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'ba-content-top',
  styles: [require('./baContentTop.scss')],
  template: require('./baContentTop.html'),
})
export class BaContentTop {

  public activePageTitle:string = '';
  jwtHelper: JwtHelper = new JwtHelper();

  role;
  link;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }

  ngOnInit() {
    let decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    let role = decode.role;

    if(role == 3){
      this.link = "/mahasiswa";
    }
    else if(role == 2) {
      this.link = "/dosen";
    }
    else {
      this.link = "admin";
    }

  }
}
