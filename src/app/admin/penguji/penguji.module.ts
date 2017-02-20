import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { PengujiAdmin } from './penguji.component';
import { routing }       from './penguji.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { NgUploaderModule } from 'ngx-uploader';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgUploaderModule,
    ProgressbarModule,
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    routing
  ],
  declarations: [
    PengujiAdmin
  ],
  providers: [
  ]
})
export default class PengujiAdminModule {}
