import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { json } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import { AllapiService } from '../apiservice/allapi.service';

@Component({
  selector: 'app-documentverification',
  templateUrl: './documentverification.component.html',
  styleUrls: ['./documentverification.component.css']
})
export class DocumentverificationComponent implements OnInit {
  alldocumentlist: any;
  statuslist:any;
  vdoc_status=0
  vdocid=0
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
      let docurl='Document_verification/getdocuments/'
      this.allapi.GetDataById(docurl,sid).subscribe(promise=> {
          // console.log(promise)
          this.alldocumentlist=JSON.parse(promise.alldocumentlist).Table
          this.statuslist=JSON.parse(promise.statuslist).Table
        })
  }
  //delete message
  // delete(id:number,i:number){

  //   //i is index number to remove from front end
  //   this.alldocumentlist.splice(i, 1)
  //   //id is primary key to remove form database
  // }
  //update
  update(dlist:any)
  {
    // alert("update")
    var data={
      vdoc_id :parseInt(dlist.vdocid),
      vdoc_approveorreject_by:this.rejectedby,
      vdoc_approveorreject_description:this.description,
      vdoc_status:this.vdoc_status
    }
    //console.log(data)
    let updateurl='Document_verification/save_documents/'
    this.allapi.PostData(updateurl,data).subscribe(promise=>{
      if (promise.msg_flg == "Update") {
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

    location.reload();
  }



}
