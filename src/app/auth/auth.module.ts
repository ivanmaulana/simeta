import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './auth.routing';
import { NgaModule } from '../theme/nga.module';

import { Auth } from './auth.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Auth]
})
export class AuthModule {
}
