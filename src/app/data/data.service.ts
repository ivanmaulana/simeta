import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';

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
  public urlTa = 'http://simeta-api.apps.cs.ipb.ac.id/ta/';
  public urlDataPengajuan = 'http://simeta-api.apps.cs.ipb.ac.id/ta/daftar/';
  public urlDosen = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/';
  public urlDaftarPengajuan = 'http://simeta-api.apps.cs.ipb.ac.id/ta/pengajuan/';
  public urlProfile = 'http://simeta-api.apps.cs.ipb.ac.id/profile/';
  public urlSidang = 'http://simeta-api.apps.cs.ipb.ac.id/sidang/';
  public urlStatus = 'http://simeta-api.apps.cs.ipb.ac.id/status/';
  public urlTest = 'http://simeta-api.apps.cs.ipb.ac.id/test/';
  public urlLog = 'http://simeta-api.apps.cs.ipb.ac.id/log/';
  public urlSKL = 'http://simeta-api.apps.cs.ipb.ac.id/skl/';
  public urlKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/jadwalKolokium';
  public urlPraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/jadwalPraseminar';

  public urlJadwalMicon = 'http://simeta-api.apps.cs.ipb.ac.id/jadwalMicon';

  public urlUpdateTa = 'http://simeta-api.apps.cs.ipb.ac.id/ta/update/';
  public urlTaPengajuan = 'http://simeta-api.apps.cs.ipb.ac.id/ta/daftar/detail/';

  public urlTaPenentuan = 'http://simeta-api.apps.cs.ipb.ac.id/ta/penentuan';
  public urlTaEdit = 'http://simeta-api.apps.cs.ipb.ac.id/ta/edit/';

  public urlJadwalKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/jadwalKolokium';

  public urlFileKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/kolokium';
  public urlFilePraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/praseminar';
  public urlFileMicon = 'http://simeta-api.apps.cs.ipb.ac.id/micon';


  public urlUploadKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/upload/kolokium';
  public urlUploadPraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/upload/praseminar';
  public urlUploadSKL = 'http://simeta-api.apps.cs.ipb.ac.id/upload/skl';
  public urlUploadTAFinal = 'http://simeta-api.apps.cs.ipb.ac.id/upload/final';
  public urlUploadPhoto = 'http://simeta-api.apps.cs.ipb.ac.id/upload/photo';
  public urlUploadJadwalKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/upload/jadwal/kolokium';
  public urlUploadJadwalPraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/upload/jadwal/praseminar';
  public urlUploadJadwalMicon = 'http://simeta-api.apps.cs.ipb.ac.id/upload/jadwal/micon';

  public urlUploadMandiri = 'http://simeta-api.apps.cs.ipb.ac.id/upload/seminar/mandiri';
  public urlUploadKonferensi = 'http://simeta-api.apps.cs.ipb.ac.id/upload/seminar/konferensi';
  public urlUploadMicon = 'http://simeta-api.apps.cs.ipb.ac.id/upload/seminar/micon';
  public urlUploadSidang = 'http://simeta-api.apps.cs.ipb.ac.id/upload/sidang';

  public urlLogApproval = 'http://simeta-api.apps.cs.ipb.ac.id/log/approval';
  public urlApproveLog = 'http://simeta-api.apps.cs.ipb.ac.id/log/approve';
  public urlDeleteLog = 'http://simeta-api.apps.cs.ipb.ac.id/log/delete';

  public urlAllMakalahKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/kolokium';
  public urlAllMakalahKolokiumDosen = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/kolokium/dosen';
  public urlAllMakalahPraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/praseminar';
  public urlAllMakalahPraseminarDosen = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/praseminar/dosen';
  public urlAllMakalahSidang = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/sidang';
  public urlAllMakalahSidangDosen = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/sidang/dosen';
  public urlAllMakalahSKL = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/skl';
  public urlAllMakalahSKLDosen = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/skl/dosen';
  public urlAllMakalahBimbingan = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/bimbingan';

  public urlAdminKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/admin/kolokium';
  public urlAdminPraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/admin/praseminar';
  public urlAdminSeminar = 'http://simeta-api.apps.cs.ipb.ac.id/admin/seminar';
  public urlAdminSidang = 'http://simeta-api.apps.cs.ipb.ac.id/admin/sidang';
  public urlAdminSKL = 'http://simeta-api.apps.cs.ipb.ac.id/admin/skl';
  public urlAdminSummary = 'http://simeta-api.apps.cs.ipb.ac.id/admin/summary';
  public urlDosenSummary = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/summary';

  public urlDosenKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/kolokium';
  public urlDosenPraseminar = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/praseminar';
  public urlDosenSeminar = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/seminar';
  public urlDosenSidang = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/sidang';
  public urlDosenSKL = 'http://simeta-api.apps.cs.ipb.ac.id/dosen/skl';

  public urlSeminarData = 'http://simeta-api.apps.cs.ipb.ac.id/seminar';
  public urlSeminarMandiri = 'http://simeta-api.apps.cs.ipb.ac.id/seminar/mandiri';
  public urlSeminarKonferensi = 'http://simeta-api.apps.cs.ipb.ac.id/seminar/konferensi';

  public urlSeminarAll = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/seminar/all';
  public urlSeminarDosen = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/seminar/dosen';

  public urlDeleteSeminar = 'http://simeta-api.apps.cs.ipb.ac.id/seminar/delete';
  public urlKonfirmasiKolokium = 'http://simeta-api.apps.cs.ipb.ac.id/konfirmasi/kolokium';

  public urlBalasDosen = 'http://simeta-api.apps.cs.ipb.ac.id/log/balas/dosen/';
  public urlExcelSeminarSidang = 'http://simeta-api.apps.cs.ipb.ac.id/seminar/excel/';

  public urlMahasiswaAll = 'http://simeta-api.apps.cs.ipb.ac.id/mahasiswa/all';

  // ADMIN
  public urlListPengajuan = 'http://simeta-api.apps.cs.ipb.ac.id/ta/daftar/list';
  public urlGenerateLogPDF = 'http://simeta-api.apps.cs.ipb.ac.id/pdf/log/'+localStorage.getItem('id_token');

  public urlSummaryDosen = 'http://simeta-api.apps.cs.ipb.ac.id/summary/dosen';

  public urlLogPDF = 'http://simeta-api.apps.cs.ipb.ac.id/pdf/log/'+localStorage.getItem('id_token');
  public urlSeminarPDF = 'http://simeta-api.apps.cs.ipb.ac.id/generate/pdf/'+localStorage.getItem('id_token');
  public urlSidangPDF = 'http://simeta-api.apps.cs.ipb.ac.id/sidang/pdf/'+localStorage.getItem('id_token');
  public urlKelengkapanPDF = 'http://simeta-api.apps.cs.ipb.ac.id/keterangan/pdf/'+localStorage.getItem('id_token');

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
