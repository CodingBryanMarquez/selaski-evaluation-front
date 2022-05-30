import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { PagesRoutingModule } from './pages.routing';

@NgModule({
  declarations: [OrderPageComponent, ProductPageComponent, UserPageComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    PagesRoutingModule,
    RouterModule,
    SharedModule,
  ],
})
export class PagesModule {}
