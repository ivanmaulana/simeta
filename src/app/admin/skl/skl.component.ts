import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');

@Component({
  selector: 'skl',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./skl.scss')],
  template: require('./skl.html')
})
export class sklAdmin {
  // cek koneksi
  noConn;
  status;

  response;
  message;

  list;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  public pieChartType:string = 'pie';
  dataLabel = ['Sudah SKL', 'Belum SKL'];

  tahunSKL;
  dataSKL;
  getDataSKL() {
    this.authHttp.get(this.data.urlAdminSKL)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunSKL = data.tahun;
        this.dataSKL = data.data;
      })
  }

  // --------------------
  // TABLE

  settings = {
    columns: {
      tahun_masuk: {
        title: 'Angkatan'
      },
      nim: {
        title: 'NIM'
      },
      nama: {
        title: 'Nama Mahasiswa'
      },
      dosen1: {
        title: 'Pembimbing 1'
      },
      tanggal: {
        title: 'Tanggal SKL'
      },
      status: {
        title: 'Status Upload',
        type: 'html'
      },
      berkas: {
        title: 'Lihat SKL',
        type: 'html'
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


  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE

  getListSidang() {

    this.authHttp.get(this.data.urlAllMakalahSKL)
      .map(res => res.json())
      .subscribe(data => {
        this.list = data;
      })

  }

  ngOnInit() {
    this.getConnection();
    this.getListSidang();
    this.getDataSKL();
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
    this.getListSidang();
    this.getDataSKL();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
