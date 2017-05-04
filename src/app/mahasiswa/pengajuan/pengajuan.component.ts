import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';

@Component({
  selector: 'pengajuan',
  providers: [DataService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuan.scss')],
  template: require('./pengajuan.html')
})
export class Pengajuan {

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

  // dosen
  dosen_raw;
  dosen = [];

  // form
  private topik: string;
  private lab: number = 0;
  private dosen_1: string = "";
  private dosen_2: string = "";
  private konsultasi_1: boolean = false;
  private konsultasi_2: boolean = false;
  private pertemuan_1: number = 0;
  private pertemuan_2: number = 0;
  private progress_1: boolean = false;
  private progress_2: boolean = false;
  private progress_3: boolean = false;
  private progress_4: boolean = false;
  private creds: string = "";
  private message;

  query;
  query2;
  c;
  c2;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  daftar(){
    let koneksi = 0;

    this.authHttp.get(this.data.urlTest)
      .map(res => res.json())
      .subscribe(data => {
        koneksi = data['status'];

      })

    this.creds = JSON.stringify({nim: this.data.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2, konsultasi_1: this.konsultasi_1, konsultasi_2: this.konsultasi_2,
    pertemuan_1: this.pertemuan_1, pertemuan_2: this.pertemuan_2, progress_1: this.progress_1, progress_2: this.progress_2, progress_3: this.progress_3, progress_4: this.progress_4});

    this.authHttp.post(this.data.urlDaftarPengajuan, this.creds)
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data);
        this.status = data[0].status;
        this.message = data[0].message;

        if (this.status) this.showSuccess();
        else this.showError();
      }
    )

    setTimeout(() => {
      if (!koneksi) {
        this.showNoConn();
      }
    }, 2000)
  }

  getDataPengajuan(){
    this.authHttp.get(this.data.urlTaPengajuan)
      .map(res => res.json())
        .subscribe( data => {
          this.topik = data[0]['topik'];
          this.lab = data[0]['lab'];
          this.dosen_1 = data[0]['dosen_1'];
          this.konsultasi_1 = data[0]['konsultasi_1'];
          this.pertemuan_1 = data[0]['pertemuan_1'];
          this.dosen_2 = data[0]['dosen_2'];
          this.konsultasi_2 = data[0]['konsultasi_2'];
          this.pertemuan_2 = data[0]['pertemuan_2'];

          this.progress_1 = data[0]['progress_1'];
          this.progress_2 = data[0]['progress_2'];
          this.progress_3 = data[0]['progress_3'];
          this.progress_4 = data[0]['progress_4'];
          this.query = data[0]['dosen1'];
          this.query2 = data[0]['dosen2'];
          if (this.query) this.c = false;
          if (this.query2) this.c2 = false;

        })
    }


  showError() {
    this.toastr.error('Pengajuan Topik Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Pengajuan Topik Berhasil", 'Success !');
  }

  public typeaheadOnSelect1(e:TypeaheadMatch):void {
    this.dosen_1 = this.getIdDosen(e.value);
    console.log(this.dosen_1);
  }

  public typeaheadOnSelect2(e:TypeaheadMatch):void {
    this.dosen_2 = this.getIdDosen(e.value);
    console.log(this.dosen_2);
  }

  getIdDosen(nama){
    let id;
    for (var i = 0; i < this.dosen_raw.length; i++){
      if (nama === this.dosen_raw[i]['nama']) {
        id =  this.dosen_raw[i]['id'];
      }
    }
    return id;
  }

  typeaheadNoResults;
  public changeTypeaheadNoResults(e:boolean):void {
    this.typeaheadNoResults = e;
  }

  radioLab(input){
    this.lab = input;
  }

  radio1(input){
    this.konsultasi_1 = input;
    this.pertemuan_1 = 0;
  }

  radio2(input){
    this.konsultasi_2 = input;
    this.pertemuan_2 = 0;
  }

  private disableCheckbox: boolean = true;
  checkbox(input){
    if (input == 1){
      this.progress_1 = !this.progress_1;
      this.progress_2 = false;
      this.progress_3 = false;
      this.progress_4 = false;

      this.disableCheckbox = !this.disableCheckbox;
    }

    if (input == 2){
      this.progress_2 = !this.progress_2;
      this.progress_1 = false;
    }

    if (input == 3){
      this.progress_3 = !this.progress_3;
      this.progress_1 = false;
    }

    if (input == 4){
      this.progress_4 = !this.progress_4;
      this.progress_1 = false;
    }
  }


  getDataDosen() {
    this.authHttp.get(this.data.urlDosen)
      .map(res => res.json())
      .subscribe(data => {
        this.dosen_raw = data;
        for (let i = 0; i < data.length; i++) {
          this.dosen.push(data[i].nama);
        }
      })
  }

  ngOnInit() {
    this.getDataDosen();
    this.getDataPengajuan();
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

  getStatus() {
    this.authHttp.get(this.data.urlStatus)
      .map(res => res.json())
      .subscribe(data => {
        this.statusDaftar = data[0].statusDaftar;
        this.statusKolokium = data[0].statusKolokium;
        this.statusPraseminar = data[0].statusPrasminar;
        this.statusTa = data[0].statusTa;
        this.statusSeminar = data[0].statusSeminar;
        this.statusSidang = data[0].statusSidang;
        this.statusSkl = data[0].statusSkl;
        this.statusProfile = data[0].statusProfile;
      })
  }

  refresh() {
    this.getDataPengajuan();
    this.getDataDosen();
    this.getStatus();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
