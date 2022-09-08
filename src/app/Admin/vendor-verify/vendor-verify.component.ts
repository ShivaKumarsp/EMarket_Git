import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-verify',
  templateUrl: './vendor-verify.component.html',
  styleUrls: ['./vendor-verify.component.css']
})
export class VendorVerifyComponent implements OnInit {
  allvendor: any;
  statuslist:any;
  vdoc_status=0
  vendorid=0
  rejectedby=0
  description=""



  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,) { }
  tab=1
  accord=0
  changevalue(ss:any)
  {
    this.tab=ss;
    this.vdoc_status=ss
  }
  ngOnInit(): void {
    this.vdoc_status=1;
    var lang1 = window.sessionStorage.getItem('lang_id');
      if (lang1 == null) {
          var sid = 1;
      }
      else {
          var sid = parseInt(lang1);
      }
      let docurl='verify_vendor_profile/Getdata/'
      this.allapi.GetDataById(docurl,sid).subscribe(promise=> {

          this.allvendor=JSON.parse(promise.allvendor).Table
          this.statuslist=JSON.parse(promise.statuslist).Table
          //console.log( this.allvendor)
        })
  }

  //update
  update(dlist:any)
  {
    let approvedflg
    if(dlist.approvedflg==true)
    {
      approvedflg=false
    }
    else {
      approvedflg=true
    }
    console.log(dlist)
    var data={
      vendor_id :parseInt(dlist.vendorid),
      approved_flg:approvedflg,
    }
    console.log('data',data)
    let updateurl='verify_vendor_profile/VerifyProfile/'
    this.allapi.PostData(updateurl,data).subscribe(promise=>{
      if (promise.msg_flg == "Save") {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'updated Successfully',
            showConfirmButton: false,
            timer: 3000
        })
    }
    else if (promise.msg_flg == "Failed") {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Not updated, Please Try Again',
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
    window.location.reload();
  }



}
