import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import {IMyOptions} from 'mydatepicker';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'kolokium',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./kolokium.scss')],
  template: require('./kolokium.html')
})
export class Kolokium {

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

  private active;
  private deadline;
  private jadwal_kolokium;
  private response1;
  private link;


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
    this.date = e.formatted;
  }

  getDataKolokium(){
    this.authHttp.get(this.data.urlKolokium)
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal_kolokium = data[0]['jadwal_kolokium'];
        this.deadline = data[0]['deadline'];
        this.link = 'http://simeta.apps.cs.ipb.ac.id/uploads/'+data[0]['file'];

        if (this.jadwal_kolokium) this.response1 = true;
      })
  }

  date;
  simpan(){
    let creds = JSON.stringify({topik: this.topik, tanggal: this.date});

    this.authHttp.post(this.data.urlFileKolokium, creds)
      .map(res => res.json())
      .subscribe(data => {

        if(this.status) {
          this.showSuccess();
          this.upload = 1;
        }
        else this.showError();

      }
    )
  }

  showError() {
    this.toastr.error('Update Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Update Topik Berhasil", 'Success !');
  }


  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadKolokium,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 3000000;


  preview = "";
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;

      this.preview = "http://simeta.apps.cs.ipb.ac.id/uploads/fileKolokium/"+this.uploadFile[0].filename;
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
          this.getDataKolokium();
        }
      })
  }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
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

  getDataMahasiswa(){
    this.getDataFile();

    this.authHttp.get(this.data.urlTa)
      .map(res => res.json())
      .subscribe(data => {
        this.topik = data[0]['topik'];
        this.dosen1 = data[0]['dosen1'];
        this.dosen2 = data[0]['dosen2'];
        this.dosen_1 = data[0]['dosen_1'];
        this.dosen_2 = data[0]['dosen_2'];
      })
  }

  upload = 0;
  getDataFile() {
    this.authHttp.get(this.data.urlFileKolokium)
      .map(res => res.json())
      .subscribe(data => {
        if(data.length > 0) {
          if(data[0].makalah != null) this.preview = "http://simeta.apps.cs.ipb.ac.id/uploads/fileKolokium/"+data[0].makalah;
          this.date = data[0].tanggal;
          this.dateFormat = new Date(data[0].tanggal);
          this.dateFormat = <Object> {date: {year: this.dateFormat.getFullYear(), month: this.dateFormat.getMonth() + 1, day: this.dateFormat.getDate()}};

          if(data[0].tanggal) this.upload = 1;
        }
      })
  }

  refresh() {
    this.getConnection();
    this.getStatus();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
