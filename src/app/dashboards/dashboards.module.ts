import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { ObjectiveComponent } from './pages/objective/objective.component';
import { RegionComponent } from './pages/region/region.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { HomeDashboardsComponent } from './pages/home-dashboards/home-dashboards.component';
import { MaterialModule } from '../material/material.module';

import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { VersusComponent } from './pages/versus/versus.component';




@NgModule({
  declarations: [
    MainComponent,
    ObjectiveComponent,
    RegionComponent,
    HomeDashboardsComponent,
    VersusComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    MaterialModule,
    HighchartsChartModule,
    FormsModule
  ]
})
export class DashboardsModule { }
