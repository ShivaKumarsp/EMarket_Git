import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
import { CartService } from 'src/app/AllPageService/CartService/cart.service';
import { Guid } from 'guid-typescript';

declare var window: any;


@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // AES_Encrypt(ptext:any){
  //   return CryptoJS.AES.encrypt(ptext,this.salt).toString();
  // }

  // AES_Decrypt(ptext:any){
  //   var bytes  = CryptoJS.AES.decrypt(ptext, this.salt);
  //   return  bytes.toString(CryptoJS.enc.Utf8);
  // }

  // Decrypt(ptext:any){
  //    let bytes= CryptoJS.AES.decrypt(ptext,this.salt);
  //    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  //     }

  // Hashsha256withsalt(sha256pwd:string){
  //   let hash= (CryptoJS.HmacSHA256(sha256pwd,this.salt))
  //   return CryptoJS.enc.Base64.stringify(hash);
  // }
  // Hashsha256(sha256pwd:string){
  //   let hash= (CryptoJS.SHA256(sha256pwd))
  //   return CryptoJS.enc.Base64.stringify(hash);
  // }

  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
  }

  constructor(
    private httpClient: HttpClient,
  private http: HttpClient,
 private router: Router,
 private allapi:AllapiService,
 private authService:AuthService,
 private spinner:NgxSpinnerService,
 private cartService : CartService,

  ) { }

  module_list: any;
  page_list: any;
  templatesList: any;
  cartcount:any;
  page_list_new:any;
  hash_pwd="";
  rolid1:any;
  userid1:any;
  logid1:any;
page_redirect="";
isVisible: any=0;
salt="";
salt_token="";
formModel:any;
submitted=false;
pwdd:any;
homemenu=false;
public role="";
public v_role="";
role_v="";
public getrole="";
public role_get:any;
isvendor:any;
isvendorprofile:any;
login_dto: any;
public usrnme="";
public test="";
public uName="";
public pwd="";
public rememberMe="";
roleid =0;
public totalItem : number = 0;
public searchTerm !: string;
ipAddress="";
reg_otp:any;
r_pwdd:any;
username="";
slt1:any;
slttkn1:any;
rl:any;
category_list:any;
subcategory_list:any;
addcategory_list:any;
subcategory_list_new:any;
addcategory_list_new:any;
formModels:any
customerLogin = new FormGroup({
  name: new FormControl('', [Validators.required]),
  pass: new FormControl('',[Validators.required]),

});

v_cart:any;
guid:any;

    ngOnInit(): void {
     
     // this.spinner.show();
       if( Number(localStorage.getItem('roleid'))==0)
      {
        localStorage.setItem('Role',"Public");
        this.role_v="Public";
      }

      this.v_cart=localStorage.getItem('v_cart');
     if(this.v_cart==null && this.v_cart!="")
    {
      this.guid= Guid.create();
      localStorage.setItem('v_cart',this.guid);

    }

        let requestFormUrl = 'Account/getmodule/';
        var data={
          "roleid": Number(localStorage.getItem('roleid')),
          "userid":Number(localStorage.getItem('userid')),
          "session_cart":localStorage.getItem('v_cart')
        }
         this.allapi.PostData(requestFormUrl,data).subscribe(response => {
         if(response.role!=null)
         {
          this.role_v=response.role;
         }
        this.role=response.role;
        this.v_role=response.role;

        localStorage.setItem('rolename',response.role);
        localStorage.setItem('idToken', response.get_token);
        localStorage.setItem('isvendor', response.is_vendor_doc);
        localStorage.setItem('isvendorprofile', response.is_vendor_profile);
        this.module_list = response.getmodulelist;
        this.page_list = response.getpagelist;
        if(response.cartlist!="" && response.cartlist!=null)
        {
          this.cartcount = response.cartlist.length;
        }
        this.category_list=JSON.parse(response.category_list).Table;
        this.subcategory_list=JSON.parse(response.subcategory_list).Table;
        this.addcategory_list=JSON.parse(response.addcategory_list).Table;
    })
    //this.spinner.hide();
 
    }

    logout = () => {
      localStorage.removeItem('v_cart');
      let logid= localStorage.getItem('log_id');
      localStorage.clear();
       let requestFormUrl = 'Account/logout/';
         this.allapi.GetDataById(requestFormUrl,logid).subscribe(response => {
         if (response.code == 200) {

          localStorage.clear();
        }
         else {

         //this.spinner.hide();
         //this.toastr.errorToaser(response.error);
        }
      });

      localStorage.removeItem("idToken");
      localStorage.removeItem("LoggedIn");
      localStorage.removeItem("userid");
      localStorage.removeItem("roleid");

      window.location.reload();
      window.location.replace('');

    }
  redirect_home()
  {
    this.role_get=localStorage.getItem('rolename');
    this.isvendor=localStorage.getItem('isvendor');
    this.isvendorprofile=localStorage.getItem('isvendorprofile');

    if(this.role_get=="Customer")
        {

          window.location.replace('/app/home');
        }
        else if(this.role=="Vendor")
        {
          if(this.isvendor=="0" || this.isvendorprofile=="false")
          {
            window.location.replace("/app/vendordocuments");
          }
          else if(this.role=="Vendor" && this.isvendor=="1" || this.isvendorprofile=="true")
          {
            window.location.replace("/app/vendordashboard");
          }
        }
        else if(this.role_get=="SuperAdmin")
        {
          window.location.replace("/app/admindashboard");
        }
        else if(this.role=="Delivery"){

          window.location.replace('/app/vendor_to_facilitation');
         }
        else if(this.role=="HubManager"){

          window.location.replace('/app/hub_consignment_list');
         }
         else if(this.role=="FacilitationCenter"){

          window.location.replace('/app/assign_item_from_vendor');
         }
        else
        {
          window.location.replace("/app/home");
        }
  }
  get_page(ss:any)
  {
    this.page_list_new=[];
    this.page_list.forEach((aa:any) => {
      if(ss.mmid==aa.mmid)
      {
        this.page_list_new.push(aa);
      }
    });
  }
  get_subcategory(ss:any)
  {
    this.subcategory_list_new=[];
    this.subcategory_list.forEach((aa:any) => {
      if(ss.mcid==aa.mcid)
      {
        this.subcategory_list_new.push(aa);
      }
    });
  }

  get_addcategory(ss:any)
  {          sessionStorage.setItem('category_id', ss.mcid);
    window.location.replace("/app/landingcategory");
  }

    click_login(ss: any){
      this.submitted = false;
      this.customerLogin.reset();
      this.isVisible=0;
      this.customerLogin.reset();
        this.getrole=ss;
      localStorage.setItem('rol_name',ss.toString());
      let url='Account/set_salt/';
    this.allapi.GetDataById_login(url,1).subscribe(response=>
    {
      this.salt=response.entity.salt;
      this.salt_token=response.entity.salt_token;

    })
      this.formModel = new window.bootstrap.Modal(
        document.getElementById("loginModal")
      );
      this.formModel.show();
      this.role=ss.toString();
    }

    click_login_from_landing(ss:any,slt:any,salttoken:any){
      this.customerLogin.reset();

      this.isVisible=0;
      this.getrole=ss.toString();
      localStorage.setItem('slt',slt);
      localStorage.setItem('tkn',salttoken);
      localStorage.setItem('rol_name',ss.toString());
      //this.temp1='updated'
      this.formModel = new window.bootstrap.Modal(
        document.getElementById("loginModal")
      );
      this.formModel.show();
      this.rl=localStorage.getItem('rol_name');
      this.role=this.rl;
      this.getrole=this.rl;
    }




    showForm(ids:any){

      this.submitted = false;
      this.customerLogin.reset();

      this.login_otp.reset();


      this.customerregister = new FormGroup({
        r_username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        r_email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        r_phone: new FormControl('',[Validators.required]),
        r_pwd: new FormControl('',[Validators.required, Validators.minLength(8)]),
        r_repwd: new FormControl('',[Validators.required]),
        // r_username: new FormControl(''),
        // r_email: new FormControl(''),
        // r_phone: new FormControl(''),
        // r_pwd: new FormControl(''),
        // r_repwd: new FormControl('')
    });
   this.forgetotp=new FormGroup({
    f_username: new FormControl('')
   })
   this.loginwithotp=new FormGroup({
    otp_username: new FormControl('')
   })

      this.isVisible = ids;
    }

    userLoginProcess(){
         this.spinner.show();
      this.submitted = true;
      if (this.customerLogin.invalid) {
        return;
      }

      this.rl=localStorage.getItem('rol_name');
      this.role=this.rl;
      console.log('userloginprocess',this.role)
    if(this.salt==""||this.salt==undefined)
    {

      this.slt1=localStorage.getItem('slt');
      this.salt=this.slt1;
    }
    if(this.salt_token==""||this.salt_token==undefined)
    {

      this.slttkn1=localStorage.getItem('tkn');
      this.salt_token=this.slttkn1;
    }


      this.pwdd= this.MD5_Convert(this.customerLogin.value.pass);
      let hash= this.MD5_Convert(this.pwdd.toString()+this.salt);
      this.customerLogin.patchValue({
        pass: this.pwdd
        });

        localStorage.setItem('username',this.customerLogin.value.name);
      var data={
        "UserName":this.customerLogin.value.name,
        "Password":hash.toString(),
         "role":localStorage.getItem('rol_name'),
        "salt_token":this.salt_token,
        "ipAddress":this.ipAddress,
        "apitype":"Web",
        "session_cart":localStorage.getItem('v_cart')

      }
      let requestFormUrl = 'Account/login';
         this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
         if (response.code == 200) {
          localStorage.removeItem('v_salt');
          localStorage.removeItem('v_salt_token');
          localStorage.setItem('idToken', response.entity.token);
          localStorage.setItem('log_id', response.entity.log_id);
          localStorage.setItem('roleid', response.entity.roleid);

          localStorage.setItem('userid', response.entity.userId);
          localStorage.setItem('isvendor',response.entity.is_vendor_doc);
          localStorage.setItem('isvendorprofile', response.entity.is_vendor_profile);

          this.authService.setSecureToken(response.entity.token);
          this.authService.setSecureRole(response.entity.role);
                     this.role = response.entity.role;
            this.role_v = response.entity.role;
            localStorage.setItem('rolename',response.entity.role);

              this.formModel = new window.bootstrap.Modal(
            document.getElementById("loginModal")

          );


          localStorage.removeItem('v_cart');
          this.isvendor=localStorage.getItem('isvendor');
          this.isvendorprofile=localStorage.getItem('isvendorprofile');

          this.formModel.hide();
          if(this.role=="Customer")
          {
           let redirectpage= localStorage.getItem('redirect_page');
              if(redirectpage!=null)
           {
            window.location.replace(redirectpage);
           }
           else{
            window.location.replace('/app/home');
           }

          }

          else if(this.role=="Vendor")
          {
            if(this.isvendor=="0" || this.isvendorprofile=="false")
            {
              window.location.replace("/app/vendordocuments");
            }
            else if(this.role=="Vendor" && this.isvendor=="1" || this.isvendorprofile=="true")
            {
              window.location.replace("/app/vendordashboard");
            }
          }

         else if(this.role=="SuperAdmin"){

          window.location.replace('/app/admindashboard');
         }
         else if(this.role=="Delivery"){

          window.location.replace('/app/vendor_to_facilitation');
         }
         else if(this.role=="HubManager"){

          window.location.replace('/app/hub_consignment_list');
         }

         else if(this.role=="FacilitationCenter"){

          window.location.replace('/app/assign_item_from_vendor');
         }


           //this.spinner.hide();
        }
         else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title:response.errorDetails.Error,
            showConfirmButton: false,
            timer: 3000
        })
        }

        this.spinner.hide();
      });
    }

    customerRegistration(){
      this.submitted = true;
      if (this.customerregister.invalid) {
        return;
      }
      if(this.customerregister.value.r_pwd!=this.customerregister.value.r_repwd)
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:'Password Mismatch',
          showConfirmButton: false,
          timer: 3000
      })
      return;
      }
      this.r_pwdd= this.MD5_Convert(this.customerregister.value.r_pwd);
      localStorage.setItem('username',this.customerregister.value.r_username);
      var data={
        "UserName":this.customerregister.value.r_username,
        "Email":this.customerregister.value.r_email,
        "mobile":this.customerregister.value.r_phone,
        "role": localStorage.getItem('rol_name')
      }
      localStorage.setItem('reg_mobile',this.customerregister.value.r_phone)
      localStorage.setItem('reg_email',this.customerregister.value.r_email)
      let url = 'Account/CheckAvailable';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          if(promise.status=="Failed")
          {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title:promise.message,
              showConfirmButton: false,
              timer: 3000
          })
          }
          else if(promise.status=="Success")
          {
            this.reg_otp=promise.reg_otp;
            this.isVisible=2;
          }

        })
  }

  Forgot_submitotp(){
    this.submitted = true;
    if (this.forgetotp.invalid) {
      return;
    }
    this.VerifyOtp = new FormGroup({
      vrotp: new FormControl('')
    });
    var data={
      "Role":localStorage.getItem('rol_name'),
      "UserName":this.forgetotp.value.f_username
    }
    let url='Account/checkusername';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.isVisible = 8;
        this.reg_otp=response.reg_otp;
       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }

  resend_otp(){
    var data={
      "Role":localStorage.getItem('rol_name'),
      "UserName":localStorage.getItem('username'),
    }
    let url='Account/resend_otp';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.reg_otp=response.reg_otp;
       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }
  resend_registration_otp(){
    var data={
      "Role":localStorage.getItem('rol_name'),
      "UserName":localStorage.getItem('username'),
      "mobile":localStorage.getItem('reg_mobile'),
      "Email":localStorage.getItem('reg_email')
    }
    let url='Account/resend_registration_otp';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.reg_otp=response.reg_otp;
       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }


  submit_registration(){
    this.submitted = true;
    if (this.VerifyOtp.invalid) {
      return;
    }
    this.spinner.show();
    if(this.reg_otp==this.VerifyOtp.value.vrotp)
    {
    var data={
      "Role": localStorage.getItem('rol_name'),
      "UserName":this.customerregister.value.r_username,
      "Email":this.customerregister.value.r_email,
      "PhoneNumber":this.customerregister.value.r_phone,
      "Password":this.r_pwdd,
      "apitype":"Web"
    }
    console.log(data)
    let url='Account/Register';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:'Registration Successfull. Please Login',
            showConfirmButton: false,
            timer: 3000
        })
        this.isVisible=0;
        this.spinner.hide();
        this.submitted = false;
        this.customerLogin.reset();
        localStorage.removeItem('reg_mobile');
        localStorage.removeItem('reg_email');
     }
      })
    }
    else
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title:'OTP Mismatch, Please Enter valid OTP.',
        showConfirmButton: false,
        timer: 3000
    })
    }
    this.spinner.hide();
  }

  forgetresend_otp(){
    var data={
      "role":localStorage.getItem('rol_name'),
      "UserName":this.forgetotp.value.f_username
    }
    let url='Account/resend_otp';
      this.allapi.PostData_login(url,data).subscribe(response=>
      {
       if(response.status=="Success")
       {
        this.reg_otp=response.reg_otp;
       }
       else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:response.message,
          showConfirmButton: false,
          timer: 3000
      })
       }
      })
  }

  submit_forget_otp()
  {
    this.submitted = true;
if (this.VerifyOtp.invalid) {
return;
}
    if(this.reg_otp!=this.VerifyOtp.value.vrotp)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title:'OTP Mismatch',
        showConfirmButton: false,
        timer: 3000
    })
    return;
    }
    else{
      this.isVisible=9;
    }
  }

  changepassword(){
    this.submitted=true;
    if(this.enterpassword.invalid)
    {
      return
    }
if(this.enterpassword.value.f_password!=this.enterpassword.value.f_repassword)
{
Swal.fire({
position: 'center',
icon: 'warning',
title:'Password Mismatch',
showConfirmButton: false,
timer: 3000
})
}
else{
this.pwdd= this.MD5_Convert(this.enterpassword.value.f_password);
var data={
"role":localStorage.getItem('rol_name'),
"UserName":this.forgetotp.value.f_username,
"Password":this.pwdd,
}
let url='Account/changepassword';
this.allapi.PostData_login(url,data).subscribe(promise=>
{
  if(promise.status=="Success")
  {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title:promise.message,
      showConfirmButton: false,
      timer: 3000
  })
  this.isVisible=0;
  }
 else if(promise.status=="Failed")
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title:promise.message,
      showConfirmButton: false,
      timer: 3000
  })
  }
})
}
}
get_loginwithotpt(){

                this.submitted=true;
                if(this.loginwithotp.invalid)
                {
                  return;
                }
                localStorage.setItem('username',this.loginwithotp.value.otp_username);
                var data={
                  "role":localStorage.getItem('rol_name'),
                  "UserName":this.loginwithotp.value.otp_username
                }
                let url='Account/resend_otp';
                  this.allapi.PostData_login(url,data).subscribe(response=>
                  {
                   if(response.status=="Success")
                   {
                    this.reg_otp=response.reg_otp;
                    this.isVisible=11;
                   }
                   else{
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title:response.message,
                      showConfirmButton: false,
                      timer: 3000
                  })
                   }
                  })
              }

        get_loginwithotp_resend(){

                var data={
                  "role":localStorage.getItem('rol_name'),
                  "UserName":localStorage.getItem('username')
                }
                let url='Account/resend_otp';
                  this.allapi.PostData_login(url,data).subscribe(response=>
                  {
                   if(response.status=="Success")
                   {
                    this.reg_otp=response.reg_otp;
                   }
                   else{
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title:response.message,
                      showConfirmButton: false,
                      timer: 3000
                  })
                   }
                  })
              }

submit_loginwithotp(){

                this.submitted = true;
                if (this.login_otp.invalid) {
                  return;
                }
               this.spinner.show();
                if(this.reg_otp!=this.login_otp.value.login_otp_enter)
                {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title:'OTP Mismatch',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.spinner.hide();
                return;
                }

                var data={
                  "UserName":localStorage.getItem('username'),
                   "role":localStorage.getItem('rol_name'),
                   "session_cart":localStorage.getItem('v_cart')
                }

                let requestFormUrl = 'Account/login_with_otp';
                   this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
                   if (response.code == 200) {

                      localStorage.setItem('idToken', response.entity.token);
                      localStorage.setItem('log_id', response.entity.log_id);
                      localStorage.setItem('roleid', response.entity.roleid);
                      localStorage.setItem('userid', response.entity.userId);
                      localStorage.setItem('isvendor',response.entity.is_vendor_doc);
                      localStorage.setItem('isvendorprofile', response.entity.is_vendor_profile);
                      localStorage.setItem('rolename',response.entity.role);
                      this.authService.setSecureToken(response.entity.token);
                      this.authService.setSecureRole(response.entity.role);
                      this.role = response.entity.role;
                      this.role_v = response.entity.role;
                      this.formModel = new window.bootstrap.Modal(
                        document.getElementById("loginModal")
                      );
                      this.formModel.hide();
                      localStorage.removeItem('v_cart');
                      this.isvendor=localStorage.getItem('isvendor');
                      this.isvendorprofile=localStorage.getItem('isvendorprofile');

                      if(this.role=="Customer")
                      {
                       let redirectpage= localStorage.getItem('redirect_page');
                          if(redirectpage!=null)
                       {
                        window.location.replace(redirectpage);
                       }
                       else{
                        window.location.replace('/app/home');
                       }

                      }
                    else if(this.role=="Vendor")
                    {
                      if(this.isvendor=="0" || this.isvendorprofile=="false")
                      {
                        window.location.replace("/app/vendordocuments");
                      }
                      else if(this.role=="Vendor" && this.isvendor=="1" || this.isvendorprofile=="true")
                      {
                        window.location.replace("/app/vendordashboard");
                      }
                    }
                   else if(this.role=="SuperAdmin"){

                    window.location.replace('/app/admindashboard');
                   }
                   else if(this.role=="Delivery"){

                    window.location.replace('/app/vendor_to_facilitation');
                   }
                   else if(this.role=="HubManager"){

                    window.location.replace('/app/hub_consignment_list');
                   }
                   else if(this.role=="FacilitationCenter"){

                    window.location.replace('/app/assign_item_from_vendor');
                   }

                  }
                   else {
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title:response.errorDetails.Error,
                      showConfirmButton: false,
                      timer: 3000
                  })
                  }

                });
                this.spinner.hide();
              }



  doSomething(){

    this.formModel.hide();
  }

  doSomethings(){

    this.formModels.hide();
  }


  openModal(){
    this.formModels = new window.bootstrap.Modal(
      document.getElementById("sModal")
    );
    this.formModels.show();
    //let a = prompt("Search Product")
    //window.location.replace('app/search-result/'+a)
  }

   //validation
get f(){
  return this.customerLogin.controls;
}
get g(){
  return this.customerregister.controls;
}
get i(){
  return this.forgetotp.controls;
}
get j(){
  return this.VerifyOtp.controls;
}
get k(){
  return this.enterpassword.controls;
}
get l(){
  return this.loginwithotp.controls;
}
get m(){
  return this.login_otp.controls;
}


// form group
  customerregister = new FormGroup({
    r_username: new FormControl('', [Validators.required]),
    r_email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    r_phone: new FormControl('',[Validators.required]),
    r_pwd: new FormControl('',[Validators.required, Validators.minLength(8)]),
    r_repwd: new FormControl('',[Validators.required]),
  });
  VerifyOtp = new FormGroup({
    vrotp:new FormControl('',[Validators.required])
  });
  enterpassword = new FormGroup({
    f_password:new FormControl('',[Validators.required, Validators.minLength(6)]),
    f_repassword:new FormControl('',[Validators.required])
  });

  forgetotp = new FormGroup({
    f_username:new FormControl('',[Validators.required])
  });

  loginwithotp=new FormGroup({
    otp_username:new FormControl('',[Validators.required])
  });
  login_otp=new FormGroup({
    login_otp_enter:new FormControl('',[Validators.required])
  })
  SearchForm = new FormGroup({
    Searchstring: new FormControl('',[
      Validators.required,
      Validators.minLength(1)]),
  });
  onSubmit(){
    let a =this.SearchForm.value.Searchstring.trim().length;
    if(a>0){
        let str = this.SearchForm.value.Searchstring
        window.location.replace('../app/search-result/'+str)

    }



  }

  click_add_to_cart(ss:any,aa:any)
  {
   alert(localStorage.getItem('Role'))
    var data = {
      "product_id": ss,
      "item_id": aa
  }

    let requestFormUrl = 'Landing_Item_Details/add_to_cart/';
    this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {
      if(response.msg_flg=='Failed')
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
      });
      }
      else  if(response.msg_flg=='Insert')
      {
        if(response.cartlist!="")
        {
          this.cartcount=response.cartlist.length;
        }

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
      });

      }



 });
  }

  show_add_to_cart()
  {
   if(localStorage.getItem('Role')=="Public")
   {
    window.location.replace('/app/public_cart');
   }
   else{

    window.location.replace('/app/cart');

   }


  }
  setCustomerText(e:any ){
    // this.temp1=e
    alert(e)
  }

  keyPressSpace(event:any) {
    // if(event.target.selectionStart===0 && event.code==='Space')
    if(event.code==='Space')
    {
      event.preventDefault();
    }
  }
}
