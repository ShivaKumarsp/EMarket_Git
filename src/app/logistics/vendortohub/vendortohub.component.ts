import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-vendortohub',
  templateUrl: './vendortohub.component.html',
  styleUrls: ['./vendortohub.component.css']
})
export class VendortohubComponent implements OnInit {
  sourcelist:any
  constructor(private _Activatedroute:ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let pickup='Vendortohub/sourcehub/'
    this.allapi.GetDataById(pickup,389).subscribe(promise=>{
       console.log(promise)
    })
this.destination()
  }
  destination()
  {
    var data={
      order_item_id:389,
      flag:1
    }
     let drop='Vendortohub/destinationhub'
     this.allapi.PostData(drop,data).subscribe(promise=>{
       console.log(0)
        console.log(promise)
       //this.sourcelist=JSON.parse(promise.sourcelist).Table
     })

  }

  //edit
  Edit(e:any){

  }

}
