import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service';

@Component({
  selector: 'app-home-dashboards',
  templateUrl: './home-dashboards.component.html',
  styleUrls: ['./home-dashboards.component.css'],
})
export class HomeDashboardsComponent implements OnInit, AfterViewInit{

  objective_obj: any;
  meeting_list:any;
  certification_object:any;
  

  constructor(private certificationService: CertificationsService) {
    this.certificationService.getMeetingCourse().subscribe((resp)=> {
      this.meeting_list = JSON.parse(JSON.stringify(resp));
      this.certificationService.getObjective().subscribe((resp) => {
        this.objective_obj = JSON.parse(JSON.stringify(resp));
        this.certificationService.getCertifications().subscribe((resp) => {
          this.certification_object = JSON.parse(JSON.stringify(resp));
          //console.warn(this.objective_obj);
          this.grap();
        })
      });
    });
   }
  ngAfterViewInit() {
    
  }
  ngOnInit(): void {
  }
  grap() {
    for (let it_obj = 0; it_obj < this.objective_obj['kof_objective1'].length; it_obj++) {
      this.high(
        this.objective_obj['kof_objective1'][it_obj]['Name'],
        this.obj_percent(this.objective_obj['kof_objective1'][it_obj]),
        it_obj
      );
    }
  }
  obj_percent(itm_obj: any) {
    var total_mc = 0;
    var total_certs = 0;
    //Busqueda meetingcourse 
    if (itm_obj["tabularSections"]["Meeting/Course requirements"].length != 0) {
      total_mc = this.mc_obj_match(this.mcSearch(itm_obj["Region.ID"], itm_obj["Zoho_ID"]), itm_obj["tabularSections"]["Meeting/Course requirements"])
      console.log(total_mc)
    }
    if( itm_obj["tabularSections"]["Certification requirements"].length != 0){
        total_certs = this.certs_obj_match(this.certsSearch(itm_obj["Region.ID"] , itm_obj["Zoho_ID"]),itm_obj["tabularSections"]["Certification requirements"])
    }

    return (((total_mc + total_certs) / 100) / 2 * 100)
  }
  mc_obj_match(arr_mc: any, arr_mcreqs: any) {
    var total = 0;
    var porcentaje = 0;
    var total_percents_current = 0;
    for (var it_reqs = 0; it_reqs < arr_mcreqs.length; it_reqs++) {
      total += parseInt(arr_mcreqs[it_reqs]["Quantity1"])
      for (var it_mc = 0; it_mc < arr_mc.length; it_mc++) {
        if (arr_mcreqs[it_reqs]["M_C_Name1.ID"] == arr_mc[it_mc]["Name_M_C.ID"]) {
          total_percents_current += parseInt(arr_mc[it_mc]["Progreso"]);
        }
      }
    }
    return ((total_percents_current / 100) / total * 100)
  }
  mcSearch(regionid:any,objetiveid:any){
    var arr = []
    for(var it_mc = 0; it_mc < this.meeting_list["kof_meeting_course"].length; it_mc++){
        
        if(objetiveid == this.meeting_list["kof_meeting_course"][it_mc]["Objective.ID"]){
            arr.push(this.meeting_list["kof_meeting_course"][it_mc])
        }
    }
    return arr
}
certs_obj_match(arr_certs:any, arr_certreqs:any){
  var total = 0;
  var porcentaje = 0;
  var total_percents_current = 0;
  for(var it_reqs = 0; it_reqs < arr_certreqs.length; it_reqs++){
      total  += parseInt(arr_certreqs[it_reqs]["Quantity"])
      for(var it_cert = 0; it_cert < arr_certs.length; it_cert++){
          if(arr_certreqs[it_reqs]["Certification_Name.ID"] == arr_certs[it_cert]["Name.ID"]){
              if(arr_certs[it_cert]["Progress"] != '') total_percents_current += parseInt(arr_certs[it_cert]["Progress"]);
          }
      }
  }
  return ((total_percents_current / 100) / total * 100)
}
certsSearch(regionid:any,objetiveid:any){
  var arr = []
  for(var it_cert = 0; it_cert < this.certification_object["kind_of_formation"].length; it_cert++){
      
      if(objetiveid == this.certification_object["kind_of_formation"][it_cert]["Objective.ID"]){
          arr.push(this.certification_object["kind_of_formation"][it_cert])
      }
  }
  return arr
}
  high(nombre: any, porcentaje: any, it: any) {
    console.log(nombre)
    console.log('Cumplimiento', porcentaje)
    console.log('Faltante', (porcentaje-100)*-1)
    /*if (!isNaN(porcentaje)){
        //document.getElementById("containerd"+it).innerHTML = nombre;
        var to_chart = [
                ['Cumplimiento', porcentaje],
                ['Faltante', (porcentaje-100)*-1],
            ]
        Highcharts.chart('container'+it, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: nombre+'<br>Cumplimiento',
                align: 'center',
                verticalAlign: 'middle',
                y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '50%',
                data: to_chart
            }]
        });
    }*/

  }
}
