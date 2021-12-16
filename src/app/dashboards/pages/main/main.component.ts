import { Component, OnInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  resultados:any[] = [];


  constructor(private certificationService:CertificationsService) { }

  ngOnInit(): void {

    this.certificationService.getCertifications().subscribe((resp)=> {
      // console.log(resp.kind_of_formation);
      this.resultados = resp.kind_of_formation;
      console.warn(this.resultados);
      
    })

    

  }

}
