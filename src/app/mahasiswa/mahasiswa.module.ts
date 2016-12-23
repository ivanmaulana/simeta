import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './mahasiswa.routing';
import { NgaModule } from '../theme/nga.module';

import { Mahasiswa } from './mahasiswa.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Mahasiswa]
})
export class MahasiswaModule {
}
