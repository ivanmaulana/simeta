import { Component, ViewEncapsulation } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');

@Component({
  selector: 'sidang',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./sidang.scss')],
  template: require('./sidang.html')
})
export class sidangDosen {
  // cek koneksi
  noConn;
  status;

  response;
  message;

  dataMahasiswa;

  today;
  tahun;
  pilih_tahun;

  dosen = [];
  dosen1;
  dosen2;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  dataLabel = ['Sudah Sidang', 'Belum Sidang'];
  public pieChartType:string = 'pie';

  tahunSidang;
  dataSidang;
  getDataSidang() {
    this.authHttp.get(this.data.urlDosenSidang)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunSidang = data.tahun;
        this.dataSidang = data.data;
      })
  }

  //--------------------------

  showSuccess() {
    this.toastr.success("Penentuan TA Berhasil", 'Success !');
  }

  settings = {
    columns: {
      nim: {
        title: 'NIM'
      },
      nama: {
        title: 'Nama Mahasiswa'
      },
      dosen1: {
        title: 'Pembimbing 1'
      },
      dosen2: {
        title: 'Pembimbing 2'
      },
      penguji1: {
        title: 'Penguji 1'
      },
      penguji2: {
        title: 'Penguji 2'
      },
      status: {
        title: 'Status',
        type: 'html'
      },
      tanggal: {
        title: 'Tanggal Sidang'
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

  getDataMahasiswa() {
    this.authHttp.get(this.data.urlAllMakalahSidangDosen)
      .map(res => res.json())
      .subscribe(data => {
        this.dataMahasiswa = data;
      })
  }

  ngOnInit() {
    this.pilih_tahun = this.tahun;
    this.getConnection();
    this.getDataSidang();
    this.getDataMahasiswa();
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
    this.getDataSidang();
    this.getListSidang();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
