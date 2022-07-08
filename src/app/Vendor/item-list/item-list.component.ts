import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
declare var window: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService) { }

  //  itel_list = new FormGroup({
  //     v_search:new FormControl() 
  // });

   page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";

   all_item_list:any;
   imagepreview="";
   formModel:any;
 totalItem:number=0
  ngOnInit(): void {
  
      var data = {
          "language_id": 1
      }
      let url='All_Item/get_data/';

      this.allapi.GetDataById(url, 1).subscribe(promise=> {
         this.all_item_list = promise.all_item_list;
         this.totalItem=promise.all_item_list.length
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
