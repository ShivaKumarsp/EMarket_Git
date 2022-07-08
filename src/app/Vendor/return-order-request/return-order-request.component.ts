import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-return-order-request',
  templateUrl: './return-order-request.component.html',
  styleUrls: ['./return-order-request.component.css']
})
export class ReturnOrderRequestComponent implements OnInit {

 
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
   return_request_list:any;
   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";
   return_item_id=0;
   order_item_id=0;
   order_id=0;
   item_id=0;
   return_request_status="";
   return_request_reasion="";
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

    let url='CancelOrderRequest/get_data_return/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.return_request_list=JSON.parse(promise.return_request_list).Table;

        this.spinner.hide();
      })
      this.spinner.hide();
  }
 
  openModal(ss:any){
   this.return_item_id=ss.return_item_id;
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
"return_item_id":this.return_item_id,
"order_item_id":this.order_item_id,
"order_id":this.order_id,
"return_request_status":this.return_request_status,
"return_request_reasion":this.return_request_reasion,
"language_id":1
}
let url='CancelOrderRequest/update_order_return/';
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
    this.return_request_status="";
    this.return_request_reasion="";
    this.return_request_list=JSON.parse(promise.return_request_list).Table;
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

