import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { miconAdmin } from './micon.component';
import { routing }       from './micon.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    miconAdmin
  ],
  providers: [
  ]
})
export default class miconAdminModule {}
