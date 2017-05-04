import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';
let Chart = require('chart.js');

@Component({
  selector: 'micon',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./micon.scss')],
  template: require('./micon.html')
})
export class miconAdmin {

  // cek koneksi
  noConn;
  status;

  active;
  deadline;
  jadwal;

  file;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  simpan(){
    let creds = JSON.stringify({active: this.active, jadwal_micon: this.jadwal, deadline: this.deadline});

    this.authHttp.put(this.data.urlJadwalMicon, creds)
      .map(res => res.json())
      .subscribe(data => {
          if(data.status) {
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
    this.toastr.success("Update Jadwal Micon Berhasil", 'Success !');
  }

  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadJadwalMicon,
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
    this.toastr.success("Berhasil Upload Jadwal Kolokium", 'Success!');
  }

  //-------------------------

  getDataMicon() {
    this.authHttp.get(this.data.urlJadwalMicon)
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_micon'];
        this.deadline = data[0]['deadline'];

        this.preview = "http://simeta.apps.cs.ipb.ac.id/uploads/"+data[0]['file'];
      })

  }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.getDataMicon();
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
    this.getDataMicon();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
