import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-specification-for-vendor',
  templateUrl: './item-specification-for-vendor.component.html',
  styleUrls: ['./item-specification-for-vendor.component.css']
})
export class ItemSpecificationForVendorComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  public form: FormGroup;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder,
   private activateroute:ActivatedRoute) { this.form = formBuilder.group({
    acname:new FormControl('',[Validators.required]), 
    specname:new FormControl('',[Validators.required])

  }); }



  productid:any;
  product_id:any;
  productlist:any;
  specification_id:any;
  attribute_name_id:any;
  attribute_name_id1="";
  specificationlist:any;
  masterproductspeclist:any;
  productattributelist:any;
   productattributelist_1:any;
  itemspecificationlist:any;
  product_specification_id:any;
  enable_custom:boolean=false;
  is_variant_attribute:boolean=false;
btn_dissable:boolean=true;
productname="";


  ngOnInit(): void {
    this.productid=this.activateroute.snapshot.paramMap.get("productid");
    
    this.initSigup();
    //this.productid=165;//window.sessionStorage.getItem('productid');
    var data = {
      "product_id": parseInt(this.productid),
      "language_id": 1
  }
 let url='AddProduct/get_questionsetdata/';
  this.allapi.PostData(url, data).subscribe(promise=> {
      this.productlist = promise.productlist;
      this.productlist.forEach((ss:any)=> {
        if(ss.productid==this.productid)
        {
          this.productname=ss.productname
        }
      });
      this.product_id = parseInt(this.productid);
      this.specificationlist = promise.specificationlist;
      this.masterproductspeclist = promise.masterproductspeclist;
  });

  }

  onCheckboxChange(e:any) { 
   
    if (e.target.checked) {
      this.enable_custom=true;
    } else {
      this.enable_custom=false;
    }
  }

  onCheckboxChange_second(e:any) { 
   
    if (e.target.checked) {
      this.is_variant_attribute=true;
    } else {
      this.is_variant_attribute=false;
    }
  }

getattribute (sub:any) {
  this.productid=this.activateroute.snapshot.paramMap.get("productid");
    var sid = 1;

    var data =
    {
        "product_id": parseInt(this.product_id),
        "specification_id": parseInt(sub),
        "language_id": sid,
    }
let url='AddProduct/getproductattributelist/';

    this.allapi.PostData(url, data).subscribe(promise=> {
        this.productattributelist = promise.productattributelist;
       
    });
}

savedata() {
  this.btn_dissable=false;
  var data = {
      "product_specid":this.product_specification_id,
      "product_id":  parseInt(this.product_id),
      "specification_id": parseInt(this.specification_id),
      "attribute_name_id": parseInt(this.attribute_name_id),
      "language_id":1,
      "enable_custom_value":this.enable_custom,
      "is_variant_attribute":this.is_variant_attribute
      }
      let url='AddProduct/saveproductspecification/';
  this.allapi.PostData(url, data).subscribe(promise=> {
      if (promise.status == "Update") {
        this.attribute_name_id="";
        this.specification_id="";
         this.masterproductspeclist = promise.masterproductspeclist;
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: ' added Successfully.',
              showConfirmButton: false,
              timer: 3000
          })
      }
      else if (promise.status == "Failed") {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: ' Not added, Please Try Again',
              showConfirmButton: false,
              timer: 3000
          })
      }
      else {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: (promise.msg_flg),
              showConfirmButton: false,
              timer: 3000
          })
      }


  })
this.btn_dissable=true;
  //}
  //else {
  //   this.submitted = true;
  //}


}
initSigup() {
  this.form = new FormGroup({
    specname:new FormControl('',[Validators.required]),
      attname:new FormControl('',[Validators.required]),
      customvalue:new FormControl(),  
      variantvalue:new FormControl()    
  });
}
editmasterproductspec (ss:any) {
  this.attribute_name_id = ss.attributenameid;
  this.editgetattribute(parseInt(ss.specificationid));
  this.product_specification_id = ss.productspecificationid;
  this.product_id = ss.productid;
  this.specification_id = ss.specificationid;
  this.is_variant_attribute = ss.is_variant;

}

editgetattribute (sub:any) {
  this.productid=this.activateroute.snapshot.paramMap.get("productid");
    var sid = 1;

    var data =
    {
        "product_id": parseInt(this.product_id),
        "specification_id": parseInt(sub),
        "language_id": sid,
    }
let url='AddProduct/edit_getproductattributelist/';

    this.allapi.PostData(url, data).subscribe(promise=> {
      
        this.productattributelist = promise.productattributelist;
      
    });
}

deletemasterproductspec(ss:any) {

  var data = {
    "product_id": parseInt(this.product_id),
      "product_specification_id": ss.productspecificationid,
      "language_id":1
  }
  let url='AddProduct/deletemasterproductspecification/';
  this.allapi.PostData(url, data).subscribe(promise=> {
      if (promise.status == "Delete") {
         this.masterproductspeclist = promise.masterproductspeclist;
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: ' Deleted Successfully.',
              showConfirmButton: false,
              timer: 3000
          })
      }
      else if (promise.status == "Failed") {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: ' Sub Sub category Not Deleted, Please Try Again',
              showConfirmButton: false,
              timer: 3000
          })
      }
      else {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: (promise.messageflg),
              showConfirmButton: false,
              timer: 3000
          })
      }


  })

  //}
  //else {
  //   this.submitted = true;
  //}


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
