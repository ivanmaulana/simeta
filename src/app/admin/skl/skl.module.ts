import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { sklAdmin } from './skl.component';
import { routing }       from './skl.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    sklAdmin
  ],
  providers: [
  ]
})
export default class sklAdminModule {}
