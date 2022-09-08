import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
@Component({
  selector: 'app-hub-consignment-list',
  templateUrl: './hub-consignment-list.component.html',
  styleUrls: ['./hub-consignment-list.component.css']
})
export class HubConsignmentListComponent implements OnInit {

  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";
    showlist=0;
  formModel:any;
 
  received_hub_item_list:any;
  received_item_pt_to_hub_list:any;

  consignment_l=0;
  consignment_b=0;
  consignment_h=0;
  weight=0;
  totalweight=0;
  hub_route_details:any;
  consignmentid:any;
  templist:any;
  receive_count=0;
  receive_pt_count=0;
  accept_all_item_details:any;

  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("acceptformModal")
    );
let url='Assign_FcHub_HubFc/hub_get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.received_hub_item_list=JSON.parse(promise.received_hub_item_list).Table;
        this.receive_count=this.received_hub_item_list.length;
        this.received_item_pt_to_hub_list=JSON.parse(promise.received_item_pt_to_hub_list).Table;
        this.receive_pt_count=this.received_item_pt_to_hub_list.length;
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
            let url='Assign_FcHub_HubFc/accept_from_fc/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.received_hub_item_list=JSON.parse(promise.received_hub_item_list).Table;
                  this.receive_count=this.received_hub_item_list.length;
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
    this.showlist=ss;
  }
  view_hub_accept_data(ss:any)
  {
    var data={
"delivery_executive_id":parseInt(ss.delivery_executive_id),
"batch_id":parseInt(ss.batch_id),
"language_id":1
    }
    let url='Assign_FcHub_HubFc/get_accept_pt_to_hub_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.accept_all_item_details=JSON.parse(promise.accept_all_item_details).Table;
        this.formModel.show();
      })

  }
  accept_pt_to_hub_data(ss:any) {

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
                "delivery_executive_id":ss.delivery_executive_id,
                "language_id": 1
            }
            let url='Assign_FcHub_HubFc/accept_from_pt_to_hub/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.received_hub_item_list=JSON.parse(promise.received_hub_item_list).Table;
                  this.receive_count=this.received_hub_item_list.length;
                  this.received_item_pt_to_hub_list=JSON.parse(promise.received_item_pt_to_hub_list).Table;
                  this.receive_pt_count=this.received_item_pt_to_hub_list.length;
                  this.formModel.hide();
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
  onTableDataChange(event: any) {
    this.page = event;

  }
  
}
