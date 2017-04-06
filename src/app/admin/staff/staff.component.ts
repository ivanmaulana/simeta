import { AuthHttp } from 'angular2-jwt';
import { Component, ViewEncapsulation } from '@angular/core';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'staff',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./staff.scss')],
  template: require('./staff.html')
})
export class StaffAdmin {

  // cek koneksi
  noConn;
  status;

  staff;

  settings = {
    columns: {
      username: {
        title: 'Username'
      },
      nama: {
        title: 'Nama Staff'
      },
      email: {
        title: 'Email'
      },
      nip: {
        title: 'NIP'
      },
      role: {
        title: 'Status'
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

  lab;
  username;
  nama;
  singkatan;
  hp;
  email;
  nip;
  role;

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {
  }

  test(e) {
    this.username = '';
    this.nama = '';
    this.singkatan = '';
    this.hp = '';
    this.email = '';
    this.nip = '';
    this.role = '';
    this.lab = 0;

    this.username = e.username;
    this.nama = e.nama;
    this.singkatan = e.singkatan;
    this.hp = e.no_hp;
    this.email = e.email;
    this.nip = e.nip;
    this.lab = e.lab;

    if (e.role === 'Komisi Pendidikan') {
      this.role = 4;
    } else if (e.role === 'Dosen') {
      this.role = 2;
    } else if (e.role === 'Admin') {
      this.role = 1;
    }
  }

  submit() {
    console.log('simpan');
  }

  radioLab(input) {
    this.lab = input;
    console.log(input);
  }

    // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  getDataPengajuan() {
    this.authHttp.get(this.data.urlStaff)
      .map(res => res.json())
      .subscribe( data => {
        this.staff = data;
      });
  }

  ngOnInit() {
    this.getDataPengajuan();
    this.getConnection();
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
    }, 5000);
  }

  refresh() {
    this.getConnection();
    this.getDataPengajuan();
  }

  showNoConn() {
    this.toastr.warning('Error Connecting to Server', 'Error');
  }

}
