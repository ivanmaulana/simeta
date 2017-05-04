import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import {IMyOptions} from 'mydatepicker';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'skl',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./skl.scss')],
  template: require('./skl.html')
})
export class Skl {
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

  private dosen1;
  private dosen_1;
  private dosen2;
  private dosen_2;
  private topik;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
    this.d = new Date();
    this.dateFormat = {date: {year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate()}};

  }

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    width: '220px',
  };

  d;
  dateFormat;
  private tanggal_skl;

  onDateChanged(e) {
    this.tanggal = e.formatted;
  }

  tanggal;
  berkas;
  show = false;
  upload = 0;
  getDataSKL() {
    this.authHttp.get(this.data.urlSKL)
      .map(res => res.json())
      .subscribe(data => {
        if(data.length > 0) {
          this.upload = 1;
          this.show = true;
          this.tanggal = data[0].tanggal;

          this.dateFormat = new Date(data[0].tanggal);
          this.dateFormat = <Object> {date: {year: this.dateFormat.getFullYear(), month: this.dateFormat.getMonth() + 1, day: this.dateFormat.getDate()}};

          if(data[0].berkas) this.berkas = "http://simeta.apps.cs.ipb.ac.id/uploads/fileSKL/"+data[0].berkas;
        }
      })
  }

  simpan() {
    let creds = JSON.stringify({topik: this.topik, tanggal: this.tanggal});

    this.authHttp.post(this.data.urlSKL, creds)
      .map(res => res.json())
      .subscribe(data => {

        if(this.status) {
          this.upload = 1;
          this.show = true;
          this.showSuccess();
        }
        else this.showError();

      })
  }

  showError() {
    this.toastr.error('Update Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Update Topik Berhasil", 'Success !');
  }

  // ---------------
  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;
  sizeLimit = 30000000;
  hasBaseDropZoneOver: boolean = false;
  uploadFile: any;

  private berkas_skl;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadSKL,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };

  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;

      this.berkas = "http://simeta.apps.cs.ipb.ac.id/uploads/fileSKL/"+this.uploadFile[0].filename;
      this.showSelesai();
    }

    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent);
    });
  }

  // ---------------

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
    this.toastr.success("Berhasil Upload SKL", 'Success!');
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
    this.getDataSKL();
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
    this.getDataSKL();
    this.getConnection();
    this.getStatus();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }


}
