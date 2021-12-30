import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ObjectiveComponent } from './pages/objective/objective.component';
import { RegionComponent } from './pages/region/region.component';

import { HomeDashboardsComponent } from './pages/home-dashboards/home-dashboards.component';
import { VersusComponent } from './pages/versus/versus.component';

const routes:Routes =[
  {
    path:'',
    component:HomeDashboardsComponent,
    children:[
      {
        path: 'main',
        component:MainComponent
      },

      {
        path: 'objective',
        component:ObjectiveComponent
      },

      {
        path: 'region',
        component:RegionComponent
      },

      {
        path: 'main/:id',
        component: VersusComponent
      },

      {
        path:'**',
        component:MainComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
