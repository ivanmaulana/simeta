import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'sidang',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./sidang.scss')],
  template: require('./sidang.html')
})
export class Sidang {
  ismeridian:boolean = false;
  isArrow:boolean = false;
  mytime:Date = new Date();

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

  // sidang
  private tanggal;
  private jam;
  private tempat;

  private sidangPDF = this.data.urlSidangPDF;
  private kelengkapanPDF = this.data.urlKelengkapanPDF;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  show = false;
  pengumuman = 0;
  getDataSidang() {
    this.authHttp.get(this.data.urlSidang)
      .map(res => res.json())
      .subscribe(data => {
        if(data.length > 0) {
          this.show = true;
          this.tempat = data[0].tempat;
          this.tanggal = data[0].tanggal;
          this.jam = data[0].jam;
          if(data[0].makalah) {
            this.pengumuman = 1;
            this.makalah = "http://simeta.apps.cs.ipb.ac.id/uploads/fileSidang/"+data[0].makalah;
          }
        }
      })
  }

  submit() {
    let creds = JSON.stringify({topik: this.topik, tempat: this.tempat, tanggal: this.tanggal, jam: this.jam});

    this.authHttp.post(this.data.urlSidang, creds)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status) {
          this.getDataSidang();
          this.show = true;
          this.showSuccess();
        }
      })
  }

  showSuccess() {
    this.toastr.success("Pendaftaran Sidang Berhasil", 'Success!');
  }

  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadSidang,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 30000000;

  makalah;
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;
      this.pengumuman = 1;

      this.makalah = "http://simeta.apps.cs.ipb.ac.id/uploads/fileSidang/"+this.uploadFile[0].filename;
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
    this.getDataSidang();
    this.getStatus();
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
    this.getDataSidang();
    this.getStatus();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
