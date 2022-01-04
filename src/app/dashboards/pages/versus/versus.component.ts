import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router} from "@angular/router"
import * as Highcharts from 'highcharts';
import { CertificationsService } from 'src/app/services/certifications.service';
@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.css']
})
export class VersusComponent implements OnInit {
  idObj:any;
  objective_obj: any;
  meeting_list: any;
  certification_object: any;

  arrayVs:Array<any>=[];
  //logica para match de detalles
  details_mc:any;
  datails_kof:any;
  current_obj:any;
  //logica para match de detalles
  constructor(private _activeRoute:ActivatedRoute,
              private router:Router,private certificationService: CertificationsService) {
                
                
              }
  
  
  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params: Params) => {   this.idObj = params.get('id');  
    });
    console.warn("Id Obj",this.idObj);
    this.certificationService.getMeetingCourse().subscribe((resp) => {
      this.meeting_list = JSON.parse(JSON.stringify(resp));
      this.certificationService.getObjective().subscribe((resp) => {
        this.objective_obj = JSON.parse(JSON.stringify(resp));
        this.certificationService.getCertifications().subscribe((resp) => {
          this.certification_object = JSON.parse(JSON.stringify(resp));
          //logica detalles
          this.details_mc = this.search(this.meeting_list,'kof_meeting_course','Objective.ID',this.idObj)
          this.datails_kof = this.search(this.certification_object,'kind_of_formation','Objective.ID',this.idObj)
          this.current_obj = this.search(this.objective_obj,'kof_objective1','Zoho_ID',this.idObj);
          //logica detalles
          //vs
          this.make_vs_(this.current_obj, this.details_mc, this.datails_kof);

          console.warn(this.objective_obj);
          

        
          
          //this.make_vs_kof(this.details_mc);
          //vs
        });
      });
    });

    // this.setChart(this.arrayVs[0].certs.achieved);
    
    

    
    
    
  }
  //Detalles
  search(obj:any, superior_key : any, searchField :any ,searchVal : any){
    var results = [];
    for (var i = 0 ; i < obj[superior_key].length ; i++)
    {
        if (obj[superior_key][i][searchField] == searchVal) {
            results.push(obj[superior_key][i]);
        }
    }
    return results;
  }
  //Detalles
  
  //vs
  searchlow(obj:any, searchField :any ,searchVal : any){
    var results = [];
    for (var i = 0 ; i < obj.length ; i++)
    {
        if (obj[i][searchField] == searchVal) {
            results.push(obj[i]);
        }
    }
    return results;
  }
  make_vs_(current_ob:any,mc_list:any,certs_list:any){
    var mc = this.mk_vs_mc(current_ob,mc_list)
    var certs = this.mk_vs_certs(current_ob,certs_list)
    let arrayVersus = []; 
        arrayVersus.push({'mc':{'achieved':mc,'not_achieved':(100-mc)},'certs':{'achieved':certs,'not_achieved':(100-certs)}})
        this.setChart(arrayVersus)
  
  }
  mk_vs_mc(current_ob:any,mc_list:any){
    var total_mc = 0;
  if( current_ob[0]["tabularSections"]["Meeting/Course requirements"].length != 0){
    var percent_total = 0
    for(var it=0; it< current_ob[0]["tabularSections"]["Meeting/Course requirements"].length ;it++){
      var percent_req = 0;
      var match = this.searchlow(mc_list,"Name_M_C.ID",current_ob[0]["tabularSections"]["Meeting/Course requirements"][it]["M_C_Name1.ID"]);
      if(match.length > 0){
        for(var it_match = 0; it_match < match.length; it_match++){
          if(match[it_match]["Progreso"] != ""){
            percent_req += parseInt(match[it_match]["Progreso"]);
          }
        }
      }
      if(percent_req > 0){ 
        percent_total += (percent_req / parseInt(current_ob[0]["tabularSections"]["Meeting/Course requirements"][it]['Quantity1']))
      }
    }
    total_mc += (percent_total / current_ob[0]["tabularSections"]["Meeting/Course requirements"].length)
  }
  return total_mc
  }
  mk_vs_certs(current_ob:any,cert_list:any){
    var total_mc = 0;
  if( current_ob[0]["tabularSections"]["Certification requirements"].length != 0){
    var percent_total = 0
    for(var it=0; it< current_ob[0]["tabularSections"]["Certification requirements"].length ;it++){
      var percent_req = 0;
      var match = this.searchlow(cert_list,"Name.ID",current_ob[0]["tabularSections"]["Certification requirements"][it]["Certification_Name.ID"]);
      if(match.length > 0){
        for(var it_match = 0; it_match < match.length; it_match++){
          if(match[it_match]["Progress"] != ""){
            percent_req += parseInt(match[it_match]["Progress"]);
          }
        }
      }
      if(percent_req > 0){ 
        percent_total += (percent_req / parseInt(current_ob[0]["tabularSections"]["Certification requirements"][it]['Quantity']))
      }
    }
    total_mc += (percent_total / current_ob[0]["tabularSections"]["Certification requirements"].length)
  }
  return total_mc
  }

////////////HighCharts



  // this.arrayVs.forEach((element: any) => {
    Highcharts = Highcharts;
    chartOptions={};
    chart:any;
  setChart(objeto:any){

    
    console.warn("objeto", objeto);
    
    
    
    

  this.chartOptions = { 
    chart: {
      type: "column"
    },
    title: {
      text: "Versus "
    },
    subtitle: {
      text:
        'La siguiente grafica representa el comparativo de lo que se espera contra lo que se ha logrado en el Objetivo'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      title: {
        text: "Total percent Objective"
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%"
        },
        grouping: true
      }
    },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
  
    series: [
      

      {
        name: "azules",
        data: [
          {
            name: "Certs",
            y:objeto[0].certs.achieved,
            drilldown: "Maxcom"
          },
          {
            name: "MC",
            y: objeto[0].mc.achieved,
            drilldown: "MC"
          },
        
        ]
      },
      {
        name: "negras",
        pointPadding: 0.2,
        data: [
          {
            name: "Certs",
            y: objeto[0].certs.not_achieved,
            drilldown: "Safari"
          },
          {
            name: "MC",
            y: objeto[0].mc.not_achieved,
            drilldown: "Opera"
          },
          
        ]
      }
    ],
    
  };
      this.chart = this.chartOptions;
  
// });
} 

}

