import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthHttp, JwtHelper} from 'angular2-jwt';

import {DataService} from '../data/data.service';

@Component({
  selector: 'mahasiswa',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Departemen Ilmu Komputer IPB</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://agri.web.id">Ivan Maulana</a> 2016</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Mahasiswa {

  public nim; 
  public nama;
  public token;
  public dosen1;
  public dosen2;
  public penguji1;
  public penguji2;
  public topik;
  public statusTa;
  public statusDaftar;
  public statusKolokium;
  public statusPraseminar;
  public statusSeminar;
  public statusSidang;
  public statusSkl;
  public statusProfile;
  public dosen_1;
  public dosen_2;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private data: DataService, private authHttp: AuthHttp) {
  }

  ngOnInit() {
    if (localStorage.getItem('id_token')) {
      let decode = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
      let role = decode.role;

      if (role === 2) {
        this.router.navigate(['/dosen']);
      }
      else if (role === 4) {
        this.router.navigate(['/admin']);
      }
      else if (role === 1) {
        this.router.navigate(['/admin'])
      }
      else if (role ===3) {
        this.getStatus();
        this.getDataMahasiswa();
      }
    }
    else {
      this.router.navigate(['/auth']);
    }
  }

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
        }
      })
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
        this.penguji1 = data[0]['penguji1'];
        this.penguji2 = data[0]['penguji2'];
      })
  }

}
