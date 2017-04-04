import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { seminarAdmin } from './seminar.component';
import { routing }       from './seminar.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalModule } from 'ng2-bootstrap/modal';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    MyDatePickerModule,
    ChartsModule,
    routing
  ],
  declarations: [
    seminarAdmin
  ],
  providers: [
  ]
})
export default class seminarAdminModule {}
