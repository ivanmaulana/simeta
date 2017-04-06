import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'data',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./data.scss')],
  template: require('./data.html')
})
export class DataAdmin {

  constructor() {
  }

}
