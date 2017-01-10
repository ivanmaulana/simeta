import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { praseminarAdmin } from './praseminar.component';
import { routing }       from './praseminar.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    praseminarAdmin
  ],
  providers: [
  ]
})
export default class praseminarAdminModule {}
