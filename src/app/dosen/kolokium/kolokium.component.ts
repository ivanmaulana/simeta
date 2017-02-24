import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');

@Component({
  selector: 'kolokium',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class kolokiumDosen {

  // cek koneksi
  noConn;
  status;

  active;
  deadline;
  jadwal;

  response1;
  message;

  list;

  today;
  tahun;
  pilih_tahun;
  preview;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    let temp = new Date();
    this.tahun = temp.getFullYear() - 4;

    this.pilih_tahun = this.tahun;
  }

  dataLabel = ['Sudah Kolokium','Belum Kolokium'];
  public pieChartType:string = 'pie';

  tahunKolokium;
  dataKolokium;
  getDataSeminar() {
    this.authHttp.get(this.data.urlDosenKolokium)
      .map(res => res.json())
      .subscribe(data => {
        this.tahunKolokium = data.tahun;
        this.dataKolokium = data.data;
      })
  }

  // --------------------------------
  // TABLE
  temp;

  onChange(e) {
    var y = e.target.value.substr(2,2);

    this.list = [];
    for(let i = 0; i < this.temp.length; i++) {
      var x = this.temp[i].nim.substr(3,2);
      if(y == x) {
        this.list.push(this.temp[i]);
      }
    }
  }

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
      dosen2: {
        title: 'Pembimbing 2'
      },
      status: {
        title: 'Status',
        type: 'html'
      },
      makalah: {
        title: 'Lihat',
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
  tampil;
  getListKolokium() {
    this.tampil = 0;

    this.authHttp.get(this.data.urlAllMakalahKolokiumDosen)
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
    this.getConnection();
    this.getListKolokium();
    this.getDataSeminar();
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
    this.getListKolokium();
    this.getConnection();
    this.getDataSeminar();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
