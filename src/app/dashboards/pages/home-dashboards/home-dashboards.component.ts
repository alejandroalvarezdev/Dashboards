import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service';

@Component({
  selector: 'app-home-dashboards',
  templateUrl: './home-dashboards.component.html',
  styleUrls: ['./home-dashboards.component.css'],
})
export class HomeDashboardsComponent implements OnInit, AfterViewInit {
  //nothing
  objective_obj: any;
  meeting_list: any;
  certification_object: any;
  constructor(private certificationService: CertificationsService) {
    this.certificationService.getMeetingCourse().subscribe((resp) => {
      this.meeting_list = JSON.parse(JSON.stringify(resp));
      this.certificationService.getObjective().subscribe((resp) => {
        this.objective_obj = JSON.parse(JSON.stringify(resp));
        this.certificationService.getCertifications().subscribe((resp) => {
          this.certification_object = JSON.parse(JSON.stringify(resp));
          //console.log(this._getObjinfo());
          //console.log(this._getReginfo());
        });
      });
    });
  }
  ngAfterViewInit() {}
  ngOnInit(): void {}
}
