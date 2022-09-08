import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';


class ImageSnippet {
  constructor(src: string, file: File) { }
}

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  form: FormGroup;
  format = 'yyyy-MM-dd';
  locale = 'en-US';
  btn_dissable=false;
  currentDate="";
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


  durability_uom = "";
  durability = "";
  product_id = "";
  item_type_id = "";
  store_id = "";
  country_origin_id = "";
  warranty_uom_id = "";
  mrp = "";
  listing_price = "";
  min_quantity = "";
  currency_id = "";
  warranty = "";
  expiry_date: any;
base64='data:image/jpeg;base64,';
imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  item_id = 0;
  item_code = "";
  item_name = "";
  sku = "";
  manufacture_date: any;
  manufacture_details = "";
  p_imageurl = "";
  quantity = "";
  imagepath = "";
  selectedFile: any;
  selectItemImageUpload: any;
  item_list: any;
  itempat = "[a-zA-Z][a-zA-Z ]{4,}";
  mrppat = "^[+]?[0-9]+([.][0-9]+)?$";
  qtypat = "^[+]?[0-9]+([0-9]+)?$";
  //  btn_dissable:boolean=false;
  validation_list: any;
  dub_show=false;
  In_the_box=""

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,
    private spinner:NgxSpinnerService
  ) {
    this.form = formBuilder.group({
      storename: new FormControl('', [Validators.required]),
      item_type: new FormControl('', [Validators.required]),
      productname: new FormControl('', [Validators.required]),
      itemname: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5),Validators.maxLength(40)]),
      item_mrp: new FormControl('', [Validators.required,Validators.min(1),Validators.max(1000000)]),
      item_list_price: new FormControl('', [Validators.required,Validators.min(1),Validators.max(1000000)]),
      itemquantity: new FormControl('',[Validators.required,Validators.min(1),Validators.max(1000)]),
      minquantity: new FormControl('', [Validators.required,Validators.min(1),Validators.max(1000)]),
      itemimage: new FormControl('', [Validators.required]),
      currencyid: new FormControl('', [Validators.required]),
      sku_id: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(3)]),
      durability_duration: new FormControl(),
      manufacturer_details: new FormControl(),
      v_checkdurability: new FormControl(),
      manufacturing_date: new FormControl(),
      product_expiry: new FormControl(),
      product_warrent: new FormControl(),     
      durableumo: new FormControl(),     
      country: new FormControl(),     
      warrantyumo: new FormControl(),
      In_Box:new FormControl(),
      v_durability_duration:new FormControl(null),
      v_durableumo:new FormControl(null),
    });
  }
  letObservable: any
  get item_mrp() {
    return this.form.get('item_mrp')!;
  }
  get item_list_price() {
    return this.form.get('item_list_price')!;
  }
  get itemquantity() {
    return this.form.get('itemquantity')!;
  }
  get minquantity() {
    return this.form.get('minquantity')!;
  }

  get itemname() {
    return this.form.get('itemname')!;
  }

  get f() {
    return this.form.controls;
  }
  keyPressname(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    // (/[a-zA-Z0-9-_ ]/.test(inp))
    if (/[a-zA-Z-_ 0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressSpace(event:any) {
    if(event.target.selectionStart===0 && event.code==='Space')
    {
      event.preventDefault();       
    }
  }

  get v_durability_duration() {
    return this.form.get('v_durability_duration')!;
  }
   //get data
   ngOnInit(): void {

this.spinner.show();
    let tdate=new Date();
    let c_date=tdate.setDate(tdate.getDate()-1);
     this.currentDate=formatDate(c_date, this.format, this.locale)

       let sid = 1;
       let requestFormUrl = 'Vendor_Add_Item/getdata/';
       this.allapi.GetDataById(requestFormUrl, 1).subscribe(promise => {

         this.pdetails = false;
         if (promise.producttypelist != "") {
           this.producttypelist = promise.producttypelist;
           this.countrylist = promise.countrylist;
           this.productlist = promise.productlist;
           this.storelist = promise.storelist;
           this.warrantytypelist = promise.warrantytypelist;
           this.currencylist = promise.currencylist;

         }
         this.spinner.hide();
       })


       //end get


     }
     checkdub()
     {       this.submitted=false; 
       this.dub_show=this.check_durability;
       if(this.dub_show==true)
       {
        this.form.controls["v_durableumo"].setValidators([Validators.required]);
        this.form.controls["v_durableumo"].updateValueAndValidity();
        this.form.controls["v_durability_duration"].setValidators([Validators.required,Validators.min(1)]);
        this.form.controls["v_durability_duration"].updateValueAndValidity();
       }
       else if(this.dub_show==false)
       {
        this.form.controls["v_durableumo"].setValidators(null);
        this.form.controls["v_durableumo"].updateValueAndValidity();
        this.form.controls["v_durability_duration"].setValidators(null);
        this.form.controls["v_durability_duration"].updateValueAndValidity();
       }
     }
  saveForm() {
 
    if(this.form.value.itemname.trim().length<5){
      this.form.controls['itemname'].setErrors({'minlength': true})
    }
    if(this.form.value.sku_id.trim().length<3){
      this.form.controls['sku_id'].setErrors({'minlength': true})
    }

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.listing_price>this.mrp)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Listing Price Must be Less Or Equal To MRP',
        showConfirmButton: false,
        timer: 3000
      })
      return;
    }
    this.spinner.show();
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
    if(this.durability=="" ||this.durability=="0"||this.durability==null)
    {
      this.durability="0"
    }
    if(this.durability_uom=="" ||this.durability_uom=="0"||this.durability_uom==null)
    {
      this.durability_uom="0"
    }

    if(this.check_durability==true)
    {
      if(this.durability=="" ||this.durability=="0")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Enter Durable Till',
          showConfirmButton: false,
          timer: 3000
        })
        return
      }
      if(this.durability_uom=="")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Select Durable Type',
          showConfirmButton: false,
          timer: 3000
        })
        return
      }
    }
    if(this.check_durability==false)
    {
      this.durability_uom="0";
     
    }
   

    let itemcode = this.item_name;
    let sid = 1;
    var data =
    {
      "item_id": this.item_id,
      "item_name": this.item_name.trim(),
      "item_code": itemcode.trim(),
      "sku": this.sku.trim(),
      "item_type_id": parseInt(this.item_type_id),
      "currency_id": parseInt(this.currency_id),
      "product_id": parseInt(this.product_id),
      "expiry_date": this.expiry_date,
      "manufacture_date": this.manufacture_date,
      "manufacture_details": this.manufacture_details.trim(),
      "country_origin_id": parseInt(this.country_origin_id),
      "warranty_uom_id": parseInt(this.warranty_uom_id),
      "warranty": parseInt(this.warranty),
      "mrp": parseFloat(this.mrp),
      "listing_price": parseFloat(this.listing_price),
      "min_quantity": parseInt(this.min_quantity),
      "store_id": parseInt(this.store_id),
      "durability_umo": parseInt(this.durability_uom),
      "durability": parseInt(this.durability),
      "check_durability": this.check_durability,
      "language_id": sid,
      "item_image": this.p_imageurl,
      "quantity": parseInt(this.quantity),
      "In_the_box":this.In_the_box.trim(),
    }
  
    let url2 = 'Vendor_Add_Item/saveproductitem/';
    this.allapi.PostData(url2, data).subscribe(promise => {

      if (promise.status == "Insert") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Add Item Saved Successfully.',
          showConfirmButton: false,
          timer: 3000
        })

       window.location.replace("/app/additemspecification/" + promise.ret_item_id);
        //this.router.navigatee(["/app/additemspecification/" + promise.ret_item_id]);
        this.spinner.hide();
      }
      else if (promise.status == "Failed") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.messageflg,
          showConfirmButton: false,
          timer: 5000
        })
      }
      else if (promise.status == "Validation") {
        this.validation_list = promise.validation_list;
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.messageflg,
          showConfirmButton: false,
          timer: 5000
        })
      }
      // this.btn_dissable=true;
    })
    this.spinner.hide();
  };
  Clear() {
window.location.reload();
  }
  //bind product details data to the card
  showItem: boolean = false;
  bindThis: any;
  getimg(ss:any) {
    let tempSS = parseInt(ss);
    var data={
      "product_id":parseInt(ss),
      "language_id":1
    }
    let url = 'Vendor_Add_Item/get_product_details/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.showItem = true
        this.bindThis=promise.productlist; 
      })
  
    }


  // image upload to convert base 64 to imageuploadcontroller
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
    
    this.selectItemImageUpload = imageInput.files[0];
    formData.append("File", this.selectItemImageUpload);
    let url = 'http://localhost:1305/api/ImageUpload/Item_Image_Upload';
    return this.http.post(url, formData).subscribe((promise: any) => {
      this.p_imageurl = promise.path;
      console.log(this.p_imageurl)
    })
  }


}
