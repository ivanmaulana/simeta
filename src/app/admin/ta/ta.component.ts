import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ta',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./ta.scss')],
  template: require('./ta.html')
})
export class TaAdmin {

  constructor() {
  }

}
