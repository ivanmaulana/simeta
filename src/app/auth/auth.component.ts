import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'auth',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./auth.scss')],
  template: `
    <router-outlet></router-outlet>
    `
})
export class Auth {

  constructor() {
  }

  ngOnInit() {
  }
}
