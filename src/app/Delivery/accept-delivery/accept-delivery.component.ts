import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';

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

  
   page2: number = 1;
   count1: number = 0;
   tableSize1: number = 5;
   search1="";

  orders:any=[
    {
      parcelid:1234324,
      pickup:'ABC, Bangalore',
      drop:'xyz, Mysore',
      datetime:'11/02/2022'
    },
    {
      parcelid:2234324,
      pickup:'ABC, Bangalore',
      drop:'xyz, Mysore',
      datetime:'12/02/2022'
    },
    {
      parcelid:1234324,
      pickup:'ABC, Bangalore',
      drop:'xyz, Mysore',
      datetime:'13/02/2022'
    }

  ]
  pending_delivery_list:any;
  accept_delivery_list:any;
  ngOnInit(): void {
   let url='Accept_Delivery/get_data/';
   this.allapi.GetDataById(url,1).subscribe(promise=>{
    this.pending_delivery_list=promise.pending_delivery_list;
    this.accept_delivery_list=promise.accept_delivery_list;
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
                "delivery_accept_id": ss.delivery_accept_id,
                "order_item_id":ss.order_item_id,
                "language_id": 1
            }
            let url='Accept_Delivery/update_accept_delivery/'
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Accept") {
                  this.pending_delivery_list=promise.pending_delivery_list;
                  this.accept_delivery_list=promise.accept_delivery_list;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Parcel Accepted Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Parcel Not Accepted',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.pending_delivery_list=promise.pending_delivery_list;
                }
            })
  
        }
    })
  
  };
  
  onSubmit(){
    console.log(this.forms.value)
  }



}
