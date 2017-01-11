import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { TaAdmin } from './ta.component';
import { routing }       from './ta.routing';
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
    TaAdmin
  ],
  providers: [
  ]
})
export default class TaAdminModule {}
