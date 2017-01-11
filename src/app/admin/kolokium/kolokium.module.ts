import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { kolokiumAdmin } from './kolokium.component';
import { routing }       from './kolokium.routing';
import { AlertModule } from 'ng2-bootstrap/alert';
import { NgUploaderModule } from 'ngx-uploader';
import { ProgressbarModule } from 'ng2-bootstrap/progressbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgUploaderModule,
    Ng2SmartTableModule,
    ProgressbarModule,
    AlertModule.forRoot(),
    routing
  ],
  declarations: [
    kolokiumAdmin
  ],
  providers: [
  ]
})
export default class kolokiumAdminModule {}
