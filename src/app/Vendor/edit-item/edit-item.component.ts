import { formatDate, NgPlural } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  
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
  
     In_the_box=""
     durability_uom = "";
     durability ="";
     product_id ="";
     item_type_id ="";
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
     selectedFile: any;
    selectItemImageUpload:any;
    item_list:any
    edit_item_list:any
    format = 'yyyy-MM-dd';
    locale = 'en-US';
    product_details:any;
    validation_list:any;
     itempat="[a-zA-Z][a-zA-Z ]{4,}";
     mrppat="^[+]?[0-9]+([.][0-9]+)?$";
     qtypat="^[+]?[0-9]+([.][0-9]+)?$"
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
    private spinner:NgxSpinnerService) { 
    this.form = formBuilder.group({
      v_productid:new FormControl('', [Validators.required]),
      v_item_type:new FormControl('',[Validators.required]),
      v_itemname:new FormControl('',[Validators.required]),
      v_storename: new FormControl('',[Validators.required]),
      v_item_mrp: new FormControl('',[Validators.required]),
      v_item_list_price:new FormControl('',[Validators.required]),
      v_currencyid:new FormControl('',[Validators.required]),
      v_quantity:new FormControl(''),
      v_min_quantity:new FormControl('',[Validators.required]),
      v_sku_id:new FormControl('',[Validators.required]),
      v_checkdurability: new FormControl(),
      v_durability_duration:new FormControl(),
      v_durableumo: new FormControl(),
      v_inthebox: new FormControl(),
      v_manufacturer_details: new FormControl(),
      v_manufacturing_date:new FormControl(),
      v_product_expiry:new FormControl(),
      v_country:new FormControl(),
      v_product_warrent:new FormControl(),
      v_warrantyumo:new FormControl(),
      v_imagepic:new FormControl(),

    });
   }

   ngOnInit(): void {
    this.spinner.show();
    this.item_id=this.activateroute.snapshot.paramMap.get("itemid");
   
    var data = {
      "language_id": 1,
      "item_id": parseInt(this.item_id)
  }
  let requestFormUrl = 'All_Item/get_edit_data/';
  this.allapi.PostData(requestFormUrl,data).subscribe(promise => {
      if (promise.edit_item_list != "") {
        this.edit_item_list = promise.edit_item_list;        
        this.item_code =this.edit_item_list[0].itemcode;
        this.item_type_id  =this.edit_item_list[0].itemtype_id ;
        this.product_id   =this.edit_item_list[0].productid;     
        this.expiry_date   =this.edit_item_list[0].expirydate;             
        this.manufacture_details   =this.edit_item_list[0].manufacturedetails;
        this.country_origin_id   =this.edit_item_list[0].countryorigin_id;
        this.warranty_uom_id   =this.edit_item_list[0].warrantyuom_id;
        this.warranty   =this.edit_item_list[0].v_warranty;
        this.mrp   =this.edit_item_list[0].v_mrp;
        this.listing_price   =this.edit_item_list[0].listingprice;
        this.min_quantity   =this.edit_item_list[0].minquantity;     
        this.store_id   =this.edit_item_list[0].storeid;  
        this.durability    =this.edit_item_list[0].v_durability;
        this.item_name    =this.edit_item_list[0].itemname;
        this.p_imageurl   =this.edit_item_list[0].itemimage;
          this.quantity    =this.edit_item_list[0].v_quantity;
        this.currency_id=this.edit_item_list[0].currencyid;
        this.In_the_box=this.edit_item_list[0].inthe_box;
        this.sku=this.edit_item_list[0].v_sku;
        this.form.patchValue({
          v_manufacturing_date: formatDate(this.edit_item_list[0].manufacturedate, this.format, this.locale)
          });
      
     }
   
   
     if(promise.producttypelist!="")
     {   this.product_details=JSON.parse(promise.product_details).Table;
         this.producttypelist = promise.producttypelist;
         this.countrylist = promise.countrylist;
         this.productlist = promise.productlist;
         this.storelist = promise.storelist;
         this.warrantytypelist = promise.warrantytypelist;
         this.currencylist = promise.currencylist;
        
     }
     

  })
  this.spinner.hide();
}

   get f(){
    return this.form.controls;
  }
  editForm(){  
    this.submitted=true;
    if(this.form.invalid)
    {
      return
    }
    if(this.listing_price>this.mrp)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Listing Price Should be Less Or Equal To MRP',
        showConfirmButton: false,
        timer: 3000
      })
      return;
    }

    if(this.country_origin_id=="" ||this.country_origin_id=="0"||this.country_origin_id==null)
    {
      this.country_origin_id="0";
    }
    if(this.warranty_uom_id=="" ||this.warranty_uom_id=="0"||this.warranty_uom_id==null)
    {
      this.warranty_uom_id="0";
    }
    if(this.warranty=="" ||this.warranty=="0"||this.warranty==null)
    {
      this.warranty="0";
    }
    if(this.manufacture_date=="" ||this.manufacture_date=="0"||this.manufacture_date==null)
    {
      this.manufacture_date="0001-01-01T00:00:00"
    }
  
     this.spinner.show();
    let itemcode=this.item_name;
    
    let sid=1;
    if(this.In_the_box==null)
    {
      this.In_the_box="";
    }
    var data =
    {
        "item_id": parseInt(this.item_id),
        "item_name": this.item_name,
        "item_code":itemcode,
        "sku": this.sku,
        "item_type_id":parseInt(this.item_type_id),
        "currency_id": parseInt(this.currency_id),
        "product_id": parseInt(this.product_id),
        "expiry_date": this.expiry_date,
        "manufacture_date": this.manufacture_date,
        "manufacture_details": this.manufacture_details.trim(),
        "country_origin_id": parseInt(this.country_origin_id),
        "warranty_uom_id": parseInt(this.warranty_uom_id),
        "warranty": parseInt(this.warranty),
        "mrp": parseInt(this.mrp),
        "listing_price":parseInt(this.listing_price),
        "min_quantity": parseInt(this.min_quantity),
        "store_id": parseInt(this.store_id),
        //"durability_umo": parseInt(this.durability_uom),
        //"durability": parseInt(this.durability),
        "check_durability": this.check_durability,
        "language_id": sid,
        "item_image": this.p_imageurl,
        "quantity": parseInt(this.quantity),
        "In_the_box":this.In_the_box,
  
    }


    let url2 = 'Vendor_Add_Item/saveproductitem/';
    this.allapi.PostData(url2,data).subscribe(promise => {  
  
        if (promise.status == 'Insert') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Item Updatred Successfully.',
                showConfirmButton: false,
                timer: 3000
            })
            this.spinner.hide();
            window.location.replace("/app/additemspecification/" + promise.ret_item_id);
         //this.router.navigate(["/app/additemspecification/" + promise.ret_item_id]);
  
        }
        else if (promise.status == "Validation") {
        
            this.validation_list=promise.validation_list;
             this.spinner.hide();

        }
        else if(promise.status == "Failed") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.messageflg,
                showConfirmButton: false,
                timer: 5000
            })
            this.spinner.hide();
        }
  
    })
    this.spinner.hide();
  };
  
  showItem:boolean=false;
  bindThis:any;
  
  getimg(ss:any) {
  let tempSS = parseInt(ss);
  var data={
    "product_id":parseInt(ss),
    "language_id":1
  }
  let url = 'Vendor_Add_Item/saveproductitem/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      this.product_details=JSON.parse(promise.product_details).Table; 
    })

  }

  ItemImageUpload(imageInput: any) {
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
        title: 'Image size should be less than 2MB',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    }
    else if (imageInput.files[0].size < 10000) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Image size Minimun 10kb',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    }
   this.selectItemImageUpload=imageInput.files[0];
   formData.append("File", this.selectItemImageUpload);
   let url='http://192.168.1.200:1305/api/ImageUpload/DocumentUpload'; 
  
   return this.http.post(url, formData).subscribe((promise:any)=>
   {
      this.p_imageurl=promise.path;
    
   })
  }
  clear()
  {

  }
 
}

