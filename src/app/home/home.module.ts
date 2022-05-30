import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MainPagesComponent } from './components/main-pages/main-pages.component';
import { HomeRoutingModule } from './home.routing';


@NgModule({
  declarations: [
    MainPagesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    SharedModule,
  ]
})
export class HomeModule {}
