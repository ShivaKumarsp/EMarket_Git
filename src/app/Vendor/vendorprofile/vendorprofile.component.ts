import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.css']
})
export class VendorprofileComponent implements OnInit {

  //patterns
  pincodepat="/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/"
  panpat="/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/"
  emailpat="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/"
  phonepat="/^[7-9][0-9]{10}$/"
  base64="data:image/jpeg;base64,";
  imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  validation_list:any;
  genderlist:any
  countrylist:any
  businessnamecheck=false
  vendorprofileupdate:any
  vendor_name=""
  vendor_email=""
  vendor_mobile=""
  vendor_mobile123="";
  vendor_dob="";
  mg_id="";
  vendor_panno=""
  vendor_city:any
  vendor_state_id="";
  vendor_country_id="";
  vendor_pincode=""
  permanentAddress=""
  business_termscondiction:boolean=false;
  btermscondiction:boolean=false;
  vendor_gst_available:any
  business_state_id=""
  business_country_id=""
  business_address=""
  business_pincode=""
  vendor_businessname=""
  business_type=""
  legal_name=""
  registration_no=""
  business_pan_no=""
  vendor_image=""
  statelist:any
  statelist1:any
  gstshow=false

  format = 'yyyy-MM-dd';
  locale = 'en-US';
  businesstypelist:any
  business_type_id=0
  p_imageurl = "";
  selectItemImageUpload: any;
  agree1=false
  agree=false
  gstvalue=false
  vendor_id=0
  submitted=false;
  new_dob="";
  min_dob:any;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,) { }

  
    vendorform = new FormGroup({
      vname: new FormControl(''.trim(), [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),Validators.maxLength(30)]),
      phonenumber: new FormControl('', [Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      v_country: new FormControl('', [Validators.required]),
      new_dob1:new FormControl('',[Validators.required]),
      v_state: new FormControl('', [Validators.required]),
      cname: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3)]),
      panno: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      businessname: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5),Validators.maxLength(30)]),
      File: new FormControl(''),
      paddress: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5)]),
      vpincode: new FormControl('', [Validators.required]),

      bcountry: new FormControl('', [Validators.required]),
      bstate: new FormControl('', [Validators.required]),
      baddress: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5)]),
      bpincode: new FormControl('', [Validators.required]),
      gstavail: new FormControl(null),
      gstlegalname: new FormControl(null),
      regno: new FormControl(''),
          bpanno: new FormControl(''),
      businesstermscondiction:new FormControl(false,[Validators.required]),
      vendormobile123:new FormControl(''),
    });
   

    keyPressAlphaNumeric(event:any) {
      var inp = String.fromCharCode(event.keyCode);
      // (/[a-zA-Z0-9-_ ]/.test(inp))
      if (/[a-zA-Z-_ ]/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
      
    }
    keyPressemail(event:any) {
      var inp = String.fromCharCode(event.keyCode);
      // (/[a-zA-Z0-9-_ ]/.test(inp))
      if (/[a-zA-Z-_ ]/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
    keyPresspincode(event:any) {
      var inp = String.fromCharCode(event.keyCode);
      
      if (/[0-9]/.test(inp)) {
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


    ngOnInit(): void {

      const currentYear = new Date().getFullYear();
      const currentmonth = new Date().getMonth();
      const currentday = new Date().getDay();
       this.min_dob = new Date(currentYear - 18, currentmonth, currentday);

      let requestFormUrl = 'Vendor_Profile/getdata/';
      this.allapi.GetDataById(requestFormUrl, 1).subscribe(promise => {
         //console.log(promise)
        this.genderlist = promise.genderlist;
        this.countrylist = promise.countrylist;

        this.businessnamecheck = false;
        if (promise.vendorprofileupdate != "") {

            this.vendorprofileupdate = promise.vendorprofileupdate;
            this.vendor_name = this.vendorprofileupdate[0].vendorname;
            this.vendor_email = this.vendorprofileupdate[0].vendoremail;
            this.vendor_mobile = this.vendorprofileupdate[0].vendormobile;
            this.vendor_city = this.vendorprofileupdate[0].vendorcity;
            this.vendor_panno = this.vendorprofileupdate[0].vendorpanno;
           this.vendor_image=this.vendorprofileupdate[0].vendorimage;
            this.vendor_country_id = this.vendorprofileupdate[0].vendorcountryid;
            this.vendor_state_id = this.vendorprofileupdate[0].vendorstateid;
          
            this.mg_id = this.vendorprofileupdate[0].mgid;
            this.getstate_e(this.vendor_country_id);
            this.vendor_pincode = this.vendorprofileupdate[0].vendorpincode;
            this.permanentAddress = this.vendorprofileupdate[0].vendoraddress;
            this.business_termscondiction = this.vendorprofileupdate[0].businesstermscondiction;
            this.btermscondiction=this.vendorprofileupdate[0].businesstermscondiction;
            this.vendor_gst_available = this.vendorprofileupdate[0].vendorgstavailable;
            if (this.vendor_gst_available == true) {
                this.vendor_gst_available = 1;
                this.gstchange(1);
            }
            else {
                this.vendor_gst_available = 0;
                this.gstchange(0);
            }

            this.business_state_id = this.vendorprofileupdate[0].businessstateid;
             this.business_country_id = this.vendorprofileupdate[0].businesscountryid;
            this.getstate1(this.business_country_id);
            this.business_address = this.vendorprofileupdate[0].businessaddress;
            this.business_pincode = this.vendorprofileupdate[0].businesspincode;
            this.vendor_businessname = this.vendorprofileupdate[0].vendorbusinessname;
            this.business_type = this.vendorprofileupdate[0].businesstype_id;
            this.legal_name = this.vendorprofileupdate[0].legalname;
            this.registration_no = this.vendorprofileupdate[0].registrationno;
            this.business_pan_no = this.vendorprofileupdate[0].businesspanno;
            this.p_imageurl = this.vendorprofileupdate[0].vendorimage;
            if (this.vendor_businessname != null && this.vendor_businessname != "") {
                this.businessnamecheck = true;
            }
            this.vendorform.patchValue({
              new_dob1: formatDate(this.vendorprofileupdate[0].vendordob, this.format, this.locale)
              });

        }
        console.log(this.vendor_name)
      });
    }

  getstate(e:any) {


      var data = {
         "country_id": parseInt(e),
         "language_id": 1,
      }
      //console.log(data)
      let url='Vendor_Profile/getstate/'
      this.allapi.PostData(url,data).subscribe(promise => {
          this.statelist =promise.statelist
          //console.log(this.statelist)

      });
  };


  getstate_e(ss:any) {
    var data = {
       "country_id": parseInt(ss),
        "language_id": 1,
    }
    let url='Vendor_Profile/getstate/'
    this.allapi.PostData(url,data).subscribe(promise => {
        this.statelist = promise.statelist;
console.log(this.statelist)
    });
};

  get f() {
    return this.vendorform.controls;
  }
  gstchange(ss:any) {
    this.submitted=false;
    if (ss == 1) {
        this.gstshow = true;
        this.vendorform.controls["gstlegalname"].setValidators([Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5)]);
        this.vendorform.controls["gstlegalname"].updateValueAndValidity();
        this.vendorform.controls["regno"].setValidators([Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5)]);
        this.vendorform.controls["regno"].updateValueAndValidity();
     

    }
    else {
        this.gstshow = false;
        this.vendorform.controls["gstlegalname"].setValidators(null);
        this.vendorform.controls["gstlegalname"].updateValueAndValidity();
        this.vendorform.controls["regno"].setValidators(null);
        this.vendorform.controls["regno"].updateValueAndValidity();

    }
}

getstate1(b:any) {
      var data = {
      "country_id":  parseInt(b),
      "language_id": 1,
  }
  let url='Vendor_Profile/getstate/'
  this.allapi.PostData(url,data).subscribe(promise=> {
      this.statelist1 = promise.statelist;
  });
};

SelectedFile_Array:any;
VendorImageUpload(imageInput: any) {
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
  let url = 'http://localhost:1305/api/ImageUpload/Profile_Upload';
  return this.http.post('http://localhost:1305/api/ImageUpload/Profile_Upload', formData).subscribe((promise: any) => {
    this.p_imageurl = promise.path;
  })
}
change_checkbox()
{

}


//save
savedata() {
  this.submitted=true

  if(this.vendorform.value.vname.trim().length<3){
    this.vendorform.controls['vname'].setErrors({'minlength': true})
  }
  if(this.vendorform.value.cname.trim().length<3){
    this.vendorform.controls['cname'].setErrors({'minlength': true})
  }
  if(this.vendorform.value.paddress.trim().length<5){
    this.vendorform.controls['paddress'].setErrors({'minlength': true})
  }
  if(this.vendorform.value.businessname.trim().length<5){
    this.vendorform.controls['businessname'].setErrors({'minlength': true})
  }
  if(this.vendorform.value.baddress.trim().length<5){
    this.vendorform.controls['baddress'].setErrors({'minlength': true})
  }
  if( this.gstshow == true)
  {
  if(this.vendorform.value.gstlegalname.trim().length<5){
    this.vendorform.controls['gstlegalname'].setErrors({'minlength': true})
  }
  if(this.vendorform.value.regno.trim().length<5){
    this.vendorform.controls['regno'].setErrors({'minlength': true})
  }
}
  if(this.business_termscondiction==false)
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Check Terms and Conditions',
      showConfirmButton: false,
      timer: 3000
  })
  return
  }
  
  
  this.validation_list=[];
  this.submitted=true;
  if(this.vendorform.invalid)
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Enter All Mandatory Fields',
      showConfirmButton: false,
      timer: 3000
  })
    return
  }
 
  this.agree1 = false;
  if (this.agree == true) {
      this.agree1 = true;
  }
  if (this.vendor_gst_available == 1) {
      this.gstvalue = true;
  }
  else {
      this.gstvalue = false;
      this.legal_name = "";
      this.registration_no = "";
      this.business_pan_no = "";
      this.business_type = "";
  }
  // if (this.vendorform.$valid) {
      var data = {
          "vendor_id": this.vendor_id,
          "vendor_name": this.vendor_name.trim(),
          "vendor_email": this.vendor_email.trim(),
          "vendor_mobile": parseInt(this.vendor_mobile),
          "vendor_dob": this.vendorform.value.new_dob1,
          "vendor_panno": "",
          "vendor_city": this.vendor_city,
          "vendor_state_id": parseInt(this.vendor_state_id),
          "vendor_country_id": parseInt(this.vendor_country_id),
          "mg_id": parseInt(this.mg_id),
          "vendor_address": this.permanentAddress.trim(),
          "vendor_pincode": parseInt(this.vendor_pincode),
          //"pickup_address": this.pickupAddress,
          //"pickup_pincode": parseInt(this.pickup_pincode),
          "business_address": this.business_address.trim(),
          "business_pincode": parseInt(this.business_pincode),
          "vendor_businessname": this.vendor_businessname.trim(),
          "business_state_id": parseInt(this.business_state_id),
          "business_country_id": parseInt(this.business_country_id),

          /* "vendor_storename": this.storename,*/
          "business_termscondiction": this.business_termscondiction,

          "vendor_gst_available": this.gstvalue,
          "legal_name": this.legal_name.trim(),
          "registration_no": this.registration_no.trim(),
          "business_pan_no": "",
          "business_type_id": 1,
          "vendor_image": this.p_imageurl,
      }
    console.log(data)
    console.log('form',this.vendorform.value)
    let url='Vendor_Profile/UpdateProfile/'
      this.allapi.PostData(url,data).subscribe(promise=>{
        console.log('promise')
        console.log(promise)
          if (promise.msg_flg == "Update") {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Vendor Profile Update Successfully.',
                  showConfirmButton: false,
                  timer: 3000
              })
          }
          else if (promise.msg_flg == "Failed") {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Vendor Profile Not Update, Please Try Again',
                  showConfirmButton: false,
                  timer: 3000
              })
          }
          else if (promise.msg_flg == "Validation") {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Please Enter All Mandatory Fields',
              showConfirmButton: false,
              timer: 3000
          })

            this.validation_list=promise.validation_list;
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


      });
      //location.reload();
}
clear()
{

}


}
