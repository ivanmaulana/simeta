import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'log',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class LogDosen {

  // cek koneksi
  noConn;
  status;

  // log
  temp;
  log;
  mahasiswa = [];

  logDetail = [];

  nama = '';
  topik;
  dosen1;
  dosen2;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }



  // test() {
  //   swal('Oops...',
  //     'Something went wrong!',
  //     'error'); // the function itself
  // }

  lihatData(id) {
    for (let i = 0; i < this.log.length; i++) {
      if (this.log[i].id == id) {
        return this.log[i];
      }
    }
  }

  resJawaban;
  lihat(id) {
    this.logDetail = this.lihatData(id);

    this.authHttp.get(this.data.urlLog+'jawaban/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resJawaban = data;
      })

  }

  balasan;
  balas(id){
    let creds = JSON.stringify({topikId: id, jawaban: this.balasan});

    this.authHttp.post("http://simak.apps.cs.ipb.ac.id:2016/log/balas/dosen/", creds)
      .map(res => res.json())
      .subscribe(data => {
          if(data.status) {
            this.showSuccessBalas();
            this.lihat(id);
          }
        }
      )

    this.balasan = "";
  }

  showSuccessBalas() {
    this.toastr.success("Berhasil Menjawab Diskusi", 'Success');
  }

  biodata = false;

  // -----------------------
  // APPROVAL

  sudahApprove;
  belumApprove;
  onChange(deviceValue) {
    this.sudahApprove = 0;
    this.belumApprove = 0;
    this.log = [];

    if (deviceValue != 0) {
      for(let i = 0; i < this.temp.length; i++) {
        if (this.temp[i].nama == deviceValue) {
          this.log.push(this.temp[i]);
        }
      }

      for(let i = 0; i < this.bimbingan.length; i++) {
        if(this.bimbingan[i].nama == deviceValue) {
          this.nama = this.bimbingan[i].nama;
          this.topik = this.bimbingan[i].topik;
          this.dosen1 = this.bimbingan[i].dosen1;
          this.dosen2 = this.bimbingan[i].dosen2;
        }
      }

      for(let i = 0; i < this.log.length; i++) {
        if(this.log[i].approval == 1) {
          this.sudahApprove++;
        }
        else {
          this.belumApprove++;
        }
      }

    }
    else {
      this.log = this.temp;
      this.nama = '';
    }

  }

  approve(id, nim,  status) {
    this.sudahApprove = 0;
    this.belumApprove = 0;
    let creds = JSON.stringify({status: status, id: id});

    this.authHttp.post(this.data.urlApproveLog, creds)
      .map(res => res.json())
      .subscribe(data => {
        if(data.status) {
          this.getLogAfterApprove(nim);
          this.showSuccessApprove();
          this.getLog();
        }
      })
  }

  getLogAfterApprove(nim) {
    this.authHttp.get(this.data.urlLog+'dosen/')
      .map(res => res.json())
      .subscribe(data => {
        let temp2 = [];
        for(let i = 0; i < data.length; i++) {
          if(data[i].nim == nim) {
            temp2.push(data[i]);
          }
        }

        this.log = temp2;
        for(let i = 0; i < this.log.length; i++) {
          this.log[i].tanggal = this.data.tanggalSingkat(this.log[i].tanggal);
          this.log[i].jam = this.log[i].jam.substr(0,5);
        }

        for(let i = 0; i < this.log.length; i++) {
          if(this.log[i].approval == 1) {
            this.sudahApprove++;
          }
          else {
            this.belumApprove++;
          }
        }
    })

  }

  showSuccessApprove() {
    this.toastr.success("Berhasil Update Log", 'Success');
  }


  // -------------------
  // DEFAULT

  bimbinganMahasiswa = [];
  bimbingan;
  getBimbingan() {
    this.authHttp.get(this.data.urlAllMakalahBimbingan)
      .map(res => res.json())
      .subscribe(data => {
        this.bimbingan = data;
        for(let i = 0; i < data.length; i++) {
          this.bimbinganMahasiswa.push(data[i].nama)
        }
      })
  }

  ngOnInit() {
    this.getBimbingan();
    this.getConnection();
    this.getLog();
  }

  getLog() {
    this.authHttp.get(this.data.urlLog+'dosen/')
      .map(res => res.json())
      .subscribe(data => {
        this.temp = data;
        this.log = data;

        for(let i = 0; i < this.log.length; i++) {
          this.log[i].tanggal = this.data.tanggalSingkat(this.log[i].tanggal);
          this.log[i].jam = this.log[i].jam.substr(0,5);
        }
      })
  }

  getConnection() {
    this.noConn = 0;

    this.authHttp.get(this.data.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
      });

    setTimeout(() => {
      if (!this.status) {
        this.status = 0;
        this.noConn = 1;
        this.showNoConn();
      }
    }, 5000)
  }

  refresh() {
    this.getBimbingan();
    this.getConnection();
    this.getLog();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }


}
