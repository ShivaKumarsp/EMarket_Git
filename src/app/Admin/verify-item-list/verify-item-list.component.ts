import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
declare var window: any;

@Component({
  selector: 'app-verify-item-list',
  templateUrl: './verify-item-list.component.html',
  styleUrls: ['./verify-item-list.component.css']
})
export class VerifyItemListComponent implements OnInit {

  constructor(private httpClient: HttpClient,
   private allapi:AllapiService,
   private router: Router,
   private formBuilder:FormBuilder) { }

   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];

   search="";
   all_item_list:any;
   imagepreview="";
   formModel:any;
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
   
  ngOnInit(): void {
  
      var data = {
          "language_id": 1
      }
let url='Item_Verification/Get_Item/';
      this.allapi.GetDataById(url, 1).subscribe(promise=> {
         this.all_item_list =JSON.parse(promise.itemlist).Table;
      });
     }

     previewimg(img:any) {
      this.imagepreview = img; 
      this.formModel = new window.bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );    
      this.formModel.show();    
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
  dismiss()
  {    
    this.formModel.hide();    
   
  }
}
