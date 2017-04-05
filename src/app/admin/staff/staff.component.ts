import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./staff.scss')],
  template: require('./staff.html')
})
export class StaffAdmin {

  constructor() {
  }

}
