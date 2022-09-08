import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-item-handover-list',
  templateUrl: './item-handover-list.component.html',
  styleUrls: ['./item-handover-list.component.css']
})
export class ItemHandoverListComponent implements OnInit {


  constructor( private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }


    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    SerialId=12345;
    screen:any=0
  submitted=false;
  search="";

  all_handover_list:any;

  ngOnInit(): void {
var data={
  "language_id":1
}
let url='Consignment/handover_list/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    this.all_handover_list=JSON.parse(promise.all_handover_list).Table;
  })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

}
