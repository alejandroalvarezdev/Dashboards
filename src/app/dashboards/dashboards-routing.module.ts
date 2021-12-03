import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ObjectiveComponent } from './pages/objective/objective.component';
import { RegionComponent } from './pages/region/region.component';

const routes:Routes =[
  {
    path:'',
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
