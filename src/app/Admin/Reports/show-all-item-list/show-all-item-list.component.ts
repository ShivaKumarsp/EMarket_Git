import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
declare var window:any;

@Component({
  selector: 'app-show-all-item-list',
  templateUrl: './show-all-item-list.component.html',
  styleUrls: ['./show-all-item-list.component.css']
})
export class ShowAllItemListComponent implements OnInit {

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
   all_item_list:any; 

   cancel_item_id=0;
   order_item_id=0;
   order_id=0;
   item_id=0;
   cancel_request_status="";
   cancel_request_reasion="";
   accept_order_count:any;
   reject_order_count:any;
   imagepreview="";
  //validation
  get f(){
    return this.orderGroup.controls;
  }
  ngOnInit(): void {
    this.spinner.show();
   
    let url='Item_Verification/get_all_Item/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        if(this.all_item_list!="")
        {
          this.all_item_list =JSON.parse(promise.itemlist).Table;
        }
        this.spinner.hide();        
      })
      this.spinner.hide();
  } 

  previewimg(img:any) {
    this.imagepreview = img; 
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );    
    this.formModel.show();    
}
dismiss()
{    
  this.formModel.hide();    
 
}
 onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }


}

