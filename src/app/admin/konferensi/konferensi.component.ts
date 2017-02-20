import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'konferensi',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./konferensi.scss')],
  template: require('./konferensi.html')
})
export class konferensiAdmin {

  constructor() {
  }

}
