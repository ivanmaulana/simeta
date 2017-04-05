import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { StaffAdmin } from './staff.component';
import { routing }       from './staff.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AlertModule } from 'ng2-bootstrap/alert';
import { ModalModule } from 'ng2-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  declarations: [
    StaffAdmin
  ],
  providers: [
  ]
})
export default class StaffAdminModule {}
