import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.css']
})
export class ProductVariantComponent implements OnInit {

 
  constructor(private httpClient: HttpClient,
    private router: Router,
    private allapi:AllapiService,
    private formBuilder:FormBuilder,
    private activateroute:ActivatedRoute)  { this.form = formBuilder.group({
     attributename:new FormControl('',[Validators.required]),
     v_level:new FormControl('',[Validators.required])
      }); }
  
      page: number = 1;
      count: number = 0;
      tableSize: number = 7;
      tableSizes: any = [3, 6, 9, 12];
 
    public form: FormGroup;
   validation_list:any;
   variant_list:any;
   attributename_list:any;
   additional_cat_id="";
   attribute_name_id="";
   add_cat_variant_id=0;
   productid:any;
   btn_dissable=false;
   submitted=false;
   product_name="";
   level:any;
   variantid=0;

   ngOnInit(): void {
    this.productid=this.activateroute.snapshot.paramMap.get("productid");
    var data={
      "product_id": parseInt(this.productid),
      "language_id":1
    }
     let url='Product_Specification/getvariantdata/';
     this.allapi.PostData(url,data).subscribe(promise=>
       {
         this.attributename_list=JSON.parse(promise.attributename_list).Table;
         this.variant_list=JSON.parse(promise.variant_list).Table;
     this.product_name=promise.product_name;
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
       "variant_id":this.variantid,
       "product_id":parseInt(this.productid),
       "attributename_id":parseInt(this.attribute_name_id),
       "is_level":parseInt(this.level),
       "language_id":1
     }
     let url='Product_Specification/save_productvariant/';
     this.allapi.PostData(url,data).subscribe(promise=>
       {
         if(promise.status=="Insert")
         {
          
           this.attribute_name_id="";
           this.variantid=0;
           this.level="";
           this.variant_list=JSON.parse(promise.variant_list).Table;
           this.attributename_list=JSON.parse(promise.attributename_list).Table;
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
          this.attribute_name_id="";
           this.variantid=0;
           this.level="";
           this.variant_list=JSON.parse(promise.variant_list).Table;
           this.attributename_list=JSON.parse(promise.attributename_list).Table;
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
    this.attribute_name_id="";
    this.variantid=0;
    this.level="";
     this.submitted = false;
   this.form.reset();
   }
 
   edit_variant(ss:any)
   {
 this.attribute_name_id=ss.attribute_name_id;
 this.level=ss.is_level;
 this.variantid=ss.variant_id;
   }

   delete_variant(ss:any) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do You want Delete This!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
  
            var data = {
                "variant_id": ss.variant_id,
                "product_id":parseInt(this.productid),
                "language_id": 1,
            }
            let delurl='Product_Specification/delete_productvariant/'
            this.allapi.PostData(delurl,data).subscribe(promise=>{
                if (promise.status == "Delete") {
                  this.attribute_name_id="";
                  this.variantid=0;
                  this.level="";
                  this.variant_list=JSON.parse(promise.variant_list).Table;
                  this.attributename_list=JSON.parse(promise.attributename_list).Table;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Deleted Successfully',
                        showConfirmButton: false,
                        timer: 3000
                    }); 
  
                }
                else {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Somthing Wrong Please Try Later',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
  
        }
    })
  
  };

 
   //validation
 get f(){
   return this.form.controls;
 }
 onTableDataChange(event: any) {
   this.page = event;
   this.ngOnInit();
 }
 }
 