import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    NgxNavbarModule,
    RouterModule,
  ]
})
export class SharedModule {}
