import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import { IMyOptions } from 'mydatepicker';
let Chart = require('chart.js');

@Component({
  selector: 'seminar',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./seminar.scss')],
  template: require('./seminar.html')
})
export class seminarAdmin {
  // cek koneksi
  noConn;
  status;

  link = this.data.urlExcelSeminarSidang+localStorage.getItem('id_token');

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    width: '220px',
  };

  d;
  dateFormat;
  tanggal;
  onDateChanged(e) {
    this.tanggal = e.formatted;
  }

  jenis_seminar;
  test(e) {
    console.log(e);
    if(e.data.jenis_seminar.search("Mandiri") != -1) {
      this.jenis_seminar = 3;
    }
    else if(e.data.jenis_seminar.search("Mini") != -1) {
      this.jenis_seminar = 2;
    }
    else if(e.data.jenis_seminar.search("Konferensi") != -1) {
      this.jenis_seminar = 1;
    }
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
  dataJenisSeminar;
  getDataSeminar() {
    this.authHttp.get(this.data.urlAdminSeminar)
      .map(res => res.json())
      .subscribe(data => {
        this.tahunSeminar = data.tahun;
        this.dataSeminar = data.data;
        this.dataJenisSeminar = data.jenis;
      })
  }

  dataSeminarAll;
  getDataMahasiswa() {
    this.authHttp.get(this.data.urlSeminarAll)
      .map(res => res.json())
      .subscribe(data => {
        this.dataSeminarAll = data;
      })
  }

  //---------------------------

  ngOnInit() {
    this.getDataSeminar();
    this.getConnection();
    this.getDataMahasiswa();
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
    this.getDataMahasiswa();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
