import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-deliver-login-creation',
  templateUrl: './deliver-login-creation.component.html',
  styleUrls: ['./deliver-login-creation.component.css']
})
export class DeliverLoginCreationComponent implements OnInit {

  //patterns
 pincodepat="/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/"
 panpat="/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/"
 emailpat="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/"
 phonepat="/^[6-9][0-9]{9}$/"
 userProfileImage:String="https://cdn-icons-png.flaticon.com/512/149/149071.png";
 submitted = false;

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder,
   private spinner:NgxSpinnerService) {}

 

  customervalid = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20),
      Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    phonenumber: new FormControl('', [Validators.required,Validators.pattern("^[7-9]{1}[0-9]{9}$")]),
    address: new FormControl('   ', [Validators.required,Validators.minLength(3)]),
    countryid: new FormControl('', [Validators.required]),
    vstate: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required,Validators.minLength(3)]),
    pincode: new FormControl('', [Validators.required]),
    new_dob:new FormControl('',[Validators.required]),
    gender: new FormControl('', [Validators.required]),
    altermob: new FormControl('', [Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    profilepic:new FormControl(''),
    facilityid:new FormControl(''),
    v_vehicle_type:new  FormControl(''),
    v_vehicle_reg_number:new  FormControl(''),
    v_vehicle_details:new  FormControl(''),
    v_max_weight_kg:new FormControl(''),
    v_max_volumetric_weight:new FormControl(''),
    v_weight_type:new FormControl(''),
    v_volumetric_weight:new FormControl(''),
    v_is_belong:new FormControl('',[Validators.required]),
    v_own_vehicle:new FormControl(),
  });

  pincodeform=new FormGroup({ delpin:new FormControl('')
  })
 
  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
  } 
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  screen:any=0
  g_list:boolean=false;
  delivery_executive_id=0;
  get_pincode_list:any;
  tableserviceable:any;
  pincodelist_temp:any
  pincode_array:any
  pincodelist:any
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
   pincode_id="";
   myArrayList:any;
  btn_dissable=true;
  new_dob="";
  format = 'yyyy-MM-dd';
locale = 'en-US';
ipAddress="";
validation_list:any;
min_dob:any;
max_dob:any;
date:any;
r_pwdd="";
facilitation_id="";
executive_list:any;
facility_center_list:any;
vehicle_type_id="";
vehicle_reg_number="";
vehicle_details="";
max_weight_kg="";
max_volumetric_weight="";
volumetric_weight="";
belongs_to="";
own_vehicle: boolean = false;
ownvehicle=0;
dub_show=false;
vehicle_type_list:any;
weight_type="";

  ngOnInit(): void { 
    this.pincodelist_temp=[];
    this.g_list=false;
    //this.min_dob=new Date();
  
    const currentYear = new Date().getFullYear();
    const currentmonth = new Date().getMonth();
    const currentday = new Date().getDay();
     this.min_dob = new Date(currentYear - 18, currentmonth, currentday);
    //this.max_dob = new Date(currentYear + 1, 11, 31);

 let url='UserCreation/get_de_data/';
      var sid = 1;
      this.allapi.GetDataById(url, sid).subscribe(promise=> {
         this.genderlist = promise.genderlist;
         this.countrylist = promise.countrylist; 
         this.pincodelist=JSON.parse(promise.pincodelist).Table       
         this.executive_list=promise.executive_list;
         this.facility_center_list=JSON.parse(promise.facility_center_list).Table;
         this.vehicle_type_list=JSON.parse(promise.vehicle_type_list).Table;

      });
      this.spinner.hide();
  }

  checkdub()
  {    this.submitted=false; 
    this.dub_show=this.own_vehicle;
    if(this.dub_show==true)
    {
     this.customervalid.controls["v_vehicle_type"].setValidators([Validators.required]);
     this.customervalid.controls["v_vehicle_type"].updateValueAndValidity();
     this.customervalid.controls["v_vehicle_reg_number"].setValidators([Validators.required,Validators.minLength(3)]);
     this.customervalid.controls["v_vehicle_reg_number"].updateValueAndValidity();     
     this.customervalid.controls["v_vehicle_details"].setValidators([Validators.required,Validators.minLength(3)]);
     this.customervalid.controls["v_vehicle_details"].updateValueAndValidity();
     

    }
    else if(this.dub_show==false)
    {
     this.customervalid.controls["v_vehicle_type"].setValidators(null);
     this.customervalid.controls["v_vehicle_type"].updateValueAndValidity();
     this.customervalid.controls["v_vehicle_reg_number"].setValidators(null);
     this.customervalid.controls["v_vehicle_reg_number"].updateValueAndValidity();
     this.customervalid.controls["v_vehicle_details"].setValidators(null);
     this.customervalid.controls["v_vehicle_details"].updateValueAndValidity();
     
    }
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

change_fc(ss:any)
{
if(ss=='FC')
{

this.customervalid.controls["facilityid"].setValidators([Validators.required]);
this.customervalid.controls["facilityid"].updateValueAndValidity();
}
if(ss=='HUB')
{
  this.facilitation_id="0";
this.customervalid.controls["facilityid"].setValidators(null);
this.customervalid.controls["facilityid"].updateValueAndValidity();
}
// if(ss=='FC')
//   {
//     var data={
//     "hub_type":ss,
//     "language_id":1
//     }
//     let url='UserCreation/get_hub/';
//     this.allapi.PostData(url,data).subscribe(promise=>
//       {
//         this.facility_center_list=JSON.parse(promise.hub_or_fc_list).Table;
//       })
//   }

}

updatecustomerdata () {

  if(this.own_vehicle==false)
  {
   this.vehicle_type_id="0";
    this.vehicle_reg_number="";
   this.vehicle_details="";
  }
  if(this.belongs_to=='HUB')
  {
    this.facilitation_id="0";
  }
  this.submitted = true; 
 
  if(this.customervalid.value.firstname.trim().length<3 && this.customervalid.value.firstname.trim()!=""){
    this.customervalid.controls['firstname'].setErrors({'minlength': true})
  }
  if(this.customervalid.value.address.trim().length<3 && this.customervalid.value.address.trim()!=""){
    this.customervalid.controls['address'].setErrors({'minlength': true})
  }
  if(this.customervalid.value.city.trim().length<3 && this.customervalid.value.city.trim()!=""){
    this.customervalid.controls['city'].setErrors({'minlength': true})
  }
if(this.own_vehicle==true)
{
  if(this.customervalid.value.v_vehicle_reg_number.trim().length<3 && this.customervalid.value.v_vehicle_reg_number.trim()!=""){
    this.customervalid.controls['v_vehicle_reg_number'].setErrors({'minlength': true})
  }
  if(this.customervalid.value.v_vehicle_details.trim().length<3 && this.customervalid.value.v_vehicle_details.trim()!=""){
    this.customervalid.controls['v_vehicle_details'].setErrors({'minlength': true})
  }
}
      

  this.pincode_array=[];
  
  this.pincodelist_temp.forEach((ss:any)=>
  {
    this.pincode_array.push({pincode_id:ss.pincode_id})
  })
 
   if (this.customervalid.invalid) {
    this.spinner.hide();
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Select/Enter All Mandatory Fields',
      showConfirmButton: false,
      timer: 3000
  });
  this.spinner.hide();
     return;
 }
if(this.p_imageurl=="")
{
  this.spinner.hide();
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Please Upload Image',
    showConfirmButton: false,
    timer: 3000
});
return
}
if(this.pincode_array=="")
{
  this.spinner.hide();
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Select Atlease One Pincode',
    showConfirmButton: false,
    timer: 3000
});
return
}

this.r_pwdd= this.MD5_Convert('Password@123');  
if(this.own_vehicle==true)
{
  this.ownvehicle=1;
}
// if(this.p_imageurl==""||this.p_imageurl==null)
// {
//   Swal.fire({
//     position: 'center',
//     icon: 'warning',
//     title: 'Please Upload Image',
//     showConfirmButton: false,
//     timer: 7000
// });
// return
// }
//this.spinner.show();
  
      var data = {
        "delivery_executive_id":this.delivery_executive_id,
          "first_name": this.first_name.trim(),
          "second_name": this.second_name.trim(),
          "email": this.email,
          "mobile": parseInt(this.mobile),
          "address": this.address.trim(),
          "city": this.city.trim(),
          "state_id": parseInt(this.stateid),
          "country_id": parseInt(this.countryid),
          "pincode": parseInt(this.pincode),
          "dob": this.customervalid.value.new_dob,
          "alternative_mobile": parseInt(this.alternative_mobile),
          "gender_id": parseInt(this.genderid),
          "image_url":this.p_imageurl,
          "Password":this.r_pwdd,
          "facilitation_id":parseInt(this.facilitation_id),
          "pincode_array":this.pincode_array,
          "vehicle_type_id":parseInt(this.vehicle_type_id),
          "vehicle_reg_number":this.vehicle_reg_number.trim(),
          "vehicle_details":this.vehicle_details.trim(),
          // "max_weight_kg":this.max_weight_kg,
          // "max_volumetric_weight":this.max_volumetric_weight,
          // "weight_type":this.weight_type,
          // "volumetric_weight":this.volumetric_weight,
          "belongs_to":this.belongs_to,
          "own_vehicle":this.ownvehicle
      }
 
 
      let url='UserCreation/create_user/'; 
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
              this.pincodelist_temp=[];
              this.pincode_id="";
              this.submitted=false;
           this.customervalid.reset();
              this.r_pwdd="";
              this.validation_list="";
              
              this.genderlist = promise.genderlist;
              this.countrylist = promise.countrylist; 
              this.pincodelist=JSON.parse(promise.pincodelist).Table       
              this.executive_list=promise.executive_list;
              this.facility_center_list=JSON.parse(promise.facility_center_list).Table;
              this.vehicle_type_list=JSON.parse(promise.vehicle_type_list).Table;
          }
          if (promise.status == "Update") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User Name Updated Successfully',
                showConfirmButton: false,
                timer: 3000
            });
            this.pincodelist_temp=[];
            this.pincode_id="";
            this.submitted=false;
            this.dub_show=false;
             this.customervalid.reset();
            this.r_pwdd="";
            this.executive_list=promise.executive_list;
            this.validation_list="";
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
        this.spinner.hide();
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
clear()
{
  this.pincode_array=[];
  this.dub_show=false;
  this.submitted=false;
  this.customervalid.reset();
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


 //save servicable pincode

addthis(aa:any)
{
  if(this.pincode_id=="")
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Select Pincode',
      showConfirmButton: false,
      timer: 3000
    })
    return
  }

  if(this.pincodelist_temp!="" && this.pincodelist_temp!=undefined)
  {
    this.pincodelist.forEach((ss:any)=>
    {
      if(parseInt(aa)==ss.pincode_id)
      {
        this.pincodelist_temp.push({pincode_id:ss.pincode_id,pincode:ss.pincode,area:ss.area})
      }
    })
this.pincode_id="";
  }
  else{
    this.pincodelist_temp=[];
    this.pincodelist.forEach((ss:any)=>
    {
      if(parseInt(aa)==ss.pincode_id)
      {
        this.pincodelist_temp.push({pincode_id:ss.pincode_id,pincode:ss.pincode,area:ss.area})
      }
    })
    this.pincode_id="";
  }
 

}

delete(ss:any)
{
  this.pincodelist_temp.forEach((value: { pincode_id: any; },index: any)=>{
    if(value.pincode_id==ss.pincode_id) this.pincodelist_temp.splice(index,1);
});
}
get_edit_data(ss:any)
{
var data={
  "delivery_executive_id":ss.delivery_executive_id,
  "language_id":1
}
let url='UserCreation/get_edit_data/'; 
this.allapi.PostData(url,data).subscribe(promise=>{
  this.get_pincode_list=JSON.parse(promise.get_pincode_list).Table;
  this.delivery_executive_id=ss.delivery_executive_id;
  this.first_name=ss.first_name;
   this.second_name=ss.second_name;
    this.email=ss.email;
    this.mobile=ss.mobile;
    this.address=ss.address;
    this.city=ss.city;
    this.countryid=ss.country_id;
    this.getstate(this.countryid);
    this.stateid=ss.state_id;
   this.pincode=ss.pincode;
  this.customervalid.patchValue({
    new_dob: formatDate(ss.dob, this.format, this.locale)
    });
  this.alternative_mobile=ss.alternative_mobile;
  this.genderid=ss.gender_id;
  this.p_imageurl=ss.image_url;
 this.customervalid.value.profilepic=ss.image_url;
  this.facilitation_id=ss.facilitation_id;
  this.pincodelist_temp=[];
  this.get_pincode_list.forEach((ss:any)=>
  {  this.pincodelist_temp.push({pincode_id:ss.pincode_id,pincode:ss.pincode,area:ss.area})    
  })
this.vehicle_type_id=ss.vehicle_type_id;
this.vehicle_reg_number=ss.vehicle_reg_number;
this.vehicle_details=ss.vehicle_details;
this.max_weight_kg=ss.max_weight_kg;
this.volumetric_weight=ss.volumetric_weight;
this.max_volumetric_weight=ss.max_volumetric_weight;
this.weight_type=ss.weight_type;
this.belongs_to=ss.belongs_to;
this.ownvehicle=ss.own_vehicle;
if(this.ownvehicle==1)
{
  this.own_vehicle=true;
  this.dub_show=true;
}
else{
  this.own_vehicle=false;
  this.dub_show=false;
}
})
}

get f() {
  return this.customervalid.controls;
}

keyPressSpace(event:any) {
  if(event.target.selectionStart===0 && event.code==='Space')
  {
    event.preventDefault();       
  }
}
keyPressSpace1(event:any) {
  if(event.code==='Space')
  {
    event.preventDefault();       
  }
}

keyPressnumber(event:any) {
  var inp = String.fromCharCode(event.keyCode);
  if (/[0-9.0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}



 onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

}
