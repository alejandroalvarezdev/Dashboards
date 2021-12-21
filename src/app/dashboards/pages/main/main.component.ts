import { Component, OnInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service'
import { MeetingCourseService } from 'src/app/services/meeting-course.service';
import { ObjectivesService } from 'src/app/services/objectives.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
//Variable Declarations
  resultadosCert:any[] = [];
  resultadosMeeting:any[] = [];
  resultadosObjectives:any[] = [];

  sumaComplete:number=0;

  constructor(private certificationService:CertificationsService,
              private meetingCourseService:MeetingCourseService,
              private objectiveService:ObjectivesService) { }

  ngOnInit(): void {

    //Certifications Data 
    this.certificationService.getCertifications().subscribe((resp)=> {
      // console.log(resp.kind_of_formation);
      this.resultadosCert = resp.kind_of_formation;
      console.warn("CertificationsData",this.resultadosCert);

      // suma con el filtro de Status Complete
      // this.resultadosCert.forEach(element => {
      //   if (element.Status == 'Complete') {
      //   this.sumaComplete = this.sumaComplete +1;
      //   console.log(element.Person);
        
      //   }
      // });
    
    
      // Meeting Course Data 
    this.meetingCourseService.getMeetingCourse().subscribe((resp) => {
      this.resultadosMeeting = resp.kof_meeting_course;
      console.warn("Meeting Data",this.resultadosMeeting);
      
    
      //Objective Data 
    this.objectiveService.getObjectives().subscribe((resp)=>
    {
      this.resultadosObjectives = resp.kof_objective1; 
      console.warn("Objectives Data",this.resultadosObjectives);
    
      console.warn("Scope!!!!!!",this.resultadosCert);
      console.warn("Scope 2!!!!",this.resultadosMeeting);
      console.warn("Scope 3 ", this.resultadosObjectives);
      
            
      //WorkZone {
        
        //Suma En Certificaciones los que tienen un objetivo
        this.resultadosMeeting.forEach(element => {
          if (element.Objective != null ) {
          this.sumaComplete = this.sumaComplete +1;
          console.log(element.Person);
          
          }
        });

      //WokZone End }


    });//Scope KoF => Meeting Course => Objective 

    
    
  });//Scope KoF => Meeting Course 

  }) //Scope KoF 
    
    
  }
  
}
