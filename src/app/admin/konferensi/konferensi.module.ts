import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { konferensiAdmin } from './konferensi.component';
import { routing }       from './konferensi.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    konferensiAdmin
  ],
  providers: [
  ]
})
export default class konferensiAdminModule {}
