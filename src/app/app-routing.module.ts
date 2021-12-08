import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardsComponent } from './dashboards/pages/home-dashboards/home-dashboards.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'dashboards',
    loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },

  {
    path:'home',
    component:HomeDashboardsComponent
  },

  {
    path: '**',
    component:HomeDashboardsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
