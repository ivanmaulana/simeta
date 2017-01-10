import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { TaAdmin } from './ta.component';
import { routing }       from './ta.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    TaAdmin
  ],
  providers: [
  ]
})
export default class TaAdminModule {}
