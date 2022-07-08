import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-variant-map',
  templateUrl: './category-variant-map.component.html',
  styleUrls: ['./category-variant-map.component.css']
})
export class CategoryVariantMapComponent implements OnInit {

  
  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder)  { this.form = formBuilder.group({
    additionalcategory:new FormControl('',[Validators.required]),
    variant:new FormControl('',[Validators.required]),
     }); }
 
     page: number = 1;
     count: number = 0;
     tableSize: number = 7;
     tableSizes: any = [3, 6, 9, 12];

   public form: FormGroup;
  validation_list:any;
  additionalcategorylist:any
  variant_list:any;
  cat_variant_list:any;
  additional_cat_id="";
  attribute_name_id="";
  add_cat_variant_id=0;
  
  btn_dissable=false;
  submitted=false;
 
  ngOnInit(): void {
    let url='Master_Category_Specification/getvariantdata/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.additionalcategorylist=promise.additionalcategorylist;
        this.variant_list=promise.variant_list;
        this.cat_variant_list=promise.cat_variant_list;
      })
  }
  get_variant_list(ss:any)
  {
    var data = {
      "additional_cat_id": parseInt(ss),
      "language_id":1
  }

    let url='Master_Category_Specification/get_variant_list/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {      
    
        this.cat_variant_list=promise.cat_variant_list;
      })
  }
  savedata()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.btn_dissable=true;
    var data={
      "add_cat_variant_id":this.add_cat_variant_id,
      "additional_cat_id":this.additional_cat_id,
      "attribute_name_id":parseInt(this.attribute_name_id),
      "language_id":1
    }
    let url='Master_Category_Specification/save_cat_variant/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
         
          this.attribute_name_id="";
          this.add_cat_variant_id=0;
          this.cat_variant_list=promise.cat_variant_list;
        
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (promise.message),
                showConfirmButton: false,
                timer: 3000
            })
           
        }
        if(promise.status=="Update")
        {
          this.additional_cat_id="";
          this.attribute_name_id="";
          this.add_cat_variant_id=0;
          this.additionalcategorylist=promise.additionalcategorylist;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (promise.message),
                showConfirmButton: false,
                timer: 3000
            })
           
        }
        if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: (promise.message),
            showConfirmButton: false,
            timer: 3000
        })
        }
      })

  }
  Clear()
  {
    this.additional_cat_id="";
    this.attribute_name_id="";
    this.add_cat_variant_id=0;
    this.submitted = false;
  this.form.reset();
  }

  edit_variant(ss:any)
  {
this.add_cat_variant_id=ss.addcat_variant_id;
this.additional_cat_id=ss.additionalcat_id;
this.get_variant_list(this.additional_cat_id);
this.attribute_name_id=ss.attributename_id;
  }
  delete_specidfication(ss:any)
  {

  }
  //validation
get f(){
  return this.form.controls;
}
onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
}
