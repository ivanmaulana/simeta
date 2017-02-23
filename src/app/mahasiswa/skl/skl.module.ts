import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Skl } from './skl.component';
import { routing }       from './skl.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { NgUploaderModule } from 'ngx-uploader';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgUploaderModule,
    ProgressbarModule,
    AlertModule.forRoot(),
    routing
  ],
  declarations: [
    Skl
  ],
  providers: [
  ]
})
export default class SklModule {}
