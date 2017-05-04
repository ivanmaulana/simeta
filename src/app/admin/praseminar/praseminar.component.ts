import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';
import { LocalDataSource } from 'ng2-smart-table';
let Chart = require('chart.js');

@Component({
  selector: 'praseminar',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html')
})
export class praseminarAdmin {
  // cek koneksi
  noConn;
  status;

  active;
  deadline;
  jadwal;

  response1;
  message;

  list;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
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

    this.authHttp.put('http://localhost:2016/konfirmasi/praseminar', creds)
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

  checkNim(value, year) {

  }

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

  tab() {
    window.open('http://localhost:3000','_blank');
  }

  submit(){
    let creds = JSON.stringify({active: this.active, jadwal_praseminar: this.jadwal, deadline: this.deadline});

    this.authHttp.put(this.data.urlPraseminar, creds)
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
    this.toastr.success("Update Praseminar Berhasil", 'Success !');
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
      url: this.data.urlUploadJadwalPraseminar,
      authToken: localStorage.getItem('id_token'),
      authTokenPrefix: ''
    };
    sizeLimit = 30000000;


    preview = "";
    handleUpload(data: any): void {
      if (data && data.response) {
        let data1 = JSON.parse(data.response);
        this.uploadFile = data1;

        this.preview = "http://simeta.apps.cs.ipb.ac.id/uploads/"+this.uploadFile[0].filename;
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
      this.toastr.success("Berhasil Upload Jadwal Praseminar", 'Success!');
    }

    // -----------------------------
    // TEMPLATE

    // DASHBOARD SERVICE
    tahun_awal;
    forTahun = [];

    rangkuman = [];
    dataLabel = ['Sudah Upload', 'Belum Upload'];
    tampil;
    getDataMahasiswa() {
      this.tampil = 0;

      this.authHttp.get(this.data.urlAllMakalahPraseminar)
        .map(res => res.json())
        .subscribe(data => {
          this.source = new LocalDataSource(data);
          this.list = data;
          this.temp = data;
        })
    }

    getDataPraseminar() {
      this.authHttp.get(this.data.urlPraseminar)
        .map(res => res.json())
        .subscribe(data => {
          this.active = data[0]['active'];
          this.jadwal = data[0]['jadwal_praseminar'];
          this.deadline = data[0]['deadline'];

          this.preview = "http://simeta.apps.cs.ipb.ac.id/uploads/"+data[0]['file'];
        })

    }

  tahunPraseminar;
  dataPraseminar;
  getSummaryPraseminar() {
    this.authHttp.get(this.data.urlAdminPraseminar)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunPraseminar = data.tahun;
        this.dataPraseminar = data.data;
      })
  }

    ngOnInit() {
      this.zone = new NgZone({ enableLongStackTrace: false });
      this.getDataPraseminar();
      this.getDataMahasiswa();
      this.getSummaryPraseminar();
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
      this.getDataPraseminar();
      this.getDataMahasiswa();
      this.getSummaryPraseminar();
      this.getConnection();
    }

    showNoConn() {
      this.toastr.warning("Error Connecting to Server", 'Error');
    }


}
