import { Component, OnInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service';

@Component({
  selector: 'app-home-dashboards',
  templateUrl: './home-dashboards.component.html',
  styleUrls: ['./home-dashboards.component.css']
})
export class HomeDashboardsComponent implements OnInit {

  constructor(private certificationService:CertificationsService) { }

  ngOnInit(): void {
    this.certificationService.getCertifcations().subscribe((resp)=> {
      console.warn(resp.kind_of_formation);
      
    })
  }

}
