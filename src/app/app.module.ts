import { NgModule, ApplicationRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { AuthModule } from './auth/auth.module';
import { DosenModule } from './dosen/dosen.module';
import { AdminModule } from './admin/admin.module';

// librari
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ToastrModule } from 'toastr-ng2';
import { provideAuth } from 'angular2-jwt';

import { DataService } from './data/data.service';



// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    MahasiswaModule,
    AuthModule,
    DosenModule,
    AdminModule,
    routing,
    ToastrModule.forRoot()
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AUTH_PROVIDERS,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: '',
      globalHeaders: [{'Content-Type' : 'application/json'}],
      noJwtError: true,
      noTokenScheme: true
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    this.appState._state = store.state;
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
