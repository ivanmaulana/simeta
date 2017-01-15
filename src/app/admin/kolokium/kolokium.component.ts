import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

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

    // console.log(this.tahun);

    this.pilih_tahun = this.tahun;

  }

  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  public chartHovered(e:any):void {
    // console.log(e);
  }


  // --------------------------------
  // CHARTS

  temp;

  checkNim(value, year) {

  }

  onChange(e) {
    // console.log(e.target.value);
    var y = e.target.value.substr(2,2);
    // console.log(y);

    this.list = [];

    for(let i = 0; i < this.temp.length; i++) {
      var x = this.temp[i].nim.substr(3,2);
      // console.log('tengah nim :'+x);
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
      makalah: {
        title: 'Lihat',
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


  simpan(){
    let creds = JSON.stringify({active: this.active, jadwal_kolokium: this.jadwal, deadline: this.deadline});

    this.authHttp.put("http://simak.apps.cs.ipb.ac.id:2016/jadwalKolokium", creds)
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

      this.preview = "http://simak.apps.cs.ipb.ac.id/file/"+this.uploadFile[0].filename;
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

    this.authHttp.get(this.data.urlAllMakalah)
      .map(res => res.json())
      .subscribe(data => {
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

        this.preview = "http://simak.apps.cs.ipb.ac.id/"+data[0]['file'];
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
