import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
@Component({
  selector: 'app-cancel-order-verify',
  templateUrl: './cancel-order-verify.component.html',
  styleUrls: ['./cancel-order-verify.component.css']
})
export class CancelOrderVerifyComponent implements OnInit {

 
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService,
  ) { }
   orderGroup = new FormGroup({
    orderStatus: new FormControl('',[Validators.required]),
    orderRemark: new FormControl('',[Validators.required]),
  });

  submitted=false;
   formModel: any;
   cancel_request_list:any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";
   cancel_item_id=0;
   order_item_id=0;
   order_id=0;
   item_id=0;
   cancel_request_status="";
   cancel_request_reasion="";
   accept_order_count:any;
   reject_order_count:any;
  //validation
  get f(){
    return this.orderGroup.controls;
  }
  ngOnInit(): void {
    this.spinner.show();
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("allOrderModal")
    );

    let url='CancelOrderVerify/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.cancel_request_list=JSON.parse(promise.cancel_request_list).Table;

        this.spinner.hide();
      })
      this.spinner.hide();
  }
 
  openModal(ss:any){
   this.cancel_item_id=ss.cancel_item_id;
this.order_item_id=ss.order_item_id;
this.order_id=ss.order_id;
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
    this.spinner.show();
var data={
"cancel_item_id":this.cancel_item_id,
"order_item_id":this.order_item_id,
"order_id":this.order_id,
"cancel_request_status":this.cancel_request_status,
"cancel_request_reasion":this.cancel_request_reasion,
"language_id":1
}
let url='CancelOrderVerify/update_order/';
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
    this.cancel_request_status="";
    this.cancel_request_reasion="";
    this.cancel_request_list=JSON.parse(promise.cancel_request_list).Table;
    this.formModel.hide();
    this.spinner.hide();
    }
    else
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: promise.message,
        showConfirmButton: false,
        timer: 2000
    })
    }
  })
  this.spinner.hide();
  }

}

