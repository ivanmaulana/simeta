import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Sidang } from './sidang.component';
import { routing }       from './sidang.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { NgUploaderModule } from 'ngx-uploader';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgUploaderModule,
    ProgressbarModule,
    MyDatePickerModule,
    AlertModule.forRoot(),
    routing
  ],
  declarations: [
    Sidang
  ],
  providers: [
  ]
})
export default class SidangModule {}
