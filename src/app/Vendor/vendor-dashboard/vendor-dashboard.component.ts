import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
   orderGroup = new FormGroup({
    orderStatus: new FormControl(),
    orderRemark: new FormControl(),
  });
  
   page: number = 1;
   count: number = 0;
   tableSize: number = 3;
   tableSizes: any = [3, 6, 9, 12];
   search="";
   order_item_id=0;
   order_id=0;
   item_id=0;
   order_accept_status="";
   order_accept_comment="";
   submitted=false;
   formModel: any;
   pending_order_list:any;
   all_order_count:any;
   accept_order_count:any;
   reject_order_count:any;
   consignment_list:any;
    //validation
  get f(){
    return this.orderGroup.controls;
  }
 
  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("OrderModal")
    );

    let url='VendorDashboard/get_all_order/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.pending_order_list=JSON.parse(promise.pending_order_list).Table;
        this.all_order_count=JSON.parse(promise.all_order_count).Table;     
        this.accept_order_count=JSON.parse(promise.accept_order_count).Table;
        this.reject_order_count=JSON.parse(promise.reject_order_count).Table;
        this.consignment_list=JSON.parse(promise.consignment_list).Table;
      })
  }
  openModal(ss:any){
    this.order_item_id=ss.order_item_id;
 this.order_id=ss.order_id;
 this.item_id=ss.item_id;
     this.formModel.show();
   }
   closeModal(){
     this.formModel.hide();
   }

   update_order()
   {
    this.submitted = true;
    if (this.orderGroup.invalid) {
      return;
    }
 var data={
 "order_item_id":this.order_item_id,
 "order_id":this.order_id,
 "item_id":this.item_id,
 "order_accept_status":this.order_accept_status,
 "order_accept_comment":this.order_accept_comment,
 "language_id":1
 }
 let url='VendorDashboard/update_order/';
 this.allapi.PostData(url,data).subscribe(promise=>
   {
     if(promise.status=='Update')
     {
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: promise.message,
         showConfirmButton: false,
         timer: 2000
     })
     this.order_accept_status="";
     this.order_accept_comment="";
     this.pending_order_list=JSON.parse(promise.pending_order_list).Table;
     this.all_order_count=JSON.parse(promise.all_order_count).Table;     
     this.accept_order_count=JSON.parse(promise.accept_order_count).Table;
     this.reject_order_count=JSON.parse(promise.reject_order_count).Table;
     this.formModel.hide();
     }
   })
   }
   
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

}
