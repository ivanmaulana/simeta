import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import {DataService} from '../../data/data.service';

@Component({
  selector: 'micon',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./micon.scss')],
  template: require('./micon.html')
})
export class micon {

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

}
