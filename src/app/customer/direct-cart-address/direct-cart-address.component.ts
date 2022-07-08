import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-direct-cart-address',
  templateUrl: './direct-cart-address.component.html',
  styleUrls: ['./direct-cart-address.component.css']
})
export class DirectCartAddressComponent implements OnInit {

  
  formModel: any;

  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService,

  ) { }

   public shipping_address:any;
   public shipping_address_list:any;
   public customer_name1="";
   public address_1="";
   public address_2="";
   public city1="";
   public pincode1=0;
   public mob=0;
   public email1="";
   public landmark1="";
   public mycartlist:any;
   public  mycartlist1:any;
   public total:any;
   public gstamount:any;
   public payableamount:any;
   public cartcount:any;
   public shipingamount:any;
   public discount:any;
   public mycartlist_json:any;
   public shippingaddress_id=0;
edit_tab:boolean = false;
list_tab:boolean=true;
name="";
address_line1="";
address_line2="";
city="";
pincode="";
mobile="";
email="";
land_mark="";
shipaddid=0;
ValueFromComponent1:any;
submitted=false;
validation_list:any;


// form group
address = new FormGroup({
  e_name: new FormControl('', [Validators.required]),
  e_mob: new FormControl('',[Validators.required, Validators.minLength(10)]),
  e_email: new FormControl('',[Validators.required]),
  e_addressline1: new FormControl('',[Validators.required]),
  e_addressline2:new FormControl('',[Validators.required]),
  e_city: new FormControl('',[Validators.required]),
  e_landmark: new FormControl('',[Validators.required]),
  e_pincode: new FormControl('',[Validators.required]),
});

 //validation
 get f(){
  return this.address.controls;
}
  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("Changeaddress")
    ); 
    this.edit_tab = false;
    this.list_tab = true;
let url='CartCheckout/get_data_directcart/';
var data={
  "language_id":1,
}
    this.allapi.PostData(url,data).subscribe(promise=> {
      console.log(promise.shipping_address_list)
      this.shipping_address = [];
      this.shipping_address_list = promise.shipping_address_list;
     
if(this.shipping_address_list!="")
{
  this.shipping_address_list.forEach((ss:any)=> {
    if (ss.default_address == true) {
      this.shipping_address.push(ss);
    }
})

  this.customer_name1 = this.shipping_address[0].name;
      this.address_1 = this.shipping_address[0].address_line_1;
      this.address_2 = this.shipping_address[0].address_line_2;
      this.city1 = this.shipping_address[0].city;
      this.pincode1 = this.shipping_address[0].pincode;
      this.mob = this.shipping_address[0].mobile;
      this.email1 = this.shipping_address[0].email;
      this.landmark1 = this.shipping_address[0].land_mark;
}
    
       this.mycartlist=promise.mycartlist;

      if (this.mycartlist != "") {     

          var total = 0;
          for (var i = 0; i < this.mycartlist.length; i++) {
              var product = this.mycartlist[i];
              total += (product.selling_price * product.car_qty);
          }
          this.total = total;
          this.gstamount = (total * 16) / 100;
          this.payableamount = total + this.gstamount + 30 - 100;
          this.cartcount = promise.mycartlist.length;
      }
      else {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Item Sold-Out, Please Try Other',
              showConfirmButton: false,
              timer: 3000
          })
          window.location.replace('app/home');
      }
  });

  }
 
 edditaddress() {
  this.name = this.shipping_address[0].name;
  this.address_line1 = this.shipping_address[0].address_line_1;
  this.address_line2 = this.shipping_address[0].address_line_2;
  this.city = this.shipping_address[0].city;
  this.pincode = this.shipping_address[0].pincode;
  this.mobile = this.shipping_address[0].mobile;
  this.email = this.shipping_address[0].email;
  this.land_mark = this.shipping_address[0].land_mark;
  this.shippingaddress_id = this.shipping_address[0].shippingaddress_id;
    this.edit_tab = true;
  }

cancel () {   
  window.location.reload();
    // this.shippingaddress_id = 0;
    // this.name = "";
    // this.address_line1 = "";
    // this.address_line2 = "";
    // this.city = "";
    // this.pincode = "";
    // this.mobile = "";
    // this.email = "";
    // this.land_mark = "";
    // this.list_tab = true;
    // this.edit_tab = false;
}


save_shipping_address() {
  this.submitted=true;
  if(this.address.invalid)
  {
    return;
  }

let url='CartCheckout/save_shipping_address/';
  var data = {
      "name": this.name,
      "address_line_1": this.address_line1,
      "address_line_2": this.address_line2,
      "city": this.city,
      "pincode": Number(this.pincode),
      "mobile": Number(this.mobile),
      "email": this.email,
      "land_mark": this.land_mark,
      "shippingaddress_id": this.shippingaddress_id,
      "language_id": 1,
      "token":sessionStorage.getItem('idToken')
  }
  this.allapi.PostData(url, data).subscribe(promise=> {
      if (promise.msg_flg == 'Update') {
          this.list_tab = true;
          this.edit_tab = false;
          this.shipping_address = [];
          this.shipping_address_list = promise.shipping_address_list;
          this.shipping_address_list.forEach((ss:any)=>
          {
            if (ss.default_address == true) {
              this.shipping_address.push(ss);
          }
          })
         

          this.customer_name1 = this.shipping_address[0].name;
          this.address_1 = this.shipping_address[0].address_line_1;
          this.address_2 = this.shipping_address[0].address_line_2;
          this.city1 = this.shipping_address[0].city;
          this.pincode1 = this.shipping_address[0].pincode;
          this.mob = this.shipping_address[0].mobile;
          this.email1 = this.shipping_address[0].email;
          this.landmark1 = this.shipping_address[0].land_mark;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Address Updated Successfully',
            showConfirmButton: false,
            timer: 3000
        })
      }
      else if (promise.msg_flg == 'Validation') {
            this.validation_list=promise.validation_list;
    }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please Enter All Mandadtory Field',
          showConfirmButton: false,
          timer: 3000
      })
      }
  });

}

changeaddress () {
   
  this.formModel.show();
}

change_address_save() {
let url='CartCheckout/change_shipping_address/'
  var data = {
      "shippingaddress_id": this.shipaddid,
      "token":sessionStorage.getItem('idToken')
  }
  this.allapi.PostData(url, data).subscribe(promise=> {
      if (promise.msg_flg == 'Update') {           
        this.formModel.hide();
          this.list_tab = true;
          this.edit_tab = false;
          this.shipping_address = [];
          this.shipping_address_list = promise.shipping_address_list;
          this.shipping_address_list.forEach((ss:any) => {
            if (ss.default_address == true) {
              this.shipping_address.push(ss);
          }
          });
          
          this.customer_name1 = this.shipping_address[0].name;
          this.address_1 = this.shipping_address[0].address_line_1;
          this.address_2 = this.shipping_address[0].address_line_2;
          this.city1 = this.shipping_address[0].city;
          this.pincode1 = this.shipping_address[0].pincode;
          this.mob = this.shipping_address[0].mobile;
          this.email1 = this.shipping_address[0].email;
          this.landmark1 = this.shipping_address[0].land_mark;

      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Somthing Wrong!, Please Try Again.',
          showConfirmButton: false,
          timer: 3000
      })
      }
  });

}
getsipid (ss:any) {
  this.shipaddid = ss.shippingaddress_id;
}

addaddress () {
  this.shippingaddress_id = 0;
  this.name = "";
  this.address_line1 = "";
  this.address_line2 = "";
  this.city = "";
  this.pincode = "";
  this.mobile = '';
  this.email = "";
  this.land_mark = "";
  this.edit_tab = true;
  this.list_tab = false;
}
choose_payment_method()
{
if(this.shipping_address_list=="")
{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Please Enter Shipping Address',
    showConfirmButton: false,
    timer: 3000
})
  return;
}
  if(this.shipping_address[0].name=="" && this.shipping_address[0].address_line_1)
  {    
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Enter Shipping Address',
      showConfirmButton: false,
      timer: 3000
  })
    return;
  }
    this.router.navigate(["/app/direct_cart_payment"]);
 
}



modelclose () {
  this.formModel.hide();
}



}
