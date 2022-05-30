import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'user',
        component: UserPageComponent
      },
      {
        path: 'product',
        component: ProductPageComponent
      },
      {
        path: 'order',
        component: OrderPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
