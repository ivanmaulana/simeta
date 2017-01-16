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

  today;
  tahun;
  pilih_tahun;
  temp;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    var temp = new Date();
    this.tahun = temp.getFullYear() - 4;

    this.pilih_tahun = this.tahun;
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
  tahun_awal;
  forTahun = [];

  rangkuman = [];
  dataLabel = ['Sudah Upload', 'Belum Upload'];
  tampil;

  getListSidang() {
    this.tampil = 0;

    this.authHttp.get(this.data.urlAllMakalahSKL)
      .map(res => res.json())
      .subscribe(data => {
        this.list = data;
        this.temp = data;
        this.tahun_awal = data[0].tahun_masuk;

        if (this.tahun_awal < this.tahun - 2) {
          this.tahun_awal = this.tahun - 2;
        }

        for(this.tahun_awal; this.tahun_awal < this.tahun + 1; this.tahun_awal++) {
          this.forTahun.push(this.tahun_awal);
        };

        for (let i = 0; i < this.forTahun.length; i++) {
          let temp = 0;
          let Cmakalah = 0;
          for (let j = 0; j < data.length; j++) {
            if (this.forTahun[i] == data[j].tahun_masuk) {
              temp++;

              if (data[j].makalah != null) {
                Cmakalah++;
              }
            }
          }

          this.rangkuman[this.forTahun[i]] = [Cmakalah, temp];

          this.tampil = 1;
        }

      })

  }

  ngOnInit() {
    this.pilih_tahun = this.tahun;
    this.getListSidang();
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
    this.getListSidang();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
