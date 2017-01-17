import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { ModalDirective } from 'ng2-bootstrap';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'log',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class LogDosen {

  // cek koneksi
  noConn;
  status;

  // log
  temp;
  log;
  mahasiswa = [];

  logDetail = [];

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  // test() {
  //   swal('Oops...',
  //     'Something went wrong!',
  //     'error'); // the function itself
  // }

  lihatData(id) {
    for (let i = 0; i < this.log.length; i++) {
      if (this.log[i].id == id) {
        return this.log[i];
      }
    }

  }

  lihat(id) {
    this.logDetail = this.lihatData(id);
    this.logDetail['tanggal'] = this.data.ubahTanggal(this.logDetail['tanggal']);
    this.logDetail['jam'] = this.logDetail['jam'].substr(0,5);
  }

  onChange(deviceValue) {
    this.log = [];

    if (deviceValue != 0) {
      for(let i = 0; i < this.temp.length; i++) {
        if (this.temp[i].nama == deviceValue) {
          this.log.push(this.temp[i]);
        }
      }
    }
    else {
      this.log = this.temp;
    }
  }

  approve(int) {
    console.log('approve : '+int);
    this.getLog();
  }

  ngOnInit() {
    this.getConnection();
    this.getLog();
  }

  getLog() {
    this.authHttp.get(this.data.urlLog+'dosen/')
      .map(res => res.json())
      .subscribe(data => {
        this.temp = data;
        this.log = data;
        this.separateLog(this.log);
      })
  }

  cekNama(data) {
    for(let i = 0; i < this.mahasiswa.length; i++) {
      if(this.mahasiswa[i] == data) return false;
    }

    return true;
  }

  separateLog(data) {
    for(let i = 0; i < data.length; i++) {
      if(this.cekNama(data[i].nama)) {
        this.mahasiswa.push(data[i].nama);
      }
    }
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
    this.getConnection();
    this.getLog();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }


}
