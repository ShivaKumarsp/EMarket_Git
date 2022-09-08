import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alphaAsync } from '@rxweb/reactive-form-validators';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-receive-hub-to-hub',
  templateUrl: './receive-hub-to-hub.component.html',
  styleUrls: ['./receive-hub-to-hub.component.css']
})
export class ReceiveHubToHubComponent implements OnInit {

  
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
  
page:any=2
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
all_item_details:any;
request_delivery_list:any;
pickup_delivery_list:any;
drop_delivery_list:any;
consignment_id=0;
order_item_id=0;
reasion="";
formModel:any;
dropModel:any;
otpModel:any;
amountModel:any;
submitted=false;
submitted2=false;
otp="";
amount_collect_list:any;
payable_amount=0;
received_amount=0;
received_otp="";
pt_to_hub_array:any;
pickup_delivery_list_details:any;
drop_delivery_list_details:any;
drop_all_item_details:any;

ngOnInit(): void { 
this.formModel = new window.bootstrap.Modal(
    document.getElementById("openformModal")
  );
  this.dropModel = new window.bootstrap.Modal(
    document.getElementById("dropformModal")
  );
let url='Receive_Hub_To_Hub/get_data/';
this.allapi.GetDataById(url,1).subscribe(promise=>{
//this.request_delivery_list=promise.request_delivery_list;
this.pickup_delivery_list=promise.pickup_delivery_list;
this.drop_delivery_list=promise.drop_delivery_list;
this.pickup_delivery_list_details=promise.pickup_delivery_list_details;
this.drop_delivery_list_details=promise.drop_delivery_list_details;
})
}

batch_details(ss:any) {  
var data={
  "batch_id":ss.batch_id,
"language_id":1
}
  let url='Receive_Hub_To_Hub/get_batch_data_details/';
this.allapi.PostData(url,data).subscribe(promise=>{
this.all_item_details=promise.all_item_details;
this.formModel.show();
})
};
delivery_batch_details(ss:any) {  
  var data={
    "batch_id":ss.batch_id,
  "language_id":1
  }
    let url='Receive_Hub_To_Hub/get_delivery_batch_data_details/';
  this.allapi.PostData(url,data).subscribe(promise=>{
  this.drop_all_item_details=promise.drop_all_item_details;
  this.dropModel.show();
  })
  };

pickupParcel(aa:any) {
this.pt_to_hub_array=[];

  this.pickup_delivery_list_details.forEach((ss:any)=>
  {
    if(aa.batch_id==ss.batch_id)
    {
      this.pt_to_hub_array.push({consignment_id:ss.consignment_id})
    }
  })

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
            "batch_id": aa.batch_id,
            "pt_to_hub_array":this.pt_to_hub_array,
            "language_id": 1
        }
        let url='Receive_Hub_To_Hub/update_pickup_delivery/'
        this.allapi.PostData(url, data).subscribe(promise=> {

            if (promise.status == "Accept") {
              this.pickup_delivery_list=promise.pickup_delivery_list;
              this.drop_delivery_list=promise.drop_delivery_list;
              this.pickup_delivery_list_details=promise.pickup_delivery_list_details;
              this.drop_delivery_list_details=promise.drop_delivery_list_details;
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Batch Pickedup Successfully',
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

deliverParcel(aa:any) {
  this.pt_to_hub_array=[];
  
    this.drop_delivery_list_details.forEach((ss:any)=>
    {
      if(aa.batch_id==ss.batch_id)
      {
        this.pt_to_hub_array.push({consignment_id:ss.consignment_id})
      }
    })
  
  Swal.fire({
      title: 'Are you sure?',
      text: "Do You want Drop This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Drop it!'
  }).then((result) => {
      if (result.isConfirmed) {
  
          var data = {
              "batch_id": aa.batch_id,
              "pt_to_hub_array":this.pt_to_hub_array,
              "language_id": 1
          }
          let url='Receive_Hub_To_Hub/update_drop_delivery/'
          this.allapi.PostData(url, data).subscribe(promise=> {
  
              if (promise.status == "Accept") {
                this.pickup_delivery_list=promise.pickup_delivery_list;
                this.drop_delivery_list=promise.drop_delivery_list;
                this.pickup_delivery_list_details=promise.pickup_delivery_list_details;
                this.drop_delivery_list_details=promise.drop_delivery_list_details;
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Batch Droped Successfully',
                      showConfirmButton: false,
                      timer: 3000
                  });
  
              }
              else { 
                  Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Order Failed Drope',
                      showConfirmButton: false,
                      timer: 3000
                  })
                  
              }
          })
  
      }
  })
  
  };







onTableDataChange(event: any) {
  this.page1 = event;
  this.ngOnInit();
  }
  
  onTableDataChange1(event: any) {
  this.page2 = event;
  this.ngOnInit();
  }

}
