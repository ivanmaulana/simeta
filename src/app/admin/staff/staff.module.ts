import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { StaffAdmin } from './staff.component';
import { routing }       from './staff.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    StaffAdmin
  ],
  providers: [
  ]
})
export default class StaffAdminModule {}
