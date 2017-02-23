import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'nasional',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./nasional.scss')],
  template: require('./nasional.html')
})
export class nasional {
  // status
  statusDaftar;
  statusKolokium;
  statusPraseminar;
  statusProfile;
  statusSeminar;
  statusSidang;
  statusSkl;
  statusTa;

  // cek koneksi
  noConn;
  status;

  private nim;
  private nama;
  private dosen1;
  private dosen_1;
  private dosen2;
  private dosen_2;
  private timestamp;
  private topik;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  delete() {
    this.authHttp.get(this.data.urlDeleteSeminar)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if(data.status) {
          this.refresh();
        }
      })
  }

  submit() {
    let creds = JSON.stringify({nama_konferensi: this.nama_konferensi, judul_paper: this.judul_paper, tempat: this.tempat, tanggal: this.tanggal});

    this.authHttp.post(this.data.urlSeminarKonferensi, creds)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status) {
          this.showSuccess();
          this.getDataSeminar();
        }
      })
  }

  showSuccess() {
    this.toastr.success("Berhasil Update Seminar Mandiri", 'Success!');
  }

  dataSeminar;
  show = false;
  nama_konferensi;
  judul_paper;
  tempat;
  tanggal;
  getDataSeminar() {
    this.authHttp.get(this.data.urlSeminarData)
      .map(res => res.json())
      .subscribe(data => {
        this.dataSeminar = data;

        if(this.dataSeminar.seminar.jenis_seminar == 1) {
          if(data.data.berkas) {
            this.show = true;
          }

          this.nama_konferensi = data.data.nama_konferensi;
          this.judul_paper = data.data.judul_paper;
          this.tempat = data.data.tempat;
          this.tanggal = data.data.tanggal.substr(0,10);
          this.berkas = this.berkas = "http://simeta.apps.cs.ipb.ac.id/upload/fileSeminar/konferensi/"+data.data.berkas;

          console.log(this.show);
        }
      })
  }

  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadKonferensi,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 5000000;


  preview = "";
  berkas;
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;

      if(this.uploadFile[0].filename) {
        this.show = true;
      }
      this.berkas = "http://simeta.apps.cs.ipb.ac.id/upload/fileSeminar/konferensi/"+this.uploadFile[0].filename;
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
      alert('File harus kurang dari 5 MB');
    }

    if (uploadingFile.originalName.search(".zip") == -1) {
      uploadingFile.setAbort();
      alert('File Harus Berekstensi .zip');
    }
  }

  showSelesai() {
    this.toastr.success("Berhasil Upload Makalah Kolokium", 'Success!');
  }

  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  getStatus() {
    this.authHttp.get(this.data.urlStatus)
      .map(res => res.json())
      .subscribe( data => {
        this.statusDaftar = data[0].statusDaftar;
        this.statusKolokium = data[0].statusKolokium;
        this.statusPraseminar = data[0].statusPrasminar;
        this.statusTa = data[0].statusTa;
        this.statusSeminar = data[0].statusSeminar;
        this.statusSidang = data[0].statusSidang;
        this.statusSkl = data[0].statusSkl;
        this.statusProfile = data[0].statusProfile;

        if(this.statusTa) {
          this.getDataMahasiswa();
        }
      })
  }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.getStatus();
    this.getDataSeminar();
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

  penguji1;
  penguji2;
  getDataMahasiswa(){

    this.authHttp.get(this.data.urlTa)
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.dosen1 = data[0]['dosen1'];
        this.dosen2 = data[0]['dosen2'];
        this.dosen_1 = data[0]['dosen_1'];
        this.dosen_2 = data[0]['dosen_2'];
        this.penguji1 = data[0]['penguji1'];
        this.penguji2 = data[0]['penguji2'];
      })
  }

  refresh() {
    this.getDataSeminar();
    this.getConnection();
    this.getStatus();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
