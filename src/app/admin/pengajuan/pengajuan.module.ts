import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { PengajuanAdmin } from './pengajuan.component';
import { routing }       from './pengajuan.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    PengajuanAdmin
  ],
  providers: [
  ]
})
export default class PengajuanAdminModule {}
