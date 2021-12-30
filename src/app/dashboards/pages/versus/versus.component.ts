import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params, Router} from "@angular/router"

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.css']
})
export class VersusComponent implements OnInit {


  constructor(private _activeRoute:ActivatedRoute,
              private router:Router) { }
  
  idObj:any;
  ngOnInit(): void {

    this._activeRoute.paramMap.subscribe((params: Params) => {   this.idObj = params.get('id');  
    });
    console.warn(this.idObj);
    
    
  }

  
}
