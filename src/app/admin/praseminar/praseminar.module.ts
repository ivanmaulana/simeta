import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { praseminarAdmin } from './praseminar.component';
import { routing }       from './praseminar.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { NgUploaderModule } from 'ngx-uploader';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgUploaderModule,
    Ng2SmartTableModule,
    ProgressbarModule,
    AlertModule.forRoot(),
    ChartsModule,
    routing
  ],
  declarations: [
    praseminarAdmin
  ],
  providers: [
  ]
})
export default class praseminarAdminModule {}
