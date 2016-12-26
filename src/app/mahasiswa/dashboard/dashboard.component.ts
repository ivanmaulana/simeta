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
  statusDaftar;
  statusKolokium;
  statusPrasminar;
  statusProfile;
  statusSeminar;
  statusSidang;
  statusSkl;
  statusTa;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  ngOnInit() {
    // this.authHttp.get('http://simak.apps.cs.ipb.ac.id:2016/dosen')
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   })

    this.authHttp.get(this.data.urlStatus)
      .map(res => res.json())
      .subscribe(data => {
        this.statusDaftar = data[0].statusDaftar;
        console.log('ini status daftar '+this.statusDaftar);
      })
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
