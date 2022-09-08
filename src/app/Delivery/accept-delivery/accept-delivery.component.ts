import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-accept-delivery',
  templateUrl: './accept-delivery.component.html',
  styleUrls: ['./accept-delivery.component.css']
})
export class AcceptDeliveryComponent implements OnInit {



  page:any=1
  forms=new FormGroup({});
  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private authService:AuthService,
   private formBuilder:FormBuilder) { }

   total = 0;
   page1: number = 1;
   count: number = 0;
   tableSize: number = 5;
   tableSizes: any = [3, 6, 9, 12];
   search="";
rgb='style="background-color: rgb(236, 190, 221)"';
  
   page2: number = 1;
   count1: number = 0;
   tableSize1: number = 5;
   search1="";
   pending_delivery_store_list:any;
   consignment_id=0;
   order_item_id=0;
   reasion="";
   pickup_delivery_list:any;
  request_delivery_list:any;
  drop_delivery_list:any;
  consignment_array:any;
  formModel:any;
  submitted=false;

  form=new FormGroup({
    v_reasion:new FormControl('',[Validators.required])
  })
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
        document.getElementById("reasionmodule")
      );

   let url='Accept_Delivery/get_data/';
   this.allapi.GetDataById(url,1).subscribe(promise=>{
    this.request_delivery_list=promise.request_delivery_list;
    this.pickup_delivery_list=promise.pickup_delivery_list;
    this.drop_delivery_list=promise.drop_delivery_list;
 
    this.pending_delivery_store_list=promise.pending_delivery_store_list;
   })
  }

  onTableDataChange(event: any) {
    this.page1 = event;
    this.ngOnInit();
  }

  onTableDataChange1(event: any) {
    this.page2 = event;
    this.ngOnInit();
  }
  acceptingstoreParcel(store:any) {
    this.consignment_array=[];
   this.pickup_delivery_list.forEach((ss:any)=> {
  if(store.store_id==ss.store_id)
  {
    this.consignment_array.push({consignment_id:ss.consignment_id,order_item_id:ss.order_item_id})
  }
});
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
                "connsignment_array": this.consignment_array,
                 "language_id": 1
            }
            let url='Accept_Delivery/update_accept_delivery_store/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                  this.pending_delivery_store_list=promise.pending_delivery_store_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Order Accepted Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Not Accepted',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.pickup_delivery_list=promise.pickup_delivery_list;
                }
            })
  
        }
    })
  
  };



  acceptingParcel(ss:any) {

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
                "order_item_id":ss.order_item_id,
                "language_id": 1
            }
            let url='Accept_Delivery/update_accept_delivery/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                  this.pending_delivery_store_list=promise.pending_delivery_store_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Order Accepted Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Not Accepted',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.pickup_delivery_list=promise.pickup_delivery_list;
                }
            })
  
        }
    })
  
  };

  open_rejectmodule(ss:any) {  
    this.consignment_id=ss.consignment_id;
  this.order_item_id=ss.order_item_id;
  this.formModel.show();
  };

  rejectParcel() {
if(this.reasion.trim()=="")
{
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Enter Reasion',
        showConfirmButton: false,
        timer: 3000
    });
    return;
}
this.submitted=true;
if(this.form.invalid)
{
    return;
}

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Reject This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject it!'
    }).then((result) => {
        if (result.isConfirmed) {
   
            var data = {
                "consignment_id": this.consignment_id,
                "order_item_id":this.order_item_id,
                "reasion":this.reasion,
                "language_id": 1
            }
            let url='Accept_Delivery/update_reject_delivery/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Reject") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                  this.pending_delivery_store_list=promise.pending_delivery_store_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Order Rejected Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    this.formModel.hide();
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Not Rejected',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.pickup_delivery_list=promise.pickup_delivery_list;
                }
            })
  
        }
    })
  
  };
  
  pickupParcel(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Pickup This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Pickup it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "order_item_id":ss.order_item_id,
                "language_id": 1
            }
            let url='Accept_Delivery/pickup_from_vendor/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Order Pickedup Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Order Not Delivered',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.pickup_delivery_list=promise.pickup_delivery_list;
                }
            })
  
        }
    })
  
  };

  onSubmit(){
    console.log(this.forms.value)
  }



}
