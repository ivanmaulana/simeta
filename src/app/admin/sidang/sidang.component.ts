import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';

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

  dosen = [];
  dosen1;
  dosen2;
  penguji_1;
  penguji_2;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    var temp = new Date();
    this.tahun = temp.getFullYear() - 4;

    this.pilih_tahun = this.tahun;
  }

  // ------------------------
  // TYPEAHEAD

  selectDosen1(e: TypeaheadMatch): void {
    this.dataModal.penguji_1 = this.getIdDosen(e.value);
  }

  selectDosen2(e: TypeaheadMatch): void {
    this.dataModal.penguji_2 = this.getIdDosen(e.value);
  }

  public typeaheadOnSelect(e:TypeaheadMatch):void {

    let creds = JSON.stringify({nama: e.value});

    this.authHttp.post('http://simak.apps.cs.ipb.ac.id:2016/ta/penentuan', creds)
      .map(res => res.json())
      .subscribe(data => {

        if (data[0]['dosen1']) {
          this.dataModal.penguji1 = data[0]['dosen1'];
        }
        else this.dataModal.penguji1 = "";

        if (data[0]['dosen2']) this.dataModal.penguji2 = data[0]['dosen2'];
        else this.dataModal.penguji2 = "";

      })
  }

  simpan() {

    if(this.dataModal.penguji1 == "") {
      this.dataModal.penguji_1 = 0;
    }
    if(this.dataModal.penguji2 == "") {
      this.dataModal.penguji_2 = 0;
    }

    let creds;
    creds = JSON.stringify({nim: this.dataModal.nim, tanggal: this.dataModal.tanggal, jam: this.dataModal.jam, tempat: this.dataModal.tempat, penguji_1: this.dataModal.penguji_1, penguji_2: this.dataModal.penguji_2});

    console.log(creds);


    // this.authHttp.put("http://simak.apps.cs.ipb.ac.id:2016/ta/edit/", creds)
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     this.response = data[0].status;
    //     this.message = data[0].message;
    //
    //     if(this.response) {
    //       this.showSuccess();
    //     }
    //   })

  }

  showSuccess() {
    this.toastr.success("Penentuan TA Berhasil", 'Success !');
  }


  dosen_raw;
  getIdDosen(nama){
    let id;
    for (var i = 0; i < this.dosen_raw.length; i++){
      if (nama === this.dosen_raw[i]['nama']) {
        id =  this.dosen_raw[i]['id'];
      }
    }
    return id;
  }

  getDataDosen() {
    this.authHttp.get(this.data.urlDosen)
      .map(res => res.json())
      .subscribe(data => {
        this.dosen_raw = data;
        for (let i = 0; i < data.length; i++) {
          this.dosen.push(data[i].nama);
        }
      })
  }


  // -------------------------------
  // MODAL

  dataModal = {"nim":"G64130076","nama":"IVAN MAULANA PUTRA","tahun_masuk":2013,"makalah":"<a target='_blank' href='http://simak.apps.cs.ipb.ac.id/upload/fileSidang/sidang_G64130076.pdf'>Lihat Makalah</a>","tanggal":"2017-03-01","jam":"10:00:00","penguji_1":2,"penguji_2":3,"tempat":"Ruang Sidang","timestamp":"2017-01-16T15:11:58.000Z","dosen1":"Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom","penguji1":"Annisa, S.Kom, M.Kom","penguji2":"Aziz Kustiyo, S.Si, M.Kom","status":"<span class='text-success'>Sudah Upload</span>"};

  test(a) {
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
        title: 'Status Upload',
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
    this.getDataDosen();
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
    this.getDataDosen();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
