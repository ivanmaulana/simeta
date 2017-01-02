import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { LogDosen } from './log.component';
import { routing }       from './log.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    LogDosen
  ],
  providers: [
  ]
})
export default class LogDosenModule {}
