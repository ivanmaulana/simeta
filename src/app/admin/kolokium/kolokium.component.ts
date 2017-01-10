import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'kolokium',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class kolokiumAdmin {

  constructor() {
  }

}
