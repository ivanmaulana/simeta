import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';
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

  balas;
  submit(id){
    let creds = JSON.stringify({topikId: id, jawaban: this.balas});

    this.authHttp.post(this.data.urlBalasDosen, creds)
      .map(res => res.json())
      .subscribe(data => {
          if(data.status) {
            this.showSuccessBalas();
            this.lihat(id);
          }
        }
      )

    this.balas = "";
  }

  showSuccessBalas() {
    this.toastr.success("Berhasil Menjawab Diskusi", 'Success');
  }

  biodata = false;

  // -----------------------
  // APPROVAL

  nim;
  penguji1;
  penguji2;
  sudahApprove;
  belumApprove;
  public typeaheadOnSelect(e:TypeaheadMatch):void {
    this.nim = e.item.nim;
    this.nama = e.item.nama;
    this.topik = e.item.topik;
    this.dosen1 = e.item.dosen1;
    this.dosen2 = e.item.dosen2;
    this.penguji1 = e.item.penguji1;
    this.penguji2 = e.item.penguji2;

    this.sudahApprove = 0;
    this.belumApprove = 0;
    this.log = [];

    for(let i = 0; i < this.temp.length; i++) {
      if (this.temp[i].nama == this.nama) {
        this.log.push(this.temp[i]);
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
  dataMahasiswa;
  getDataMahasiswa() {
    this.authHttp.get(this.data.urlAllMakalahBimbingan)
      .map(res => res.json())
      .subscribe(data => {
        this.dataMahasiswa = data;
        for(let i = 0; i < data.length; i++) {
          this.bimbinganMahasiswa.push(data[i].nama)
        }
      })
  }

  ngOnInit() {
    this.getDataMahasiswa();
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
    this.getDataMahasiswa();
    this.getConnection();
    this.getLog();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }


}
