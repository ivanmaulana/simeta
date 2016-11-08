import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'signin',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./signin.scss')],
  template: require('./signin.html')
})
export class Signin {

  constructor() {
  }

}
