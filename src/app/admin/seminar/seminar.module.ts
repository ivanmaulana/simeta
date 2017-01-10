import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { seminarAdmin } from './seminar.component';
import { routing }       from './seminar.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    seminarAdmin
  ],
  providers: [
  ]
})
export default class seminarAdminModule {}
