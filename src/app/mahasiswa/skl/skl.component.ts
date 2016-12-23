import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'skl',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./skl.scss')],
  template: require('./skl.html')
})
export class Skl {

  constructor() {
  }

}
