import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class DataService {
  public id;
  public nim;
  public nama;
  public status;
  public token;
  public username;
  public topik;
  public lab;

  // JWT
  public decode;
  public role;

  // DOSEN
  public dosen_1;
  public dosen_2;

  // PROFILE
  public no;
  public email;
  public nama_ayah;
  public nama_ibu;
  public alamat;
  public alamat_ortu;
  public no_ortu;

  // SIDANG
  public tanggal;
  public jam;
  public tempat;

  private aaa = 'aaa';

  // URL
  public urlTa = 'http://localhost:2016/ta/';
  public urlDataPengajuan = 'http://localhost:2016/ta/daftar/';
  public urlDosen = 'http://localhost:2016/dosen/';
  public urlDaftarPengajuan = 'http://localhost:2016/ta/pengajuan/';
  public urlProfile = 'http://localhost:2016/profile/';
  public urlSidang = 'http://localhost:2016/sidang/';
  public urlStatus = 'http://localhost:2016/status/';
  public urlTest = 'http://localhost:2016/test/';
  public urlLog = 'http://localhost:2016/log/';
  public urlSKL = 'http://localhost:2016/skl/';
  public urlKolokium = 'http://localhost:2016/jadwalKolokium';
  public urlPraseminar = 'http://localhost:2016/jadwalPraseminar';

  public urlJadwalMicon = 'http://localhost:2016/jadwalMicon';

  public urlUpdateTa = 'http://localhost:2016/ta/update/';
  public urlTaPengajuan = 'http://localhost:2016/ta/daftar/detail/';

  public urlTaPenentuan = 'http://localhost:2016/ta/penentuan';
  public urlTaEdit = 'http://localhost:2016/ta/edit/';

  public urlJadwalKolokium = 'http://localhost:2016/jadwalKolokium';

  public urlFileKolokium = 'http://localhost:2016/kolokium';
  public urlFilePraseminar = 'http://localhost:2016/praseminar';
  public urlFileMicon = 'http://localhost:2016/micon';


  public urlUploadKolokium = 'http://localhost:2016/upload/kolokium';
  public urlUploadPraseminar = 'http://localhost:2016/upload/praseminar';
  public urlUploadSKL = 'http://localhost:2016/upload/skl';
  public urlUploadTAFinal = 'http://localhost:2016/upload/final';
  public urlUploadPhoto = 'http://localhost:2016/upload/photo';
  public urlUploadJadwalKolokium = 'http://localhost:2016/upload/jadwal/kolokium';
  public urlUploadJadwalPraseminar = 'http://localhost:2016/upload/jadwal/praseminar';
  public urlUploadJadwalMicon = 'http://localhost:2016/upload/jadwal/micon';

  public urlUploadMandiri = 'http://localhost:2016/upload/seminar/mandiri';
  public urlUploadKonferensi = 'http://localhost:2016/upload/seminar/konferensi';
  public urlUploadMicon = 'http://localhost:2016/upload/seminar/micon';
  public urlUploadSidang = 'http://localhost:2016/upload/sidang';

  public urlLogApproval = 'http://localhost:2016/log/approval';
  public urlApproveLog = 'http://localhost:2016/log/approve';
  public urlDeleteLog = 'http://localhost:2016/log/delete';

  public urlAllMakalahKolokium = 'http://localhost:2016/mahasiswa/kolokium';
  public urlAllMakalahKolokiumDosen = 'http://localhost:2016/mahasiswa/kolokium/dosen';
  public urlAllMakalahPraseminar = 'http://localhost:2016/mahasiswa/praseminar';
  public urlAllMakalahPraseminarDosen = 'http://localhost:2016/mahasiswa/praseminar/dosen';
  public urlAllMakalahSidang = 'http://localhost:2016/mahasiswa/sidang';
  public urlAllMakalahSidangDosen = 'http://localhost:2016/mahasiswa/sidang/dosen';
  public urlAllMakalahSKL = 'http://localhost:2016/mahasiswa/skl';
  public urlAllMakalahSKLDosen = 'http://localhost:2016/mahasiswa/skl/dosen';
  public urlAllMakalahBimbingan = 'http://localhost:2016/mahasiswa/bimbingan';

  public urlAdminKolokium = 'http://localhost:2016/admin/kolokium';
  public urlAdminPraseminar = 'http://localhost:2016/admin/praseminar';
  public urlAdminSeminar = 'http://localhost:2016/admin/seminar';
  public urlAdminSidang = 'http://localhost:2016/admin/sidang';
  public urlAdminSKL = 'http://localhost:2016/admin/skl';
  public urlAdminSummary = 'http://localhost:2016/admin/summary';
  public urlDosenSummary = 'http://localhost:2016/dosen/summary';

  public urlDosenKolokium = 'http://localhost:2016/dosen/kolokium';
  public urlDosenPraseminar = 'http://localhost:2016/dosen/praseminar';
  public urlDosenSeminar = 'http://localhost:2016/dosen/seminar';
  public urlDosenSidang = 'http://localhost:2016/dosen/sidang';
  public urlDosenSKL = 'http://localhost:2016/dosen/skl';

  public urlSeminarData = 'http://localhost:2016/seminar';
  public urlSeminarMandiri = 'http://localhost:2016/seminar/mandiri';
  public urlSeminarKonferensi = 'http://localhost:2016/seminar/konferensi';

  public urlSeminarAll = 'http://localhost:2016/mahasiswa/seminar/all';
  public urlSeminarDosen = 'http://localhost:2016/mahasiswa/seminar/dosen';

  public urlDeleteSeminar = 'http://localhost:2016/seminar/delete';
  public urlKonfirmasiKolokium = 'http://localhost:2016/konfirmasi/kolokium';

  public urlBalasDosen = 'http://localhost:2016/log/balas/dosen/';
  public urlExcelSeminarSidang = 'http://localhost:2016/seminar/excel/';

  public urlMahasiswaAll = 'http://localhost:2016/mahasiswa/all';

  // ADMIN
  public urlListPengajuan = 'http://localhost:2016/ta/daftar/list';
  public urlGenerateLogPDF = 'http://localhost:2016/pdf/log/'+localStorage.getItem('id_token');

  public urlSummaryDosen = 'http://localhost:2016/summary/dosen';

  public urlLogPDF = 'http://localhost:2016/pdf/log/'+localStorage.getItem('id_token');
  public urlSeminarPDF = 'http://localhost:2016/generate/pdf/'+localStorage.getItem('id_token');
  public urlSidangPDF = 'http://localhost:2016/sidang/pdf/'+localStorage.getItem('id_token');
  public urlKelengkapanPDF = 'http://localhost:2016/keterangan/pdf/'+localStorage.getItem('id_token');

  public urlExcel = 'http://simeta-api.apps.cs.ipb.ac.id/excel/';

  public urlLogin = 'http://simeta.apps.cs.ipb.ac.id/login/';
  public linkRingkasan = 'http://simeta-api.apps.cs.ipb.ac.id/summary/all/'+localStorage.getItem('id_token');

  public urlStaff = 'http://localhost:2016/staff/';

  public send = 1;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp){
    this.getLocalStorage();

  }

  getLocalStorage(){
    this.token = localStorage.getItem('id_token');

    this.decode = this.jwtHelper.decodeToken(this.token);
    this.id = this.decode['id'];
    this.nim = this.decode['nim'];
    this.nama = this.decode['nama'];
    this.role = this.decode['role'];
  }

  ubahTanggal(date){
    let tahun = date.substr(0,4);
    let bulan = date.substr(5,2);
    let tanggal = date.substr(8,2);

    if (tanggal.substr(0,1) == 0) tanggal = tanggal.substr(1,1);

    if (bulan == 1) bulan = 'Januari';
    else if (bulan == 2) bulan = 'Februari';
    else if (bulan == 3) bulan = 'Maret';
    else if (bulan == 4) bulan = 'April';
    else if (bulan == 5) bulan = 'Mei';
    else if (bulan == 6) bulan = 'Juni';
    else if (bulan == 7) bulan = 'Juli';
    else if (bulan == 8) bulan = 'Agustus';
    else if (bulan == 9) bulan = 'September';
    else if (bulan == 10) bulan = 'Oktober';
    else if (bulan == 11) bulan = 'November';
    else if (bulan == 12) bulan = 'Desember';

    let kirim = tanggal+' '+bulan+' '+tahun;
    return kirim;
  }

  tanggalSingkat(date) {
    let tahun = date.substr(0,4);
    let bulan = date.substr(5,2);
    let tanggal = date.substr(8,2);

    if (tanggal.substr(0,1) == 0) tanggal = tanggal.substr(1,1);

    let kirim = tanggal+'/'+bulan+'/'+tahun;
    return kirim;
  }


}
