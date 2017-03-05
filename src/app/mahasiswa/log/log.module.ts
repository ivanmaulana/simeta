import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Log } from './log.component';
import { routing } from './log.routing';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    DatepickerModule.forRoot(),
    routing
  ],
  declarations: [
    Log
  ],
  providers: [
  ]
})
export default class LogModule {}
