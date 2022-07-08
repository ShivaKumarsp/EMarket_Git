import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  
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
  page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";

  submitted=false;
   formModel: any;
   vendor_list:any; 
   vendor_store_list:any;
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

    let url='Customer_List/get_data_vendor/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.vendor_list=JSON.parse(promise.vendor_list).Table;

        this.spinner.hide();
      })
      this.spinner.hide();
  }
 
  view_store(ss:any){
    this.spinner.show();
    var data={
      "vendor_id":ss.vendor_id,
      "language_id":1
    }
    let url='Customer_List/view_vendor_store/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.vendor_store_list=JSON.parse(promise.vendor_store_list).Table;
        if(this.vendor_store_list!="")
        {
          this.formModel.show();
          this.spinner.hide();
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No data Found',
            showConfirmButton: false,
            timer: 3000
        })
        }
        this.spinner.hide();
       
      })


    this.spinner.hide();
  }

  closeModal(){
    this.formModel.hide();
  }

 onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

}

