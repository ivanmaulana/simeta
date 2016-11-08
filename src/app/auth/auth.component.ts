import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'auth',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <div class="al-main">
      <div class="al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    `
})
export class Auth {

  constructor() {
  }

  ngOnInit() {
  }
}
