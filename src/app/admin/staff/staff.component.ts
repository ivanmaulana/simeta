import { Subscription } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { Component, ViewEncapsulation } from '@angular/core';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../data/data.service';
import { LocalDataSource } from 'ng2-smart-table';

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

  staff: LocalDataSource;

  show = true;

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
    let creds = JSON.stringify({username: this.username, nama: this.nama, singkatan: this.singkatan,
                no_hp: this.hp, email: this.email, nip: this.nip, lab: this.lab, role: this.role});

    this.authHttp.post(this.data.urlAdminStaff, creds)
      .map(res => res.json())
      .subscribe(data => {
        this.showSuccess();

        this.show = false;
        this.authHttp.get(this.data.urlStaff)
          .map(res => res.json())
          .subscribe( data1 => {
            this.show = true;
            this.staff = new LocalDataSource(data1);
          });

      });

  }

  showSuccess() {
    this.toastr.success('Success Update Staff', 'Success');
  }

  radioLab(input) {
    this.lab = input;
  }

  radioRole(input) {
    this.role = input;
  }

  // -----------------------------
  // TEMPLATE

  // DASHBOARD SERVICE
  getDataPengajuan() {
    this.authHttp.get(this.data.urlStaff)
      .map(res => res.json())
      .subscribe( data => {
        this.staff = new LocalDataSource(data);
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
