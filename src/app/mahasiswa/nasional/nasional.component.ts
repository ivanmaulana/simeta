import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import {DataService} from '../../data/data.service';

@Component({
  selector: 'nasional',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./nasional.scss')],
  template: require('./nasional.html')
})
export class nasional {

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

}
