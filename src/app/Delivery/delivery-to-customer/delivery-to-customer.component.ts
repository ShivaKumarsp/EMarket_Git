import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-delivery-to-customer',
  templateUrl: './delivery-to-customer.component.html',
  styleUrls: ['./delivery-to-customer.component.css']
})
export class DeliveryToCustomerComponent implements OnInit {

    form=new FormGroup({
        v_reasion:new FormControl('',[Validators.required])

      })

      form1=new FormGroup({
        receiveamount:new FormControl('',[Validators.required])        
      })
      form2=new FormGroup({
        votp:new FormControl('',[Validators.required])        
      })
      get f(){
        return this.form.controls;
      }
      get k(){
        return this.form2.controls;
      }
      
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

   order_id="";
   page2: number = 1;
   count1: number = 0;
   tableSize1: number = 5;
   search1="";

   request_delivery_list:any;
   pickup_delivery_list:any;
   drop_delivery_list:any;
   consignment_id=0;
   order_item_id=0;
   reasion="";
   formModel:any;
   otpModel:any;
   amountModel:any;
   submitted=false;
   submitted2=false;
   otp="";
   amount_collect_list:any;
   payable_amount=0;
   received_amount=0;
   received_otp="";

  ngOnInit(): void { 
    this.formModel = new window.bootstrap.Modal(
        document.getElementById("reasionmodule")
      );
      this.otpModel = new window.bootstrap.Modal(
        document.getElementById("otpmodule")
      );

      this.amountModel = new window.bootstrap.Modal(
        document.getElementById("amountcollectmodule")
      );

   let url='Delivery_to_Customer/get_data/';
   this.allapi.GetDataById(url,1).subscribe(promise=>{
    this.request_delivery_list=promise.request_delivery_list;
    this.pickup_delivery_list=promise.pickup_delivery_list;
    this.drop_delivery_list=promise.drop_delivery_list;
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
            let url='Delivery_to_Customer/update_accept_delivery/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
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
                        title: 'Order Failed Accepte',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    
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
  open_otp_model(ss:any)
  {
    this.submitted2=false;
    this.received_otp="";
this.otp=ss.customer_otp;
this.consignment_id=ss.consignment_id;
this.order_item_id=ss.order_item_id;
this.otpModel.show();
  }
  Update_OTP()
  {
    this.submitted2=true;
    if(this.form2.invalid)
    {
        return;
    }
    if(this.otp!=this.received_otp)
    {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'OTP Mismatch',
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }

    var data = {
      "consignment_id": this.consignment_id,
      "order_item_id":this.order_item_id,
     "language_id": 1
}
let url='Delivery_to_Customer/update_received_otp/'
this.allapi.PostData(url, data).subscribe(promise=> {

   if (promise.status == "Accept") {
     this.request_delivery_list=promise.request_delivery_list;
     this.pickup_delivery_list=promise.pickup_delivery_list;
     this.drop_delivery_list=promise.drop_delivery_list;
       Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'OTP Accepted Successfully',
           showConfirmButton: false,
           timer: 3000
       });
this.otpModel.hide();
   }
   else { 
       Swal.fire({
           position: 'center',
           icon: 'warning',
           title: 'Failed To OTP Accept',
           showConfirmButton: false,
           timer: 3000
       })
       
   }
})

  }
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
            let url='Delivery_to_Customer/update_reject_delivery/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Reject") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
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
                        title: 'Order Failed Reject',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    
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
            let url='Delivery_to_Customer/update_pickup_delivery/'
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
                        title: 'Order Failed Accepte',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    
                }
            })
  
        }
    })
  
  };


  deliverParcel(ss:any) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Deliver This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deliver it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "consignment_id": ss.consignment_id,
                "order_item_id":ss.order_item_id,
                "language_id": 1
            }
            let url='Delivery_to_Customer/deliver_item/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.request_delivery_list=promise.request_delivery_list;
                  this.pickup_delivery_list=promise.pickup_delivery_list;
                  this.drop_delivery_list=promise.drop_delivery_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Order Delivered Successfully',
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
                   
                }
            })
  
        }
    })
  
  };

  collect_cash(ss:any)
  {
    this.received_amount=0;
    this.consignment_id= ss.consignment_id;
    this.order_item_id=ss.order_item_id;
    this.order_id=ss.order_id;
   

    var data = {
        "consignment_id": ss.consignment_id,
        "order_item_id":ss.order_item_id,
        "order_id":ss.order_id,
        "language_id": 1
    }
    let url='Delivery_to_Customer/get_collect_amount/'
    this.allapi.PostData(url, data).subscribe(promise=> {
       this.amount_collect_list=promise.amount_collect_list;
       this.payable_amount=this.amount_collect_list[0].payable_amount;
    })

    this.amountModel.show();
  }
  collect_cash_update()
  {
    if(this.received_amount<this.payable_amount)
    {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Collectable Amount Is '+this.payable_amount,
            showConfirmButton: false,
            timer: 3000
        });
        return
    }

    var data = {
        "consignment_id": this.consignment_id,
        "order_item_id":this.order_item_id,
        "order_id":this.order_id,
        "collected_amount":this.received_amount,
        "language_id": 1
    }
    let url='Delivery_to_Customer/collect_amount/'
    this.allapi.PostData(url, data).subscribe(promise=> {
       if(promise.status=='Received')
       {
        this.request_delivery_list=promise.request_delivery_list;
        this.pickup_delivery_list=promise.pickup_delivery_list;
        this.drop_delivery_list=promise.drop_delivery_list;
        this.amountModel.hide();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Amount Collected Successfully',
            showConfirmButton: false,
            timer: 3000
        });

       }
       else if(promise.status=='Failed')
       {
        
       }
    })

  }
 
  keyPressSpace(event:any) {
    if(event.target.selectionStart===0 && event.code==='Space')
    {
      event.preventDefault();       
    }
  }
  keyPressnumber(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9.0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
