import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import { LocalDataSource } from 'ng2-smart-table';

import { NgUploaderOptions } from 'ngx-uploader';
let Chart = require('chart.js');

@Component({
  selector: 'kolokium',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class kolokiumAdmin {

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

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    var temp = new Date();
    this.tahun = temp.getFullYear() - 4;

    this.pilih_tahun = this.tahun;
  }

  source: LocalDataSource;
  konfirmasi = 0;
  nimKonfirmasi = '';
  dataChange;
  test(e) {
    this.nimKonfirmasi = e.data.nim;
    this.dataChange = e.data;

    if(e.data.konfirmasi) {
      if(e.data.konfirmasi.search("Sudah Dikonfirmasi") == -1) {
        this.konfirmasi = 1;
      }
      else {
        this.konfirmasi = 0;
      }
    }
    else {
      this.konfirmasi = 2;
    }
  }

  show = true;
  confirm(num) {
    let creds = JSON.stringify({nim: this.nimKonfirmasi, data: this.konfirmasi});

    this.authHttp.put('http://localhost:2016/konfirmasi/kolokium', creds)
      .map(res => res.json())
      .subscribe(data => {
        let dataChange1 = this.dataChange;

        if(data.status) {
          this.showKonfirmasiSuccess();
          for(let i = 0; i < this.list.length; i++) {
            if (this.list[i].nim == this.nimKonfirmasi) {
              if(num) {
                dataChange1.konfirmasi = "<span class='text-success'>Sudah Dikonfirmasi</span>";
              }
              else {
                dataChange1.konfirmasi = "<span class='text-danger'>Belum Dikonfirmasi</span>";
              }
            }
          }

          this.source.update(this.dataChange, dataChange1);
        }
      });

    this.konfirmasi = 0;
  }

  showKonfirmasiSuccess() {
    this.toastr.success("Konfirmasi Berhasil", 'Success !');
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
      status: {
        title: 'Status',
        type: 'html'
      },
      konfirmasi: {
        title: 'Konfirmasi',
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

  simpan(){
    let creds = JSON.stringify({active: this.active, jadwal_kolokium: this.jadwal, deadline: this.deadline});

    this.authHttp.put(this.data.urlJadwalKolokium, creds)
      .map(res => res.json())
      .subscribe(data => {
        this.response1 = data[0].status;
        this.message = data[0].message;

        if(this.response1) {
          this.showSuccess();
        }

      }
    )
  }


  activate(){
    this.active = !this.active;
  }

  showError() {
    this.toastr.error('Update Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Update Kolokium Berhasil", 'Success !');
  }


  // --------------------------------
  // UPLOAD

  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadJadwalKolokium,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 30000000;


  preview = "";
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;

      this.preview = this.data.urlFileKolokium+this.uploadFile[0].filename;
      this.showSelesai();
    }

    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent);
    });
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File harus kurang dari 3 MB');
    }

    if (uploadingFile.originalName.search(".pdf") == -1) {
      uploadingFile.setAbort();
      alert('File Harus Berekstensi PDF');
    }
  }

  showSelesai() {
    this.toastr.success("Berhasil Upload Jadwal Kolokium", 'Success!');
  }

  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  tahun_awal;
  forTahun = [];

  rangkuman = [];
  dataLabel = ['Sudah Upload', 'Belum Upload'];
  tampil;
  getListKolokium() {
    this.tampil = 0;

    this.authHttp.get(this.data.urlAllMakalahKolokium)
      .map(res => res.json())
      .subscribe(data => {
        this.source = new LocalDataSource(data);
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

  getDataKolokium() {
    this.authHttp.get(this.data.urlKolokium)
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_kolokium'];
        this.deadline = data[0]['deadline'];

        this.preview = "http://simeta.apps.cs.ipb.ac.id/"+data[0]['file'];
      })

  }

  ngOnInit() {
    this.pilih_tahun = this.tahun;

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.getDataKolokium();
    this.getListKolokium();
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
    this.getDataKolokium();
    this.getListKolokium();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
