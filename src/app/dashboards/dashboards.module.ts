import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { ObjectiveComponent } from './pages/objective/objective.component';
import { RegionComponent } from './pages/region/region.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    ObjectiveComponent,
    RegionComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
