import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'log',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class Log {

  constructor() {
  }

}
