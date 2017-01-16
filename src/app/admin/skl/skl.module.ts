import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { sklAdmin } from './skl.component';
import { routing }       from './skl.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    AlertModule.forRoot(),
    TimepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    routing
  ],
  declarations: [
    sklAdmin
  ],
  providers: [
  ]
})
export default class sklAdminModule {}
