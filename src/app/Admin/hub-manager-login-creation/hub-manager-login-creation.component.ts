import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { required } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hub-manager-login-creation',
  templateUrl: './hub-manager-login-creation.component.html',
  styleUrls: ['./hub-manager-login-creation.component.css']
})
export class HubManagerLoginCreationComponent implements OnInit {


  //patterns
 pincodepat="^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$"
 panpat="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
 emailpat="^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$"
 phonepat="^[6-9]{1}[0-9]{9}$"
 userProfileImage:String="https://cdn-icons-png.flaticon.com/512/149/149071.png";
 submitted = false;

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder,
   private spinner:NgxSpinnerService) {}


  hubmanagervalid = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastname: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$")]),
    phonenumber: new FormControl('', [Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    address: new FormControl('', [Validators.required,Validators.minLength(5),Validators.pattern("[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}")]),
    countryid: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    pincode: new FormControl('', [Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$")]),
    new_dob:new FormControl('',[Validators.required]),
    gender: new FormControl('', [Validators.required]),
    altermob: new FormControl('', [Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    profilepic:new FormControl('',[Validators.required]),
    v_hub:new FormControl('',[Validators.required]),
    r_pwdd:new FormControl('',[Validators.required])
  });

  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
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
   hub_id="";

   myArrayList:any;
  btn_dissable=true;
  new_dob="";
  format = 'yyyy-MM-dd';
locale = 'en-US';
ipAddress="";
validation_list:any;
min_dob:any;
date:any;
r_pwdd="";
hub_list:any;
imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';

get f() {
  return this.hubmanagervalid.controls;
}

  ngOnInit(): void {
    this.min_dob=new Date();
 let url='UserCreation/get_data/';
      var sid = 1;
      this.allapi.GetDataById(url, sid).subscribe(promise=> {
         this.genderlist = promise.genderlist;
         this.countrylist = promise.countrylist;
         this.hub_list=promise.hub_list;

      });
      this.spinner.hide();
  }


getstate (sub:any) {
    var cid = parseInt(sub)

    var data = {
        "country_id": cid,
        "language_id": 1,
    }
let url='UserCreation/get_state/';
    this.allapi.PostData(url, data).subscribe(promise=> {
        this.statelist =promise.statelist;
    });
};



updatecustomerdata () {
  this.submitted = true;
  if(this.hubmanagervalid.value.address.trim() ==''){
    this.hubmanagervalid.controls['address'].setErrors({'required': true})
  }
  if (this.hubmanagervalid.invalid) {
    //return;
}
// this.r_pwdd= this.MD5_Convert('Password@123');
this.r_pwdd= this.MD5_Convert(this.hubmanagervalid.value.password);
console.log(this.r_pwdd)
this.spinner.show();
    this.btn_dissable=false;
      var data = {
          "first_name": this.first_name,
          "second_name": this.second_name,
          "email": this.email,
          "mobile": parseInt(this.mobile),
          "address": this.address,
          "city": this.city,
          "state_id": parseInt(this.stateid),
          "country_id": parseInt(this.countryid),
          "pincode": parseInt(this.pincode),
          "dob": this.hubmanagervalid.value.new_dob,
          "alternative_mobile": parseInt(this.alternative_mobile),
          "gender_id": parseInt(this.genderid),
          "image_url":this.p_imageurl,
          "Password":this.r_pwdd,
          "hub_id":parseInt(this.hub_id)
      }


      let url='UserCreation/create_hub_manager_user/';
      this.allapi.PostData(url, data).subscribe(promise=> {
        this.btn_dissable=true;
          if (promise.status == "Insert") {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'User Id Created Successfully. User Id:'+promise.email+' And Password: Password@123',
                  showConfirmButton: false,
                  timer: 7000
              });
              this.submitted=false;
              this.hubmanagervalid.reset();

             // window.location.reload();
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
   let url='ImageUpload/DocumentUpload/';
   return this.httpClient.post('http://localhost:1305/api/ImageUpload/DocumentUpload/', formData).subscribe((promise:any)=>
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

clear()
{
  this.submitted=false;
  this.hubmanagervalid.reset();
}
}
