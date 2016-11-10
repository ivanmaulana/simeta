import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Kolokium } from './kolokium.component';
import { routing }       from './kolokium.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Kolokium
  ],
  providers: [
  ]
})
export default class KolokiumModule {}
