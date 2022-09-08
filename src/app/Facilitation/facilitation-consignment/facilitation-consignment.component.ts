import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-facilitation-consignment',
  templateUrl: './facilitation-consignment.component.html',
  styleUrls: ['./facilitation-consignment.component.css']
})
export class FacilitationConsignmentComponent implements OnInit {

  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";

  page_name="";
  all_consignment_list:any;

  ngOnInit(): void {

    let url='All_FC_Consignment_List/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.all_consignment_list=JSON.parse(promise.all_consignment_list).Table;
       })
  }

  redirect_to_page(ss:any)
  {
localStorage.setItem('fc_page',ss);
if(ss==1)
{
  window.location.replace('app/fc_facilitation_to_hub');
}
else if(ss==2)
{
  window.location.replace('app/fc_facilitation_to_customer');
}
else if(ss==3)
{
  window.location.replace('app/assign_item_from_vendor');
}
else if(ss==4)
{
  window.location.replace('app/fc_consignment_list');
}
else if(ss==5)
{
  window.location.replace('app/fc_consignment_list');
}
else if(ss=='')
{
  window.location.replace('app/facilitation_consignment');
}
  }

  onTableDataChange(event: any) {
    this.page = event;
  
  }
}
