import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { TA } from './pengajuan.component';
import { routing }       from './pengajuan.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AlertModule } from 'ng2-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    AlertModule.forRoot(),
    routing
  ],
  declarations: [
    TA
  ],
  providers: [
  ]
})
export default class PengajuanAdminModule {}
