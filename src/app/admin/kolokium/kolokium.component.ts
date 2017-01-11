import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'kolokium',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class kolokiumAdmin {

  // cek koneksi
  noConn;
  status;

  active;
  deadline;
  jadwal;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  getDataKolokium() {
    this.authHttp.get(this.data.urlKolokium)
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_kolokium'];
        this.deadline = data[0]['deadline'];
      })

  }

  ngOnInit() {
    this.getDataKolokium();
    this.getConnection();
  }

  getConnection() {
    this.noConn = 0;

    this.authHttp.get(this.data.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
      })

    setTimeout(() => {
      if (!this.status) {
        this.status = 0;
        this.noConn = 1;
        this.showNoConn();
      }
    }, 5000)
  }

  refresh() {
    this.getDataKolokium();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
