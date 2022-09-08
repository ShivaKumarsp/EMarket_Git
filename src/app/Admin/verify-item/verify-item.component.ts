import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-item',
  templateUrl: './verify-item.component.html',
  styleUrls: ['./verify-item.component.css']
})
export class VerifyItemComponent implements OnInit {

  constructor(private httpClient: HttpClient,
     private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { 
     this.form = formBuilder.group({
      v_status:new FormControl(''),
      v_remark:new FormControl('')
     })}
   
    editor: Editor = new Editor;
    productname: any;
    datatypelist: any;
    editData = "";
    pfid=0;
    feature_list:any;
    html:any = this.editData;
    
    
  form: FormGroup;
  router: any;
  pdetails: boolean = false;
  producttypelist: any;
  countrylist: any;
  storelist: any;
   warrantytypelist: any;
   currencylist: any;
   productlist: any;
   submitted: boolean = false;
   check_durability: boolean = false;

   base64='data:image/jpeg;base64,';
   durability_uom = "";
   durability ="";
   product_name ="";
   item_type ="";
   store_id = "";
   country_origin_id = "";
   warranty_uom_id="";
   mrp = "";
   listing_price = "";
   min_quantity ="";
   currency_id = "";
   warranty = "";
   expiry_date: any;

   item_id:any;
   item_code="";
   item_name ="";
   sku ="";
   manufacture_date:any;
   manufacture_details ="";
   p_imageurl ="";
   quantity = "";
   imagepath ="";
   verify_item_specification: any;
   verify_product:any;
  item_list:any
  edit_item_list:any
  format = 'yyyy-MM-dd';
  locale = 'en-US';
  Durable_type="";
  verify_status="";
  remarks="";
//validation
get f(){
  return this.form.controls;
}

  ngOnInit(): void {
    this.item_id=this.activateroute.snapshot.paramMap.get("itemid");
   
    var data = {
      "language_id": 1,
      "item_id": parseInt(this.item_id)
  }
  let requestFormUrl = 'Item_Verification/Get_Reviewitem/';
  this.allapi.PostData(requestFormUrl,data).subscribe(promise => {
    this.edit_item_list=JSON.parse(promise.view_item).Table;  
    this.warrantytypelist= JSON.parse(promise.warrantytypelist).Table; 
    this.verify_product=JSON.parse(promise.verify_product).Table;
     this.verify_item_specification=JSON.parse(promise.verify_item_specification).Table;
     this.feature_list=JSON.parse(promise.feature_list).Table;
     console.log(this.edit_item_list)
     if(this.feature_list!="")
     {
       this.html = this.feature_list[0].v_description;      
     }

       if (this.edit_item_list != "") {   
     this.manufacture_details=this.edit_item_list[0].manufacture_details;
     this.check_durability=this.edit_item_list[0].check_durability;
     this.item_id=this.edit_item_list[0].item_id;
        if(this.edit_item_list[0].durability!=0)
        {
          this.warrantytypelist.forEach((ss:any) => {
            if(ss.warrantyid==this.edit_item_list[0].durability)
            {
              this.Durable_type=ss.warrantyname;
            }
          });
        }
         }

  })
  
}
update_status()
{
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }
  var data={
    "item_id":this.item_id,
    "verify_status":this.verify_status,
    "remarks":this.remarks,
    "language_id":1
  }
  let url = 'Item_Verification/Upadate_Status/';
  this.allapi.PostData(url,data).subscribe(promise=>{
    if(promise.status=="Update")
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
window.location.replace('app/verifyitemlist');
    // this.verify_status="";
    // this.remarks="";
    // this.edit_item_list=JSON.parse(promise.view_item).Table;  
    // this.warrantytypelist= JSON.parse(promise.warrantytypelist).Table; 
    // this.verify_product=JSON.parse(promise.verify_product).Table;
    //  this.verify_item_specification=JSON.parse(promise.verify_item_specification).Table;
    //  this.feature_list=JSON.parse(promise.feature_list).Table;
    //  if(this.feature_list!="")
    //  {
    //    this.html = this.feature_list[0].v_description;      
    //  }

    //    if (this.edit_item_list != "") {   
    //  this.manufacture_details=this.edit_item_list[0].manufacture_details;
    //  this.check_durability=this.edit_item_list[0].check_durability;
    //  this.item_id=this.edit_item_list[0].item_id;
    //     if(this.edit_item_list[0].durability!=0)
    //     {
    //       this.warrantytypelist.forEach((ss:any) => {
    //         if(ss.warrantyid==this.edit_item_list[0].durability)
    //         {
    //           this.Durable_type=ss.warrantyname;
    //         }
    //       });
    //     }
    //      }
    }
    else if(promise.status=="Failed")
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    }
  })
}
}
