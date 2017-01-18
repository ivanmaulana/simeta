import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { praseminarDosen } from './praseminar.component';
import { routing }       from './praseminar.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    AlertModule.forRoot(),
    ChartsModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    praseminarDosen
  ],
  providers: [
  ]
})
export default class praseminarDosenModule {}
