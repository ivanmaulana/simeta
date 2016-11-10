import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Pengajuan } from './pengajuan.component';
import { routing }       from './pengajuan.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Pengajuan
  ],
  providers: [
  ]
})
export default class PengajuanModule {}
