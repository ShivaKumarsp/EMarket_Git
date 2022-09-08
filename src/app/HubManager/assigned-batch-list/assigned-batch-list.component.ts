import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-assigned-batch-list',
  templateUrl: './assigned-batch-list.component.html',
  styleUrls: ['./assigned-batch-list.component.css']
})
export class AssignedBatchListComponent implements OnInit {
  batchlist:any
  type_ofconsignment:any
  constructor(private _Activatedroute:ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let geturl='hubtofacilitationcenter/Get/'
    this.allapi.GetDataById(geturl,1).subscribe(promise=>{
       this.batchlist=JSON.parse(promise.batchlist).Table
       console.log(this.batchlist)
    })
  }

  assignedform = new FormGroup({
    // transportID: new FormControl(),
    // facilitationHubID: new FormControl(),
    // //departureTime:new FormControl(),
    // sDate:new FormControl()
  });
}
