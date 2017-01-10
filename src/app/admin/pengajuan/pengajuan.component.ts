import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'pengajuan',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pengajuan.scss')],
  template: require('./pengajuan.html')
})
export class PengajuanAdmin {
  settings = {
    columns: {
      nim: {
        title: 'NIM'
      },
      nama: {
        title: 'Nama Mahasiswa'
      },
      topik: {
        title: 'Topik TA'
      },
      lab: {
        title: 'Lab'
      },
      pembimbing: {
        title: 'Pembimbing'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };

  data = [
    {
      nim: 'G64130076',
      nama: "Ivan Maulana Putra",
      topik: "Samuel L Ipsum is a Lorem Ipsum Generator, it uses quotes from films which Samuel L Jackson has starred in place of the standard ipsum text.",
      lab: 1,
      pembimbing: "Imas Sitanggang",
    },
    {
      nim: 'G64130080',
      nama: "Ivan Maulana Putra",
      topik: "Samuel L Ipsum is a Lorem Ipsum Generator, it uses quotes from films which Samuel L Jackson has starred in place of the standard ipsum text.",
      lab: 1,
      pembimbing: "Imas Sitanggang",
    },
  ];

  constructor() {
  }

  test(a) {
    console.log(a.data);
  }

}
