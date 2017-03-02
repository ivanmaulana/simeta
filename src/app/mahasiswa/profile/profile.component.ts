import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./profile.scss')],
  template: require('./profile.html')
})
export class Profile {
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

  private no;
  private alamat;
  private email;
  private nama_ayah;
  private nama_ibu;
  private no_ortu;
  private telp_ortu;
  private alamat_ortu;

  private creds;
  private message;

  public picture = 'http://simeta.apps.cs.ipb.ac.id/upload/filePhoto/foto-'+this.data.nim+'-'+this.data.nama+'.jpg';
  public defaultPicture = 'assets/img/photo.png';

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  getProfile() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.authHttp.get(this.data.urlProfile)
      .map(res => res.json())
        .subscribe( data => {

          this.no = data[0]['hp'];
          this.email = data[0]['email'];
          this.alamat = data[0]['alamat'];
          this.nama_ayah = data[0]['namaayah'];
          this.nama_ibu = data[0]['namaibu'];
          this.alamat_ortu = data[0]['alamatortu'];
          this.no_ortu = data[0]['noortu'];
          this.telp_ortu = data[0]['telportu'];
        })
  }

  simpan() {
    let koneksi = 0;

    this.authHttp.get(this.data.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        koneksi = data['status'];

      })

    this.creds = JSON.stringify({nim: this.nim, alamat: this.alamat, hp: this.no, email: this.email, namaayah: this.nama_ayah,
    namaibu: this.nama_ibu, noortu: this.no_ortu, telportu: this.telp_ortu, alamatortu: this.alamat_ortu});

    if(!this.alamat || !this.email || !this.no || !this.nama_ayah || !this.nama_ibu || !this.no_ortu || !this.telp_ortu || !this.alamat_ortu) {
      this.showKurang();
    }
    else {
      this.authHttp.post(this.data.urlProfile, this.creds)
        .map(res => res.json())
        .subscribe(data => {
          // console.log(data);
          this.status = data['status'];
          this.message = data['message'];

          if (this.status) this.showSuccess();
          else this.showError();
        }
      )
    }

    setTimeout(() => {
      if (!koneksi) {
        this.showNoConn();
      }
    }, 2000)

  }

  showError() {
    this.toastr.error('Gagal Update Profile', 'Error!');
  }

  showKurang() {
    this.toastr.error('Data Belum Lengkap', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Berhasil Update Profile", 'Success !');
  }

  // ---------------------------------
  // UPLOAD

  // ---------------------------
  // FILE UPLOAD

  private zone: NgZone;

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;

  private progress: number = 0;
  private response: any = {};

  options: NgUploaderOptions = {
    url: this.data.urlUploadPhoto,
    authToken: localStorage.getItem('id_token'),
    allowedExtensions: ['image/png', 'image/jpg'],
    authTokenPrefix: ''
  };
  sizeLimit = 2000000;


  preview = "";
  handleUpload(data: any): void {
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile = data1;

      this.preview = 'http://simeta.apps.cs.ipb.ac.id/upload/filePhoto/'+this.uploadFile[0].filename;
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
      alert('File harus kurang dari 2 MB');
    }

    if (uploadingFile.originalName.search(".jpg") == -1) {
      uploadingFile.setAbort();
      alert('File Harus Berekstensi .jpg');
    }
  }

  showSelesai() {
    this.toastr.success("Berhasil Upload Foto", 'Success!');
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
          this.getProfile();
        }
      })
  }

  ngOnInit() {
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

  refresh() {
    this.getConnection();
    this.getStatus();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }


}
