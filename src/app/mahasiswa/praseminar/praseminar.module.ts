import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Praseminar } from './praseminar.component';
import { routing }       from './praseminar.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Praseminar
  ],
  providers: [
  ]
})
export default class PraseminarModule {}
