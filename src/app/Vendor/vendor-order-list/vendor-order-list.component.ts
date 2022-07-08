import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-vendor-order-list',
  templateUrl: './vendor-order-list.component.html',
  styleUrls: ['./vendor-order-list.component.css']
})
export class VendorOrderListComponent implements OnInit {

  
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
   orderGroup = new FormGroup({
    orderStatus: new FormControl('',[Validators.required]),
    orderRemark: new FormControl('',[Validators.required]),
  });

  submitted=false;
   formModel: any;
   vendor_order_list:any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";
   order_item_id=0;
   order_id=0;
   item_id=0;
   order_accept_status="";
   order_accept_comment="";
   accept_order_count:any;
   reject_order_count:any;
  //validation
  get f(){
    return this.orderGroup.controls;
  }
  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("allOrderModal")
    );

    let url='Vendor_All_Order_List/get_all_order/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.vendor_order_list=JSON.parse(promise.vendor_order_list).Table;
      
      })
  }
 
  openModal(ss:any){
    this.order_accept_status="";
    this.order_accept_comment="";
    if(ss.order_accept_status!='Pending')
    {
      this.order_accept_status=ss.order_accept_status;
      this.order_accept_comment=ss.order_accept_comment;
    }
   this.order_item_id=ss.order_item_id;
   this.order_id=ss.order_id;
  this.item_id=ss.item_id;
    this.formModel.show();
  }
  closeModal(){
    this.formModel.hide();
  }

 onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

  update_order(){
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
let url='Vendor_All_Order_List/update_order/';
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
    this.vendor_order_list=JSON.parse(promise.vendor_order_list).Table;
    this.formModel.hide();
    }
  })
  }

}
