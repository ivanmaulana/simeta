import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');

@Component({
  selector: 'seminar',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./seminar.scss')],
  template: require('./seminar.html')
})
export class seminarDosen {
  // cek koneksi
  noConn;
  status;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
  }


  settings = {
    columns: {
      nim: {
        title: 'NIM'
      },
      nama: {
        title: 'Nama Mahasiswa'
      },
      dosen1: {
        title: 'Pembimbing 1'
      },
      dosen2: {
        title: 'Pembimbing 2'
      },
      penguji1: {
        title: 'Penguji 1'
      },
      penguji2: {
        title: 'Penguji 2'
      },
      jenis_seminar: {
        title: 'Seminar',
        type: 'html'
      },
      tanggal: {
        title: 'Tanggal Seminar'
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

  dataLabel = ['Sudah Seminar', 'Belum Seminar'];
  public pieChartType:string = 'pie';

  dataLabelJenis = ['Belum Seminar', 'Seminar Konferensi', 'Mini Conference', 'Seminar Mandiri'];

  tahunSeminar;
  dataSeminar;
  jenisSeminar;
  getDataSeminar() {
    this.authHttp.get(this.data.urlDosenSeminar)
      .map(res => res.json())
      .subscribe(data => {
        this.tahunSeminar = data.tahun;
        this.dataSeminar = data.data;

        this.jenisSeminar = data.jenis;
      })
  }

  dataSeminarAll;
  getDataSeminarAll() {
    this.authHttp.get(this.data.urlSeminarDosen)
      .map(res => res.json())
      .subscribe(data => {
        this.dataSeminarAll = data;
      })
  }

  persetujuan = [
    {nim: 'G64140073', nama: 'Muhammad Murtadha R', topik: 'Data mining', tanggal:'27/8/2017', tempat:'Lab CI', konfirmasi: 0 },
    {nim: 'G64140073', nama: 'Muhammad Murtadha R', topik: 'Data mining', tanggal:'27/8/2017', tempat:'Lab CI', konfirmasi: 0 },
    {nim: 'G64140073', nama: 'Muhammad Murtadha R', topik: 'Data mining', tanggal:'27/8/2017', tempat:'Lab CI', konfirmasi: 0 },
  ]

  public waw = 0
  setuju(value,nilai){

      if(value == 0 ){
        this.persetujuan[nilai].konfirmasi = 0
      }
      else{
        this.persetujuan[nilai].konfirmasi = 1
        this.showSuccessApprove();
      }
    
  }

  showSuccessApprove() {
    this.toastr.success("Pengajuan disetujui", 'Success');
  }

  




  //---------------------------

  ngOnInit() {
    this.getDataSeminar();
    this.getConnection();
    this.getDataSeminarAll();
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
    this.getDataSeminar();
    this.getConnection();
    this.getDataSeminarAll();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
