import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'pengajuan',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./pengajuan.scss')],
  template: require('./pengajuan.html')
})
export class PengajuanAdmin {

  // cek koneksi
  noConn;
  status;

  pengajuan;

  settings = {
    columns: {
      nim: {
        title: 'NIM'
      },
      nama: {
        title: 'Nama Mahasiswa'
      },
      topik: {
        title: 'Topik TA'
      },
      dosen1: {
        title: 'Pembimbing 1'
      },
      dosen2: {
        title: 'Pembimbing 2'
      }

    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    setPaging: {
      perPage: 7
    }
  };

  private excel = this.data.urlExcel + localStorage.getItem('id_token');

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
  }

  test(a) {
    console.log(a.data);
  }

  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  getDataPengajuan() {
    this.authHttp.get(this.data.urlListPengajuan)
      .map(res => res.json())
      .subscribe( data => {
        this.pengajuan = data;
      });
  }

  ngOnInit() {
    this.getDataPengajuan();
    this.getConnection();
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
    this.getConnection();
    this.getDataPengajuan();
  }

  showNoConn() {
    this.toastr.warning('Error Connecting to Server', 'Error');
  }

}
