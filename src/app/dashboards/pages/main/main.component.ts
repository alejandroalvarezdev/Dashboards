import { Component, OnInit } from '@angular/core';
import { CertificationsService } from 'src/app/services/certifications.service'
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
//Variable Declarations
objective_obj: any;
meeting_list: any;
certification_object: any;
arraytmp:Array<any>=[];
arrayHighChart:Array<any>=[];
achievedNumber:Number = 0;

  

  constructor(private certificationService: CertificationsService,
              private router:Router) { }

  ngOnInit(): void {

    this.certificationService.getMeetingCourse().subscribe((resp) => {
      this.meeting_list = JSON.parse(JSON.stringify(resp));
      this.certificationService.getObjective().subscribe((resp) => {
        this.objective_obj = JSON.parse(JSON.stringify(resp));
        this.certificationService.getCertifications().subscribe((resp) => {
          this.certification_object = JSON.parse(JSON.stringify(resp));
          //console.log(this._getObjinfo());
          //console.log(this._getReginfo());
        this._getReginfo();
        
        this.setChart();
        
        });
      });
    });    
    
  }

  _getReginfo() {
    var tmp = [];
    for (
      let it_obj = 0;
      it_obj < this.objective_obj['kof_objective1'].length;
      it_obj++
    ) {
      tmp.push({
        reg_name: this.objective_obj['kof_objective1'][it_obj]['Region'],
        obj_name: this.objective_obj['kof_objective1'][it_obj]['Name'],
        obj_level: this.objective_obj['kof_objective1'][it_obj]['Level'],
        reg_id: this.objective_obj['kof_objective1'][it_obj]['Region.ID'],
        obj_id: this.objective_obj['kof_objective1'][it_obj]['Zoho_ID'],
        achieved: isNaN(
          this.region_percent(this.objective_obj['kof_objective1'][it_obj])
        )
          ? 0
          : this.region_percent(this.objective_obj['kof_objective1'][it_obj]),
        not_achieved: isNaN(
            this.region_percent(this.objective_obj['kof_objective1'][it_obj])
          )
            ? 0
            : (-1*(this.region_percent(this.objective_obj['kof_objective1'][it_obj])-100)),
      });
    }
    this.arraytmp = tmp;
    this.arraytmp.forEach(element => {
      console.warn("Objective Data",element);
      let data = {
        name: element.reg_name, 
        array: [element.reg_name, element.achieved],
        object: {
          name: 'Other',
          y: 100,
          dataLabels: {
            enabled: false
          }
        }
      }
      this.arrayHighChart.push(data);
      
    });
    // console.log("Información General",tmp);
    
    // console.warn(this.arrayHighChart); 
    
    return ;
    
  }
  region_percent(itm_obj: any) {
    var total_mc = 0;
    var total_certs = 0;
    //Busqueda meetingcourse
    if (itm_obj['tabularSections']['Meeting/Course requirements'].length != 0) {
      total_mc = this.mc_reg_match(
        this.mcSearch(itm_obj['Region.ID'], null),
        itm_obj['tabularSections']['Meeting/Course requirements']
      );
      //console.log(total_mc);
    }
    if (itm_obj['tabularSections']['Certification requirements'].length != 0) {
      total_certs = this.certs_obj_match(
        this.certsSearch(itm_obj['Region.ID'], null),
        itm_obj['tabularSections']['Certification requirements']
      );
    }

    return ((total_mc + total_certs) / 100 / 2) * 100;
  }
  obj_percent(itm_obj: any) {
    var total_mc:any = 0;
    var total_certs = 0;
    //Busqueda meetingcourse
    if (itm_obj['tabularSections']['Meeting/Course requirements'].length != 0) {
      total_mc = this.mc_obj_match(
        this.mcSearch(null, itm_obj['Zoho_ID']),
        itm_obj['tabularSections']['Meeting/Course requirements']
      );
      //console.log(total_mc);
    }
    if (itm_obj['tabularSections']['Certification requirements'].length != 0) {
      total_certs = this.certs_obj_match(
        this.certsSearch(null, itm_obj['Zoho_ID']),
        itm_obj['tabularSections']['Certification requirements']
      );
    }

    return ((total_mc + total_certs) / 100 / 2) * 100;
  }
  mc_obj_match(arr_mc: any, arr_mcreqs: any) {
    var total = 0;
    var total_percents_current = 0;
    var total2:any ;
    for (var it_reqs = 0; it_reqs < arr_mcreqs.length; it_reqs++) {
      total += parseInt(arr_mcreqs[it_reqs]['Quantity1']);
      for (var it_mc = 0; it_mc < arr_mc.length; it_mc++) {
        if (
          arr_mcreqs[it_reqs]['M_C_Name1.ID'] == arr_mc[it_mc]['Name_M_C.ID']
        ) {
          total_percents_current += parseInt(arr_mc[it_mc]['Progreso']);
        }
      }
    }
    total2 = (total_percents_current / 100 / total) * 100;
    return console.warn("Im Here",total2);
    ;
  }
  mc_reg_match(arr_mc: any, arr_mcreqs: any) {
    var total = 0;
    var total_percents_current = 0;
    for (var it_reqs = 0; it_reqs < arr_mcreqs.length; it_reqs++) {
      total += parseInt(arr_mcreqs[it_reqs]['Quantity1']);
      for (var it_mc = 0; it_mc < arr_mc.length; it_mc++) {
        if (
          arr_mcreqs[it_reqs]['M_C_Name1.ID'] == arr_mc[it_mc]['Name_M_C.ID']
        ) {
          total_percents_current += parseInt(arr_mc[it_mc]['Progreso']);
        }
      }
    }
    return (total_percents_current / 100 / total) * 100;
  }
  mcSearch(regionid: any, objetiveid: any) {
    var arr = [];
    if (objetiveid != null) {
      for (
        var it_mc = 0;
        it_mc < this.meeting_list['kof_meeting_course'].length;
        it_mc++
      ) {
        if (
          objetiveid ==
          this.meeting_list['kof_meeting_course'][it_mc]['Objective.ID']
        ) {
          arr.push(this.meeting_list['kof_meeting_course'][it_mc]);
        }
      }
    } else if (regionid != null) {
      for (
        var it_mc = 0;
        it_mc < this.meeting_list['kof_meeting_course'].length;
        it_mc++
      ) {
        if (
          regionid ==
          this.meeting_list['kof_meeting_course'][it_mc]['Country.ID']
        ) {
          arr.push(this.meeting_list['kof_meeting_course'][it_mc]);
        }
      }
    }
    return arr;
  }
  certs_obj_match(arr_certs: any, arr_certreqs: any) {
    var total = 0;
    var total_percents_current = 0;
    for (var it_reqs = 0; it_reqs < arr_certreqs.length; it_reqs++) {
      total += parseInt(arr_certreqs[it_reqs]['Quantity']);
      for (var it_cert = 0; it_cert < arr_certs.length; it_cert++) {
        if (
          arr_certreqs[it_reqs]['Certification_Name.ID'] ==
          arr_certs[it_cert]['Name.ID']
        ) {
          if (arr_certs[it_cert]['Progress'] != '')
            total_percents_current += parseInt(arr_certs[it_cert]['Progress']);
        }
      }
    }
    return (total_percents_current / 100 / total) * 100;




    /////////////////////////
  }
  certsSearch(regionid: any, objetiveid: any) {
    var arr = [];
    if (regionid == null) {
      for (
        var it_cert = 0;
        it_cert < this.certification_object['kind_of_formation'].length;
        it_cert++
      ) {
        if (
          objetiveid ==
          this.certification_object['kind_of_formation'][it_cert][
            'Objective.ID'
          ]
        ) {
          arr.push(this.certification_object['kind_of_formation'][it_cert]);
        }
      }
    } else if (objetiveid == null) {
      for (
        var it_cert = 0;
        it_cert < this.certification_object['kind_of_formation'].length;
        it_cert++
      ) {
        if (
          regionid ==
          this.certification_object['kind_of_formation'][it_cert][
            'Country_Pais.ID'
          ]
        ) {
          arr.push(this.certification_object['kind_of_formation'][it_cert]);
        }
      }
    }

    return arr;
  }

  sendurl(id:any){
    this.router.navigateByUrl(`dashboards/main/${id}`);
  }
  
  ////////////HighChart
  chartOptions:Highcharts.Options ={};
  highcharts = Highcharts;
  array3:Array<any>=[];
  setChart(){
    let series;
    let highcharts;
    let chartoptions;
    series = {
      type: 'pie',
    };
  
    let name; 
    this.arraytmp.forEach(element => {
      
      
      
      
    this.chartOptions= {
      
      
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: 0,
        plotShadow: false,
        width: 200,
        height:150
      },
      title: {
        text:
          //  nombre+
          '<br>',
        align: 'center',
        verticalAlign: 'middle',
        y: 60,
      },
  
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
  
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
  
      plotOptions: {
        pie: {
          
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              fontSize:'7px'
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '100%'],
          size: 175,
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Objective',
          innerSize: '50%',
          
          data: [
            ['complete',element.achieved],
            
  
            {
              name:'faltante',
              y: element.not_achieved,
              dataLabels: {
                enabled: false,
              },
            },
          ],
        },
      ],
    };
    
    let obj = {
      name: element.obj_name,
      level: element.obj_level,
      region:element.reg_id,
      obj_id:element.obj_id,
      chart:this.chartOptions,
    }
    this.array3.push(obj);
    
  });

  console.warn("HighchartsObject",this.array3);
  
  }
}



