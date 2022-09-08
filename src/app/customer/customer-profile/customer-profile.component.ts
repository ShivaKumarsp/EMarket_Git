import {  formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { date, json, RxwebValidators } from '@rxweb/reactive-form-validators';
import {  NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})


export class CustomerProfileComponent implements OnInit {
 //patterns
 pincodepat="^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$"
 panpat="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
 emailpat='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
 phonepat="^[6-9]{1}[0-9]{9}$"
 userProfileImage:String="https://cdn-icons-png.flaticon.com/512/149/149071.png";
 submitted = false;
   customervalid: FormGroup;

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder,
   private spinner:NgxSpinnerService) {
    this.customervalid = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      vemail: new FormControl('', [Validators.required,	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phonenumber: new FormControl('', [Validators.required,Validators.pattern(this.phonepat)]),
      address: new FormControl('',[Validators.required,Validators.pattern("[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}")]),
      countryid: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required,Validators.pattern(this.pincodepat)]),
      new_dob:new FormControl('',[Validators.required]),
      gender: new FormControl('', [Validators.required]),
      altermob: new FormControl('', [Validators.required,Validators.pattern(this.phonepat)]),
      profile: new FormControl(''),

    });
 }


   customerlist:any;
   genderlist:any;
   countrylist:any;
   first_name="";
   second_name="";
   email="";
   mobile="";
   address="";
   city="";
   countryid="";
   stateid="";
   pincode="";
   dob=0;
   dob1="";
   alternative_mobile="";
   genderid="";
   statelist:any;
   new_pass="";
   retype_pass="";
   old_pass="";
   valueAsDate="";
   p_imageurl="";

   myArrayList:any;
  btn_dissable=true;
  new_dob="";
  format = 'yyyy-MM-dd';
locale = 'en-US';
ipAddress="";
validation_list:any;
min_dob:any;
date:any;
base64='data:image/jpeg;base64,';
imageBaseUrl="http://124.153.106.183:8015/EMarket_Image";
get f() {
  return this.customervalid.controls;
}

  ngOnInit(): void {


    this.min_dob=new Date();
 let url='Customer_Profile/Get_Customer_Details/';
      var sid = 1;
      this.allapi.GetDataById(url, sid).subscribe(promise=> {
         this.customerlist = JSON.parse(promise.customerlist).Table;
         this.genderlist = JSON.parse(promise.genderlist).Table;
         this.countrylist = JSON.parse(promise.countrylist).Table;

          if (this.customerlist != "") {
             this.first_name =this.customerlist[0].cfirst_name;
             this.second_name =this.customerlist[0].csecond_name;
             this.email =this.customerlist[0].cemail;

             this.mobile =this.customerlist[0].cmobile;
             this.address =this.customerlist[0].caddress;
             this.city =this.customerlist[0].ccity;
             this.countryid =this.customerlist[0].ccountry_id;
             this.getstate(this.countryid);
             this.stateid =this.customerlist[0].cstate_id;
             this.pincode =this.customerlist[0].cpincode;
             //this.dob =this.customerlist[0].cdob;

             this.customervalid.patchValue({
               new_dob: formatDate(this.customerlist[0].cdob, this.format, this.locale)
               });
             this.alternative_mobile =this.customerlist[0].calternative_mobile;
             this.genderid =this.customerlist[0].cgender;
             this.p_imageurl=this.customerlist[0].imageurl;
             if(this.p_imageurl!="" && this.p_imageurl!=null)
             {
              this.userProfileImage=this.p_imageurl
             }

          }
      });
      this.spinner.hide();
  }


getstate (sub:any) {
    var cid = parseInt(sub)

    var data = {
        "country_id": cid,
        "language_id": 1,
    }
let url='Customer_Profile/getstate/';
    this.allapi.PostData(url, data).subscribe(promise=> {

        this.statelist =JSON.parse(promise.statelist).Table;

    });
};


updatecustomerdata () {
  this.submitted = true;
  if(this.customervalid.value.address.trim() ==''){
    this.customervalid.controls['address'].setErrors({'required': true})
  }
  if (this.customervalid.invalid) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Enter All Mandatory Fields',
      showConfirmButton: false,
      timer: 3000
  })
    return;
}
if (this.p_imageurl=="" || this.p_imageurl==null) {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Please Upload Image',
    showConfirmButton: false,
    timer: 3000
})
  return;
}

this.spinner.show();
    this.btn_dissable=false;
      var data = {
          "first_name": this.first_name,
          "second_name": this.second_name,
          "email": this.email,
          "mobile": parseInt(this.mobile),
          "address": this.address,
          "city": this.city,
          //for drop down retrive while editing use retrival name of function
          "state_id": parseInt(this.stateid),
          "country_id": parseInt(this.countryid),
          "pincode": parseInt(this.pincode),
          "dob": this.customervalid.value.new_dob,
          "alternative_mobile": parseInt(this.alternative_mobile),
          "gender_id": parseInt(this.genderid),
          "image_url":this.p_imageurl,
          "ipAddress":this.ipAddress

      }


      let url='Customer_Profile/Upadate_Customer_Details/';
      this.allapi.PostData(url, data).subscribe(promise=> {
        this.btn_dissable=true;
          if (promise.status == "Insert") {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: promise.messageflg,
                  showConfirmButton: false,
                  timer: 3000
              });
              window.location.reload();
          }
          else if (promise.status == "Failed") {
              Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: promise.messageflg,
                  showConfirmButton: false,
                  timer: 3000
              })
          }
          else if (promise.status == "Validation") {
            this.validation_list=promise.validation_list;
        }

      })
      this.spinner.hide();
}

SelectedFile_Array:any;
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

    else{
      
   this.SelectedFile_Array=imageInput.files[0];
   formData.append("File", this.SelectedFile_Array);
   formData.append("folder", "Profile_Image");
   var data={
    "File":this.SelectedFile_Array
   }
   let url='ImageUpload/Profile_Upload/';
   return this.http.post('http://localhost:1305/api/ImageUpload/Profile_Upload/', formData).subscribe
   
   ((promise:any)=>
   {

    this.p_imageurl=promise.path;
    this.userProfileImage=promise.path;
   })
  }
}

logout = () => {

  let logid= sessionStorage.getItem('log_id');
   let requestFormUrl = 'Account/logout/';
     this.allapi.GetDataById(requestFormUrl,logid).subscribe(response => {
     if (response.code == 200) {


    }
     else {

     //this.spinner.hide();
     //this.toastr.errorToaser(response.error);
    }
  });

  sessionStorage.removeItem("idToken");
  sessionStorage.removeItem("LoggedIn");
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("roleid");

  window.location.reload();
  window.location.replace('');

}


  getIPAddress()
  {

    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;

    });
  }
}
