import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    public form: FormGroup;
    addproduct: FormGroup | undefined;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder) { this.form = formBuilder.group({
    catname:new FormControl('',[Validators.required]),
    sub_cat:new FormControl('',[Validators.required]),
    add_cat:new FormControl('',[Validators.required]),
    producttype: new FormControl('',[Validators.required]),
    productname_en: new FormControl('',[Validators.required]),
    baseprice:new FormControl('',[Validators.required]),
    hsn:new FormControl('',[Validators.required]),
    ian: new FormControl('', [Validators.required]),
    uom:new FormControl('',[Validators.required]),
    bommm: new FormControl('', [Validators.required]),
    short_desc_en: new FormControl('',[Validators.required]),
    itemimage: new FormControl('',[Validators.required]), 

  }); }
 

  //manufacturer_details:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)]),
  uom_weight_list:any;
  uom_size_list:any;
  category_list:any;
  product_type_list:any;
  brand_list:any;
  uom_list:any;
  uom_list_temp:any;
  cat_id="";
  sub_cat_id="";
  additionalcat_id="";
  sub_category_list:any;
  additional_category_list:any;
  product_type_id="";
  product_name="";
  base_price="";
  hsn_code="";
  ian_code="";
  uom_id="";
  is_contains_bom:boolean=false;
  short_description="";
  p_imageurl="";
  product_id=0;
  SelectedFile_Array:any;
  self_manufacturer="";
  is_perishable="";
  brand_id="";
  uom_weight_type_id="";
  ipAddress="";
 btn_dissable:boolean=false;
validation_list:any;
submitted=false;


  ngOnInit(): void {
    
   
    this.getIPAddress();
let requestFormUrl = 'AddProduct/get_data/';
    this.allapi.GetDataById(requestFormUrl, 1).subscribe(response=>{
   
      if(response.category_list!="")
      {
          this.uom_weight_list = [];
          this.uom_size_list = [];
          this.category_list = response.category_list;
          this.product_type_list = response.product_type_list;
          this.brand_list = response.brand_list;
          this.uom_list = response.uom_list;
          this.uom_list_temp = response.uom_list;
          this.uom_list_temp.map((ss:any)=>
          {
            if (ss.uomtype == 'Weight') {
              this.uom_weight_list.push(ss);
          }
          else if (ss.uomtype == 'meter') {
              this.uom_size_list.push(ss);
          }
          });
        }

      });

  }

get_sub_category (mcid:any) {
  this.sub_category_list=[];
  this.additional_category_list=[];
    var data = {
        "category_id": parseInt(mcid),
        "language_id": 1,
        "ipAddress":this.ipAddress,
        "apitype":"Web"
    }
    let url='AddProduct/get_sub_category/';
    this.allapi.PostData(url, data).subscribe(promise=> {
        if (promise.sub_category_list != "") {
            this.sub_category_list = promise.sub_category_list;
        }

    })
}

get_spl_category(mcid:any, mscid:any) {
  this.additional_category_list=[];
  var data = {
      "category_id": parseInt(mcid),
      "sub_category_id": parseInt(mscid),
      "language_id": 1,
      "ipAddress":this.ipAddress,
      "apitype":"Web"
  }
 
  let requestFormUrl = 'AddProduct/get_spl_category/';
    this.allapi.PostData(requestFormUrl,data).subscribe(response =>  {
      if (response.additional_category_list != "") {
        this.additional_category_list = response.additional_category_list;
    }
  })
}

selectFileUpload(imageInput: any) {
  var formData = new FormData();
  const file: File = imageInput.files[0];

if (imageInput.files[0].type != "image/jpeg") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Upload the JPEG file',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    } else if (imageInput.files[0].size > 2097152) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'mage size should be less than 2MB',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    }
    else
    {
      this.SelectedFile_Array=imageInput.files[0];
      formData.append("File", this.SelectedFile_Array);
      let url='ImageUpload/DocumentUpload/';
      return this.http.post('http://192.168.1.200:1305/ImageUpload/DocumentUpload', formData).subscribe((promise:any)=>
      {
       this.p_imageurl=promise.path;
      });
    }
}

savedata  () {
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }

    this.btn_dissable=false;
      var data = {
          "product_id": this.product_id,
          "category_id": parseInt(this.cat_id),
          "sub_category_id": parseInt(this.sub_cat_id),
          "additional_cat_id": parseInt(this.additionalcat_id),
          "brand_id": 0,
          "product_type_id": parseInt(this.product_type_id),
          "product_name": this.product_name,
          "product_code": "",
          "base_price": parseInt(this.base_price),
          "hsn_code": this.hsn_code,
          "ian_code": this.ian_code,
          "uom_id": parseInt(this.uom_id),
          "uom_weight_type_id": 0,
          "product_weight": 0,
          "uom_size_type_id": 0,
          "product_size_l":0,
          "product_size_b": 0,
          "product_size_h": 0,
          "self_manufacturer": false,
          "is_perishable": false,
          "is_contains_bom": false,
          "short_description": this.short_description,
          "image_path": this.p_imageurl,
          "language_id": 1,
          "apitype":"Web"
      }
      
let url='AddProduct/Save_Product/'
      this.allapi.PostData(url, data).subscribe(promise=> {
          if (promise.status == "Update") {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Add Product Saved Successfully.',
                  showConfirmButton: false,
                  timer: 3000
              })
              sessionStorage.setItem('productid', promise.ret_product_id);
              
              this.router.navigate(["/app/addproductspecification/"+promise.ret_product_id]);
             
              //window.location.reload();
          }
          else if (promise.status == "Failed") {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: promise.message,
                  showConfirmButton: false,
                  timer: 3000
              })
          }
          else if (promise.status == "Validation") {
            this.validation_list=promise.validation_list;
        }
          else {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: (promise.msg_flg),
                  showConfirmButton: false,
                  timer: 5000
              })
          }

          this.btn_dissable=true;
      })
 
};
Clear()
{
window.location.reload();
}
getIPAddress()
{
  
  this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    this.ipAddress = res.ip;
 
  });
}
//validation
get f(){
    return this.form.controls;
  }
  

}
