import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './dosen.routing';
import { NgaModule } from '../theme/nga.module';

import { Dosen } from './dosen.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Dosen]
})
export class DosenModule {

}
