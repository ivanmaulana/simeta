import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import { ToastrService } from 'toastr-ng2';
import { DataService } from '../../../../data/data.service';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'final',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  styles: [require('./final.scss')],
  template: require('./final.html'),
})
export class Final {

  constructor(public authHttp: AuthHttp, public toastr: ToastrService, public data: DataService) {

  }

  // ---------------------------
  // FILE UPLOAD

  private zone1: NgZone;

  uploadFile1: any;
  hasBaseDropZoneOver: boolean = false;

  private progress1: number = 0;
  private response1: any = {};

  options1: NgUploaderOptions = {
    url: this.data.urlUploadTAFinal,
    authToken: localStorage.getItem('id_token'),
    authTokenPrefix: ''
  };
  sizeLimit = 30000000;

  preview1 = "";
  handleUpload1(data: any): void {
    console.log('beda nih coy');
    if (data && data.response) {
      let data1 = JSON.parse(data.response);
      this.uploadFile1 = data1;

      this.preview1 = "http://simak.apps.cs.ipb.ac.id/upload/fileTAFinal/"+this.uploadFile1[0].filename;
      this.showSelesai();
    }

    this.zone1.run(() => {
      this.response1 = data;
      this.progress1 = Math.floor(data.progress.percent);
    });
  }

  // ---------------

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File harus kurang dari 3 MB');
    }

    if (uploadingFile.originalName.search(".pdf") == -1) {
      uploadingFile.setAbort();
      alert('File Harus Berekstensi PDF');
    }
  }

  showSelesai() {
    this.toastr.success("Berhasil Upload SKL", 'Success!');
  }
}
