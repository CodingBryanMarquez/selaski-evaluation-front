import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import localeEsVe from '@angular/common/locales/es-VE';

import { AppComponent } from './app.component';
import { ModalFormComponent } from './modal/components/modal-form/modal-form.component';
import { ModalDeleteComponent } from './modal/components/modal-delete/modal-delete.component';
import { ModalDetailComponent } from './modal/components/modal-detail/modal-detail.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

registerLocaleData(localeEsVe, 'es-VE');

@NgModule({
  declarations: [AppComponent, ModalDetailComponent, ModalFormComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NoopAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    TooltipModule.forRoot(),
  ],
  entryComponents: [ModalDeleteComponent, ModalFormComponent, ModalDetailComponent],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-VE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
