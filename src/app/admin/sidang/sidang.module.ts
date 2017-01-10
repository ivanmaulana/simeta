import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { sidangAdmin } from './sidang.component';
import { routing }       from './sidang.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    sidangAdmin
  ],
  providers: [
  ]
})
export default class sidangAdminModule {}
