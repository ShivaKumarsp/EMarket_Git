import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private httpClient: HttpClient,
      private router: Router,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
   user_list:any;
   first:any;
   last:any;

  ngOnInit(): void {
let url='AdminDashboard/get_data/'
this.allapi.GetDataById(url,1).subscribe(promise=>
  {
    this.user_list=JSON.parse(promise.user_list).Table;
    this.first=this.user_list[0].created_on;   
    this.last=this.user_list[this.user_list.length-1].created_on; 

  })
  }

}
