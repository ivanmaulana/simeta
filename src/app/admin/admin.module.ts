import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './admin.routing';
import { NgaModule } from '../theme/nga.module';

import { Admin } from './admin.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Admin]
})
export class AdminModule {

}
