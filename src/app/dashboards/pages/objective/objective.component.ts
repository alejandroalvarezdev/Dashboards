import { Component,OnInit } from '@angular/core';
import { HomeDashboardsComponent } from '../home-dashboards/home-dashboards.component';
@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  
  constructor(public graph : HomeDashboardsComponent) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.warn("Informacion de la region: Objeto\n HomeDashboardsComponent._getReginfo",this.graph._getReginfo())
    }, 5000)
  }

}
