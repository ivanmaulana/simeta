import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');

@Component({
  selector: 'praseminar',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html')
})
export class praseminarDosen {
  // cek koneksi
  noConn;
  status;

  active;
  deadline;
  jadwal;

  response1;
  message;

  dataMahasiswa;

  today;
  tahun;
  pilih_tahun;
  preview;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    let temp = new Date();
    this.tahun = temp.getFullYear() - 4;

    this.pilih_tahun = this.tahun;
  }

  dataLabel = ['Sudah Praseminar','Belum Praseminar'];
  public pieChartType:string = 'pie';

  tahunPraseminar;
  dataPraseminar;
  getDataPraseminar() {
    this.authHttp.get(this.data.urlDosenPraseminar)
      .map(res => res.json())
      .subscribe(data => {
        this.tahunPraseminar = data.tahun;
        this.dataPraseminar = data.data;
      })
  }

  // --------------------------------
  // TABLE
  temp;

  onChange(e) {
    var y = e.target.value.substr(2,2);

    this.dataMahasiswa = [];
    for(let i = 0; i < this.temp.length; i++) {
      var x = this.temp[i].nim.substr(3,2);
      if(y == x) {
        this.dataMahasiswa.push(this.temp[i]);
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
  getDataMahasiswa() {
    this.tampil = 0;

    this.authHttp.get(this.data.urlAllMakalahPraseminarDosen)
      .map(res => res.json())
      .subscribe(data => {
        this.dataMahasiswa = data;
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
    this.getDataMahasiswa();
    this.getDataPraseminar();
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
    this.getDataPraseminar();
    this.getDataMahasiswa();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
