import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';

@Component({
  selector: 'ta',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./penguji.scss')],
  template: require('./penguji.html')
})
export class PengujiAdmin {

  // cek koneksi
  noConn;
  status;

  pengajuan;

  topik;
  lab;

  dosen1;
  dosen2;

  dosen_1 = 0;
  dosen_2 = 0;

  penguji1;
  penguji2;

  penguji_1 = 0;
  penguji_2 = 0;

  dosen = [];
  dosen_raw;

  nim;

  response;
  message;

  selected = "";
  click = false;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  selectDosen1(e: TypeaheadMatch): void {
    this.dosen_1 = this.getIdDosen(e.value);
  }

  selectDosen2(e: TypeaheadMatch): void {
    this.dosen_2 = this.getIdDosen(e.value);
  }

  selectDosen3(e: TypeaheadMatch): void {
    this.penguji_1 = this.getIdDosen(e.value);
  }

  selectDosen4(e: TypeaheadMatch): void {
    this.penguji_2 = this.getIdDosen(e.value);
  }

  nama;
  no;
  tahun_masuk;
  tempat_lahir;
  tanggal_lahir;
  alamat;
  alamat_ortu;
  nama_ayah;
  nama_ibu;
  no_ortu;
  telp_ortu;
  email;
  gambar;
  public typeaheadOnSelect(e:TypeaheadMatch):void {
    this.topik = '';
    this.lab = 0;
    this.dosen_1 = 0;
    this.dosen_2 = 0;
    this.dosen1 = '';
    this.dosen2 = '';
    this.penguji_1 = 0;
    this.penguji_2 = 0;
    this.penguji1 = '';
    this.penguji2 = '';
    this.click = false;

    this.nim = e.item.nim;
    this.nama = e.item.nama;
    this.no = e.item.hp;
    this.tahun_masuk = e.item.tahunmasuk;
    this.alamat = e.item.alamat;
    this.alamat_ortu = e.item.alamatortu;
    this.tempat_lahir = e.item.tempatlahir;
    this.tanggal_lahir = e.item.tgllahir;
    this.nama_ayah = e.item.namaayah;
    this.nama_ibu = e.item.namaibu;
    this.no_ortu = e.item.noortu;
    this.telp_ortu = e.item.telportu;
    this.email = e.item.email;
    this.gambar = 'http://simeta-api.apps.cs.ipb.ac.id/uploads/filePhoto/foto-'+this.nim+'-'+this.nama+'.png';

    let creds = JSON.stringify({nama: e.value});

    this.authHttp.post(this.data.urlTaPenentuan, creds)
      .map(res => res.json())
      .subscribe(data => {
        this.click = true;

        this.topik = data[0]['topik'];
        this.lab = data[0]['lab'];
        this.dosen_1 = data[0]['dosen_1'];
        this.dosen_2 = data[0]['dosen_2'];

        if (data[0]['dosen1']) this.dosen1 = data[0]['dosen1'];
        else this.dosen1 = "";

        if (data[0]['dosen2']) this.dosen2 = data[0]['dosen2'];
        else this.dosen2 = "";

        if (data[0]['penguji1']) this.penguji1 = data[0]['penguji1'];
        else this.penguji1 = "";

        if (data[0]['penguji2']) this.penguji2 = data[0]['penguji2'];
        else this.penguji2 = "";

      })
  }

  simpan() {
    if(this.dosen1 == "") {
      this.dosen_1 = 0;
    }
    if(this.dosen2 == "") {
      this.dosen_2 = 0;
    }
    if(this.penguji1 == "") {
      this.penguji_1 = 0;
    }
    if(this.penguji2 == "") {
      this.penguji_2 = 0;
    }

    let creds;
    creds = JSON.stringify({nim: this.nim, topik: this.topik, lab: this.lab, dosen_1: this.dosen_1, dosen_2: this.dosen_2,
    penguji_1: this.penguji_1, penguji_2: this.penguji_2});

    this.authHttp.put(this.data.urlTaEdit, creds)
      .map(res => res.json())
      .subscribe(data => {
        this.response = data[0].status;
        this.message = data[0].message;

        if(this.response) {
          this.showSuccess();
        }
      })

  }

  showSuccess() {
    this.toastr.success("Penentuan TA Berhasil", 'Success !');
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

  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  getDataPengajuan() {
    this.authHttp.get(this.data.urlMahasiswaAll)
      .map(res => res.json())
      .subscribe( data => {
        this.pengajuan = data;

      })
  }

  ngOnInit() {
    this.getDataDosen();
    this.getDataPengajuan();
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
    this.getDataPengajuan();
    this.getDataDosen();
    this.getConnection();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
