import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
declare var window: any;
@Component({
  selector: 'app-hub-manager-list',
  templateUrl: './hub-manager-list.component.html',
  styleUrls: ['./hub-manager-list.component.css']
})
export class HubManagerListComponent implements OnInit {

  passwordModel:any
  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder,
   private spinner:NgxSpinnerService) { }
   search=""
   page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  hubmanagerlist:any
  facilitymanagerlist:any
  retype_pass:any
  new_pass:any
  submitted=false
  old_pass:any
  user_id=""
  ngOnInit(): void {
    let geturl='UserCreation/get_data/'
    this.allapi.GetDataById(geturl,1).subscribe(promise=> {
      this.hubmanagerlist =JSON.parse(promise.hubmanagerlist).Table;
      // this.facilitymanagerlist = promise.facilitymanagerlist;
      console.log(this.hubmanagerlist)
      // console.log(this.facilitymanagerlist)
   });
  }

  passForm = new FormGroup({

    // oldpass: new FormControl('', [Validators.required]),
    newpass: new FormControl('', [Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")]),
    repass: new FormControl('', [Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")]),
    user_id:new FormControl('')

  });


  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
  }
  password(userid:any){
     //console.log('userid',userid)
     if(!userid)
     {
       //console.log('halting');
       return
     }
     this.passForm.patchValue({
       user_id:userid
      //  console.log(user_id)
     })

    this.passwordModel = new window.bootstrap.Modal(
      document.getElementById("passwordModel")
    )
    this.passwordModel.show();
  }
  dismiss()
  {
    this.passwordModel.hide();
  }
  //Mukta 11-08-2022
change_password()
{

  if(this.passForm.value.newpass.trim() ==''){
    this.passForm.controls['newpass'].setErrors({'required': true})
  }
  if(this.passForm.value.repass.trim() ==''){
    this.passForm.controls['repass'].setErrors({'required': true})
  }
  this.submitted=true
 if(this.passForm.invalid)
 {
   return;
 }
  if(this.new_pass==this.retype_pass){
    let password={
      "Password":this.MD5_Convert(this.passForm.value.newpass),
      "hub_user_id":this.passForm.value.user_id
    }
    //console.log(password)
    let passurl='UserCreation/change_password/';
      this.allapi.PostData(passurl, password).subscribe(promise=> {
          //console.log(promise)
          if(promise.status='Update')
          {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Password Updated Sucessfully',
              showConfirmButton: false,
              timer: 3000
             })
          }
          else
          {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Password Update Failed',
              showConfirmButton: false,
              timer: 3000
             })

          }
      });
  }
   else{
     Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Re-Entered password is Wrong!',
      showConfirmButton: false,
      timer: 3000
     })
   }

}


get p() {
  return this.passForm.controls;
}

  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}
