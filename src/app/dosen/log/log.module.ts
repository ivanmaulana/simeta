import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { LogDosen } from './log.component';
import { routing }       from './log.routing';

import { ModalModule } from 'ng2-bootstrap/modal';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertModule } from 'ng2-bootstrap/alert';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    ModalModule.forRoot(),
    Ng2SmartTableModule,
    ProgressbarModule,
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule,
    routing
  ],
  declarations: [
    LogDosen
  ],
  providers: [
  ]
})
export default class LogDosenModule {



}
