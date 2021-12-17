import { Component, OnInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  resultados:any[] = [];
  sumaComplete:number=0;

  constructor(private certificationService:CertificationsService) { }

  ngOnInit(): void {

    this.certificationService.getCertifications().subscribe((resp)=> {
      // console.log(resp.kind_of_formation);
      this.resultados = resp.kind_of_formation;
      console.warn(this.resultados);

      //suma con el filtro de Status Complete
      this.resultados.forEach(element => {
        if (element.Status == 'Complete') {
        this.sumaComplete = this.sumaComplete +1;
        console.log(element.Person);
        
        
        
        }
      });
    
    })
    
  }
  
}
