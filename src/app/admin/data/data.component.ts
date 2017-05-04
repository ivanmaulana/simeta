import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'data',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./data.scss')],
  template: require('./data.html')
})
export class DataAdmin {
  // cek koneksi
  noConn;
  status;

  dataMahasiswa;
  tanggal;
  show;

  bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
          'Oktober', 'November', 'Desember'];

  click = false;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
  }

  ngOnInit() {
    this.getDataMahasiswa();
    this.getConnection();
  }

  updateData() {
    this.show = false;
    this.click = true;

    this.authHttp.get(this.data.urlAdminData + 'update')
    .map(res => res.json())
    .subscribe(data => {
      if (data.status) {

        this.click = false;
        this.showSuccess();
        this.dataMahasiswa = data;

        if (data.status === 2) {
          this.show = true;
        }

        let d = new Date(data.date);
        this.tanggal = d.getDate() + ' ' + this.bulan[d.getMonth()] + ' ' + d.getFullYear() +
                    ', ' + d.getHours() + ':' + d.getMinutes() + ' WIB';

      }
    },
    err => {
      this.click = false;
      this.showNoConn();
    });

  }

  getDataMahasiswa() {
    this.authHttp.get(this.data.urlAdminData)
    .map(res => res.json())
    .subscribe(data => {
      this.dataMahasiswa = data;

      let d = new Date(data.date);
      this.tanggal = d.getDate() + ' ' + this.bulan[d.getMonth()] + ' ' + d.getFullYear() +
                     ', ' + d.getHours() + ':' + d.getMinutes() + ' WIB';

    });
  }

  getConnection() {
    this.noConn = 0;

    this.authHttp.get(this.data.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
      });

    setTimeout(() => {
      if (!this.status) {
        this.status = 0;
        this.noConn = 1;
        this.showNoConn();
      }
    }, 5000);
  }

  refresh() {
    this.getDataMahasiswa();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning('Error Connecting to Server', 'Error');
  }

  showSuccess() {
    this.toastr.success('Success Update Data', 'Success');
  }

}
