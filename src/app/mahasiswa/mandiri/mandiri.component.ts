import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import { IMyOptions } from 'mydatepicker';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'mandiri',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./mandiri.scss')],
  template: require('./mandiri.html')
})
export class Mandiri {

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

  private logPDF = this.data.urlLogPDF;
  private seminarPDF = this.data.urlSeminarPDF;

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

  onDateChanged(e) {
    this.tanggal = e.formatted;
  }

  delete() {
    this.authHttp.get(this.data.urlDeleteSeminar)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status) {
          this.refresh();
        }
      })
  }

  submit() {
    let creds = JSON.stringify({topik: this.topik, pembahas_1: this.pembahas_1, pembahas_2: this.pembahas_2, pembahas_3: this.pembahas_3, tempat: this.tempat, jam: this.jam, tanggal: this.tanggal});

    this.authHttp.post(this.data.urlSeminarMandiri, creds)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status) {
          this.upload = 1;
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
  pembahas_1;
  pembahas_2;
  pembahas_3;
  tempat;
  jam;
  tanggal;
  berkas;
  makalah;
  upload = 0;

  pengumuman = 0;
  log;
  getDataSeminar() {
    this.authHttp.get(this.data.urlSeminarData)
      .map(res => res.json())
      .subscribe(data => {
        this.dataSeminar = data;
        this.log = data.log;

        if(this.dataSeminar.seminar.jenis_seminar == 3) {
          this.upload = 1;
          this.show = true;
          this.pembahas_1 = data.data.pembahas_1;
          this.pembahas_2 = data.data.pembahas_2;
          this.pembahas_3 = data.data.pembahas_3;
          this.tempat = data.data.tempat;
          this.jam = data.data.jam;
          this.tanggal = data.data.tanggal;
          this.dateFormat = new Date(data.data.tanggal);
          this.dateFormat = <Object> {date: {year: this.dateFormat.getFullYear(), month: this.dateFormat.getMonth() + 1, day: this.dateFormat.getDate()}};

          this.berkas = data.data.berkas;
          if(data.data.makalah) {
            this.pengumuman = 1;
            this.makalah = "http://simeta.apps.cs.ipb.ac.id/uploads/fileSeminar/mandiri/"+data.data.makalah;
          }
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
    url: this.data.urlUploadMandiri,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 3000000;

  preview = "";
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;
      this.pengumuman = 1;
      this.makalah = "http://simeta.apps.cs.ipb.ac.id/uploads/fileSeminar/mandiri/"+this.uploadFile[0].filename;
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
    this.getStatus();
    this.getConnection();
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
    this.getStatus();
    this.getConnection();
    this.getConnection();
    this.getDataSeminar();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
