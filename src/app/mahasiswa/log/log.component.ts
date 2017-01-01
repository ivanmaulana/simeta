import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'log',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./log.scss')],
  template: require('./log.html')
})
export class Log {

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
  private dosen2;
  private timestamp;
  private topik;

  // TULIS LOG
  private topik_log = "ini topik log";
  private dosen_1 = 25;
  private dosen_2 = 24;
  private tempat = "mulmed";
  private jam = "10:30";
  private date = "2016-08-09";
  private progress = "ini progress";
  private kendala = "ini kendala";
  private rencana = "ini rencana";
  private statusKirim;
  private messageKirim;
  private creds2;


  private response;
  private click: boolean = false;

  // DETAIL
  private resDetail;
  private resJawaban;
  private res;

  private id;
  private creds;
  private balasan;
  private message;

  private diterima : number = 0;
  private total : number = 0;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  getDataMahasiswa(){
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

  kirim(){
    this.creds2 = JSON.stringify({dosen_1: this.dosen_1, dosen_2: this.dosen_2, tanggal: this.date, jam: this.jam, tempat: this.tempat, topik: this.topik_log, progress: this.progress, kendala: this.kendala, rencana: this.rencana});

    this.authHttp.post(this.data.urlLog, this.creds2)
      .map(res => res.json())
      .subscribe(data => {
        this.statusKirim = data['status'];
        this.messageKirim = data['message'];

        if (this.statusKirim) {
          this.showKirimSuccess();
          this.click = !this.click;
          this.getDataLog();
        }
        else {
          this.showKirimError();
        }
      })
  }

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
          this.getDataLog();
        }
      })
  }

  ngOnInit() {
    this.getConnection();
    this.getStatus();
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

  showKirimError() {
    this.toastr.error('Tulis Log Gagal', 'Error!');
  }

  showKirimSuccess() {
    this.toastr.success("Tulis Log Berhasil", 'Success !');
  }

  tulis(){
    this.click = !this.click;
  }

  changeTimeStamp(value){
    return value.substr(0,10);
  }

  getDataLog(){
    this.authHttp.get(this.data.urlLog)
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        for(let i = 0; i < data.length; i++) {
          if(data[i].approval) {
            this.diterima++;
            console.log('ada');
          }
          this.total++;
          console.log(this.total);
        }
      })
  }

  getLogCount(id){
    return this.authHttp.get(this.data.urlLog+'count/'+id)
      .map(res => res.json())
      .subscribe(data => {
      })
  }

  openBimbingan(id){
    this.id = id;

    this.authHttp.get(this.data.urlLog+'detail/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resDetail = data;
        if (this.resDetail) this.res = 1;
      })

    this.authHttp.get(this.data.urlLog+'jawaban/'+id)
      .map(res => res.json())
      .subscribe(data => {
        this.resJawaban = data;
      })
  }

  balas(id){
    this.creds = JSON.stringify({topikId: id, nim: this.data.nim, jawaban: this.balasan});

    this.authHttp.post(this.data.urlLog+"balas/mahasiswa/", this.creds)
      .map(res => res.json())
      .subscribe(data => {
        this.status = data['status'];
        this.message = data['message'];

        if (this.status) this.showSuccess();
        else this.showError();

        this.openBimbingan(id);
      }
    )

    this.balasan = "";
  }

  showError() {
    this.toastr.error('Diskusi Gagal', 'Error!');
  }

  showSuccess() {
    this.toastr.success("Jawab Diskusi Berhasil", 'Success !');
  }

}
