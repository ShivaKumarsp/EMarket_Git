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
  invoiceModel: any;
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
   public ship_country_id="";
   public ship_state_id="";
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
submitted1=false;
validation_list:any;
invoice_count=0;

first_name="";
second_name="";
gender_id="";
email2="";
mobile2="";
address2="";
city2="";
state_id="";
country_id="";
pincode_new="";
gender_list:any;
country_list:any;
state_list:any;
get_invoice_list:any;
statename3="";
country3="";

// form group
address = new FormGroup({
  e_name: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
  e_mob: new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
  e_email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  e_addressline1: new FormControl('',[Validators.required,Validators.pattern("[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}")]),
  e_addressline2:new FormControl('',[Validators.required]),
  e_city: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
  e_landmark: new FormControl('',[Validators.required]),
  e_pincode: new FormControl('',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$")]),
  e_country: new FormControl('',[Validators.required]),
  e_state: new FormControl('',[Validators.required]),
});

// form group
invoiceaddress = new FormGroup({
  v_first_name: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
  v_gender_id:new FormControl('',[Validators.required]),
  v_email2: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  v_mobile2: new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
  v_address2: new FormControl('',[Validators.required,Validators.pattern("[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}")]),
  v_city2: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
  v_state_id: new FormControl('',[Validators.required]),
  v_country_id: new FormControl('',[Validators.required]),
  pincode2:new FormControl('',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$")])
});

address_id=0;


 //validation
 get f(){
  return this.address.controls;
}
get g(){
  return this.invoiceaddress.controls;
}
  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("Changeaddress")
    );
    this.invoiceModel = new window.bootstrap.Modal(
      document.getElementById("allOrderModal")
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
      this.country_list = promise.country_list;
      this.gender_list= promise.gender_list;
     this.invoice_count=promise.invoice_count;
     this.get_invoice_list=promise.user_invoice_list;

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
      this.ship_country_id = this.shipping_address[0].country_id;
      this.get_state1(this.ship_country_id);
      this.ship_state_id = this.shipping_address[0].state_id;
}
if(this.invoice_count>0)
{
this.address_id=this.get_invoice_list[0].address_id;
this.first_name = this.get_invoice_list[0].customer_name;
this.gender_id=this.get_invoice_list[0].gender_id;
this.email2 = this.get_invoice_list[0].email_id;
this.mobile2 = this.get_invoice_list[0].mobile;
this.address2 = this.get_invoice_list[0].address_line_1;
this.city2 = this.get_invoice_list[0].city;
this.pincode_new = this.get_invoice_list[0].pincode;
this.state_id=this.get_invoice_list[0].state_id;
this.statename3=this.get_invoice_list[0].state_name;
this.country_id=this.get_invoice_list[0].country_id;
this.get_state(this.country_id);
this.country3=this.get_invoice_list[0].country_name;
}


       this.mycartlist=promise.mycartlist;

      if (this.mycartlist != "") {

          var total = 0;
          for (var i = 0; i < this.mycartlist.length; i++) {
              var product = this.mycartlist[i];
              total += (product.selling_price * product.car_qty);
          }
          this.total = total;
          this.gstamount = total;
    this.payableamount = total;
    //this.gstamount = (total * 16) / 100;
  //  this.payableamount = total + this.gstamount + 30 - 100;
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
  check_pincode(ss:any)
  {
  
var data={
  "vpincode":parseInt(ss),
 
}
let url='CartCheckout/checkpincode/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    if(promise.status=="Failed")
    {
      this.pincode="";
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Sorry Delivery Not Available For This Area.',
        showConfirmButton: false,
        timer: 3000
    })
    return;
    }
  })
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
  this.ship_country_id = this.shipping_address[0].country_id;
  this.get_state1(this.ship_country_id);
  this.ship_state_id = this.shipping_address[0].state_id;
    this.edit_tab = true;
  }
edit_invoice()
{
    this.invoiceModel.show();

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
closeModal()
{
  this.invoiceModel.hide();
}

save_shipping_address() {

  this.submitted=true;
  if(this.address.value.e_name.trim() ==''){
    this.address.controls['e_name'].setErrors({'required': true})
  }
  if(this.address.value.e_addressline1.trim() ==''){
    this.address.controls['e_addressline1'].setErrors({'required': true})
  }
  if(this.address.value.e_landmark.trim() ==''){
    this.address.controls['e_landmark'].setErrors({'required': true})
  }
  if(this.ship_country_id =="0"){
    this.address.controls['e_country'].setErrors({'required': true})
  }
  if(this.ship_state_id =="0"){
    this.address.controls['e_state'].setErrors({'required': true})
  }
  if(this.address.invalid)
  {
    return;
  }

  var data1={
    "vpincode":parseInt(this.pincode),
   
  }
  let url1='CartCheckout/checkpincode/';
  this.allapi.PostData(url1,data1).subscribe(promise=>
    {
      if(promise.status=="Failed")
      {
        this.pincode="";
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Sorry Delivery Not Available For This Area.',
          showConfirmButton: false,
          timer: 3000
      })
      return;
      }
      else
      {
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
      "country_id": Number(this.ship_country_id),
      "state_id": Number(this.ship_state_id),
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
    })



}

changeaddress () {

  this.formModel.show();
}

change_address_save() {
  var data1={
    "vpincode":parseInt(this.pincode),
   
  }
  let url1='CartCheckout/checkpincode/';
  this.allapi.PostData(url1,data1).subscribe(promise=>
    {
      if(promise.status=="Failed")
      {
        this.pincode="";
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Sorry Delivery Not Available For This Area.',
          showConfirmButton: false,
          timer: 3000
      })
      return;
      }
    })
    
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
  if(this.invoice_count==0)
  {
    this.invoiceModel.show();
    return;
  }

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

insert_invoice_address()
{
  this.submitted1=true;
  if(this.invoiceaddress.value.v_first_name.trim() ==''){
    this.invoiceaddress.controls['e_name'].setErrors({'required': true})
  }
  if(this.invoiceaddress.value.v_email2.trim() ==''){
    this.invoiceaddress.controls['v_email2'].setErrors({'required': true})
  }
  if(this.invoiceaddress.value.v_address2.trim() ==''){
    this.invoiceaddress.controls['v_address2'].setErrors({'required': true})
  }
  if(this.invoiceaddress.value.v_city2.trim() ==''){
    this.invoiceaddress.controls['v_city2'].setErrors({'required': true})
  }
  if(this.invoiceaddress.value.pincode2==''){
    this.invoiceaddress.controls['pincode2'].setErrors({'required': true})
  }

  if(this.invoiceaddress.invalid)
  {
    return;
  }
var data={
  "address_id":this.address_id,
 "first_name":this.first_name,
"second_name":"",
"gender_id":parseInt(this.gender_id),
"email":this.email2,
"mobile":parseInt(this.mobile2),
"address":this.address2,
"city":this.city2,
"state_id":parseInt(this.state_id),
"country_id":parseInt(this.country_id),
"pincode":parseInt(this.pincode_new)
}
let url='CartCheckout/save_invoice_address/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    if(promise.status=="Insert")
    {
      this.invoice_count=1;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Invoice Address Inserted Successfully',
        showConfirmButton: false,
        timer: 3000
    })
    this.invoiceModel.hide();
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Invoice Address Not Inserted',
        showConfirmButton: false,
        timer: 3000
    })
    }
  })
}
get_state(ss:any)
{
var data={
  "country_id":parseInt(ss),
  "language_id":1
}
let url='CartCheckout/get_state/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
this.state_list=promise.state_list;
  })
}

get_state1(ss:any)
{
var data={
  "country_id":parseInt(ss),
  "language_id":1
}
let url='CartCheckout/get_state/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
this.state_list=promise.state_list;
  })
}

}
