import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'praseminar',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./praseminar.scss')],
  template: require('./praseminar.html')
})
export class Praseminar {
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


  private active;
  private deadline;
  private jadwal;
  private response1;
  private link;


  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  getDataKolokium(){
    this.authHttp.get(this.data.urlPraseminar)
      .map(res => res.json())
      .subscribe(data => {
        this.active = data[0]['active'];
        this.jadwal = data[0]['jadwal_praseminar'];
        this.deadline = data[0]['deadline'];
        this.link = 'http://simeta.apps.cs.ipb.ac.id/uploads/'+data[0]['file'];

        if (this.jadwal) this.response1 = true;
      })
  }

  submit(){
    let creds = JSON.stringify({topik: this.topik, tanggal: this.date});

    this.authHttp.post(this.data.urlFilePraseminar, creds)
      .map(res => res.json())
      .subscribe(data => {

        if(this.status) this.showSuccess();
        else this.showError();

      }
    )
  }

  date;
  getDataFile() {
    this.authHttp.get(this.data.urlFilePraseminar)
      .map(res => res.json())
      .subscribe(data => {
        if(data.length > 0) {
          this.preview = "http://simeta.apps.cs.ipb.ac.id/uploads/filePraseminar/"+data[0].makalah;
          this.date = data[0].tanggal;
        }
      })
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
    url: this.data.urlUploadPraseminar,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 3000000;


  preview = "";
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;

      this.preview = "http://simak.apps.cs.ipb.ac.id/uploads/filePraseminar/"+this.uploadFile[0].filename;
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
    this.toastr.success("Berhasil Upload Makalah Praseminar", 'Success!');
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

  refresh() {
    this.getConnection();
    this.getStatus();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
