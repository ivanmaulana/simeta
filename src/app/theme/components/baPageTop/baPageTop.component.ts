import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import { Router } from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  jwtHelper: JwtHelper = new JwtHelper();
  private date;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState, private route: Router) {
    this.getLocalStorage();
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.date = new Date();

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  private token;
  private decode;
  private id;
  private role;
  getLocalStorage(){
    this.token = localStorage.getItem('id_token');

    this.decode = this.jwtHelper.decodeToken(this.token);
    this.id = this.decode['id'];
    this.role = this.decode['role'];
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['Login']);
  }
}
