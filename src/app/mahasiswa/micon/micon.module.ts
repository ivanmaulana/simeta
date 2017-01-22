import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { micon } from './micon.component';
import { routing }       from './micon.routing';
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
    micon
  ],
  providers: [
  ]
})
export default class miconModule {}
