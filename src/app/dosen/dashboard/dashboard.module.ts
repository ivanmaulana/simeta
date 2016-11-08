import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DashboardDosen } from './dashboard.component';
import { routing }       from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    DashboardDosen
  ],
  providers: [
  ]
})
export default class DashboardDosenModule {}
