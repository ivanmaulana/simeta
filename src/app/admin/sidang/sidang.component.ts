import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

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
export class sidangAdmin {
  // cek koneksi
  noConn;
  status;

  response;
  message;

  list;

  today;
  tahun;
  pilih_tahun;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    var temp = new Date();
    this.tahun = temp.getFullYear() - 4;

    this.pilih_tahun = this.tahun;
  }

  dataModal = {"nim":"G64130076","nama":"IVAN MAULANA PUTRA","tahun_masuk":2013,"makalah":"<a target='_blank' href='http://simak.apps.cs.ipb.ac.id/upload/fileSidang/sidang_G64130076.pdf'>Lihat Makalah</a>","tanggal":"2017-03-01","jam":"10:00:00","penguji_1":2,"penguji_2":3,"tempat":"Ruang Sidang","timestamp":"2017-01-16T15:11:58.000Z","dosen1":"Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom","penguji1":"Annisa, S.Kom, M.Kom","penguji2":"Aziz Kustiyo, S.Si, M.Kom","status":"<span class='text-success'>Sudah Upload</span>"};
  test(a) {
    console.log(JSON.stringify(a.data));
    this.dataModal = a.data;
  }

  // --------------------------------
  // TABLE
  public pieChartType:string = 'pie';
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
      penguji1: {
        title: 'Penguji 1'
      },
      penguji2: {
        title: 'Penguji 2'
      },
      status: {
        title: 'Status',
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

    this.authHttp.get(this.data.urlAllMakalahSidang)
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
