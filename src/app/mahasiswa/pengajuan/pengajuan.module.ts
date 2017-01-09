import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Pengajuan } from './pengajuan.component';
import { routing }       from './pengajuan.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    routing
  ],
  declarations: [
    Pengajuan
  ],
  providers: [
  ]
})
export default class PengajuanModule {}
