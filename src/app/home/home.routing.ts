import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPagesComponent } from './components/main-pages/main-pages.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainPagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/pages.module').then((p) => p.PagesModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
