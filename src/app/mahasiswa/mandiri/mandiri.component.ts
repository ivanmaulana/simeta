import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import {DataService} from '../../data/data.service';

@Component({
  selector: 'mandiri',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./mandiri.scss')],
  template: require('./mandiri.html')
})
export class Mandiri {

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

}
