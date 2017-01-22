import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { nasional } from './nasional.component';
import { routing }       from './nasional.routing';
import { AlertModule } from 'ng2-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    AlertModule.forRoot(),
    routing
  ],
  declarations: [
    nasional
  ],
  providers: [
  ]
})
export default class nasionalModule {}
