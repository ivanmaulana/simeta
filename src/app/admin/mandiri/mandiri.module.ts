import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { mandiriAdmin } from './mandiri.component';
import { routing }       from './mandiri.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    mandiriAdmin
  ],
  providers: [
  ]
})
export default class mandiriAdminModule {}
