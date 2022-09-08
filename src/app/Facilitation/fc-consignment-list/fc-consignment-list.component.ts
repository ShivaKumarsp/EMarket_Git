import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-fc-consignment-list',
  templateUrl: './fc-consignment-list.component.html',
  styleUrls: ['./fc-consignment-list.component.css']
})
export class FcConsignmentListComponent implements OnInit {

  
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";

    page1: number = 1;
    count1: number = 0;
    tableSize1: number = 5;
    tableSizes1: any = [3, 6, 9, 12];
    search1="";

    page_name="";
    getpage:any;
    showlist=0;
  formModel:any;
  editModel:any;
  fc_consignment_list_from_vendor:any;
  fc_consignment_list_from_hub:any;
  consignment_l=0;
  consignment_b=0;
  consignment_h=0;
  weight=0;
  totalweight=0;
  hub_route_details:any;
  list_from_vendor=0;
  list_from_hub=0;
  checked1="";
  checked2="";
  radio_check=false;

  ngOnInit(): void {
    this.getpage=localStorage.getItem('fc_page');
    this.page_name=this.getpage;
      if(parseInt(this.page_name)==4)
    {
      this.showlist=0;
     this.radio_check=false;
    }
    else if(parseInt(this.page_name)==5)
    {
      this.showlist=1;
      this.radio_check=true;
    }


let url='Fc_Consignment/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.fc_consignment_list_from_vendor=JSON.parse(promise.fc_consignment_list_from_vendor).Table;
        this.fc_consignment_list_from_hub=JSON.parse(promise.fc_consignment_list_from_hub).Table;
        this.list_from_vendor=this.fc_consignment_list_from_vendor.length;
        this.list_from_hub=this.fc_consignment_list_from_hub.length;
       

      })
  }
 
  get_route_data(ss:any){
    var data={
"consignment_id":parseInt(ss.consignment_id),
"language_id":1
    }
    let url='Hub_Consignment/get_route_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
    {
      this.hub_route_details=JSON.parse(promise.hub_route_details).Table;
     this.consignment_l=ss.consignment_l;
    this.consignment_b=ss.consignment_b;
    this.consignment_h=ss.consignment_h;
    this.weight=ss.weight;
    this.totalweight=((this.consignment_l*this.consignment_b*this.consignment_h)/6000);
    this.formModel.show();
  })
  }
  accept_data(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Accept This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "language_id": 1
            }
            let url='Fc_Consignment/accept_from_de/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.fc_consignment_list_from_vendor=JSON.parse(promise.fc_consignment_list_from_vendor).Table;
                  this.fc_consignment_list_from_hub=JSON.parse(promise.fc_consignment_list_from_hub).Table;
                  this.list_from_vendor=this.fc_consignment_list_from_vendor.length;
                  this.list_from_hub=this.fc_consignment_list_from_hub.length;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Parcel Accept Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Parcel Not Accept',
                        showConfirmButton: false,
                        timer: 3000
                    })
                  
                }
            })
  
        }
    })
  
  };
  accept_data_from_hub(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Accept This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "language_id": 1
            }
            let url='Fc_Consignment/accept_data_from_hub/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.fc_consignment_list_from_vendor=JSON.parse(promise.fc_consignment_list_from_vendor).Table;
                  this.fc_consignment_list_from_hub=JSON.parse(promise.fc_consignment_list_from_hub).Table;
                  this.list_from_vendor=this.fc_consignment_list_from_vendor.length;
                  this.list_from_hub=this.fc_consignment_list_from_hub.length;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Parcel Accept Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Parcel Not Accept',
                        showConfirmButton: false,
                        timer: 3000
                    })
                  
                }
            })
  
        }
    })
  
  };
  change_consignment(ss:any)
  {
    this.page_name="4"; 
    if(ss==1)
    {
      this.page_name="5"; 
    }
    
    this.showlist=ss;
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

  onTableDataChange1(event: any) {
    this.page = event;  
  }
  
}
