import {Component, ViewEncapsulation} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
let Chart = require('chart.js');

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class DashboardAdmin {
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


  }

  public pieChartType:string = 'pie';
  dataLabel = ['Sudah Upload', 'Belum Upload'];

  // --------------------
  // BAR CHART

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = ['Belum TA', 'TA', 'Kolokium', 'Praseminar', 'Seminar', 'Sidang', 'SKL'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData = [];

  // --------------------
  // DEFAULT TEMPLATE

  tahunKolokium;
  dataKolokium;
  getDataKolokium() {
    this.authHttp.get(this.data.urlAdminKolokium)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunKolokium = data.tahun;
        this.dataKolokium = data.data;
    })
  }

  tahunPraseminar;
  dataPraseminar;
  getDataPraseminar() {
    this.authHttp.get(this.data.urlAdminPraseminar)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunPraseminar = data.tahun;
        this.dataPraseminar = data.data;
    })
  }

  tahunSeminar;
  dataSeminar;
  getDataSeminar() {
    this.authHttp.get(this.data.urlAdminSeminar)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunSeminar = data.tahun;
        this.dataSeminar = data.data;
    })
  }

  tahunSidang;
  dataSidang;
  getDataSidang() {
    this.authHttp.get(this.data.urlAdminSidang)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunSidang = data.tahun;
        this.dataSidang = data.data;
    })
  }

  tahunSKL;
  dataSKL;
  getDataSKL() {
    this.authHttp.get(this.data.urlAdminSKL)
      .map(res => res.json())
      .subscribe(data => {

        this.tahunSKL = data.tahun;
        this.dataSKL = data.data;
    })
  }

  tahunSummary;
  dataSummary;
  totalSummary;
  getDataSummary() {
    this.authHttp.get(this.data.urlAdminSummary)
      .map(res => res.json())
      .subscribe(data => {

        this.totalSummary = data.total;
        this.tahunSummary = data.tahun;
        this.dataSummary = data.data;

        for(let i = 0; i < this.tahunSummary.length; i++) {
          this.barChartData.push({data: this.dataSummary[this.tahunSummary[i]], label: 'Angkatan '+this.tahunSummary[i]});
        }

    })
  }

  ngOnInit() {
    this.getConnection();
    this.getDataSummary();
    this.getDataPraseminar();
    this.getDataSeminar();
    this.getDataKolokium();
    this.getDataSidang();
    this.getDataSKL();
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
    this.getDataSummary();
    this.getDataPraseminar();
    this.getDataSeminar();
    this.getDataKolokium();
    this.getDataSidang();
    this.getDataSKL();
  }

  showNoConn() {
    this.toastr.warning("Error Connecting to Server", 'Error');
  }

}
