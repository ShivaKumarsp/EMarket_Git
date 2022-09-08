import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
declare var window: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder,
   private activateroute:ActivatedRoute) { }
   all_product_list:any;
   imagepreview="";
   formModel:any;
   search="";
   base64='data:image/jpeg;base64,';
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
   
  ngOnInit(): void {

    
let url='All_Product/get_data/';
      this.allapi.GetDataById(url, 1).subscribe(promise=> {
          this.all_product_list =JSON.parse(promise.all_product_list).Table;


      });
 
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
