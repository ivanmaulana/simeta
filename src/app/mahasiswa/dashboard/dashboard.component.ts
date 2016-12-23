import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import {DataService} from '../../data/data.service';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  ngOnInit() {
    this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/dosen')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      })
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
