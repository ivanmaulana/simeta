import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'micon',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./micon.scss')],
  template: require('./micon.html')
})
export class miconAdmin {

  constructor() {
  }

}
